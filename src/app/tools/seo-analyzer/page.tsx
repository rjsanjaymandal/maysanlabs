import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import SeoAnalyzerClient from "./SeoAnalyzerClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Search & Google SEO Checker | Maysan Labs",
  description: "Scan your website setup, broken links, ranking barriers, and descriptions instantly.",
  path: "/tools/seo-analyzer",
  keywords: ["SEO checker", "Google ranking scanner", "broken link checker", "meta tags scanner", "schema markup checker", "free SEO tool"]
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
