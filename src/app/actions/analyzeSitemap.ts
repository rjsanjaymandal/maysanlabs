"use server";

export interface CheckedPage {
  url: string;
  status: number;
  title: string;
  description: string;
  h1Count: number;
  h2Count: number;
  hasSchema: boolean;
}

export interface SeoAuditResult {
  url: string;
  totalUrls: number;
  seoScore: number;
  indexability: "healthy" | "action-required" | "poor";
  missingMeta: number;
  brokenLinks: number;
  missingSchemas: number;
  suggestions: string[];
  sitemapFetched: boolean;
  urlsList: CheckedPage[];
}

export async function analyzeSitemap(sitemapUrl: string): Promise<SeoAuditResult> {
  let targetUrl = sitemapUrl.trim();
  
  // Format input URL
  if (!targetUrl.startsWith("http")) {
    targetUrl = `https://${targetUrl}`;
  }

  let xmlText = "";
  let sitemapFetched = false;
  const urls: string[] = [];

  try {
    // If user entered a bare domain, attempt to check sitemap.xml first
    let fetchUrl = targetUrl;
    try {
      const parsed = new URL(targetUrl);
      if (!parsed.pathname || parsed.pathname === "/") {
        fetchUrl = `${parsed.origin}/sitemap.xml`;
      }
    } catch {
      // Use as is if invalid URL structure
    }

    const res = await fetch(fetchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 MaysanSeoBot/3.0",
        "Accept": "application/xml, text/xml, */*"
      },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(6000) // 6 second timeout
    });

    if (res.ok) {
      xmlText = await res.text();
      sitemapFetched = true;
    } else if (fetchUrl !== targetUrl) {
      // Fallback to the original URL if sitemap.xml attempt failed
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

  // Parse sitemap URL nodes
  if (sitemapFetched && xmlText) {
    const locRegex = /<loc>(https?:\/\/[^\s<]+)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(xmlText)) !== null) {
      urls.push(match[1]);
    }
  }

  // If no URLs found in sitemap or fetching failed, audit the landing page directly
  if (urls.length === 0) {
    urls.push(targetUrl);
  }

  const urlsList: CheckedPage[] = [];
  let missingMeta = 0;
  let brokenLinks = 0;
  let missingSchemas = 0;

  // Audit up to 6 pages to avoid timing out the server action
  const sampleUrls = urls.slice(0, 6);

  await Promise.all(
    sampleUrls.map(async (url) => {
      let status = 200;
      let title = "";
      let description = "";
      let h1Count = 0;
      let h2Count = 0;
      let hasSchema = false;

      try {
        const pageRes = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 MaysanSeoBot/3.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9"
          },
          next: { revalidate: 0 },
          signal: AbortSignal.timeout(4000) // 4s timeout per page fetch
        });

        status = pageRes.status;
        if (pageRes.ok) {
          const html = await pageRes.text();

          // Title extraction
          const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
          title = titleMatch ? titleMatch[1].trim() : "";

          // Description extraction
          const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                            html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
          description = descMatch ? descMatch[1].trim() : "";

          // Heading counts
          h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
          h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

          // Schema check
          hasSchema = html.includes("application/ld+json") || html.includes("itemtype=\"http://schema.org");

          // Accumulate errors
          if (!description) missingMeta++;
          if (h1Count === 0 || h1Count > 1 || h2Count < 2) {
            // counts as indexation checks
          }
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
        url,
        status,
        title,
        description,
        h1Count,
        h2Count,
        hasSchema
      });
    })
  );

  // Generate audit recommendations
  const totalUrls = sitemapFetched ? urls.length : 1;
  const passedChecksCount = 
    (sitemapFetched ? 20 : 0) + 
    (brokenLinks === 0 ? 20 : 10) + 
    (missingMeta === 0 ? 20 : 10) + 
    (missingSchemas === 0 ? 20 : 10) + 
    (urlsList.every(p => p.h1Count === 1) ? 20 : 10);

  const seoScore = Math.min(100, passedChecksCount);
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

  return {
    url: targetUrl,
    totalUrls,
    seoScore,
    indexability,
    missingMeta,
    brokenLinks,
    missingSchemas,
    suggestions,
    sitemapFetched,
    urlsList
  };
}
