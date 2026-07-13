import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import type { Metadata } from "next";
import PresentationEngineClient from "./PresentationEngineClient";

export const metadata: Metadata = generatePageSEO({
  title: "Presentation Engine — Raw Data to PowerPoint Generator",
  description: "Convert unstructured data, business reports, and legacy code into branded 16:9 widescreen PowerPoint presentations instantly using AI.",
  path: "/tools/presentation-engine",
  keywords: ["PowerPoint generator", "presentation maker", "data to PPT", "AI presentation builder", "report to slide", "business deck generator", "Maysan Labs presentation engine"]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Presentation Engine", url: "/tools/presentation-engine" }
]);

export default function PresentationEnginePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PresentationEngineClient />
    </>
  );
}
