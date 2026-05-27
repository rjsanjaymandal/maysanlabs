import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import ScopeEstimatorClient from "./ScopeEstimatorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Free Software Cost & Scoping Estimator | Maysan Labs",
  description: "Select the features you want in your custom application to instantly calculate a detailed cost breakdown and delivery timeline.",
  path: "/tools/scope-estimator",
  keywords: ["software cost estimator", "app budget calculator", "SaaS scoping tool", "development timeline estimator", "Maysan Labs estimator"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Software Cost & Scoping Estimator", url: "/tools/scope-estimator" }
]);

export default function ScopeEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ScopeEstimatorClient />
    </>
  );
}
