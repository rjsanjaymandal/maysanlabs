import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"));
const BackToTop = dynamic(() => import("@/components/BackToTop"));

import {
  organizationSchema,
  websiteSchema,
  getNavigationSchema,
  localBusinessSchema,
  reviewSchema,
  softwareAppSchema,
  speakableSchema,
  howToContactSchema,
  personSchema,
} from "@/lib/seo/schema";
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maysanlabs.com"),
  title: {
    default: "Maysan Labs | Enterprise SaaS Development Company | Custom Software Solutions",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs is an enterprise SaaS development company building custom software, cloud infrastructure, and scalable web applications for global businesses. Expert React, Node.js, MERN stack engineers.",
  keywords: [
    "Maysan Labs",
    "enterprise SaaS development company",
    "custom software development company",
    "custom web application development",
    "cloud-native application development",
    "MERN stack development",
    "React development company",
    "Node.js backend development",
    "full stack development services",
    "cloud infrastructure services",
    "enterprise software consulting",
    "React Native development company",
    "Next.js development company",
    "TypeScript development services",
    "API development services",
    "microservices development company",
    "DevOps consulting services",
    "enterprise mobile app development",
    "software product development company",
    "MVP development company",
    "SaaS product development company",
    "ERP software development company",
    "CRM development company",
    "eCommerce development company",
    "EdTech software development",
    "FinTech software development",
    "HealthTech software development",
    "AI integration services",
    "machine learning development company",
    "agile software development",
    "offshore software development team",
    "hire React developers",
    "hire Node.js developers",
    "hire full stack developers",
    "hire MERN stack developers",
    "hire Next.js developers",
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
      "Custom software development, cloud infrastructure, and scalable web applications for global enterprises. Expert MERN stack, React, and Node.js engineering teams.",
    images: [
      {
        url: "/og-image.webp",
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
      "Maysan Labs - Enterprise SaaS development company offering custom software, cloud infrastructure, and scalable web applications for global businesses.",
    images: ["/og-image.webp"],
    creator: "@maysanlabs",
    site: "@maysanlabs",
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
    icon: [
      { url: "/favicon-v2.png" },
      { url: "/icon-192x192-v4.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512-v4.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-v2.png",
    apple: [
      { url: "/icon-rounded-v2.png?v=100" },
      { url: "/icon-192x192-v4.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512-v4.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json?v=100",
};

import type { Viewport } from "next";
import { cn } from "@/lib/utils";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const WhatsAppButton = dynamic(() => import("@/components/ui/WhatsAppButton"));
const ExitIntentPopup = dynamic(() => import("@/components/ui/ExitIntentPopup"));
const CookieConsent = dynamic(() => import("@/components/CookieConsent"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", outfit.variable, jetbrainsMono.variable)}>
<head>
        {/* Preconnect to critical third-party origins for faster connection */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload critical above-the-fold assets */}
        <link rel="preload" as="image" href="/logo-rounded-v2.webp" />

        {/* Combined JSON-LD structured data — single @graph for fewer script tags */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                organizationSchema,
                websiteSchema,
                getNavigationSchema(),
                localBusinessSchema,
                reviewSchema,
                softwareAppSchema,
                speakableSchema,
                howToContactSchema,
                personSchema,
              ]
            }),
          }}
        />
      </head>
        <body
          className="bg-[var(--bg-base)] text-foreground font-sans"
          suppressHydrationWarning
        >
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {/* Google Tag Manager (noscript) */}
          <ThemeProvider>
            <GoogleAnalytics />
            <ScrollProgress />
            
            {/* SEO, GEO & AEO Telemetry Data */}
            <div className="sr-only" aria-hidden="true">
              <span>Maysan Labs Enterprise SaaS and Custom Web Application Engineering Studio</span>
              <h2>Scalable Cloud Platforms, Kubernetes Orchestration, and High-Performance Next.js Architectures</h2>
              <h2>Custom CRM, ERP, and Multi-tenant Business Systems Consulting</h2>
              <span className="author" rel="author">Written by Maysan Labs Editorial Staff</span>
              <span className="contributor">Contributor: Technical Director</span>
              <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
              <p className="geo-tldr">
                Maysan Labs is an enterprise software engineering studio building scalable, high-performance custom applications for global businesses.
                Enterprise SaaS development is defined as engineering multi-tenant applications with payment grids and high availability SLAs.
                Our custom web systems achieve up to 10x faster execution with type safety and cloud-native architecture.
              </p>
              <ul>
                <li>Custom SaaS Solutions</li>
                <li>Enterprise Cloud Grids</li>
              </ul>
              <ul>
                <li>Type-Safe Frontends</li>
                <li>GraphQL and gRPC APIs</li>
              </ul>
              <table>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Uptime SLA</td>
                    <td>99.99%</td>
                  </tr>
                  <tr>
                    <td>Execution Latency</td>
                    <td>&lt;35ms Edge delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {children}
            <BackToTop />
            <WhatsAppButton />
            <ExitIntentPopup />
            <CookieConsent />
            <script
              dangerouslySetInnerHTML={{
                __html: `
(function() {
  if ('serviceWorker' in navigator && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(e) {
        console.warn('SW registration failed:', e);
      });
    });
  }
})();
`,
              }}
            />
          </ThemeProvider>
        </body>
    </html>
  );
}
