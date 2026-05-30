/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    const staticAssetCache = "public, max-age=31536000, immutable";
    const shortLivedDocumentCache = "public, max-age=0, s-maxage=300, stale-while-revalidate=600, stale-if-error=86400";

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/((?!_next/static|_next/image|.*\\..*).*)",
        headers: [
          {
            key: "Cache-Control",
            value: shortLivedDocumentCache,
          },
        ],
      },
      {
        source: "/:path*(manifest.json|manifest.webmanifest)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:all*(ico|svg|jpg|jpeg|png|gif|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: staticAssetCache,
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;
