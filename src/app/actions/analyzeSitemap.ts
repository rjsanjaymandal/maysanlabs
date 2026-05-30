"use server";

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
}

export async function analyzeSitemap(sitemapUrl: string): Promise<SeoAuditResult> {
  let targetUrl = sitemapUrl.trim();

  if (!targetUrl.startsWith("http")) {
    targetUrl = `https://${targetUrl}`;
  }

  let xmlText = "";
  let sitemapFetched = false;
  const urls: string[] = [];

  try {
    let fetchUrl = targetUrl;
    try {
      const parsed = new URL(targetUrl);
      if (!parsed.pathname || parsed.pathname === "/") {
        fetchUrl = `${parsed.origin}/sitemap.xml`;
      }
    } catch {
      // Use as is
    }

    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 MaysanSeoBot/3.0",
        "Accept": "application/xml, text/xml, */*"
      },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(6000)
    });

    if (res.ok) {
      xmlText = await res.text();
    } else if (fetchUrl !== targetUrl) {
      const secondRes = await fetch(targetUrl, {
        headers: { "User-Agent": "MaysanSeoBot/3.0" },
        next: { revalidate: 0 },
        signal: AbortSignal.timeout(5000)
      });
      if (secondRes.ok) {
        xmlText = await secondRes.text();
      }
    }
  } catch (e) {
    console.error("Sitemap fetch failed:", e);
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
      let https = true;

      try {
        const pageRes = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 MaysanSeoBot/3.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9"
          },
          next: { revalidate: 0 },
          signal: AbortSignal.timeout(5000)
        });

        status = pageRes.status;
        https = pageRes.url.startsWith("https");

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
        missingAltCount, wordCount, pageSize, https
      });
    })
  );

  const totalUrls = sitemapFetched ? urls.length : 1;
  const checksPerPage = 12;
  const totalChecks = sampleUrls.length * checksPerPage;
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

  const seoScore = Math.min(100, Math.round((passed / Math.max(totalChecks, 1)) * 100));
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

  if (totalAltMissing > 0) {
    const avgSize = Math.round(totalPageSize / sampleUrls.length);
    if (avgSize > 500) {
      suggestions.push(`Average page weight is ${avgSize}KB across sampled pages. Reduce bundle sizes, lazy-load below-fold content, and enable compression.`);
    }
  }

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
    urlsList
  };
}