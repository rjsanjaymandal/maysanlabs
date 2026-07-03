import CaseStudiesClient from "./CaseStudiesClient";
import { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Case Studies | Enterprise Software Success Stories",
  description: "Explore our case studies showcasing successful enterprise software implementations, SaaS services, and custom development projects by Maysan Labs.",
  path: "/case-studies",
  keywords: [
    "case studies",
    "success stories",
    "enterprise software examples",
    "SaaS case studies",
    "custom software portfolio"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Case Studies", url: "/case-studies" }
]);

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudiesSchema) }} />

      <CaseStudiesClient />
    </>
  );
}


