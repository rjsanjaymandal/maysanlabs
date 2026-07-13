import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import { serviceSchema } from "@/data/seo-schema";

export const metadata: Metadata = generatePageSEO({
  title: "SaaS Development Services | Custom Software Development",
  description: "Maysan Labs offers comprehensive SaaS development services including web development, mobile apps, e-commerce, cloud infrastructure, custom software, and AI automation. Build scalable enterprise solutions.",
  path: "/services",
  keywords: [
    "SaaS development services",
    "web development company",
    "mobile app development",
    "e-commerce development",
    "React development",
    "Node.js development",
    "API development"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" }
]);

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <ServicesClient />
    </>
  );
}
