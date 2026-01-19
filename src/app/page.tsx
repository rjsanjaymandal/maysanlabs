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
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Pricing />
      <FAQ />
      <SocialProof />
      <TechnicalSpecs />
      <ContactFooter />
    </main>
  );
}
