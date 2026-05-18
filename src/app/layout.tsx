import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import {
  organizationSchema,
  websiteSchema,
  getNavigationSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";
import { generateFAQSchema } from "@/lib/seo/helpers";

const faqData = [
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in EdTech, E-commerce, Fintech, Healthcare, and Enterprise SaaS. Our team has deep expertise in building scalable platforms that handle millions of users with 99.99% uptime."
  },
  {
    question: "How long does it take to build a custom software solution?",
    answer: "Typical projects range from 8-16 weeks depending on complexity. We use agile methodology with bi-weekly sprints, so you'll see progress every 2 weeks and have regular opportunities to provide feedback."
  },
  {
    question: "What is your development process?",
    answer: "We follow a structured process: Discovery & Planning → Design & Architecture → Development → Testing & QA → Deployment → Ongoing Support. Each phase has clear deliverables and regular communication."
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Yes, we provide comprehensive post-launch support including bug fixes, security updates, performance optimization, and feature enhancements. We offer flexible maintenance packages tailored to your needs."
  },
  {
    question: "What technologies do you use?",
    answer: "We use modern technologies including Next.js, React, Node.js, TypeScript, PostgreSQL, MongoDB, AWS, and Docker. We select the best tech stack based on your specific requirements and scalability needs."
  },
  {
    question: "How do you ensure code quality and security?",
    answer: "We follow industry best practices including code reviews, automated testing, security audits, and compliance with OWASP guidelines. All our code is reviewed by senior developers and we use industry-standard security measures."
  }
];

const outfit = Outfit({
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
    default: "Maysan Labs | Enterprise SaaS Development Company | Gurgaon, India",
    template: "%s | Maysan Labs",
  },
  description:
    "Maysan Labs is a leading enterprise SaaS development company in Gurgaon, India. Expert developers building custom software, web applications, and cloud solutions. Trusted by enterprises for MERN stack, React, and Node.js development. Contact Maysan Labs for scalable digital solutions.",
  keywords: [
    "Maysan Labs",
    "maysanlabs",
    "Maysan",
    "Maysan Labs Gurgaon",
    "Maysan Labs India",
    "MaysanLabs Gurgaon",
    "MaysanLabs India",
    "Mayson Labs",
    "MaysonLabs",
    "Maysen Labs",
    "MaysenLabs",
    "Masan Labs",
    "MasanLabs",
    "MaysanLab",
    "MaysonLab",
    "Maysan Laps",
    "Mayson Laps",
    "Maysan Software",
    "Maysan Tech",
    "Maysan Technologies",
    "Maysan IT Solutions",
    "Maysan IT Services",
    "Maysan Developer",
    "Maysan Sector 44",
    "Maysan Labs Sector 44",
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
      "Maysan Labs is a leading enterprise SaaS development company offering custom software development, cloud infrastructure services, and scalable web applications. Trusted by global enterprises for MERN stack, React, and Node.js development.",
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
      ar: "https://maysanlabs.com/ar",
    },
  },
  category: "technology",
  classification: "SaaS Development Company",
  icons: {
    icon: [
      { url: "/favicon.png?v=100" },
      { url: "/icon-192x192-v4.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512-v4.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png?v=100",
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
};

import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("antialiased", outfit.variable, jetbrainsMono.variable)}>
      <head>
        {/* Preconnect to external origins for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Defer non-critical scripts */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(faqData)),
          }}
        />
      </head>
        <body
          className="bg-[var(--bg-base)] text-foreground font-sans"
          suppressHydrationWarning
        >
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJ8X38P8"
                    height={0} width={0} style={{display: "none", visibility: "hidden"}}></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
          {/* Google Tag Manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TJ8X38P8')`
            }}
          />
          {/* End Google Tag Manager */}
          <ThemeProvider>
            <SmoothScroll>
              <GoogleAnalytics />
              {children}
              <WhatsAppButton />
              <ExitIntentPopup />
            </SmoothScroll>
          </ThemeProvider>
        </body>
    </html>
  );
}
