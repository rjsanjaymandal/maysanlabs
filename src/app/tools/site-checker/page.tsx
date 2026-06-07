import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import SiteCheckerClient from "./SiteCheckerClient";

export const metadata: Metadata = generatePageSEO({
  title: "Site Checker — Free Website Speed & SEO Tool | Maysan Labs",
  description: "Check your website speed, SEO, and health in one click. Get a free audit of Core Web Vitals, Lighthouse scores, meta tags, and broken links.",
  path: "/tools/site-checker",
  keywords: ["site checker", "website health checker", "Core Web Vitals test", "page speed test", "sitemap analyzer", "broken link checker", "meta tags scanner", "schema markup checker", "free SEO tool", "technical SEO audit"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Site Checker", url: "/tools/site-checker" }
]);

export default async function SiteCheckerPage(props: { searchParams: Promise<{ url?: string }> }) {
  const { url } = await props.searchParams;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteCheckerClient initialUrl={url} />
    </>
  );
}
