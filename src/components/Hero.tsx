"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SaaSNodeVisual from "@/components/SaaSNodeVisual";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ArrowDown,
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
  const [activeGoal, setActiveGoal] = useState("saas");
  const currentGoal = goals.find((g) => g.id === activeGoal) || goals[0];
  const GoalIcon = currentGoal.icon;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container-main relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-white/70 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-foreground/70 text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span>maysanlabs — trusted by 50+ business leaders globally</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="font-sans heading-xl text-foreground max-w-4xl tracking-tight leading-[1.1]">
            <span className="text-foreground/60 text-base sm:text-lg font-semibold block mb-2">Maysan Labs</span>
            We build the <span className="bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(26,109,214,0.25)] dark:drop-shadow-[0_0_20px_rgba(26,109,214,0.4)]">custom apps, websites & dashboards</span> that run your business
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            maysanlabs is a software development studio. You focus on growing your business. We design, build, and ship the software — from internal dashboards and automated workflows to customer-facing apps and websites. No coding required from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 mb-8 w-full max-w-4xl"
        >
          <SaaSNodeVisual />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-8 w-full max-w-3xl bg-white/50 dark:bg-white/[0.01] border border-gray-100 dark:border-white/[0.06] rounded-[2px] p-4 sm:p-6 backdrop-blur-md shadow-sm"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-gray-100/50 dark:bg-white/[0.02] border border-gray-200/50 dark:border-white/[0.05] rounded-[2px] mb-6">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGoal(g.id)}
                className={`px-5 py-2.5 rounded-[2px] text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeGoal === g.id
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25 scale-[1.01]"
                    : "text-foreground/50 hover:text-foreground hover:bg-white/[0.03]"
                }`}
              >
                {g.tabText}
              </button>
            ))}
          </div>

          <div className="mt-6 text-left min-h-[170px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGoal}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start"
              >
                <div className="md:col-span-3">
                  <h2 className="text-base sm:text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[2px] bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <GoalIcon size={16} />
                    </div>
                    {currentGoal.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed font-medium">
                    {currentGoal.desc}
                  </p>
                </div>

                <div className="p-4 rounded-[2px] bg-brand-primary/[0.03] border border-brand-primary/10 text-center flex flex-col justify-center h-full">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block mb-1">Impact</span>
                  <span className="text-sm sm:text-base font-black text-foreground">{currentGoal.metric}</span>
                  <span className="text-[10px] text-foreground/45 mt-1 leading-snug font-medium block">
                    {currentGoal.detail}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2.5 mb-8"
        >
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-1.5 md:gap-2 text-foreground/60 text-[11px] sm:text-xs md:text-sm px-3.5 py-1.5 bg-white/70 dark:bg-white/[0.04] rounded-[2px] shadow-sm border border-gray-100 dark:border-white/10 font-medium">
              <CheckCircle2 size={12} className="text-brand-primary shrink-0" />
              {benefit}
            </div>
          ))}
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-4 sm:px-0"
        >
          <Link href="/start" onClick={() => { if (typeof window !== "undefined") { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "cta_click", label: "hero_discovery_call" }); } }} className="w-full sm:w-auto bg-brand-primary text-white px-7 py-3 rounded-[2px] font-bold hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 text-sm">
            <span>Book a free 30-min discovery call</span>
            <ArrowRight size={14} className="shrink-0" />
          </Link>
          
          <Link href="/case-studies" className="w-full sm:w-auto bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-foreground px-6 py-3 rounded-[2px] font-bold hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-brand-primary/30 dark:hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-sm">
            <Play size={10} fill="currentColor" className="shrink-0" />
            <span>View Our Work</span>
          </Link>
        </motion.div>

        <div className="mt-12 md:mt-16">
          <Link href="#services" className="text-foreground/45 text-xs hover:text-foreground/75 transition-colors flex flex-col items-center gap-1.5 font-bold uppercase tracking-wider">
            <span>Explore Services</span>
            <ArrowDown size={12} className="animate-bounce" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
