import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import {
  organizationSchema,
  websiteSchema,
  getNavigationSchema,
} from "@/lib/seo/schema";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maysanlabs.com"),
  title: {
    default: "Maysan Labs | Enterprise SaaS Development Company",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications. Trusted by global enterprises for MERN stack, React, and Node.js development.",
  keywords: [
    "SaaS development company",
    "custom software development company",
    "enterprise SaaS development",
    "cloud infrastructure services",
    "custom web application development",
    "MERN stack developers",
    "React development company",
    "Node.js backend development",
    "API development services",
    "scalable web applications",
    "full-stack development services",
    "custom CRM development",
    "enterprise software consulting",
    "cloud-native application development",
  ],
  authors: [{ name: "Maysan Labs", url: "https://maysanlabs.com" }],
  creator: "Maysan Labs",
  publisher: "Maysan Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maysanlabs.com",
    siteName: "Maysan Labs",
    title: "Maysan Labs | Enterprise SaaS Development Company",
    description:
      "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maysan Labs - Enterprise SaaS Development Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maysan Labs | Enterprise SaaS Development Company",
    description:
      "Maysan Labs - Enterprise SaaS development company offering custom software, cloud infrastructure, and scalable web applications.",
    images: ["/og-image.png"],
    creator: "@maysanlabs",
    site: "@maysanlabs",
  },
  facebook: {
    appId: "",
  },
  alternates: {
    canonical: "https://maysanlabs.com",
    languages: {
      en: "https://maysanlabs.com",
    },
  },
  category: "technology",
  classification: "SaaS Development Company",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

import type { Viewport } from "next";
import { cn } from "@/lib/utils";

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
    <html lang="en" suppressHydrationWarning className={cn("antialiased", interTight.variable, jetbrainsMono.variable)}>
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
        className="bg-[var(--bg-base)] text-foreground font-sans"
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
