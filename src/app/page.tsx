import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import OperationsRoadmap from "@/components/OperationsRoadmap";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Enterprise Velocity",
  description:
    "Maysan Labs builds high-performance SaaS infrastructure, modular architecture, and autonomous operational tools for global enterprises.",
};

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problem />

      <div id="solution">
        <Solution />
      </div>

      <TechnicalSpecs />

      <div id="process" className="py-24 bg-secondary/30">
        <div className="container">
          <div className="mb-16 text-center">
            <span className="text-primary font-mono text-sm tracking-widest uppercase">
              Execution Protocol
            </span>
            <h2 className="text-4xl font-bold mt-4">Operations Roadmap</h2>
          </div>
          <OperationsRoadmap />
        </div>
      </div>

      <SocialProof />

      <div id="faq">
        <FAQ />
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
