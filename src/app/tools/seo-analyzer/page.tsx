import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import SeoAnalyzerClient from "./SeoAnalyzerClient";

export const metadata: Metadata = generatePageSEO({
  title: "Sitemap & Technical SEO Analyzer | Free Broken Link Checker | Maysan Labs",
  description: "Scan your sitemap for broken links, missing meta tags, bad schema markups, and indexation gaps. Get a free technical SEO audit report with actionable fixes.",
  path: "/tools/seo-analyzer",
  keywords: ["SEO checker", "sitemap analyzer", "broken link checker", "meta tags scanner", "schema markup checker", "free SEO tool", "technical SEO audit"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Search & Google SEO Checker", url: "/tools/seo-analyzer" }
]);

export default function SeoAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SeoAnalyzerClient />
    </>
  );
}
