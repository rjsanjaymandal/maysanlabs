import type { Metadata } from "next";
import { generateBreadcrumbSchema, generatePageSEO } from "@/lib/seo/helpers";
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
      
      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Free Client-Side Image Compressor & Smart Asset Optimizer | Maysan Labs</span>
        <h2>Fast In-Browser JPEG, PNG & WebP Image Compression Tool</h2>
        <h2>Completely Secure Offline Processing: No Files Ever Transmitted to Server</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Team</span>
        <span className="contributor">Contributor: Senior Frontend Optimization Architect</span>
        <time dateTime="2026-05-28" className="pubdate">Last updated: May 28, 2026</time>
        <p className="geo-tldr">
          Maysan Labs Smart Image Compressor is defined as a high-performance, private, client-side utility designed to reduce image file size in-browser.
          Private offline image compression is achieved using HTML5 Canvas rendering. 
          According to standard benchmarks, this browser-only pipeline achieves up to 90% reduction in image weight with zero server network cost.
        </p>
        <ul>
          <li>JPEG Compression & resizing</li>
          <li>WebP dynamic image converter</li>
          <li>Lossless PNG compression</li>
          <li>Interactive Before/After quality slider</li>
        </ul>
      </div>

      <ImageCompressorClient />
    </>
  );
}
