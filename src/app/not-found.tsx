import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import ContactFooter from "@/components/layout/footer";
import NotFoundContent from "@/components/error/not-found-content";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist. Return to Maysan Labs homepage to explore our enterprise SaaS development services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>

      <Navbar />
      <NotFoundContent />
      <ContactFooter />
    </>
  );
}