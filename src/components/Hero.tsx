"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, ArrowDown } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

const benefits = [
  "Enterprise-grade architecture",
  "99.99% uptime guarantee",
  "Scalable to millions of users"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-background">
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
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            Trusted by 50+ Enterprise Companies
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="heading-xl text-white max-w-4xl">
            Build <span className="text-brand-primary">Scalable SaaS</span> <br />
            Products That <span className="text-white/60">Scale</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="mt-6 max-w-2xl mx-auto"
          >
          <p className="text-white/50 text-lg leading-relaxed">
            Full-stack development studio specializing in enterprise SaaS applications. 
            From MVP to millions of users - we help you scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4 mb-10"
        >
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-white/40 text-sm px-3 py-1.5 bg-white/5 rounded-full">
              <CheckCircle2 size={14} className="text-brand-primary" />
              {benefit}
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/init" className="group px-8 py-3.5 bg-brand-primary rounded-full font-semibold text-sm text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:scale-[1.02] flex items-center gap-2">
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link href="/products" className="px-8 py-3.5 rounded-full border border-white/10 text-white/70 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
             <Play size={14} fill="currentColor" />
             View Our Work
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <Link href="#services" className="text-white/30 text-sm hover:text-white/50 transition-colors flex flex-col items-center gap-2">
            <span>Explore our services</span>
            <ArrowDown size={16} className="animate-bounce" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}