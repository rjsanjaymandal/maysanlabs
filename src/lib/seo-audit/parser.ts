import { safeFetch, type SafeFetchInit } from "@/lib/security/ssrf";

export async function safeFetchWithRetry(url: string, init: SafeFetchInit, retries = 1): Promise<Response> {
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

export async function tryFetchSitemap(baseUrl: string): Promise<{ text: string; url: string } | null> {
  let parsed: URL;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return null;
  }
  const origin = parsed.origin;

  const candidates: string[] = [];

  if (baseUrl.includes("sitemap") || baseUrl.endsWith(".xml") || baseUrl.endsWith(".xml.gz")) {
    candidates.push(baseUrl);
  }

  candidates.push(
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap.php`,
    `${origin}/sitemap.xml.gz`,
  );

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

export interface ParsedPage {
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

export async function parsePage(url: string): Promise<{ parsed: ParsedPage; ok: boolean }> {
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

      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      title = titleMatch ? titleMatch[1].trim() : "";

      const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
      description = descMatch ? descMatch[1].trim() : "";

      h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
      h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

      hasSchema = html.includes("application/ld+json") || html.includes("itemtype=\"http://schema.org");

      const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) ||
                         html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i);
      if (canonMatch) {
        hasCanonical = true;
        canonical = canonMatch[1];
      }

      const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
      if (robotsMatch && robotsMatch[1].toLowerCase().includes("noindex")) {
        isNoindex = true;
      }

      hasOgTitle = /<meta[^>]+property=["']og:title["'][^>]+content=["']/i.test(html);
      hasOgDesc = /<meta[^>]+property=["']og:description["'][^>]+content=["']/i.test(html);
      hasOgImage = /<meta[^>]+property=["']og:image["'][^>]+content=["']/i.test(html);

      hasTwitterCard = /<meta[^>]+name=["']twitter:card["'][^>]+content=["']/i.test(html);

      hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);

      hasHtmlLang = /<html[^>]+lang=["']/i.test(html);

      const imgTags = html.match(/<img[^>]*>/gi) || [];
      missingAltCount = 0;
      for (const img of imgTags) {
        // alt="" is valid for decorative images, so only count missing alt attribute entirely
        if (!/alt\s*=/i.test(img)) {
          missingAltCount++;
        }
      }

      const textContent = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ");
      wordCount = textContent.split(" ").filter(w => w.length > 0).length;

      if (https) {
        const mixedPattern = /<(?:script|img|link|iframe|video|audio|source|object|embed)\s[^>]+(?:src|href|data)\s*=\s*["']http:\/\//gi;
        mixedContentCount = (html.match(mixedPattern) || []).length;
      }
      formCount = (html.match(/<form[^>]*>/gi) || []).length;
      if (formCount > 0 && https) {
        insecureFormCount = (html.match(/<form[^>]+action=["']http:\/\//gi) || []).length;
      }

      return {
        parsed: {
          status, title, description, h1Count, h2Count, hasSchema,
          hasCanonical, canonical, isNoindex,
          hasOgTitle, hasOgDesc, hasOgImage,
          hasTwitterCard, hasViewport, hasHtmlLang,
          missingAltCount, wordCount, pageSize, https,
          hasHsts, hstsMaxAge, hasCsp, hasXFrameOptions, xFrameOptionsValue,
          hasXContentTypeOptions, hasReferrerPolicy, hasPermissionsPolicy,
          mixedContentCount, formCount, insecureFormCount,
        },
        ok: true,
      };
    } else {
      return {
        parsed: {
          status, title, description, h1Count, h2Count, hasSchema,
          hasCanonical, canonical, isNoindex,
          hasOgTitle, hasOgDesc, hasOgImage,
          hasTwitterCard, hasViewport, hasHtmlLang,
          missingAltCount, wordCount, pageSize, https,
          hasHsts, hstsMaxAge, hasCsp, hasXFrameOptions, xFrameOptionsValue,
          hasXContentTypeOptions, hasReferrerPolicy, hasPermissionsPolicy,
          mixedContentCount, formCount, insecureFormCount,
        },
        ok: false,
      };
    }
  } catch (err) {
    console.error(`Audit of page ${url} failed:`, err);
    status = 500;
    return {
      parsed: {
        status, title, description, h1Count, h2Count, hasSchema,
        hasCanonical, canonical, isNoindex,
        hasOgTitle, hasOgDesc, hasOgImage,
        hasTwitterCard, hasViewport, hasHtmlLang,
        missingAltCount, wordCount, pageSize, https,
        hasHsts, hstsMaxAge, hasCsp, hasXFrameOptions, xFrameOptionsValue,
        hasXContentTypeOptions, hasReferrerPolicy, hasPermissionsPolicy,
        mixedContentCount, formCount, insecureFormCount,
      },
      ok: false,
    };
  }
}
