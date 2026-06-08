import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import type { Metadata } from "next";
import ScopeEstimatorClient from "./ScopeEstimatorClient";

export const metadata: Metadata = generatePageSEO({
  title: "App Cost Calculator — Free Software Budget Tool",
  description: "Get an instant budget and timeline for your custom app idea. Select features you need and see the estimated cost breakdown in seconds.",
  path: "/tools/scope-estimator",
  keywords: ["software cost estimator", "app budget calculator", "SaaS scoping tool", "development timeline estimator", "Maysan Labs estimator"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "App Cost Calculator", url: "/tools/scope-estimator" }
]);

export default function ScopeEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ScopeEstimatorClient />
    </>
  );
}
