import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Products | Enterprise SaaS Solutions",
  description: "Explore our ready-to-deploy software products: EduMaysan (EdTech LMS), FlashFashion (E-commerce), and more enterprise solutions.",
  path: "/products",
  keywords: [
    "software products",
    "SaaS products",
    "EdTech platform",
    "e-commerce platform",
    "LMS software",
    "enterprise ERP"
  ]
});

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
