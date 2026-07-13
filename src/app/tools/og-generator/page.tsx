import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import type { Metadata } from "next";
import OgGeneratorClient from "./OgGeneratorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Link Preview Maker — Free Social Share Image Tool",
  description: "Design how your website looks when shared on WhatsApp, Facebook, or LinkedIn. Preview and download social share images for free.",
  path: "/tools/og-generator",
  keywords: ["social share image editor", "OG image checker", "social link previewer", "Twitter card preview", "LinkedIn post preview", "free marketer tools"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Link Preview Maker", url: "/tools/og-generator" }
]);

export default function OgGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OgGeneratorClient />
    </>
  );
}


