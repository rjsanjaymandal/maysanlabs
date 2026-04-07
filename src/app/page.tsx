import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import Problem from "@/components/Problem";
import SocialProof from "@/components/SocialProof";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import OperationsRoadmap from "@/components/OperationsRoadmap";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise SaaS Development Company | Custom Software Solutions",
  description: "Maysan Labs is a premier enterprise SaaS development company. We build custom software, cloud infrastructure, and scalable web applications using MERN stack, React, and Node.js.",
  keywords: ["enterprise SaaS development", "custom software development", "SaaS development company", "cloud infrastructure services", "MERN stack developers"],
  openGraph: {
    title: "Maysan Labs | Enterprise SaaS Development Company",
    description: "Build scalable enterprise software with Maysan Labs. Custom SaaS development, cloud infrastructure, and full-stack solutions.",
  },
};

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      
      <Hero />

      <hr className="border-border/30" />

      <Problem />

      <hr className="border-border/30" />

      <section className="section-md bg-secondary/10">
        <div className="section-container text-center">
          <h2 className="heading-md mb-6">What we offer</h2>
          <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
            We build custom software and online stores that help your business grow.
          </p>
          <Link 
            href="/solutions" 
            className="btn-primary inline-flex items-center gap-2"
          >
            See our solutions
          </Link>
        </div>
      </section>

      <hr className="border-border/30" />

      <section className="section-md">
        <div className="section-container text-center">
          <h2 className="heading-md mb-6">How we build</h2>
          <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
            We use the latest tech to make sure your site is fast, secure, and always online.
          </p>
          <Link 
            href="/engineering" 
            className="btn-secondary inline-flex items-center gap-2"
          >
            Learn about our tech
          </Link>
        </div>
      </section>

      <hr className="border-border/30" />

      <div className="bg-card/30 border-y border-border">
        <OperationsRoadmap />
      </div>

      <hr className="border-border/30" />

      <SocialProof />

      <hr className="border-border/30" />

      <FAQ />

      <ContactFooter />
    </main>
  );
}
