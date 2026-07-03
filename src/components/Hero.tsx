"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Play, 
  Cpu,
  TrendingUp,
  Smartphone,
  Globe
} from "lucide-react";

const benefits = [
  "Built Just for Your Business (No Templates)",
  "Highly Secure & Private",
  "Easy for Anyone to Use"
];

const goals = [
  {
    id: "saas",
    tabText: "Build a SaaS",
    title: "Custom SaaS & Product Engineering",
    icon: Cpu,
    desc: "We build fully functional, multi-tenant SaaS products complete with secure database isolation, stripe/razorpay billing integration, headless commerce (Medusa), and customizable client dashboards.",
    metric: "99.9% Uptime SLA",
    detail: "Built using optimized Next.js + Node.js structures for fast loading speeds."
  },
  {
    id: "automation",
    tabText: "Automate Workflows",
    title: "Operations & Workflow Automation",
    icon: TrendingUp,
    desc: "Stop copying data between Excel sheets. We create secure business systems that automate your client billing, send receipt alerts via WhatsApp, and sync with accounting tools.",
    metric: "Save 15+ Hours/Week",
    detail: "Streamlines operations so your staff can focus on growth, not manual tasks."
  },
  {
    id: "mobile",
    tabText: "Launch a Mobile App",
    title: "Android & iOS Mobile Engineering",
    icon: Smartphone,
    desc: "Expand your reach with a native iOS and Android application built using React Native. We handle store submissions, local database sync, and real-time GPS tracking.",
    metric: "60 FPS Fluid Performance",
    detail: "Single codebase architecture for faster launches and lower maintenance costs."
  },
  {
    id: "website",
    tabText: "Build a Website",
    title: "High-Performance Websites & Portals",
    icon: Globe,
    desc: "From marketing sites to full-scale web portals. We build lightning-fast Next.js websites with custom CMS, SEO optimization, and seamless third-party integrations.",
    metric: "95+ Lighthouse Score",
    detail: "Optimized for speed, accessibility, and search engine visibility out of the box."
  }
];

export default function Hero() {

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background border-b border-white/[0.02]">
      {/* Broken Grid Background - Asymmetrical */}
      <div className="absolute inset-y-0 left-0 w-[90%] bg-grid-pattern pointer-events-none z-0 opacity-40" />
      
      {/* Aggressive Right-Side Tension Gradient */}
      <div className="absolute top-0 right-0 w-[30vw] h-full bg-gradient-to-l from-brand-primary/[0.15] to-transparent blur-[120px] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 pt-32 pb-24">
        {/* The 90% Block - Extreme Left Alignment */}
        <div className="col-span-12 lg:col-span-11 xl:col-span-10 flex flex-col items-start text-left">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-0 py-1 border-l-2 border-brand-primary pl-4 text-foreground/60 text-xs font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-none bg-brand-primary animate-pulse" />
              Maysan Labs / Enterprise Engineering
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mb-10 w-full"
          >
            <h1 className="font-sans text-[clamp(2.5rem,7vw,7rem)] font-black text-foreground tracking-[-0.04em] leading-[0.9] w-full">
              WE BUILD SYSTEMS<br/>
              <span className="bg-gradient-to-r from-[#1A6DD6] via-[#00d2ff] to-[#10b981] bg-clip-text text-transparent opacity-90 mix-blend-screen">NOT TEMPLATES.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl border-l border-white/10 pl-6 mb-12"
          >
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
              You focus on growing your business. We architect the severe, high-performance software that runs it. From isolated SaaS environments to ruthless workflow automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/start" 
              className="group relative px-8 py-4 bg-foreground text-background font-black text-sm uppercase tracking-widest hover:bg-brand-primary transition-colors duration-300 flex items-center justify-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Initiate Protocol</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/case-studies" 
              className="group px-8 py-4 border border-white/10 text-foreground font-black text-sm uppercase tracking-widest hover:border-brand-primary/50 transition-colors duration-300 flex items-center justify-center gap-3 bg-white/[0.01]"
            >
              <Play size={12} className="text-brand-primary" />
              <span>View Archives</span>
            </Link>
          </motion.div>

          {/* Fragmented Benefits List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/[0.04] w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {benefits.map((benefit, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-brand-primary">0{i + 1}</span>
                <span className="text-foreground/50 text-xs font-semibold leading-tight">{benefit}</span>
              </div>
            ))}
          </motion.div>

        </div>
        
        {/* The 10% Empty Tension Zone (Right Column) */}
        <div className="hidden lg:block lg:col-span-1 xl:col-span-2 relative h-full border-l border-white/[0.02]">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rotate-90 text-[10px] font-mono tracking-[0.3em] text-foreground/20 uppercase whitespace-nowrap">
            Maysan_Labs_Core_Engine_v3.0
          </div>
        </div>
      </div>
    </section>
  );
}
