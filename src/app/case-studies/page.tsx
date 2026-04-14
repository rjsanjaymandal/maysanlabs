import CaseStudiesClient from "./CaseStudiesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Enterprise Software Success Stories",
  description: "Explore our case studies showcasing successful enterprise software implementations, SaaS services, and custom development projects by Maysan Labs.",
  keywords: ["case studies", "success stories", "enterprise software examples", "SaaS case studies", "custom software portfolio"],
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
