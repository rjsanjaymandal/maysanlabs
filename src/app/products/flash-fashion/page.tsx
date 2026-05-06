import type { Metadata } from "next";
import FlashFashionClient from "./FlashFashionClient";

export const metadata: Metadata = {
  title: "FlashFashion - Ecommerce Platform Built From Scratch",
  description: "FlashFashion is a full-stack ecommerce platform built from scratch. Complete inventory management, order processing, payment integration, and customer CRM.",
};

export default function FlashFashionPage() {
  return <FlashFashionClient />;
}