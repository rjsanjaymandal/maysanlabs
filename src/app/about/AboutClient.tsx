"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import PageHeader from "@/components/PageHeader";
import { Cpu, Shield, Globe, ArrowUpRight } from "lucide-react";

const values = [
  {
    icon: <Cpu size={24} />,
    title: "Linear Quality",
    desc: "We build things right the first time. No technical debt, no performance bottlenecks.",
  },
  {
    icon: <Shield size={24} />,
    title: "Zero-Trust",
    desc: "Your data stays safe with us. We use the most advanced enterprise security primitives.",
  },
  {
    icon: <Globe size={24} />,
    title: "Global Mesh",
    desc: "We build for globally distributed systems. Your software operates at scale, anywhere.",
  },
];

export default function AboutClient() {
  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden">
      <Navbar />

      <PageHeader 
        label="Our Mission"
        title="WHO_WE_ARE"
        subtitle="A team of elite engineers and architects building the software that connects complex operations into high-fidelity enterprise logic."
      />

      {/* Values Section */}
      <section className="sec-lg">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <div key={index} className="maysan-card group flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-black transition-all duration-500 shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-brand-primary transition-colors italic">
                    {value.title}
                  </h3>
                  <p className="text-body-dim text-sm leading-relaxed font-medium">
                    {value.desc}
                  </p>
                </div>
                <div className="mt-12 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowUpRight size={14} className="text-brand-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="sec-xl relative overflow-hidden bg-black/20 border-y border-white/5">
        <div className="radial-blur -top-40 -right-40 opacity-10" />
        <div className="container-main relative z-10">
          <div className="max-w-4xl">
            <span className="label-mono mb-8 block">Our Story</span>
            <h2 className="heading-xl mb-12">
              Built <span className="text-brand-primary italic">Right.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 text-lg text-body-dim font-medium leading-relaxed">
              <p>
                We started Maysan Labs because we saw enterprises struggle with bloated, legacy architectures and fragmented systems. We wanted to anchor engineering in absolute precision.
              </p>
              <p>
                Today, we operate at the intersection of mission-critical engineering and operational excellence. We don&apos;t just build code; we deploy digital infrastructure that scales at the speed of growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
