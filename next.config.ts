import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  // Used by self-hosted deployments to avoid mixing assets across rolling releases.
  deploymentId: process.env.DEPLOYMENT_VERSION,
  async headers() {
    return [
      {
        // Keep HTML uncached so stale documents do not reference deleted chunk files.
        source: "/((?!_next/static|_next/image|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
