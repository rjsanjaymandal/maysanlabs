import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { generateBreadcrumbSchema } from "@/lib/seo/helpers";

export const metadata: Metadata = {
  title: "Products | Enterprise SaaS Solutions | Maysan Labs",
  description: "Explore our ready-to-deploy software products: EduMaysan (EdTech LMS), FlashFashion (E-commerce), and more enterprise solutions.",
  keywords: ["software products", "SaaS products", "EdTech platform", "e-commerce platform", "LMS software", "enterprise ERP", "enterprise solutions"],
  openGraph: {
    title: "Products | Maysan Labs",
    description: "Enterprise-ready software products built for scale.",
    url: "https://maysanlabs.com/products",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: { 
    canonical: "https://maysanlabs.com/products",
    languages: {
      en: "https://maysanlabs.com/products",
      ar: "https://maysanlabs.com/ar/products",
    },
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" }
]);

export default function ProductsLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ProductsClient />
    </>
  );
}
