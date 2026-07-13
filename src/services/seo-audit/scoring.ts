import type { CheckedPage } from "./types";

export interface SeoScores {
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
}

export function calculateSeoScores(
  urlsList: CheckedPage[],
  sampleUrls: string[],
  sitemapFetched: boolean
): SeoScores {
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

  for (const page of urlsList) {
    if (!page.title || !page.description) missingMeta++;
    if (!page.hasSchema) missingSchemas++;
    if (page.isNoindex) noindexPages++;
    if (!page.hasCanonical) missingCanonical++;
    if (page.canonical && !page.canonical.includes(new URL(page.url).hostname)) {
      canonicalMismatch++;
    }
    if (!page.hasOgTitle || !page.hasOgDesc || !page.hasOgImage) missingOgTags++;
    if (!page.hasTwitterCard) missingTwitterCard++;
    if (!page.hasViewport) missingViewport++;
    if (!page.hasHtmlLang) missingHtmlLang++;
    totalAltMissing += page.missingAltCount;
    totalWordCount += page.wordCount;
    totalPageSize += page.pageSize;
    if (page.status >= 400) brokenLinks++;
  }

  const checksPerPage = 12;
  const maxPossibleScore = sampleUrls.length * checksPerPage;

  let passed = 0;
  if (sitemapFetched) passed += checksPerPage;
  if (brokenLinks === 0) passed += checksPerPage;
  if (missingMeta === 0) passed += checksPerPage;
  if (missingSchemas === 0) passed += checksPerPage;
  if (missingCanonical === 0) passed += checksPerPage;
  if (noindexPages === 0) passed += checksPerPage;
  if (missingOgTags === 0) passed += checksPerPage;
  if (missingTwitterCard === 0) passed += checksPerPage;
  if (missingViewport === 0) passed += checksPerPage;
  if (missingHtmlLang === 0) passed += checksPerPage;

  const h1Penalty = urlsList.filter(p => p.h1Count !== 1).length;
  const h1Score = h1Penalty === 0 ? checksPerPage : Math.max(0, Math.floor(checksPerPage * (1 - h1Penalty / sampleUrls.length)));
  passed += h1Score;

  const altPenalty = totalAltMissing;
  const altMax = Math.max(totalAltMissing, sampleUrls.length * 2);
  const altScore = altPenalty === 0 ? checksPerPage : Math.max(0, Math.floor(checksPerPage * (1 - altPenalty / altMax)));
  passed += altScore;

  const seoScore = maxPossibleScore > 0 ? Math.min(100, Math.round((passed / maxPossibleScore) * 100)) : 0;
  const indexability = seoScore >= 85 ? "healthy" : seoScore >= 65 ? "action-required" : "poor";

  return {
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
  };
}

export function generateSeoSuggestions(
  scores: SeoScores,
  urlsList: CheckedPage[],
  sampleUrls: string[],
  sitemapFetched: boolean,
  totalUrls: number
): string[] {
  const suggestions: string[] = [];

  if (!sitemapFetched) {
    suggestions.push("Could not locate a standard sitemap.xml file. Publish a dynamic XML sitemap at /sitemap.xml to help AI and search crawlers index your structure.");
  } else {
    suggestions.push(`Discovered ${totalUrls} URL nodes inside sitemap.xml. Crawl pathways are successfully exposed.`);
  }

  if (scores.brokenLinks > 0) {
    suggestions.push(`Detected ${scores.brokenLinks} broken crawl attempts or timeout errors. Fix 404 links to prevent wasting crawler budget.`);
  } else {
    suggestions.push("All monitored page endpoints returned successful 200 HTTP codes. Link health is excellent.");
  }

  if (scores.missingMeta > 0) {
    suggestions.push(`Missing unique meta descriptions on ${scores.missingMeta} sampled pages. Add highly relevant snippets to improve click-through outcomes.`);
  } else {
    suggestions.push("All audited page metadata tags (title and description) are fully populated.");
  }

  if (scores.missingSchemas > 0) {
    suggestions.push(`JSON-LD structured data is missing in ${scores.missingSchemas} pages. Inject Organization, Product, or FAQ schemas to enable search snippet integration.`);
  } else {
    suggestions.push("Audited pages contain microdata schemas for enhanced structured rich listings.");
  }

  if (urlsList.some(p => p.h1Count !== 1)) {
    suggestions.push("Ensure every audited URL features exactly one <h1> heading to preserve clean semantic indexing structures.");
  }

  if (scores.missingCanonical > 0) {
    suggestions.push(`${scores.missingCanonical} page(s) are missing a canonical URL tag. Add rel="canonical" to prevent duplicate content issues, especially for similar parameterized URLs.`);
  }

  if (scores.canonicalMismatch > 0) {
    suggestions.push(`${scores.canonicalMismatch} canonical tag(s) point to a different domain. This can confuse crawlers about which site version should be indexed.`);
  }

  if (scores.noindexPages > 0) {
    suggestions.push(`${scores.noindexPages} sampled page(s) contain a "noindex" directives. Review whether these pages should remain hidden from search engines.`);
  }

  if (scores.missingOgTags > 0) {
    suggestions.push(`Open Graph tags are incomplete on ${scores.missingOgTags} page(s). Add og:title, og:description, and og:image to control how links appear on social platforms.`);
  }

  if (scores.missingTwitterCard > 0) {
    suggestions.push(`Twitter Card meta tags are missing on ${scores.missingTwitterCard} page(s). Add name="twitter:card" summary_large_image to enrich tweet previews.`);
  }

  if (!urlsList.some(p => p.hasViewport)) {
    suggestions.push("Viewport meta tag is missing. Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> for proper mobile rendering.");
  }

  if (!urlsList.some(p => p.hasHtmlLang)) {
    suggestions.push("HTML lang attribute is missing from <html> element. Set a language attribute to help search engines and screen readers interpret your content.");
  }

  if (scores.totalAltMissing > 0) {
    suggestions.push(`${scores.totalAltMissing} images are missing alt text across sampled pages. Add descriptive alt attributes for accessibility and image search ranking.`);
  }

  if (sampleUrls.length > 0) {
    const avgSize = Math.round(scores.totalPageSize / sampleUrls.length);
    if (avgSize > 500) {
      suggestions.push(`Average page weight is ${avgSize}KB across sampled pages. Reduce bundle sizes, lazy-load below-fold content, and enable compression.`);
    }
  }

  return suggestions;
}
