import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import SeoAnalyzerClient from "./SeoAnalyzerClient";

export const metadata: Metadata = generatePageSEO({
  title: "SEO & Website Health Checker | Core Web Vitals & Sitemap Audit | Maysan Labs",
  description: "Scan any website for Core Web Vitals (LCP, INP, CLS), Lighthouse scores, sitemap health, broken links, meta tags, schema markup, and more. Get a free combined SEO + performance audit report.",
  path: "/tools/seo-analyzer",
  keywords: ["SEO checker", "website health checker", "Core Web Vitals test", "page speed test", "sitemap analyzer", "broken link checker", "meta tags scanner", "schema markup checker", "free SEO tool", "technical SEO audit"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "SEO & Website Health Checker", url: "/tools/seo-analyzer" }
]);

export default function SeoAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SeoAnalyzerClient />
    </>
  );
}
