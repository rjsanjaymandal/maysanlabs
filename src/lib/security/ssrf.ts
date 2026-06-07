import dns from "node:dns/promises";

const MAX_REDIRECTS = 3;
const MAX_FETCH_MS = 30_000;
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;

const DENYLIST_V4: ReadonlyArray<readonly [number, number]> = [
  [0x00000000, 8],
  [0x0a000000, 8],
  [0x7f000000, 8],
  [0xa9fe0000, 16],
  [0xac100000, 12],
  [0xc0a80000, 16],
  [0x64400000, 10],
  [0xc0000000, 24],
  [0xc0000200, 24],
  [0xd6120000, 15],
  [0xc6336400, 24],
  [0xcb007100, 24],
  [0xe0000000, 4],
  [0xf0000000, 4],
];

const DENYLIST_V6: ReadonlyArray<readonly [bigint, number]> = [
  [BigInt("0x00000000000000000000000000000000"), 128],
  [BigInt("0x00000000000000000000000000000001"), 128],
  [BigInt("0x0064ff9b000000000000000000000000"), 96],
  [BigInt("0x01000000000000000000000000000000"), 64],
  [BigInt("0x20010db8000000000000000000000000"), 32],
  [BigInt("0x20020000000000000000000000000000"), 16],
  [BigInt("0xfc000000000000000000000000000000"), 7],
  [BigInt("0xfe800000000000000000000000000000"), 10],
];

export class SsrfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SsrfError";
  }
}

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const oct = Number(p);
    if (oct < 0 || oct > 255) return null;
    n = n * 256 + oct;
  }
  return n >>> 0;
}

function ipv4MappedToV4(ip: string): string | null {
  const m = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  return m ? m[1] : null;
}

function ipv6ToBigInt(ip: string): bigint | null {
  const v4Mapped = ipv4MappedToV4(ip);
  if (v4Mapped) {
    const n = ipv4ToInt(v4Mapped);
    return n === null ? null : BigInt(n);
  }

  let normalized: string;
  try {
    normalized = new URL(`http://[${ip}]/`).hostname;
  } catch {
    return null;
  }
  const stripped = normalized.replace(/^\[|\]$/g, "");
  const doubleColonSplit = stripped.split("::");
  let parts: string[];
  if (doubleColonSplit.length === 2) {
    const head = doubleColonSplit[0] ? doubleColonSplit[0].split(":") : [];
    const tail = doubleColonSplit[1] ? doubleColonSplit[1].split(":") : [];
    const fill = 8 - head.length - tail.length;
    if (fill < 0) return null;
    parts = [...head, ...Array(fill).fill("0"), ...tail];
  } else if (doubleColonSplit.length === 1) {
    parts = doubleColonSplit[0].split(":");
  } else {
    return null;
  }
  if (parts.length !== 8) return null;

  let result = BigInt(0);
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(p)) return null;
    result = (result << BigInt(16)) | BigInt(parseInt(p, 16));
  }
  return result;
}

function inCidrV4(ip: number, network: number, prefix: number): boolean {
  if (prefix <= 0) return true;
  if (prefix >= 32) return ip === network;
  const mask = ((~0 << (32 - prefix)) >>> 0) & 0xffffffff;
  return ((ip & mask) >>> 0) === (network & mask) >>> 0;
}

function inCidrV6(ip: bigint, network: bigint, prefix: number): boolean {
  if (prefix <= 0) return true;
  if (prefix >= 128) return ip === network;
  const shift = BigInt(128 - prefix);
  const mask = ~BigInt(0) << shift;
  return (ip & mask) === (network & mask);
}

export function isDeniedIp(ip: string): boolean {
  if (ip.includes(":")) {
    const big = ipv6ToBigInt(ip);
    if (big === null) return true;
    return DENYLIST_V6.some(([net, pfx]) => inCidrV6(big, net, pfx));
  }
  const intIp = ipv4ToInt(ip);
  if (intIp === null) return true;
  return DENYLIST_V4.some(([net, pfx]) => inCidrV4(intIp, net, pfx));
}

function isForbiddenHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase().replace(/\.$/, "");
  if (lower === "localhost") return true;
  if (lower.endsWith(".localhost") || lower.endsWith(".local")) return true;
  if (/^\d+$/.test(lower)) return true;
  return false;
}

export async function assertSafeFetchUrl(rawUrl: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new SsrfError("Invalid URL");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new SsrfError("URL protocol not allowed");
  }
  if (!url.hostname) {
    throw new SsrfError("URL has no hostname");
  }
  if (isForbiddenHostname(url.hostname)) {
    throw new SsrfError("Hostname is not allowed");
  }

  const addresses = await dns.lookup(url.hostname, { all: true });
  if (addresses.length === 0) {
    throw new SsrfError("DNS lookup returned no addresses");
  }
  for (const { address } of addresses) {
    if (isDeniedIp(address)) {
      throw new SsrfError("Resolved IP is in a denied range");
    }
  }
  return url;
}

export interface SafeFetchInit extends Omit<RequestInit, "redirect"> {
  maxRedirects?: number;
  maxResponseBytes?: number;
  maxMs?: number;
}

export async function safeFetch(
  rawUrl: string,
  init: SafeFetchInit = {}
): Promise<Response> {
  const maxRedirects = init.maxRedirects ?? MAX_REDIRECTS;
  const maxBytes = init.maxResponseBytes ?? MAX_RESPONSE_BYTES;
  const maxMs = init.maxMs ?? MAX_FETCH_MS;

  let currentUrl = await assertSafeFetchUrl(rawUrl);

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const addresses = await dns.lookup(currentUrl.hostname, { all: true });
    if (addresses.length === 0) {
      throw new SsrfError("DNS lookup returned no addresses");
    }
    for (const { address } of addresses) {
      if (isDeniedIp(address)) {
        throw new SsrfError("Resolved IP is in a denied range");
      }
    }

    const headers = new Headers(init.headers);
    if (!headers.has("User-Agent")) {
      headers.set("User-Agent", "MaysanLabs-Audit/1.0 (+https://maysanlabs.com)");
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), maxMs);
    const upstreamSignal = init.signal;
    if (upstreamSignal) {
      if (upstreamSignal.aborted) controller.abort();
      else upstreamSignal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    let res: Response;
    try {
      res = await fetch(currentUrl, {
        ...init,
        headers,
        signal: controller.signal,
        redirect: "manual",
      });
    } finally {
      clearTimeout(timer);
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location || hop === maxRedirects) {
        return res;
      }
      try {
        currentUrl = await assertSafeFetchUrl(new URL(location, currentUrl).toString());
      } catch {
        return res;
      }
      continue;
    }

    if (res.body && maxBytes > 0) {
      res = wrapWithSizeCap(res, maxBytes);
    }

    return res;
  }

  throw new SsrfError("Too many redirects");
}

function wrapWithSizeCap(res: Response, maxBytes: number): Response {
  const contentLength = res.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    return new Response("Response too large", { status: 413 });
  }

  const reader = res.body?.getReader();
  if (!reader) return res;

  let received = 0;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      received += value.byteLength;
      if (received > maxBytes) {
        controller.error(new SsrfError("Response exceeded size cap"));
        try { reader.cancel(); } catch { /* noop */ }
        return;
      }
      controller.enqueue(value);
    },
    cancel() {
      try { reader.cancel(); } catch { /* noop */ }
    },
  });

  return new Response(stream, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}
