import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
    default: "Maysan Labs | Enterprise SaaS Architecture",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs specializes in engineering high-performance enterprise SaaS infrastructure and autonomous operational tools.",
  keywords: [
    "Enterprise SaaS",
    "Digital Infrastructure",
    "MERN Stack Development",
    "Cloud Solutions",
    "Scalable Architecture",
  ],
  authors: [{ name: "Maysan Labs Team" }],
  creator: "Maysan Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maysanlabs.com",
    siteName: "Maysan Labs",
    title: "Maysan Labs | Enterprise SaaS",
    description:
      "Architecting the future of global commerce. Scalable SaaS infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maysan Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maysan Labs | Enterprise SaaS",
    description: "Architecting the future of global commerce.",
    images: ["/og-image.png"],
    creator: "@maysanlabs",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
