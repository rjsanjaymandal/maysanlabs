import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import OperationsRoadmap from "@/components/OperationsRoadmap";

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

      <ContactFooter />
    </main>
  );
}
