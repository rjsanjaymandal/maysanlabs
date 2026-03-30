import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import {
  organizationSchema,
  websiteSchema,
  getNavigationSchema,
} from "@/lib/seo/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maysanlabs.com"),
  title: {
    default: "Maysan Labs | Enterprise SaaS Architecture",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs architects high-performance enterprise SaaS infrastructure and autonomous operational tools for modern global commerce.",
  keywords: [
    "Enterprise SaaS Architecture",
    "Autonomous Operational Tools",
    "Custom SaaS Development",
    "Digital Infrastructure Engineering",
    "MERN Stack Experts",
    "Cloud Native Solutions",
    "Scalable Enterprise Software",
    "Industrial UI Design",
    "Strategic Automation",
  ],
  authors: [{ name: "Sanjay Mandal", url: "https://maysanlabs.com" }],
  creator: "Maysan Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maysanlabs.com",
    siteName: "Maysan Labs",
    title: "Maysan Labs | Enterprise SaaS Architecture",
    description:
      "Architecting the future of global commerce with scalable, autonomous SaaS infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maysan Labs - Enterprise SaaS Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maysan Labs | Enterprise SaaS Architecture",
    description:
      "Architecting the future of global commerce with autonomous SaaS infrastructure.",
    images: ["/og-image.png"],
    creator: "@maysanlabs",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getNavigationSchema()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll>
            <GoogleAnalytics />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
