import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Maysan Labs – Software Development Inquiries",
  description: "Get in touch with Maysan Labs for custom software development, mobile apps, and digital transformation projects. Our Gurgaon team responds within 24 hours.",
  openGraph: {
    title: "Contact Maysan Labs",
    description: "Start your software project with a free consultation.",
    url: "https://maysanlabs.com/contact",
    type: "website",
    siteName: "Maysan Labs",
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Maysan Labs",
    description: "Start your software project with a free consultation.",
    images: ["/og-image.webp"],
  },
  alternates: {
    canonical: "https://maysanlabs.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
