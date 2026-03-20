import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Architecture | Maysan Labs",
  description: "Visualizing the industrial engineering behind our modular SaaS ecosystems. Built for scale, security, and low-latency global operations.",
  openGraph: {
    title: "System Architecture | Maysan Labs",
    description: "Explore the technical foundations of Maysan Labs' modular SaaS architecture.",
  }
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
