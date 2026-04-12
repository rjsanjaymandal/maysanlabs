import type { Metadata } from "next";
import ArchitectureClient from "./ArchitectureClient";

export const metadata: Metadata = {
  title: "Cloud Architecture | Enterprise Infrastructure",
  description: "Maysan Labs designs highly available, distributed cloud architecture for enterprise SaaS products.",
};

export default function ArchitecturePage() {
  return <ArchitectureClient />;
}
