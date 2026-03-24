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
  title: "Engineering Enterprise Velocity | Maysan Labs",
  description:
    "Maysan Labs builds high-performance SaaS infrastructure, modular architecture, and autonomous operational tools for global enterprises.",
};

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen selection:bg-primary selection:text-white">
      
      <Navbar />
      
      <div className="space-y-0">
        <Hero />
        <hr className="border-border opacity-20" />
        
        <div id="problem">
          <Problem />
        </div>
        <hr className="border-border opacity-20" />

        <div id="problem">
          <Problem />
        </div>
        <hr className="border-border opacity-20" />

        <section className="py-24 bg-secondary/10">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">What we offer</h2>
            <p className="text-foreground/60 mb-10 max-w-2xl mx-auto">
              We build custom software and online stores that help your business grow.
            </p>
            <Link 
              href="/solutions" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold text-xs tracking-widest uppercase hover:bg-foreground transition-all"
            >
              See our solutions
            </Link>
          </div>
        </section>

        <hr className="border-border opacity-20" />

        <section className="py-24">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">How we build</h2>
            <p className="text-foreground/60 mb-10 max-w-2xl mx-auto">
              We use the latest tech to make sure your site is fast, secure, and always online.
            </p>
            <Link 
              href="/engineering" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all"
            >
              Learn about our tech
            </Link>
          </div>
        </section>

        <hr className="border-border opacity-20" />

        <div id="process" className="bg-card/30 border-t border-b border-border">
          <OperationsRoadmap />
        </div>
        <hr className="border-border opacity-20" />

        <div id="proof">
          <SocialProof />
        </div>
        <hr className="border-border opacity-20" />

        <div id="faq">
          <FAQ />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How is the infrastructure managed post-deployment?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maysan Labs provides continuous technical oversight. You maintain total operational sovereignty while we ensure the system's structural integrity and performance.",
                },
              },
              {
                "@type": "Question",
                name: "How long does a typical implementation take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most CRM and ERP systems are deployed within 4-6 weeks, while custom tools can take as little as 2 weeks.",
                },
              },
              {
                "@type": "Question",
                name: "Is the Cloud Space secure for legal documents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. We use bank-level encryption (AES-256) and secure key management to ensure your firm's data is bulletproof.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide long-term engineering support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We act as your elite technical division. Our management plans include real-time telemetry, proactive scaling, and continuous refinement of your digital foundations.",
                },
              },
            ],
          }),
        }}
      />
      <ContactFooter />
    </main>
  );
}
