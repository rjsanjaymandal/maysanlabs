import type { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";
import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Cloud Architecture | Enterprise Infrastructure",
  description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products. AWS, Azure, GCP, Kubernetes, microservices, and scalable infrastructure.",
  path: "/architecture",
  keywords: [
    "cloud architecture",
    "enterprise infrastructure",
    "AWS architecture",
    "Azure architecture",
    "GCP architecture",
    "kubernetes",
    "microservices",
    "distributed systems",
    "enterprise SaaS architecture"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Architecture", url: "/architecture" }
]);

export default function ArchitecturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ArchitectureClient />
    </>
  );
}
