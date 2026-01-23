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
    default: "Maysan Labs | Enterprise SaaS & Operations Infrastructure",
    template: "%s | Maysan Labs",
  },
  description:
    "Architecting the future of global commerce. Scalable SaaS infrastructure, precision MERN stacks, and autonomous operational tools for modern enterprises.",
  keywords: [
    "SaaS Infrastructure",
    "Enterprise Software",
    "MERN Stack",
    "Autonomous Operations",
    "Digital Architecture",
    "Maysan Labs",
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
};

export const viewport = {
  themeColor: "#ccff00",
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

        <SmoothScroll>{children}</SmoothScroll>
        <CommandDock />
      </body>
    </html>
  );
}
