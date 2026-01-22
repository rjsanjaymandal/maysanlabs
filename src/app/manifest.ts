import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maysan Labs",
    short_name: "Maysan",
    description: "Launch a powerful e-commerce brand alone with our MERN stack platform and AI automation tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ccff00",
    icons: [
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
