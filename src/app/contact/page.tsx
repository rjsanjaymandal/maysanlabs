import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Maysan Labs – Software Development Inquiries",
  description: "Get in touch with Maysan Labs for custom software development, mobile apps, and digital transformation projects. Our Gurgaon team responds within 24 hours.",
  openGraph: {
    title: "Contact Maysan Labs",
    description: "Start your software project with a free consultation.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
