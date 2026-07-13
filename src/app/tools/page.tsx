import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Business Tools — Site Checker, Calculators & Generators",
  description: "Free tools to grow your business — check your site health, calculate profits, estimate app costs, create legal pages, and more. No signup needed.",
  path: "/tools",
  keywords: ["developer tools", "free marketing tools", "SaaS estimators", "sitemap crawler", "headless ROI", "OG image previewer", "legal policy generator"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" }
]);

export default function ToolsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ToolsClient />
    </>
  );
}
