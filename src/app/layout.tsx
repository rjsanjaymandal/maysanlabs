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
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
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
        className={`${interTight.variable} ${jetbrainsMono.variable} bg-[#111111] text-foreground`}
        suppressHydrationWarning
      >
        {/* Global Structural Node Graph Background */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden mix-blend-screen opacity-[0.15]">
          <svg
            className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 text-white/10"
            width="1000"
            height="1000"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connecting Lines */}
            <path d="M500 500 L800 200 M500 500 L200 800 M500 500 L800 800 M500 500 L200 200" stroke="currentColor" strokeWidth="80" strokeLinecap="round" />
            
            {/* Nodes */}
            <circle cx="500" cy="500" r="160" stroke="currentColor" strokeWidth="80" fill="#111111" />
            <circle cx="800" cy="200" r="120" stroke="currentColor" strokeWidth="80" fill="#111111" />
            <circle cx="200" cy="800" r="120" stroke="currentColor" strokeWidth="80" fill="#111111" />
            <circle cx="800" cy="800" r="120" stroke="currentColor" strokeWidth="80" fill="#111111" />
            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="80" fill="#111111" />

            {/* Center glow box */}
            <rect x="360" y="360" width="280" height="280" stroke="currentColor" strokeWidth="20" fill="#151515" rx="10" />
            <rect x="420" y="420" width="160" height="160" fill="currentColor" opacity="0.3" rx="5" />
          </svg>
        </div>

        {/* Global Brand Vignette Override */}
        <div className="brand-vignette" />

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
