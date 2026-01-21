import Navbar from "@/components/Navbar";
import Hero from "../components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import SocialProof from "@/components/SocialProof";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import ContactFooter from "@/components/ContactFooter";

import Pricing from "@/components/Pricing";

import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main style={{ position: "relative" }}>
      {/* Global Blueprint Lines */}
      <div className="blueprint-line-v" style={{ left: "10%" }} />
      <div className="blueprint-line-v" style={{ left: "90%" }} />
      <div className="blueprint-line-h" style={{ top: "0" }} />

      <Navbar />
      <Hero />
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <Problem />
      </div>
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <Solution />
      </div>
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <Pricing />
      </div>
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <FAQ />
      </div>
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <SocialProof />
      </div>
      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <TechnicalSpecs />
      </div>
      <ContactFooter />
    </main>
  );
}
