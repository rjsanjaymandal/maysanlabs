"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";
import { GridPattern } from "@/components/ui/grid-pattern";
import { FloatingParticles } from "@/components/ui/particles";

// Dynamic Imports for performance hardening
const BentoGrid = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoGrid), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-white/5 rounded-3xl" />
});
const BentoCard = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoCard));

const OperationsRoadmap = dynamic(() => import("@/components/OperationsRoadmap"), {
  loading: () => <div className="min-h-[400px] bg-transparent" />
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[300px] bg-transparent" />
});

const ContactFooter = dynamic(() => import("@/components/ContactFooter"));

const trustLogos = [
  "GlobalBridge", "Apex_Systems", "Fortify_Infra", "Quantix_SaaS", "Nexus_Labs", "Cyber_Sync", "Logic_Flow"
];

const bentoFeatures = [
  {
    name: "Ready to grow",
    description: "Our apps handle millions of users effortlessly, so you can focus on growing your business.",
    className: "md:col-span-2",
    Icon: Cpu,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent" />,
    href: "/engineering",
    cta: "Learn More",
  },
  {
    name: "Secure by design",
    description: "We use the latest security standards to keep your data safe and sound.",
    className: "md:col-span-1",
    Icon: ShieldCheck,
    background: <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />,
    href: "/services",
    cta: "Our Standards",
  },
  {
    name: "Built to last",
    description: "Our software is easy to update and grows as your team expands.",
    className: "md:col-span-1",
    Icon: Layers,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />,
    href: "/services",
    cta: "See How",
  },
  {
    name: "Results first",
    description: "We work fast and deliver high-quality features every single week.",
    className: "md:col-span-2",
    Icon: Zap,
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Code2 size={120} className="text-brand-primary" />
      </div>
    ),
    href: "/init",
    cta: "Work With Us",
  },
];

export default function Home() {
  return (
    <main className="bg-background min-h-screen relative overflow-hidden text-body">
      <Navbar />
      <Hero />
      
      {/* ─── Trust Section ─── */}
      <section className="py-24 border-y border-white/5 bg-background overflow-hidden relative">
        <div className="container-main mb-12 text-center relative z-10">
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Trusted by modern teams</span>
        </div>
        <Marquee pauseOnHover className="[--duration:35s]">
          {trustLogos.map((logo) => (
            <span key={logo} className="text-2xl font-black tracking-tighter uppercase italic mx-12 opacity-10 hover:opacity-50 transition-opacity cursor-default text-white">
              {logo}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── Bento Grid Section ─── */}
      <section className="sec-xl container-main relative">
        <div className="mb-24">
          <div className="label-mono mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
            What we believe in
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase">
            Built for <br />
            <span className="text-brand-primary italic">Success.</span>
          </h2>
        </div>

        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      {/* ─── Process Flow Redesign ─── */}
      <OperationsRoadmap />

      {/* ─── Final CTA ─── */}
      <section className="sec-xl relative overflow-hidden">
        <div className="container-main text-center relative z-10">
          <div className="maysan-card border-[var(--brand-primary)]/30 bg-[var(--bg-dark)]/80 backdrop-blur-2xl py-24 group hover:border-[var(--brand-primary)]/60 transition-all duration-500">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              Build your<br />
              <span className="text-[var(--brand-primary)] italic">next project.</span>
            </h2>
            <p className="text-white/90 text-xl max-w-xl mx-auto mb-12 font-medium">
              Join leading businesses building their future with Maysan Labs quality standards.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
               <Link href="/init" className="pill-btn pill-btn-primary min-w-[280px] hover:shadow-[0_0_40px_rgba(163,230,53,0.5)]">
                 Book a Strategy Call
                 <ArrowUpRight size={18} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <ContactFooter />
    </main>
  );
}
