import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import HeadlessRoiClient from "./HeadlessRoiClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Online Store Profit Calculator | Maysan Labs",
  description: "See how much more money your store can make by boosting loading speeds, increasing customer sales, and lowering platform fees.",
  path: "/tools/headless-roi",
  keywords: ["online store calculator", "Shopify ROI calculator", "e-commerce profit calculator", "headless Shopify savings", "e-commerce speed calculator"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Online Store Profit Calculator", url: "/tools/headless-roi" }
]);

export default function HeadlessRoiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <HeadlessRoiClient />
    </>
  );
}
