import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              additionalType: "https://schema.org/SoftwareApplication",
              name: "Maysan Labs",
              url: "https://maysanlabs.com",
              logo: "https://maysanlabs.com/logo.png",
              image: "https://maysanlabs.com/og-image.png",
              description:
                "Architecting high-performance enterprise SaaS infrastructure and autonomous operational tools for modern enterprises.",
              priceRange: "$$$",
              telephone: "+91-XXXXXXXXXX",
              contactPoint: {
                "@type": "ContactPoint",
                email: "business@maysanlabs.com",
                contactType: "sales",
                availableLanguage: ["English", "Hindi"],
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gurgaon",
                addressRegion: "Haryana",
                postalCode: "122001",
                addressCountry: "IN",
              },
              areaServed: "Global",
              sameAs: [
                "https://linkedin.com/company/maysanlabs",
                "https://twitter.com/maysanlabs",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://maysanlabs.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Blog",
                  item: "https://maysanlabs.com/blog",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Careers",
                  item: "https://maysanlabs.com/careers",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Main Navigation",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Home",
                  url: "https://maysanlabs.com",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Solutions",
                  url: "https://maysanlabs.com/#solution",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "Architecture",
                  url: "https://maysanlabs.com/architecture",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "Intelligence Stream",
                  url: "https://maysanlabs.com/blog",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Careers",
                  url: "https://maysanlabs.com/careers",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 6,
                  name: "About",
                  url: "https://maysanlabs.com/about",
                },
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
                target: "https://maysanlabs.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
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
