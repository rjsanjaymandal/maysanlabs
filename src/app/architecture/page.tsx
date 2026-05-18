import type { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";
import { generatePageSEO } from "@/lib/seo/helpers";

export const metadata: Metadata = generatePageSEO({
  title: "Cloud Architecture | Enterprise Infrastructure | Maysan Labs",
  description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products. AWS, Azure, GCP, Kubernetes, microservices, and scalable infrastructure.",
  path: "/architecture",
  keywords: [
    "cloud architecture",
    "enterprise infrastructure",
    "AWS architecture",
    "Azure architecture",
    "GCP architecture",
    "kubernetes",
    "microservices",
    "distributed systems",
    "enterprise SaaS architecture"
  ]
});

export default function ArchitecturePage() {
  return <ArchitectureClient />;
}
