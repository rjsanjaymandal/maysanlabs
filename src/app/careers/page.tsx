import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Join Maysan Labs",
  description: "Join our team of elite engineers and designers to build next-generation enterprise SaaS services.",
};

export default function CareersPage() {
  return <CareersClient />;
}
