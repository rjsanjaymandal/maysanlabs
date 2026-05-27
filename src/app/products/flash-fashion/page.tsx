import type { Metadata } from "next";
import FlashFashionClient from "./FlashFashionClient";
import { generateBreadcrumbSchema, generateProductSEO } from "@/lib/seo/helpers";

const productData = {
  name: "Maysan Shop",
  description: "Full-stack ecommerce solution with inventory, orders, payments, and customer management. Built for scale.",
  price: 400000,
  currency: "INR",
  url: "https://maysanlabs.com/products/flash-fashion"
};

export const metadata: Metadata = generateProductSEO(productData, "https://maysanlabs.com");

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
  { name: "Maysan Shop", url: "/products/flash-fashion" }
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Maysan Shop",
  description: productData.description,
  brand: { "@type": "Brand", name: "Maysan Labs" },
  offers: { "@type": "Offer", price: productData.price, priceCurrency: productData.currency, availability: "https://schema.org/InStock" }
};

export default function FlashFashionPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <FlashFashionClient />
    </>
  );
}