"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2
} from "lucide-react";
import Marquee from "@/components/ui/marquee";

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
const FAQ = dynamic(() => import("@/components/FAQ"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));

const trustLogos = [
  "EduMaysan", "FlashFashion", "TechRetail", "StyleHub", "CloudFirst", "DataSync", "AppFlow", "NexTech", "ScaleUp"
];

const stats = [
  { value: "50+", label: "Enterprise Projects" },
  { value: "EduMaysan", label: "Flagship EdTech LMS" },
  { value: "FlashFashion", label: "Ecommerce Platform" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

const bentoFeatures = [
  {
    name: "Enterprise Scale",
    description: "Architectures that handle millions of users with zero downtime and optimal performance.",
    className: "md:col-span-2",
    Icon: Cpu,
    background: <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent" />,
    href: "/services",
    cta: "Learn More",
  },
  {
    name: "Security First",
    description: "Bank-grade security with SOC2 compliance, encryption, and regular penetration testing.",
    className: "md:col-span-1",
    Icon: ShieldCheck,
    background: <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent" />,
    href: "/services",
    cta: "Our Standards",
  },
  {
    name: "Future-Proof",
    description: "Modern tech stack that's easy to maintain, extend, and scale as your business grows.",
    className: "md:col-span-1",
    Icon: Layers,
    background: <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />,
    href: "/services",
    cta: "See How",
  },
  {
    name: "Fast Delivery",
    description: "Agile methodology with bi-weekly sprints. See progress every 2 weeks.",
    className: "md:col-span-2",
    Icon: Zap,
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Code2 size={120} className="text-brand-primary" />
      </div>
    ),
    href: "/init",
    cta: "Start Project",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"identity" | "pillars">("identity");

  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden text-foreground">
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8 bg-black/25 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.01] to-transparent pointer-events-none" />
        <div className="container-main relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const isMetric = /^[0-9.+%]+$/.test(stat.value.replace(/\s/g, ''));
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 30px -15px rgba(26, 109, 214, 0.35)",
                    borderColor: "rgba(59, 130, 246, 0.25)",
                    backgroundColor: "rgba(255, 255, 255, 0.03)"
                  }}
                  className="flex flex-col items-center justify-center p-5 bg-white/[0.01] border border-white/[0.04] rounded-2xl transition-all duration-300 group relative overflow-hidden shadow-lg cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {isMetric ? (
                    <p className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 mb-1 tracking-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      {stat.value}
                    </p>
                  ) : (
                    <p className="text-[10px] md:text-xs font-extrabold text-white mb-1.5 px-3 py-0.5 bg-white/[0.04] border border-white/5 rounded-full shadow-inner tracking-wide uppercase">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold text-center group-hover:text-white/60 transition-colors">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* Trust Section */}
      <section className="py-8 md:py-12 border-b border-white/5 bg-black/10">
        <div className="container-main mb-6 md:mb-8 text-center">
           <span className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Trusted by fast-growing companies</span>
        </div>
        
        {/* Unified Responsive Glassmorphic Marquee */}
        <div className="w-full overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s] py-1">
            {trustLogos.map((logo) => (
              <div 
                key={logo} 
                className="flex items-center justify-center px-5 py-2.5 mx-3 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300 opacity-45 hover:opacity-90 group cursor-default"
              >
                <span className="text-xs md:text-sm font-extrabold text-white tracking-tight group-hover:text-[#1A6DD6] transition-colors">{logo}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>
 
      {/* Bento Grid Section */}
      <section className="sec-xl container-main relative">
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider">
              <Zap size={12} />
              Why Choose Us
            </span>
          </motion.div>
          <h2 className="heading-lg sm:heading-xl text-white">
            Built for <span className="text-brand-primary italic">scale</span>
          </h2>
        </div>
 
        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>

      {/* Immersive Panoramic Brand Showroom */}
      <section className="py-24 border-y border-white/5 bg-black/20 relative overflow-hidden">
        {/* Dynamic Color Reflective Ambient Glow backdrops */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
          activeTab === "identity" ? "bg-brand-primary/10" : "bg-blue-500/10"
        }`} />
        
        <div className="container-main relative z-10">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider">
                <Zap size={12} className="text-brand-primary" />
                Brand Showroom
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              Immersive <span className="text-brand-primary">Brand</span> Showroom
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
              Explore the design system, operational philosophy, and technical pillars that define Maysan Labs.
            </p>
          </div>

          {/* Premium Glassmorphic Tab Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-md shadow-lg">
              <button
                onClick={() => setActiveTab("identity")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "identity" 
                    ? "bg-[#1A6DD6] text-white shadow-lg shadow-blue-500/20" 
                    : "text-white/45 hover:text-white/70"
                }`}
              >
                01. Brand Identity
              </button>
              <button
                onClick={() => setActiveTab("pillars")}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "pillars" 
                    ? "bg-[#1A6DD6] text-white shadow-lg shadow-blue-500/20" 
                    : "text-white/45 hover:text-white/70"
                }`}
              >
                02. Core Pillars
              </button>
            </div>
          </div>

          {/* Giant Immersive Widescreen Frame Mockup */}
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.01] shadow-2xl backdrop-blur-sm group">
              
              {/* Top window styling header bar */}
              <div className="px-5 py-3.5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
                <div className="text-[10px] text-white/30 font-semibold uppercase tracking-widest font-mono">
                  {activeTab === "identity" ? "maysan_identity.png" : "core_pillars_matrix.png"}
                </div>
                <div className="w-16" />
              </div>

              {/* Viewport content */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                
                {activeTab === "identity" ? (
                  <motion.div
                    key="identity-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src="/banner-centered-v3.png"
                      alt="Maysan Labs Corporate Widescreen Identity"
                      fill
                      priority
                      className="object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pillars-pane"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src="/banner-columns-v3.png"
                      alt="Maysan Labs Core Strategy Pillars Widescreen"
                      fill
                      priority
                      className="object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-105"
                    />
                  </motion.div>
                )}
                
                {/* Immersive gradient border overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
              </div>

              {/* Console Dashboard Footer */}
              <div className="p-6 bg-white/[0.01] border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {activeTab === "identity" ? (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Brand Name</span>
                      <h4 className="text-base font-bold text-white">MAYSAN LABS</h4>
                      <p className="text-white/40 text-xs leading-relaxed">The high-contrast design system reflecting zero-latency enterprise solutions.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Corporate Motto</span>
                      <h4 className="text-base font-bold text-white">BUILD • SCALE • GROW</h4>
                      <p className="text-white/40 text-xs leading-relaxed">A unified three-phase engineering standard applied to all customer products.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 md:pl-6">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Core Standard</span>
                      <h4 className="text-base font-bold text-white">Engineering First</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Focused on clean TypeScript architecture, high concurrency, and uptime.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 01</span>
                      <h4 className="text-base font-bold text-white">Custom Solutions</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Precision-built React, Next.js, and Node.js architectures tailored to your business model.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 02</span>
                      <h4 className="text-base font-bold text-white">Scalable Growth</h4>
                      <p className="text-white/40 text-xs leading-relaxed">High-performance structures configured to handle heavy, rapid user growth with zero bottlenecks.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 md:pl-6">
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 03</span>
                      <h4 className="text-base font-bold text-white">Cloud & DevOps</h4>
                      <p className="text-white/40 text-xs leading-relaxed">Autonomous deployment pipelines, secure AWS frameworks, and persistent container management.</p>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <OperationsRoadmap />

      {/* Services */}
      <Services />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Tech Stack Section */}
      <section className="py-16 border-t border-white/5 bg-black/15 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <p className="text-brand-primary/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Empowered by Industry Standards</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Supabase", "Tailwind CSS", "Framer Motion", "GraphQL", "Redis"].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 text-xs md:text-sm font-semibold text-white/70 bg-white/[0.02] border border-white/[0.05] rounded-full hover:text-white hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
