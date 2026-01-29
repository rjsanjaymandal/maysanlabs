import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maysanlabs.com"),
  title: {
    default: "Maysan Labs | Enterprise SaaS Architecture & Digital Operations",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs specializes in engineering high-performance enterprise SaaS infrastructure, MERN stack ecosystems, and autonomous operational tools for global businesses. Headquartered in Gurgaon.",
  keywords: [
    "Enterprise SaaS",
    "Digital Infrastructure",
    "MERN Stack Development",
    "Enterprise Commerce Architecture",
    "CRM Module",
    "Cloud Solutions",
    "Maysan Labs Gurgaon",
    "Business Automation",
    "Scalable Architecture",
  ],
  authors: [{ name: "Maysan Labs Team" }],
  creator: "Maysan Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maysanlabs.com",
    siteName: "Maysan Labs",
    title: "Maysan Labs | Enterprise SaaS & Operations Infrastructure",
    description:
      "Architecting the future of global commerce. Scalable SaaS infrastructure and autonomous operational tools.",
    images: [
      {
        url: "/og-image.png", // Assuming this exists or will be added
        width: 1200,
        height: 630,
        alt: "Maysan Labs Industrial Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maysan Labs | Enterprise SaaS & Operations Infrastructure",
    description:
      "Architecting the future of global commerce. Scalable SaaS infrastructure and autonomous operational tools.",
    images: ["/og-image.png"],
    creator: "@maysanlabs",
  },
  alternates: {
    canonical: "/",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Maysan Labs",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ccff00",
  width: "device-width",
  initialScale: 1,
};

import CommandDock from "@/components/CommandDock";

import SmartCursor from "@/components/SmartCursor";
import SmoothScroll from "@/components/SmoothScroll";
import TacticalOverlay from "@/components/TacticalOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <div className="noise-overlay" />
        <TacticalOverlay />
        <SmartCursor />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Maysan Labs",
              url: "https://maysanlabs.com",
              logo: "https://maysanlabs.com/logo.png",
              description:
                "Architecting the future of global commerce with scalable SaaS infrastructure and autonomous operational tools.",
              sameAs: [
                "https://twitter.com/maysanlabs",
                "https://github.com/maysanlabs",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Maysan Labs",
              url: "https://maysanlabs.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://maysanlabs.com/insights?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <SmoothScroll>{children}</SmoothScroll>
        <CommandDock />
      </body>
    </html>
  );
}
