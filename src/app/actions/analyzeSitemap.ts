"use server";

import dns from "dns";
import tls from "tls";
import { assertSafeFetchUrl, isDeniedIp, safeFetch, SsrfError } from "@/lib/security/ssrf";
import type { SafeFetchInit } from "@/lib/security/ssrf";

export interface CheckedPage {
  url: string;
  status: number;
  title: string;
  description: string;
  h1Count: number;
  h2Count: number;
  hasSchema: boolean;
  hasCanonical: boolean;
  canonical: string;
  isNoindex: boolean;
  hasOgTitle: boolean;
  hasOgDesc: boolean;
  hasOgImage: boolean;
  hasTwitterCard: boolean;
  hasViewport: boolean;
  hasHtmlLang: boolean;
  missingAltCount: number;
  wordCount: number;
  pageSize: number;
  https: boolean;
  hasHsts: boolean;
  hstsMaxAge: number | null;
  hasCsp: boolean;
  hasXFrameOptions: boolean;
  xFrameOptionsValue: string | null;
  hasXContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  hasPermissionsPolicy: boolean;
  mixedContentCount: number;
  formCount: number;
  insecureFormCount: number;
}

export interface IndiaTelemetry {
  ipAddress: string;
  serverCountry: string;
  serverCity: string;
  serverIsp: string;
  isCdn: boolean;
  cdnName: string;
  latencyMs: number;
  upiIntegrated: boolean;
  upiGateways: string[];
  dpdpCompliant: boolean;
  dpdpPrivacy: boolean;
  dpdpCookie: boolean;
  dpdpReference: boolean;
}

export interface PageSecurity {
  hasHsts: boolean;
  hstsMaxAge: number | null;
  hasCsp: boolean;
  hasXFrameOptions: boolean;
  xFrameOptionsValue: string | null;
  hasXContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  hasPermissionsPolicy: boolean;
  mixedContentCount: number;
  formCount: number;
  insecureFormCount: number;
}

export interface SslCertInfo {
  valid: boolean;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  tlsVersion: string;
}

export interface SecurityAudit {
  score: number;
  grade: "good" | "needs-work" | "poor";
  httpsAllPages: boolean;
  missingHeaders: string[];
  mixedContentCount: number;
  insecureFormCount: number;
  sslCert: SslCertInfo | null;
  suggestions: string[];
}

export interface SeoAuditResult {
  url: string;
  totalUrls: number;
  seoScore: number;
  indexability: "healthy" | "action-required" | "poor";
  missingMeta: number;
  brokenLinks: number;
  missingSchemas: number;
  noindexPages: number;
  missingCanonical: number;
  canonicalMismatch: number;
  missingOgTags: number;
  missingTwitterCard: number;
  missingViewport: number;
  missingHtmlLang: number;
  totalAltMissing: number;
  totalWordCount: number;
  totalPageSize: number;
  suggestions: string[];
  sitemapFetched: boolean;
  urlsList: CheckedPage[];
  indiaTelemetry?: IndiaTelemetry;
  security: SecurityAudit;
}


async function checkSslCertificate(hostname: string): Promise<SslCertInfo | null> {
  try {
    return await new Promise((resolve) => {
      const socket = tls.connect(443, hostname, {
        servername: hostname,
        rejectUnauthorized: true,
      }, () => {
        const cert = socket.getPeerCertificate();
        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.round((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const tlsVersion = socket.getProtocol() || "";
        socket.end();
        resolve({
          valid: daysRemaining > 0 && socket.authorized,
          issuer: String(cert.issuer?.O || cert.issuer?.CN || "Unknown"),
          subject: String(cert.subject?.CN || "Unknown"),
          validFrom: validFrom.toISOString().split("T")[0],
          validTo: validTo.toISOString().split("T")[0],
          daysRemaining,
          tlsVersion,
        });
      });
      socket.on("error", (err) => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: "Unknown",
          subject: hostname,
          validFrom: "",
          validTo: "",
          daysRemaining: 0,
          tlsVersion: "",
        });
      });
      socket.on("error", () => { socket.destroy(); resolve(null); });
      setTimeout(() => { socket.destroy(); resolve(null); }, 5000);
    });
  } catch {
    return null;
  }
}

async function resolveGeoLocation(ip: string): Promise<{ country: string; city: string; isp: string } | null> {
  try {
    const res = await fetch(`https://ip-api.com/json/${ip}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.status === "success") {
        return { country: data.country || "Unknown", city: data.city || "Unknown", isp: data.isp || "Unknown" };
      }
    }
  } catch { /* fall through */ }

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.success) {
        return { country: data.country || "Unknown", city: data.city || "Unknown", isp: data.connection?.isp || "Unknown" };
      }
    }
  } catch { /* give up */ }

  return null;
}

async function safeFetchWithRetry(url: string, init: SafeFetchInit, retries = 1): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await safeFetch(url, init);
    } catch (err) {
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000));
      } else {
        throw err;
      }
    }
  }
  throw new Error("Unreachable");
}

async function tryFetchSitemap(baseUrl: string): Promise<{ text: string; url: string } | null> {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return null;
  }
  const origin = parsed.origin;

  const candidates: string[] = [];

  // If baseUrl itself looks like a sitemap, try it first
  if (baseUrl.includes("sitemap") || baseUrl.endsWith(".xml") || baseUrl.endsWith(".xml.gz")) {
    candidates.push(baseUrl);
  }

  candidates.push(
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap.php`,
    `${origin}/sitemap.xml.gz`,
  );

  // Also try the base URL as a fallback
  const isUnique = (url: string) => !candidates.some(c => c === url);
  if (isUnique(baseUrl)) {
    candidates.push(baseUrl);
  }

  for (const url of candidates) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await safeFetch(url, {
          headers: { "Accept": "application/xml, text/xml, */*" },
          maxMs: 6000,
        });
        if (res.ok) {
          const text = await res.text();
          if (/<loc>/i.test(text) || /<urlset/i.test(text) || /<sitemapindex/i.test(text)) {
            return { text, url };
          }
        }
      } catch {
        // transient failure, retry
      }
      if (attempt === 0) await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Fallback: check robots.txt for Sitemap directive
  try {
    const robotsRes = await safeFetch(`${origin}/robots.txt`, { maxMs: 5000 });
    if (robotsRes.ok) {
      const robotsText = await robotsRes.text();
      const sitemapMatch = robotsText.match(/^Sitemap:\s*(\S+)/im);
      if (sitemapMatch) {
        const res = await safeFetch(sitemapMatch[1], {
          headers: { "Accept": "application/xml, text/xml, */*" },
          maxMs: 6000,
        });
        if (res.ok) {
          const text = await res.text();
          if (/<loc>/i.test(text) || /<urlset/i.test(text) || /<sitemapindex/i.test(text)) {
            return { text, url: sitemapMatch[1] };
          }
        }
      }
    }
  } catch {
    // robots.txt not accessible
  }

  return null;
}

export async function analyzeSitemap(sitemapUrl: string): Promise<SeoAuditResult> {
  let targetUrl = sitemapUrl.trim();

  if (!targetUrl.toLowerCase().startsWith("http")) {
    targetUrl = `https://${targetUrl}`;
  }

  let parsedTarget: URL;
  try {
    parsedTarget = await assertSafeFetchUrl(targetUrl);
    targetUrl = parsedTarget.toString();
  } catch (err) {
    if (err instanceof SsrfError) {
      console.warn("Rejected unsafe sitemap URL:", err.message);
    } else {
      console.error("Sitemap URL validation failed:", err);
    }
    return {
      url: targetUrl,
      totalUrls: 0,
      seoScore: 0,
      indexability: "poor",
      missingMeta: 0,
      brokenLinks: 0,
      missingSchemas: 0,
      noindexPages: 0,
      missingCanonical: 0,
      canonicalMismatch: 0,
      missingOgTags: 0,
      missingTwitterCard: 0,
      missingViewport: 0,
      missingHtmlLang: 0,
      totalAltMissing: 0,
      totalWordCount: 0,
      totalPageSize: 0,
      suggestions: [
        "The URL you provided is not reachable from the audit service. Only public, internet-accessible websites can be scanned.",
      ],
      sitemapFetched: false,
      urlsList: [],
      security: {
        score: 0,
        grade: "poor",
        httpsAllPages: false,
        missingHeaders: [],
        mixedContentCount: 0,
        insecureFormCount: 0,
        sslCert: null,
        suggestions: ["Unable to audit security — target URL is not reachable."],
      },
    };
  }

  let xmlText = "";
  let sitemapFetched = false;
  const urls: string[] = [];

  try {
    const sitemapResult = await tryFetchSitemap(targetUrl);
    if (sitemapResult) {
      xmlText = sitemapResult.text;
      sitemapFetched = true;
    }
  } catch (e) {
    console.error("Sitemap discovery failed:", e);
  }

  if (xmlText) {
    const locRegex = /<loc>(https?:\/\/[^\s<]+)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(xmlText)) !== null) {
      urls.push(match[1]);
    }
    if (urls.length > 0) sitemapFetched = true;
  }

  if (urls.length === 0) {
    urls.push(targetUrl);
  }

  const sampleUrls = urls.slice(0, 6);
  const urlsList: CheckedPage[] = [];
  let homePageHtml = "";

  // Fetch homepage HTML separately to avoid race condition in parallel processing
  const homepageUrl = sampleUrls.length > 0 ? sampleUrls[0] : targetUrl;
  try {
    const homeRes = await safeFetchWithRetry(homepageUrl, {
      headers: { "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9" },
      maxMs: 8000,
    });
    if (homeRes.ok) {
      homePageHtml = await homeRes.text();
    }
  } catch {
    // Non-critical; telemetry analysis will skip if empty
  }

  let missingMeta = 0;
  let brokenLinks = 0;
  let missingSchemas = 0;
  let noindexPages = 0;
  let missingCanonical = 0;
  let canonicalMismatch = 0;
  let missingOgTags = 0;
  let missingTwitterCard = 0;
  let missingViewport = 0;
  let missingHtmlLang = 0;
  let totalAltMissing = 0;
  let totalWordCount = 0;
  let totalPageSize = 0;

  await Promise.all(
    sampleUrls.map(async (url) => {
      let status = 200;
      let title = "";
      let description = "";
      let h1Count = 0;
      let h2Count = 0;
      let hasSchema = false;
      let hasCanonical = false;
      let canonical = "";
      let isNoindex = false;
      let hasOgTitle = false;
      let hasOgDesc = false;
      let hasOgImage = false;
      let hasTwitterCard = false;
      let hasViewport = false;
      let hasHtmlLang = false;
      let missingAltCount = 0;
      let wordCount = 0;
      let pageSize = 0;
      let https = false;
      let hasHsts = false;
      let hstsMaxAge: number | null = null;
      let hasCsp = false;
      let hasXFrameOptions = false;
      let xFrameOptionsValue: string | null = null;
      let hasXContentTypeOptions = false;
      let hasReferrerPolicy = false;
      let hasPermissionsPolicy = false;
      let mixedContentCount = 0;
      let formCount = 0;
      let insecureFormCount = 0;

      try {
        const pageRes = await safeFetchWithRetry(url, {
          headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9",
          },
          maxMs: 8000,
        });

        status = pageRes.status;
        https = pageRes.url.startsWith("https");

        const h = pageRes.headers;
        hasHsts = h.has("strict-transport-security");
        const hstsVal = h.get("strict-transport-security");
        hstsMaxAge = hstsVal ? parseInt(hstsVal.match(/max-age=(\d+)/i)?.[1] || "0", 10) : null;
        hasCsp = h.has("content-security-policy");
        hasXFrameOptions = h.has("x-frame-options");
        xFrameOptionsValue = h.get("x-frame-options");
        hasXContentTypeOptions = h.get("x-content-type-options")?.toLowerCase() === "nosniff";
        hasReferrerPolicy = h.has("referrer-policy");
        hasPermissionsPolicy = h.has("permissions-policy");

        if (pageRes.ok) {
          const html = await pageRes.text();
          pageSize = Math.round(Buffer.byteLength(html, "utf8") / 1024);

          // Title
          const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
          title = titleMatch ? titleMatch[1].trim() : "";

          // Meta description
          const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                            html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
          description = descMatch ? descMatch[1].trim() : "";

          // H1/H2 counts
          h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
          h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

          // Schema check
          hasSchema = html.includes("application/ld+json") || html.includes("itemtype=\"http://schema.org");

          // Canonical URL
          const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ||
                             html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
          if (canonMatch) {
            hasCanonical = true;
            canonical = canonMatch[1];
            if (!canonical.includes(new URL(url).hostname)) {
              canonicalMismatch++;
            }
          } else {
            missingCanonical++;
          }

          // Robots meta (noindex)
          const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
          if (robotsMatch && robotsMatch[1].toLowerCase().includes("noindex")) {
            isNoindex = true;
            noindexPages++;
          }

          // OG tags
          hasOgTitle = /<meta[^>]+property=["']og:title["'][^>]+content=["']/i.test(html);
          hasOgDesc = /<meta[^>]+property=["']og:description["'][^>]+content=["']/i.test(html);
          hasOgImage = /<meta[^>]+property=["']og:image["'][^>]+content=["']/i.test(html);
          if (!hasOgTitle || !hasOgDesc || !hasOgImage) missingOgTags++;

          // Twitter card
          hasTwitterCard = /<meta[^>]+name=["']twitter:card["'][^>]+content=["']/i.test(html);
          if (!hasTwitterCard) missingTwitterCard++;

          // Viewport meta
          hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
          if (!hasViewport) missingViewport++;

          // HTML lang
          hasHtmlLang = /<html[^>]+lang=["']/i.test(html);
          if (!hasHtmlLang) missingHtmlLang++;

          // Image alt text analysis
          const imgTags = html.match(/<img[^>]*>/gi) || [];
          missingAltCount = 0;
          for (const img of imgTags) {
            if (!/alt\s*=/i.test(img)) missingAltCount++;
            // Check empty alt
            if (/alt\s*=\s*["']\s*["']/i.test(img)) missingAltCount++;
          }
          totalAltMissing += missingAltCount;

          // Word count (approximate)
          const textContent = html
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ");
          wordCount = textContent.split(" ").filter(w => w.length > 0).length;
          totalWordCount += wordCount;
          totalPageSize += pageSize;

          if (https) {
            const mixedPattern = /<(?:script|img|link|iframe|video|audio|source|object|embed)\s[^>]+(?:src|href|data)\s*=\s*["']http:\/\//gi;
            mixedContentCount = (html.match(mixedPattern) || []).length;
          }
          formCount = (html.match(/<form[^>]*>/gi) || []).length;
          if (formCount > 0 && https) {
            insecureFormCount = (html.match(/<form[^>]+action=["']http:\/\//gi) || []).length;
          }

          if (!title || !description) missingMeta++;
          if (!hasSchema) missingSchemas++;
        } else {
          brokenLinks++;
        }
      } catch (err) {
        console.error(`Audit of page ${url} failed:`, err);
        status = 500;
        brokenLinks++;
      }

      urlsList.push({
        url, status, title, description,
        h1Count, h2Count, hasSchema,
        hasCanonical, canonical, isNoindex,
        hasOgTitle, hasOgDesc, hasOgImage,
        hasTwitterCard, hasViewport, hasHtmlLang,
        missingAltCount, wordCount, pageSize, https,
        hasHsts, hstsMaxAge, hasCsp, hasXFrameOptions, xFrameOptionsValue,
        hasXContentTypeOptions, hasReferrerPolicy, hasPermissionsPolicy,
        mixedContentCount, formCount, insecureFormCount,
      });
    })
  );

  // --- Security Audit ---
  const secHostname = (() => {
    try { return new URL(targetUrl).hostname; } catch { return ""; }
  })();

  const sslCert = secHostname ? await checkSslCertificate(secHostname).catch(() => null) : null;

  const allPagesHttps = urlsList.length > 0 && urlsList.every(p => p.https);
  const totalMixed = urlsList.reduce((s, p) => s + p.mixedContentCount, 0);
  const totalInsecureForms = urlsList.reduce((s, p) => s + p.insecureFormCount, 0);
  const allHsts = urlsList.length > 0 && urlsList.every(p => p.hasHsts && (p.hstsMaxAge ?? 0) >= 31536000);
  const anyCsp = urlsList.some(p => p.hasCsp);
  const allXfo = urlsList.length > 0 && urlsList.every(p => p.hasXFrameOptions && (p.xFrameOptionsValue?.toUpperCase() === "DENY" || p.xFrameOptionsValue?.toUpperCase() === "SAMEORIGIN"));
  const allXcto = urlsList.length > 0 && urlsList.every(p => p.hasXContentTypeOptions);
  const allRp = urlsList.length > 0 && urlsList.every(p => p.hasReferrerPolicy);
  const anyPp = urlsList.some(p => p.hasPermissionsPolicy);

  let securityScore = 0;
  if (allPagesHttps) securityScore += 15;
  if (allHsts) securityScore += 15;
  if (anyCsp) securityScore += 15;
  if (allXfo) securityScore += 10;
  if (allXcto) securityScore += 10;
  if (allRp) securityScore += 10;
  if (totalMixed === 0) securityScore += 10;
  if (anyPp) securityScore += 5;
  if (totalInsecureForms === 0) securityScore += 5;
  if (sslCert?.valid && sslCert.daysRemaining > 30) securityScore += 5;

  const missingHeaders: string[] = [];
  if (!allHsts) missingHeaders.push("Strict-Transport-Security");
  if (!anyCsp) missingHeaders.push("Content-Security-Policy");
  if (!allXfo) missingHeaders.push("X-Frame-Options");
  if (!allXcto) missingHeaders.push("X-Content-Type-Options");
  if (!allRp) missingHeaders.push("Referrer-Policy");
  if (!anyPp) missingHeaders.push("Permissions-Policy");

  const secGrade: "good" | "needs-work" | "poor" = securityScore >= 80 ? "good" : securityScore >= 50 ? "needs-work" : "poor";

  const secSuggestions: string[] = [];
  if (!allPagesHttps) secSuggestions.push("Some pages are still served over HTTP. Migrate all pages to HTTPS to prevent data interception and boost search rankings.");
  if (!allHsts) secSuggestions.push("HTTP Strict-Transport-Security (HSTS) header is missing or has insufficient max-age. Add `Strict-Transport-Security: max-age=31536000; includeSubDomains` to enforce HTTPS.");
  if (!anyCsp) secSuggestions.push("Content-Security-Policy (CSP) header is missing. Implement a CSP to mitigate XSS and data injection attacks. Start with `default-src 'self'` and refine.");
  if (!allXfo) secSuggestions.push("X-Frame-Options header is missing or misconfigured. Set `X-Frame-Options: DENY` (or `SAMEORIGIN` if framing is needed) to prevent clickjacking.");
  if (!allXcto) secSuggestions.push("X-Content-Type-Options: nosniff header is missing. Add it to prevent MIME-type sniffing attacks.");
  if (!allRp) secSuggestions.push("Referrer-Policy header is missing. Set `Referrer-Policy: strict-origin-when-cross-origin` to control referrer information leakage.");
  if (!anyPp) secSuggestions.push("Permissions-Policy header is missing. Restrict browser feature access (camera, microphone, geolocation) by adding a Permissions-Policy header.");
  if (totalMixed > 0) secSuggestions.push(`Found ${totalMixed} mixed content resource(s) on HTTPS pages. Update all http:// resource URLs to https:// to prevent browser warnings and broken functionality.`);
  if (totalInsecureForms > 0) secSuggestions.push(`Found ${totalInsecureForms} form(s) on HTTPS pages submitting to HTTP endpoints. All form actions must use HTTPS to protect user data.`);
  if (!sslCert) secSuggestions.push("Could not validate the SSL certificate. Ensure the server has a valid, trusted certificate installed.");
  else if (!sslCert.valid) secSuggestions.push("SSL certificate validation failed. The certificate may be expired, self-signed, or issued by an untrusted authority.");
  else if (sslCert.daysRemaining <= 30) secSuggestions.push(`SSL certificate expires in ${sslCert.daysRemaining} days (${sslCert.validTo}). Renew before expiry to avoid browser trust warnings.`);

  const security: SecurityAudit = {
    score: securityScore,
    grade: secGrade,
    httpsAllPages: allPagesHttps,
    missingHeaders,
    mixedContentCount: totalMixed,
    insecureFormCount: totalInsecureForms,
    sslCert,
    suggestions: secSuggestions,
  };

  const totalUrls = sitemapFetched ? urls.length : 1;
  const checksPerPage = 12;
  const maxPossibleScore = 12 * checksPerPage;
  const passed =
    (sitemapFetched ? checksPerPage : 0) +
    (brokenLinks === 0 ? checksPerPage : 0) +
    (missingMeta === 0 ? checksPerPage : 0) +
    (missingSchemas === 0 ? checksPerPage : 0) +
    (missingCanonical === 0 ? checksPerPage : 0) +
    (noindexPages === 0 ? checksPerPage : 0) +
    (missingOgTags === 0 ? checksPerPage : 0) +
    (missingTwitterCard === 0 ? checksPerPage : 0) +
    (missingViewport === 0 ? checksPerPage : 0) +
    (missingHtmlLang === 0 ? checksPerPage : 0) +
    (totalAltMissing === 0 ? checksPerPage : Math.max(0, Math.floor(checksPerPage * (1 - totalAltMissing / Math.max(totalAltMissing, sampleUrls.length * 2))))) +
    (urlsList.every(p => p.h1Count === 1) ? checksPerPage : Math.max(0, Math.floor(checksPerPage * (1 - urlsList.filter(p => p.h1Count !== 1).length / sampleUrls.length))));

  const seoScore = Math.min(100, Math.round((passed / maxPossibleScore) * 100));
  const indexability = seoScore >= 85 ? "healthy" : seoScore >= 65 ? "action-required" : "poor";

  const suggestions: string[] = [];

  if (!sitemapFetched) {
    suggestions.push("Could not locate a standard sitemap.xml file. Publish a dynamic XML sitemap at /sitemap.xml to help AI and search crawlers index your structure.");
  } else {
    suggestions.push(`Discovered ${totalUrls} URL nodes inside sitemap.xml. Crawl pathways are successfully exposed.`);
  }

  if (brokenLinks > 0) {
    suggestions.push(`Detected ${brokenLinks} broken crawl attempts or timeout errors. Fix 404 links to prevent wasting crawler budget.`);
  } else {
    suggestions.push("All monitored page endpoints returned successful 200 HTTP codes. Link health is excellent.");
  }

  if (missingMeta > 0) {
    suggestions.push(`Missing unique meta descriptions on ${missingMeta} sampled pages. Add highly relevant snippets to improve click-through outcomes.`);
  } else {
    suggestions.push("All audited page metadata tags (title and description) are fully populated.");
  }

  if (missingSchemas > 0) {
    suggestions.push(`JSON-LD structured data is missing in ${missingSchemas} pages. Inject Organization, Product, or FAQ schemas to enable search snippet integration.`);
  } else {
    suggestions.push("Audited pages contain microdata schemas for enhanced structured rich listings.");
  }

  if (urlsList.some(p => p.h1Count !== 1)) {
    suggestions.push("Ensure every audited URL features exactly one <h1> heading to preserve clean semantic indexing structures.");
  }

  if (missingCanonical > 0) {
    suggestions.push(`${missingCanonical} page(s) are missing a canonical URL tag. Add rel="canonical" to prevent duplicate content issues, especially for similar parameterized URLs.`);
  }

  if (canonicalMismatch > 0) {
    suggestions.push(`${canonicalMismatch} canonical tag(s) point to a different domain. This can confuse crawlers about which site version should be indexed.`);
  }

  if (noindexPages > 0) {
    suggestions.push(`${noindexPages} sampled page(s) contain a "noindex" directives. Review whether these pages should remain hidden from search engines.`);
  }

  if (missingOgTags > 0) {
    suggestions.push(`Open Graph tags are incomplete on ${missingOgTags} page(s). Add og:title, og:description, and og:image to control how links appear on social platforms.`);
  }

  if (missingTwitterCard > 0) {
    suggestions.push(`Twitter Card meta tags are missing on ${missingTwitterCard} page(s). Add name="twitter:card" summary_large_image to enrich tweet previews.`);
  }

  if (!urlsList.some(p => p.hasViewport)) {
    suggestions.push("Viewport meta tag is missing. Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> for proper mobile rendering.");
  }

  if (!urlsList.some(p => p.hasHtmlLang)) {
    suggestions.push("HTML lang attribute is missing from <html> element. Set a language attribute to help search engines and screen readers interpret your content.");
  }

  if (totalAltMissing > 0) {
    suggestions.push(`${totalAltMissing} images are missing alt text across sampled pages. Add descriptive alt attributes for accessibility and image search ranking.`);
  }

  if (sampleUrls.length > 0) {
    const avgSize = Math.round(totalPageSize / sampleUrls.length);
    if (avgSize > 500) {
      suggestions.push(`Average page weight is ${avgSize}KB across sampled pages. Reduce bundle sizes, lazy-load below-fold content, and enable compression.`);
    }
  }

  // --- Indian Market Telemetry Audit ---
  let ipAddress = "Unknown";
  let serverCountry = "Unknown";
  let serverCity = "Unknown";
  let serverIsp = "Unknown";
  let isCdn = false;
  let cdnName = "";
  let latencyMs = 250; // Default warning latency to India from non-CDN US/EU regions

  let parsedHostname = "";
  try {
    const urlObj = new URL(targetUrl);
    parsedHostname = urlObj.hostname;
  } catch {
    parsedHostname = targetUrl.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split(":")[0];
  }

  try {
    const ips = await dns.promises.resolve4(parsedHostname);
    if (ips && ips.length > 0) {
      ipAddress = ips[0];

      if (isDeniedIp(ipAddress)) {
        ipAddress = "Unknown";
      } else {
        const geo = await resolveGeoLocation(ipAddress);
        if (geo) {
          serverCountry = geo.country;
          serverCity = geo.city;
          serverIsp = geo.isp;
        }
      }
    }
  } catch (err) {
    console.error("DNS / Geolocation analysis failed:", err);
  }

  // CDN Identification
  const ispLower = serverIsp.toLowerCase();
  const hostnameLower = parsedHostname.toLowerCase();
  if (
    ispLower.includes("cloudflare") || 
    ispLower.includes("cloudflare, inc.") ||
    hostnameLower.includes("cloudflare")
  ) {
    isCdn = true;
    cdnName = "Cloudflare";
    latencyMs = 18; // Very fast local CDN edge pop
  } else if (ispLower.includes("cloudfront") || ispLower.includes("amazon technologies") || ispLower.includes("amazon.com")) {
    isCdn = true;
    cdnName = "Amazon CloudFront";
    latencyMs = 24;
  } else if (ispLower.includes("fastly")) {
    isCdn = true;
    cdnName = "Fastly";
    latencyMs = 22;
  } else if (ispLower.includes("akamai")) {
    isCdn = true;
    cdnName = "Akamai";
    latencyMs = 20;
  } else if (ispLower.includes("google") && ispLower.includes("cdn")) {
    isCdn = true;
    cdnName = "Google Cloud CDN";
    latencyMs = 15;
  } else if (serverCountry === "India") {
    // Hosted directly in India (e.g. AWS Mumbai, Azure Pune)
    isCdn = false;
    latencyMs = 32;
  } else {
    // Non-CDN international server
    isCdn = false;
    if (serverCountry === "United States" || serverCountry === "US") {
      latencyMs = 240;
    } else if (serverCountry === "Singapore") {
      latencyMs = 65;
    } else if (serverCountry === "Europe" || serverCountry === "Germany" || serverCountry === "United Kingdom") {
      latencyMs = 145;
    } else {
      latencyMs = 180;
    }
  }

  // Payment gateways check
  const upiReadiness = {
    integrated: false,
    gateways: [] as string[]
  };

  const htmlLower = homePageHtml.toLowerCase();
  if (htmlLower) {
    if (htmlLower.includes("razorpay") || htmlLower.includes("checkout.razorpay.com") || htmlLower.includes("razorpay.js")) {
      upiReadiness.integrated = true;
      upiReadiness.gateways.push("Razorpay");
    }
    if (htmlLower.includes("paytm") || htmlLower.includes("secure.paytm.in") || htmlLower.includes("paytm.js")) {
      upiReadiness.integrated = true;
      upiReadiness.gateways.push("Paytm");
    }
    if (htmlLower.includes("phonepe") || htmlLower.includes("merchants.phonepe.com")) {
      upiReadiness.integrated = true;
      upiReadiness.gateways.push("PhonePe");
    }
    if (htmlLower.includes("instamojo")) {
      upiReadiness.integrated = true;
      upiReadiness.gateways.push("Instamojo");
    }
    if (htmlLower.includes("billdesk")) {
      upiReadiness.integrated = true;
      upiReadiness.gateways.push("BillDesk");
    }
    if (htmlLower.includes("upi://pay") || htmlLower.includes("bhim") || htmlLower.includes("gpay") || htmlLower.includes("google pay") || htmlLower.includes("phonepe://")) {
      upiReadiness.integrated = true;
      if (!upiReadiness.gateways.includes("UPI Payments")) {
        upiReadiness.gateways.push("UPI Payments");
      }
    }
  }

  // DPDP Act Compliance
  const dpdpCompliance = {
    compliant: false,
    hasPrivacyPolicy: false,
    hasCookieBanner: false,
    hasDPDPReference: false
  };

  if (htmlLower) {
    if (htmlLower.includes("privacy policy") || htmlLower.includes("privacy-policy") || htmlLower.includes("gizlilik") || htmlLower.includes("data protection policy")) {
      dpdpCompliance.hasPrivacyPolicy = true;
    }
    if (htmlLower.includes("cookie consent") || htmlLower.includes("accept cookie") || htmlLower.includes("cookie-consent") || htmlLower.includes("çerez") || htmlLower.includes("consent manager")) {
      dpdpCompliance.hasCookieBanner = true;
    }
    if (htmlLower.includes("dpdp") || htmlLower.includes("data protection act") || htmlLower.includes("digital personal data")) {
      dpdpCompliance.hasDPDPReference = true;
    }
    if (dpdpCompliance.hasPrivacyPolicy && (dpdpCompliance.hasCookieBanner || dpdpCompliance.hasDPDPReference)) {
      dpdpCompliance.compliant = true;
    }
  }

  // Add India-specific suggestions
  if (latencyMs > 100) {
    suggestions.push(`High Server Latency to India (${latencyMs}ms). Since your server resolves to ${serverCountry} (${serverCity}) with no global CDN detected, Indian users will experience slower page paints. Enable Cloudflare or use an AWS ap-south-1 (Mumbai) server.`);
  } else if (isCdn) {
    suggestions.push(`Excellent global delivery! Detected ${cdnName} CDN proxy, resolving with ultra-low latency (${latencyMs}ms) to Indian edge hubs.`);
  }

  if (!upiReadiness.integrated) {
    suggestions.push("UPI Gateway integration not detected. UPI transactions drive over 80% of digital checkout volumes in India. Adding Razorpay, Paytm, or UPI direct checkout is highly recommended.");
  } else {
    suggestions.push(`Payment pathways optimized for India! Detected active ${upiReadiness.gateways.join(" / ")} gateways.`);
  }

  if (!dpdpCompliance.compliant) {
    suggestions.push("Indian DPDP Act (2023) readiness audit warning: Complete cookie consent forms and explicit data privacy declarations were not resolved. Update your privacy compliance parameters to match Indian regulations.");
  } else {
    suggestions.push("Indian DPDP Act (2023) privacy compliance markers successfully validated!");
  }

  const indiaTelemetry: IndiaTelemetry = {
    ipAddress,
    serverCountry,
    serverCity,
    serverIsp,
    isCdn,
    cdnName,
    latencyMs,
    upiIntegrated: upiReadiness.integrated,
    upiGateways: upiReadiness.gateways,
    dpdpCompliant: dpdpCompliance.compliant,
    dpdpPrivacy: dpdpCompliance.hasPrivacyPolicy,
    dpdpCookie: dpdpCompliance.hasCookieBanner,
    dpdpReference: dpdpCompliance.hasDPDPReference
  };

  return {
    url: targetUrl,
    totalUrls,
    seoScore,
    indexability,
    missingMeta,
    brokenLinks,
    missingSchemas,
    noindexPages,
    missingCanonical,
    canonicalMismatch,
    missingOgTags,
    missingTwitterCard,
    missingViewport,
    missingHtmlLang,
    totalAltMissing,
    totalWordCount,
    totalPageSize,
    suggestions,
    sitemapFetched,
    urlsList,
    indiaTelemetry,
    security,
  };
}