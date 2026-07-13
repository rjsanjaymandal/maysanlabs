import type { Metadata } from "next";
import MaysanMailsClient from "./MaysanMailsClient";
import { generateBreadcrumbSchema, generateProductSEO } from "@/seo/helpers";

const productData = {
  name: "MaysanMails",
  description: "Self-hosted bulk email infrastructure with high-deliverability SMTP routing, campaign automation, and zero recurring subscriber fees.",
  price: 249999,
  currency: "INR",
  url: "https://maysanlabs.com/products/maysanmails"
};

export const metadata: Metadata = generateProductSEO(productData);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products" },
  { name: "MaysanMails", url: "/products/maysanmails" }
]);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MaysanMails",
  description: productData.description,
  brand: { "@type": "Brand", name: "Maysan Labs" },
  offers: { "@type": "Offer", price: productData.price, priceCurrency: productData.currency, availability: "https://schema.org/InStock" }
};

export default function MaysanMailsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <MaysanMailsClient />
    </>
  );
}
