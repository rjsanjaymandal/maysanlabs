"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import { Cpu, Shield, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        label="CORE INTEL"
        title="ENGINEERING PHILOSOPHY"
        subtitle="At Maysan Labs, we believe in the Neo-Monolith: digital systems built with industrial precision, designed for maximum resilience and global operational scale."
      />

      <section className="py-32 border-b border-border/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="p-8 border border-border rounded-lg hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded mb-8">
                <Cpu size={24} />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 text-foreground font-mono">
                Precision Stacks
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We don&apos;t do &apos;bloat&apos;. Every line of code is a
                structural necessity. Our stacks are optimized for speed,
                security, and scalability.
              </p>
            </div>
            <div className="p-8 border border-border rounded-lg hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded mb-8">
                <Shield size={24} />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 text-foreground font-mono">
                Data Sovereignty
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Empowering global enterprises. We build tools that provide full
                control over data, operations, and cross-border relationships.
              </p>
            </div>
            <div className="p-8 border border-border rounded-lg hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded mb-8">
                <Globe size={24} />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 text-foreground font-mono">
                Edge Distribution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Global availability is a standard, not a feature. We deploy your
                infrastructure to the edge for zero-latency operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-primary tracking-widest mb-8 block">
              {"// THE_MANIFESTO"}
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-12 text-foreground">
              CONSTRUCTING THE FUTURE OF OPERATIONS
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-light">
              The era of fragmented SaaS is over. The technology to operate an
              entire global division from a unified command center is here.
              Maysan Labs is the architect of this transition. We provide the
              structural integrity needed to scale without compromise.
            </p>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
