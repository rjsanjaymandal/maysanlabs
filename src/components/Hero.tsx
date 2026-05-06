"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, ArrowDown } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const benefits = [
  "Enterprise-grade architecture",
  "99.99% uptime guarantee",
  "Scalable to millions"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-20 md:pt-24 overflow-hidden bg-background">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#A3E635"
        />
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-brand-primary/5 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 md:mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60 text-xs sm:text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="hidden sm:inline">Trusted by 50+ companies worldwide</span>
            <span className="sm:hidden">50+ companies</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-5 md:mb-6"
        >
          <h1 className="heading-xl text-white max-w-4xl">
            Build <span className="text-brand-primary">scalable SaaS</span> <br />
            products that <span className="text-white/50">grow with you</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="mt-3 md:mt-4 max-w-xl md:max-w-2xl mx-auto"
          >
          <p className="text-white/45 text-sm sm:text-base md:text-lg leading-relaxed">
            Full-stack development studio specializing in enterprise SaaS. 
            From MVP to millions of users—we help you scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:8"
        >
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-1.5 md:gap-2 text-white/35 text-xs md:text-sm px-3 py-1.5 bg-white/[0.02] rounded-full">
              <CheckCircle2 size={12} className="text-brand-primary" />
              {benefit}
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link href="/init" className="group px-7 sm:px-8 py-4 bg-gradient-to-r from-brand-primary to-[#60A5FA] rounded-full font-extrabold text-sm text-white shadow-lg hover:shadow-[0_0_30px_rgba(26,109,214,0.6)] hover:scale-[1.02] hover:brightness-110 transition-all duration-300 flex items-center gap-2 uppercase tracking-wider">
            Book a free 30-min discovery call
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          
          <Link href="/products" className="px-7 sm:px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/70 font-bold text-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/25 flex items-center gap-2 uppercase tracking-wider">
              <Play size={11} fill="currentColor" />
              <span className="hidden sm:inline">View Our Work</span>
              <span className="sm:hidden">Work</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 md:mt-16"
        >
          <Link href="#services" className="text-white/25 text-xs sm:text-sm hover:text-white/40 transition-colors flex flex-col items-center gap-1.5">
            <span>Explore services</span>
            <ArrowDown size={12} className="animate-bounce" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}