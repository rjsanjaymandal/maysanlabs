import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import type { Metadata } from "next";
import PrivacyGeneratorClient from "./PrivacyGeneratorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Policy Generator — Free Privacy Policy & Terms Tool",
  description: "Create privacy policy and terms of service pages for your website in seconds. Free, no signup required.",
  path: "/tools/privacy-generator",
  keywords: ["privacy policy generator", "terms of service generator", "legal documents compiler", "free compliance tool", "SaaS privacy compiler"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Policy Generator", url: "/tools/privacy-generator" }
]);

export default function PrivacyGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PrivacyGeneratorClient />
    </>
  );
}
