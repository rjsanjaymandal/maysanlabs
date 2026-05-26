"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import BorderBeam from "@/components/ui/border-beam";
import { FloatingParticles } from "@/components/ui/particles";
import { generateIndividualReviewSchemas } from "@/lib/seo/schema";
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Code2
} from "lucide-react";
import FadeInScroll from "@/components/FadeInScroll";
import LogoMarquee from "@/components/LogoMarquee";

// Dynamic Imports for performance hardening
const BentoGrid = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoGrid), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-white/5 rounded-3xl" />
});
const BentoCard = dynamic(() => import("@/components/ui/bento-grid").then(m => m.BentoCard));

const ScrollTimeline = dynamic(() => import("@/components/ScrollTimeline"), {
  loading: () => <div className="min-h-[400px] bg-transparent" />
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[300px] bg-transparent" />
});

const ContactFooter = dynamic(() => import("@/components/ContactFooter"));
const Services = dynamic(() => import("@/components/Services"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));

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
    <main aria-label="Maysan Labs Homepage" className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebPage", "name": "Maysan Labs - Enterprise SaaS Development Company", "description": "Custom software development, cloud infrastructure, and enterprise SaaS solutions.", "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".hero-title-text", ".geo-summary"] } }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateIndividualReviewSchemas())
        }}
      />
      <FloatingParticles count={25} minSize={1} maxSize={4} color="rgba(59, 130, 246, 0.12)" />
      <Navbar />
      <Hero />
      
      {/* Stats Section */}
      <section className="pt-8 pb-6 md:pt-12 md:pb-8 bg-slate-50/50 dark:bg-black/40 border-y border-slate-200/80 dark:border-white/5 relative overflow-hidden">
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
                  className="flex flex-col items-center justify-center p-5 bg-white hover:bg-slate-50/80 dark:bg-slate-900/50 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-white/10 hover:border-brand-primary/40 dark:hover:border-brand-primary/40 rounded-2xl transition-all duration-300 group relative overflow-hidden shadow-sm hover:shadow-md dark:shadow-none hover:-translate-y-1 cursor-default backdrop-blur-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  {isMetric ? (
                    <p className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:from-brand-primary dark:to-[#00d2ff] mb-1 tracking-tight drop-shadow-[0_0_15px_rgba(26,109,214,0.15)] dark:drop-shadow-[0_0_15px_rgba(26,109,214,0.3)]">
                      {stat.value}
                    </p>
                  ) : (
                    <p className="text-[10px] md:text-xs font-extrabold text-slate-800 bg-slate-100/80 border border-slate-200 dark:text-white dark:bg-white/[0.06] dark:border-white/10 rounded-full mb-1.5 px-3 py-0.5 shadow-inner tracking-wide uppercase">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 text-[9px] md:text-[10px] uppercase tracking-wider font-semibold text-center group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
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
           <span className="text-[var(--text-on-white)]/50 text-[10px] uppercase tracking-widest font-bold">Trusted by fast-growing companies</span>
        </div>
        <LogoMarquee />
      </section>
 
      {/* Bento Grid Section */}
      <FadeInScroll>
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
          <h2 className="heading-lg sm:heading-xl text-[var(--text-on-white)]">
            Built for <span className="text-brand-primary italic">scale</span>
          </h2>
        </div>
 
        <BentoGrid className="md:grid-cols-3">
          {bentoFeatures.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </section>
      </FadeInScroll>

      {/* Immersive Panoramic Brand Showroom */}
      <FadeInScroll>
      <section className="py-24 border-y border-white/5 bg-[#0B1120] relative overflow-hidden">
        {/* Dynamic Color Reflective Ambient Glow backdrops */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[600px] h-[180px] sm:h-[400px] rounded-full blur-[50px] sm:blur-[140px] pointer-events-none transition-all duration-1000 ${
          activeTab === "identity" ? "bg-brand-primary/5 sm:bg-brand-primary/10" : "bg-blue-500/5 sm:bg-blue-500/10"
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
            <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
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
              <BorderBeam size={450} duration={16} delay={4} colorFrom="#1A6DD6" colorTo="#60A5FA" />
              
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
              <div className="relative min-h-[460px] md:min-h-0 md:aspect-[21/9] w-full overflow-hidden bg-black/45 backdrop-blur-md flex flex-col justify-between select-none">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.04] via-transparent to-blue-500/[0.02] z-0 pointer-events-none" />
                
                {activeTab === "identity" ? (
                  <motion.div
                    key="identity-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative z-10 flex flex-col p-4 sm:p-6 justify-between flex-grow"
                  >
                    {/* Top status bar */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">
                        [DESIGN STANDARD] EST. 2026
                      </span>
                      <span className="text-[10px] text-brand-primary uppercase tracking-widest font-bold font-mono">
                        MAYSAN ARCHITECTURE
                      </span>
                    </div>

                    {/* Central Editorial Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-6 items-center text-left">
                      {/* Left Column: Big Editorial Typography */}
                      <div className="space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                          WE DESIGN HIGH-CONTRAST DIGITAL EXPERIENCES.
                        </h3>
                        <p className="text-white/40 text-xs leading-relaxed max-w-sm">
                          A premium software architecture and visual design standard built to scale enterprise-grade digital platforms.
                        </p>
                      </div>
                      
                      {/* Right Column: Premium Color & Layout specs */}
                      <div className="border-l border-white/5 pl-6 space-y-4 font-mono">
                        <div className="space-y-1">
                          <span className="text-[8px] text-brand-primary uppercase tracking-wider block">01 / BRAND COLOR CANVAS</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-brand-primary border border-brand-primary/30" />
                            <span className="text-xs text-white/80 font-bold">#1A6DD6</span>
                            <span className="text-[10px] text-white/30">Cyber Royal Blue</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-brand-primary uppercase tracking-wider block">02 / INTERACTION CANVAS</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#00d2ff] border border-[#00d2ff]/30" />
                            <span className="text-xs text-white/80 font-bold">#00D2FF</span>
                            <span className="text-[10px] text-white/30">Vibrant Cyan</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-brand-primary uppercase tracking-wider block">03 / TYPOGRAPHY CANVAS</span>
                          <span className="text-xs text-white/80 font-bold">Outfit Pro / sans-serif</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      <span>MAYSAN IDENTITY REGISTER v1.0</span>
                      <span className="text-brand-primary font-bold">VERIFIED</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pillars-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full relative z-10 flex flex-col p-4 sm:p-6 justify-between flex-grow"
                  >
                    {/* Top status bar */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold font-mono">
                        [STRATEGIC PRINCIPLES]
                      </span>
                      <span className="text-[10px] text-brand-primary uppercase tracking-widest font-bold font-mono">
                        03 / THREE EXECUTION PILLARS
                      </span>
                    </div>

                    {/* Three strategic Columns Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-6 text-left">
                      {/* Pillar 1: Speed */}
                      <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                        <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                          [01] SPEED
                        </div>
                        <div className="my-auto">
                          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">EDGE CACHING SYSTEMS</h3>
                          <p className="text-xs text-white/45 leading-relaxed">Engineered for absolute responsiveness with sub-50ms data caching layers.</p>
                        </div>
                      </div>

                      {/* Pillar 2: Scale */}
                      <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                        <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                          [02] SCALE
                        </div>
                        <div className="my-auto">
                          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">ELASTIC ARCHITECTURES</h3>
                          <p className="text-xs text-white/45 leading-relaxed">Dynamically scales to handle millions of queries with zero performance overhead.</p>
                        </div>
                      </div>

                      {/* Pillar 3: Security */}
                      <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-brand-primary/20 transition-all duration-300">
                        <div className="text-[10px] font-mono text-white/30 font-bold tracking-wider mb-2">
                          [03] STABILITY
                        </div>
                        <div className="my-auto">
                          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-tight">ENTERPRISE HARDENING</h3>
                          <p className="text-xs text-white/45 leading-relaxed">Secured with regular penetration testing and strict server encapsulation protocols.</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status bar */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      <span>MAYSAN STRATEGY MATRIX v1.0</span>
                      <span className="text-brand-primary font-bold">SECURE</span>
                    </div>
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
                      <h3 className="text-base font-bold text-white">MAYSAN LABS</h3>
                      <p className="text-white/40 text-xs leading-relaxed">The high-contrast design system reflecting zero-latency enterprise solutions.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Corporate Motto</span>
                      <h3 className="text-base font-bold text-white">BUILD • SCALE • GROW</h3>
                      <p className="text-white/40 text-xs leading-relaxed">A unified three-phase engineering standard applied to all customer products.</p>
                    </div>
                    <div className="flex flex-col gap-1.5 md:pl-6">
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">Core Standard</span>
                      <h3 className="text-base font-bold text-white">Engineering First</h3>
                      <p className="text-white/40 text-xs leading-relaxed">Focused on clean TypeScript architecture, high concurrency, and uptime.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 01</span>
                      <h3 className="text-base font-bold text-white">Custom Solutions</h3>
                       <p className="text-white/40 text-xs leading-relaxed">Precision-built React, Next.js, and Node.js architectures tailored to your business model.</p>
                     </div>
                     <div className="flex flex-col gap-1.5 border-y md:border-y-0 md:border-x border-white/5 py-4 md:py-0 md:px-6">
                       <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 02</span>
                       <h3 className="text-base font-bold text-white">Scalable Growth</h3>
                       <p className="text-white/40 text-xs leading-relaxed">High-performance structures configured to handle heavy, rapid user growth with zero bottlenecks.</p>
                     </div>
                     <div className="flex flex-col gap-1.5 md:pl-6">
                       <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Pillar 03</span>
                       <h3 className="text-base font-bold text-white">Cloud & DevOps</h3>
                      <p className="text-white/40 text-xs leading-relaxed">Autonomous deployment pipelines, secure AWS frameworks, and persistent container management.</p>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
      </FadeInScroll>

      <FadeInScroll>
      <ScrollTimeline />
      </FadeInScroll>

      <FadeInScroll delay={0.1}>
      <Services />
      </FadeInScroll>

      <FadeInScroll delay={0.2}>
      <Testimonials />
      </FadeInScroll>

      <FadeInScroll delay={0.1}>
      <FAQ />
      </FadeInScroll>

      <FadeInScroll>
      <TrustBadges />
      </FadeInScroll>

      <FadeInScroll>
      <section className="py-16 border-t border-white/5 bg-black/15 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container-main text-center relative z-10">
          <p className="text-brand-primary/60 text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Empowered by Industry Standards</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Supabase", "Tailwind CSS", "Framer Motion", "GraphQL", "Redis"].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 text-xs md:text-sm font-semibold text-[var(--text-on-white)]/70 bg-white/[0.02] border border-white/[0.05] rounded-full hover:text-[var(--text-on-white)] hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
      </FadeInScroll>

      <FadeInScroll delay={0.2}>
      <ContactFooter />
      </FadeInScroll>
    </main>
  );
}
