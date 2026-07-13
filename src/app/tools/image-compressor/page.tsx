import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/seo/helpers";
import ImageCompressorClient from "./ImageCompressorClient";

export const metadata: Metadata = generatePageSEO({
  title: "Image Compressor — Free Browser-Based Image Shrinker",
  description: "Shrink images right in your browser — no uploads needed. Compress JPEG, PNG, and WebP files instantly with 100% privacy.",
  path: "/tools/image-compressor",
  keywords: [
    "image compressor",
    "free image optimizer",
    "browser image compressor",
    "compress png",
    "compress jpeg",
    "webp converter",
    "private image compression",
    "maysan labs tools",
    "png size reducer",
    "jpeg compressor offline",
    "private asset shrinker",
    "client-side image scaler"
  ]
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Tools", url: "/tools" },
  { name: "Image Compressor", url: "/tools/image-compressor" },
]);

export default function ImageCompressorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ImageCompressorClient />
    </>
  );
}
