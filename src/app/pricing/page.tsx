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
      
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Transparent Software Development Pricing & Plans | Maysan Labs</span>
        <h2>Starter Plan (₹2.5L/mo), Growth Plan (₹5L/mo), & Enterprise Plan (₹12L/mo)</h2>
        <h2>Flexible Scoping Packages for SaaS Startups and Custom Platforms</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Team</span>
        <span className="contributor">Contributor: Commercial Operations Lead</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          SaaS Pricing plans refer to the scalable fixed-price and custom time-and-materials packages offered by Maysan Labs. 
          Enterprise Software Scoping is defined as custom integration scoping involving dedicated SLA guarantees and 24/7 dedicated support.
          According to standard parameters, our Starter tier begins at ₹2,50,000 per month, offering up to 5 custom integrations.
        </p>
      </div>

      <PricingClient />
    </>
  );
}