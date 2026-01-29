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

      <div id="solution" style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <Solution />
      </div>

      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <TechnicalSpecs />
      </div>

      <div
        id="process"
        style={{
          position: "relative",
          padding: "100px 0",
          background: "rgba(0,0,0,0.1)",
        }}
      >
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <div className="container">
          <div style={{ marginBottom: "60px", textAlign: "center" }}>
            <span
              style={{
                color: "var(--primary)",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                letterSpacing: "2px",
              }}
            >
              EXECUTION_PROTOCOL
            </span>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginTop: "10px",
              }}
              className="hollow-text"
            >
              THE_OPERATIONS_ROADMAP
            </h2>
          </div>
          <OperationsRoadmap />
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <SocialProof />
      </div>

      <div id="faq" style={{ position: "relative" }}>
        <div className="blueprint-line-h" style={{ top: "0" }} />
        <FAQ />
      </div>

      <ContactFooter />
    </main>
  );
}
