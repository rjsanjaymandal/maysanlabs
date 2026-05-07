import type { Metadata } from "next";
import FlashFashionClient from "./FlashFashionClient";
import { generateProductSEO } from "@/lib/seo/helpers";

const productData = {
  name: "Maysan Shop",
  description: "Full-stack ecommerce solution with inventory, orders, payments, and customer management. Built for scale.",
  price: 5000,
  currency: "USD",
  url: "https://maysanlabs.com/products/flash-fashion"
};

export const metadata: Metadata = generateProductSEO(productData, "https://maysanlabs.com");

export default function FlashFashionPage() {
  return <FlashFashionClient />;
}