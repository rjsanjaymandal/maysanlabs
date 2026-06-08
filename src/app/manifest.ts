import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maysan Labs — Enterprise SaaS Development Company",
    short_name: "Maysan Labs",
    description: "Enterprise SaaS development, custom software, cloud infrastructure, and AI integration for modern businesses. Based in Gurgaon, India.",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    orientation: "portrait-primary",
    scope: "/",
    lang: "en-US",
    categories: ["business", "productivity", "development"],
    background_color: "#0a0f1a",
    theme_color: "#0a0f1a",
    icons: [
      {
        src: "/icon-192x192-v4.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192-v4.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512-v4.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512-v4.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
