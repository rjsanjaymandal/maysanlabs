import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
import PricingClient from "./PricingClient";

export const metadata: Metadata = generatePageSEO({
  title: "Pricing - SaaS Development Packages & Plans",
  description: "Explore Maysan Labs pricing plans: Starter (₹2,50,000/mo), Growth (₹5,00,000/mo), and Enterprise (₹12,00,000/mo). Transparent pricing for SaaS, web, and custom software development.",
  path: "/pricing",
  keywords: [
    "Maysan Labs pricing",
    "SaaS development cost",
    "software development pricing",
    "web development packages",
    "custom software pricing",
    "startup development cost",
    "enterprise software pricing"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Pricing", url: "/pricing" }
]);

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Maysan Labs Development Services Pricing",
  description: "Flexible pricing tiers for SaaS, web, and custom software development.",
  provider: { "@type": "Organization", name: "Maysan Labs" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Development Plans",
    itemListElement: [
      { "@type": "Offer", name: "Starter Plan", price: "250000", priceCurrency: "INR" },
      { "@type": "Offer", name: "Growth Plan", price: "500000", priceCurrency: "INR" },
      { "@type": "Offer", name: "Enterprise Plan", price: "1200000", priceCurrency: "INR" }
    ]
  }
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />

      <PricingClient />
    </>
  );
}