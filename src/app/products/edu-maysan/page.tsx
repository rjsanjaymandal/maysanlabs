import type { Metadata } from "next";
import EduMaysanClient from "./EduMaysanClient";
import { generateProductSEO } from "@/lib/seo/helpers";

const productData = {
  name: "Edu-Maysan",
  description: "Next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
  price: 8000,
  currency: "USD",
  url: "https://maysanlabs.com/products/edu-maysan"
};

export const metadata: Metadata = generateProductSEO(productData, "https://maysanlabs.com");

export default function EduMaysanPage() {
  return <EduMaysanClient />;
}
