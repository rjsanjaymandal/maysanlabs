import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

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
  alternates: { canonical: "https://maysanlabs.com/products" },
};

export default function ProductsLandingPage() {
  return <ProductsClient />;
}
