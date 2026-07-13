"use server";

import { assertSafeFetchUrl, SsrfError } from "@/core/security/ssrf";
import { safeFetchWithRetry, tryFetchSitemap, parsePage } from "./parser";
import { calculateSecurityAudit, checkSslCertificate } from "./security";
import { analyzeIndiaTelemetry } from "./telemetry";
import { calculateSeoScores, generateSeoSuggestions } from "./scoring";
import type { SeoAuditResult, CheckedPage } from "./types";

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

  // Fetch homepage HTML separately for telemetry analysis
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

  // Parse all sample pages in parallel
  const pageResults = await Promise.all(
    sampleUrls.map(async (url) => {
      const { parsed, ok } = await parsePage(url);
      return { parsed, ok, url };
    })
  );

  for (const { parsed, url } of pageResults) {
    urlsList.push({ url, ...parsed });
  }

  // Calculate SEO scores
  const totalUrls = sitemapFetched ? urls.length : 1;
  const scores = calculateSeoScores(urlsList, sampleUrls, sitemapFetched);
  const seoSuggestions = generateSeoSuggestions(scores, urlsList, sampleUrls, sitemapFetched, totalUrls);

  // Security audit
  const secHostname = (() => {
    try { return new URL(targetUrl).hostname; } catch { return ""; }
  })();
  const sslCert = secHostname ? await checkSslCertificate(secHostname).catch(() => null) : null;
  const security = calculateSecurityAudit(urlsList, sslCert);

  // India telemetry
  const { telemetry, suggestions: telemetrySuggestions } = await analyzeIndiaTelemetry(targetUrl, homePageHtml);

  return {
    url: targetUrl,
    totalUrls,
    seoScore: scores.seoScore,
    indexability: scores.indexability,
    missingMeta: scores.missingMeta,
    brokenLinks: scores.brokenLinks,
    missingSchemas: scores.missingSchemas,
    noindexPages: scores.noindexPages,
    missingCanonical: scores.missingCanonical,
    canonicalMismatch: scores.canonicalMismatch,
    missingOgTags: scores.missingOgTags,
    missingTwitterCard: scores.missingTwitterCard,
    missingViewport: scores.missingViewport,
    missingHtmlLang: scores.missingHtmlLang,
    totalAltMissing: scores.totalAltMissing,
    totalWordCount: scores.totalWordCount,
    totalPageSize: scores.totalPageSize,
    suggestions: [...seoSuggestions, ...telemetrySuggestions],
    sitemapFetched,
    urlsList,
    indiaTelemetry: telemetry,
    security,
  };
}
