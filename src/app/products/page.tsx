import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products | Enterprise Engineering Solutions",
  description: "Explore our range of mission-critical software products, from educational intelligence to enterprise ERP systems.",
};

export default function ProductsLandingPage() {
  return <ProductsClient />;
}
