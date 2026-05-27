import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import OgGeneratorClient from "./OgGeneratorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Social Share Image Editor & Previewer | Maysan Labs",
  description: "Design and preview exactly how your website looks when shared on social media, and compile customized share graphics.",
  path: "/tools/og-generator",
  keywords: ["social share image editor", "OG image checker", "social link previewer", "Twitter card preview", "LinkedIn post preview", "free marketer tools"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Social Share Image Editor", url: "/tools/og-generator" }
]);

export default function OgGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OgGeneratorClient />
    </>
  );
}
