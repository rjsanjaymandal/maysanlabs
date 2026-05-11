import CaseStudiesClient from "./CaseStudiesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Enterprise Software Success Stories",
  description: "Explore our case studies showcasing successful enterprise software implementations, SaaS services, and custom development projects by Maysan Labs.",
  keywords: ["case studies", "success stories", "enterprise software examples", "SaaS case studies", "custom software portfolio"],
  openGraph: {
    title: "Case Studies | Enterprise Software Success Stories",
    description: "Explore our case studies showcasing successful enterprise software implementations by Maysan Labs.",
    url: "https://maysanlabs.com/case-studies",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Maysan Labs Case Studies" }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/case-studies",
    languages: {
      en: "https://maysanlabs.com/case-studies",
      ar: "https://maysanlabs.com/ar/case-studies",
    },
  },
};

const caseStudiesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Case Studies",
  description: "Enterprise software success stories and project showcases by Maysan Labs",
  url: "https://maysanlabs.com/case-studies",
  publisher: {
    "@type": "Organization",
    name: "Maysan Labs",
    url: "https://maysanlabs.com"
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "CreativeWork",
        name: "Flash Fashion E-commerce",
        description: "Enterprise-grade e-commerce platform handling 100K+ SKUs with real-time inventory",
        url: "https://maysanlabs.com/case-studies/flash-fashion-ecommerce"
      },
      {
        "@type": "CreativeWork",
        name: "Retail Modular ERP",
        description: "Custom ERP system for retail chain with 200+ locations",
        url: "https://maysanlabs.com/case-studies/retail-modular-erp"
      },
      {
        "@type": "CreativeWork",
        name: "Fintech Connectivity Bridge",
        description: "Real-time payment integration platform connecting 50+ banking APIs",
        url: "https://maysanlabs.com/case-studies/fintech-connectivity-bridge"
      },
      {
        "@type": "CreativeWork",
        name: "Custom Manufacturing Intelligence",
        description: "IoT-powered manufacturing analytics platform",
        url: "https://maysanlabs.com/case-studies/custom-manufacturing-intelligence"
      }
    ]
  }
};

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }}
      />
      <CaseStudiesClient />
    </>
  );
}
