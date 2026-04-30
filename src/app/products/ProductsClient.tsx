"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import { GraduationCap, ArrowUpRight } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

const products = [
  {
    name: "Edu-Maysan",
    description: "The next-generation intelligence platform for educational institutions. Unifying finance, logistics, and academics.",
    Icon: GraduationCap,
    className: "md:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-primary)]/10 to-transparent" />,
    href: "/products/edu-maysan",
    cta: "EXPLORE_SYSTEM",
  },
  {
    name: "Coming Soon",
    description: "We are developing new mission-critical modules for logistics and healthcare. Synchronize for updates.",
    Icon: ArrowUpRight,
    className: "md:col-span-1",
    background: <div className="absolute inset-0 bg-black/20" />,
    href: "/init",
    cta: "IN_DEVELOPMENT",
  },
];

export default function ProductsClient() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] relative overflow-hidden">
      <Navbar />
      
      <PageHeader
        label="OUR ECOSYSTEM"
        title="BUILT_SOLUTIONS"
        subtitle="Industrial-grade software products engineered for autonomous operations and enterprise scale."
      />

      <section className="sec-xl">
        <div className="container-main">
          <BentoGrid>
            {products.map((product) => (
              <BentoCard key={product.name} {...product} />
            ))}
          </BentoGrid>

          <div className="mt-40 text-center">
              <span className="label-mono mb-12 block">Synchronizing Architecture</span>
              <div className="max-w-3xl mx-auto py-24 border-y border-white/5 relative">
                  <div className="absolute left-1/2 -top-px -translate-x-1/2 w-40 h-px bg-brand-primary/30" />
                  <h2 className="heading-lg mb-8">
                      Need a custom <br /><span className="text-brand-primary italic">Build?</span>
                  </h2>
                  <p className="text-body-dim text-lg font-medium mb-12 max-w-xl mx-auto">
                      We specialize in high-fidelity custom development beyond our standard product ecosystem.
                  </p>
                  <a href="/init" className="pill-btn pill-btn-primary mx-auto !w-fit px-12">
                      Book a Strategy Call
                  </a>
              </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
