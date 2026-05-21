import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cloud Architecture | Enterprise Infrastructure | Maysan Labs",
  description: "Explore Maysan Labs cloud architecture - built for scale, security, and low-latency global operations. AWS, Azure, GCP, Kubernetes, microservices. Maysan Labs designs enterprise SaaS infrastructure.",
  keywords: ["Maysan Labs architecture", "cloud architecture", "enterprise infrastructure", "AWS architecture", "Kubernetes", "microservices", "distributed systems", "SaaS architecture", "Maysan Labs cloud"],
  openGraph: {
    title: "Cloud Architecture | Maysan Labs",
    description: "Maysan Labs cloud architecture built for scale, security, and low-latency global operations.",
  }
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
