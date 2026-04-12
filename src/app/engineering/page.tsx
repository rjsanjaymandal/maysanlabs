import type { Metadata } from "next";
import EngineeringClient from "./EngineeringClient";

export const metadata: Metadata = {
  title: "Engineering Excellence | Development Process",
  description: "Learn about the Maysan Labs engineering process. Our rigorous methodologies ensure reliable, scalable, and high-performance software delivery.",
};

export default function EngineeringPage() {
  return <EngineeringClient />;
}
