import type { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights & Technical Blog | Maysan Labs",
  description: "Explore our latest technical insights, architectural deep dives, and scaling strategies for modern SaaS products.",
};

export default function InsightsPage() {
  return <InsightsClient />;
}
