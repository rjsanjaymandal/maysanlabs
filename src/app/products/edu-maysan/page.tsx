import type { Metadata } from "next";
import EduMaysanClient from "./EduMaysanClient";
import { generateBreadcrumbSchema, generateProductSEO } from "@/seo/helpers";
import { products } from "@/data/products";

const product = products.find(p => p.id === "edu-maysan")!;

export const metadata: Metadata = generateProductSEO({
  name: product.name,
  description: product.description,
  price: 640000,
  currency: "INR",
  url: "https://maysanlabs.com/products/edu-maysan"
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
  { name: "Edu-Maysan", url: "/products/edu-maysan" }
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  brand: { "@type": "Brand", name: "Maysan Labs" },
  ...(product.ratingValue && product.reviewCount ? {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount
    }
  } : {}),
  offers: { "@type": "Offer", price: 640000, priceCurrency: "INR", availability: "https://schema.org/InStock" }
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
