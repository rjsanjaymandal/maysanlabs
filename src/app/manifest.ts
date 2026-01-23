import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maysan Labs",
    short_name: "Maysan",
    description: "Architecting the future of global commerce. Scalable SaaS infrastructure, precision MERN stacks, and autonomous operational tools for modern enterprises.",
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
