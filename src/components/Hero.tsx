"use client";

import { motion, Variants, Transition } from "framer-motion";
import { Terminal, Activity, Zap, ArrowRight, Shield, Globe, Box } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-start lg:justify-center items-center pt-48 lg:pt-32 pb-20 overflow-hidden bg-background font-sans">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-overlay opacity-40" />
        <div className="radial-glow top-0 right-0 -translate-y-1/2 translate-x-1/2" />
        <div className="radial-glow bottom-0 left-0 translate-y-1/2 -translate-x-1/2 opacity-50" />
      </div>

      <div className="container relative z-20 text-center max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
             <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full">
               Engineering Suite
             </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-massive leading-[1.1] mb-10 text-foreground font-bold">
            We build <span className="font-accent lowercase text-primary italic">fast</span>, secure software<br />
            for <span className="font-accent lowercase text-primary italic">growing</span> businesses.
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg sm:text-xl text-foreground/60 mb-14 max-w-2xl leading-relaxed font-medium">
             We help companies build modern online stores and custom tools that are easy to use and stay <span className="text-foreground">reliable as you grow.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/init"
              className="btn-surgical group"
            >
              <span className="relative z-10 flex items-center gap-3">
                GET STARTED
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/solutions"
              className="px-10 py-5 border border-foreground/10 text-foreground font-bold text-xs tracking-widest uppercase hover:bg-foreground hover:text-background transition-all rounded-full flex items-center gap-3"
            >
              SEE SOLUTIONS
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Wireframe Asset */}
      <motion.div 
        className="absolute top-1/2 -right-24 -translate-y-1/2 w-96 h-96 opacity-30 pointer-events-none hidden lg:block"
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 0.3, rotate: 0, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
      >
        <img 
          src="/assets/wireframe-sphere.png" 
          alt="Technical Wireframe" 
          className="w-full h-full object-contain mix-blend-screen animate-pulse-slow mask-radial-fade" 
        />
      </motion.div>

      {/* Abstract Architectural Line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-primary/50 to-transparent opacity-50" />
    </section>
  );
}
