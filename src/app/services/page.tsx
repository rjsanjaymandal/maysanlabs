import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "SaaS Development Services | Custom Software Development | Maysan Labs",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Maysan Labs Software Development Services",
  description: "Enterprise SaaS development, custom software, cloud infrastructure, web and mobile applications.",
  provider: { "@type": "Organization", name: "Maysan Labs" },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      { "@type": "Offer", name: "SaaS Development" },
      { "@type": "Offer", name: "Custom Software Development" },
      { "@type": "Offer", name: "Cloud Infrastructure" },
      { "@type": "Offer", name: "Web Application Development" },
      { "@type": "Offer", name: "Mobile App Development" },
      { "@type": "Offer", name: "API Development" }
    ]
  }
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServicesClient />
    </>
  );
}
