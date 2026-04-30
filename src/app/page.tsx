"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
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
const Services = dynamic(() => import("@/components/Services"));

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
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden text-foreground blueprint-grid">
      <Navbar />
      <Hero />
      
      {/* ─── Trust Section ─── */}
      <section className="py-24 border-y border-white/5 bg-black/20 backdrop-blur-md overflow-hidden relative">
        <div className="container-main mb-12 text-center relative z-10">
           <span className="label-mono !text-[10px] !mb-0">Studio Partners</span>
        </div>
        <Marquee pauseOnHover className="[--duration:40s]">
          {trustLogos.map((logo) => (
            <span key={logo} className="text-3xl font-black tracking-tighter uppercase italic mx-16 opacity-10 hover:opacity-50 transition-opacity cursor-default text-white">
              {logo}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ─── Bento Grid Section ─── */}
      <section className="sec-xl container-main relative">
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-mono mb-12 inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
            Our Philosophy
          </motion.div>
          <h2 className="heading-xl">
            Engineering <br />
            <span className="text-brand-primary italic">Excellence.</span>
          </h2>
        </div>

        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      {/* ─── Process Flow ─── */}
      <OperationsRoadmap />

      {/* ─── Services ─── */}
      <Services />

      {/* ─── Voices ─── */}
      <Testimonials />

      <ContactFooter />
    </main>
  );
}
