import type { Metadata } from "next";
import EduMaysanClient from "./EduMaysanClient";
import { generateBreadcrumbSchema, generateProductSEO } from "@/seo/helpers";

const productData = {
  name: "Edu-Maysan",
  description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
  price: 640000,
  currency: "INR",
  url: "https://maysanlabs.com/products/edu-maysan"
};

export const metadata: Metadata = generateProductSEO(productData);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
  { name: "Edu-Maysan", url: "/products/edu-maysan" }
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Edu-Maysan",
  description: productData.description,
  brand: { "@type": "Brand", name: "Maysan Labs" },
  offers: { "@type": "Offer", price: productData.price, priceCurrency: productData.currency, availability: "https://schema.org/InStock" }
};

export default function EduMaysanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <EduMaysanClient />
    </>
  );
}
