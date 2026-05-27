import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import PrivacyGeneratorClient from "./PrivacyGeneratorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Legal Policy & Terms Generator | Maysan Labs",
  description: "Instantly draft standard, standard-grade privacy policies and terms of service documents tailored for websites and products.",
  path: "/tools/privacy-generator",
  keywords: ["privacy policy generator", "terms of service generator", "legal documents compiler", "free compliance tool", "SaaS privacy compiler"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Legal Policy & Terms Generator", url: "/tools/privacy-generator" }
]);

export default function PrivacyGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PrivacyGeneratorClient />
    </>
  );
}
