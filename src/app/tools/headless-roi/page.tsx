import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import type { Metadata } from "next";
import HeadlessRoiClient from "./HeadlessRoiClient";

export const metadata: Metadata = generatePageSEO({
  title: "Profit Calculator — Free Store Revenue Tool",
  description: "See how much more your store could earn with a faster website. Calculate potential savings from speed improvements and lower platform fees.",
  path: "/tools/headless-roi",
  keywords: ["online store calculator", "Shopify ROI calculator", "e-commerce profit calculator", "headless Shopify savings", "e-commerce speed calculator"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Profit Calculator", url: "/tools/headless-roi" }
]);

export default function HeadlessRoiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeadlessRoiClient />
    </>
  );
}
