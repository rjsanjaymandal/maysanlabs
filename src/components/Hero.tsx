"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import BackgroundBeams from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import HolographicGlobe from "@/components/HolographicGlobe";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-background">
      {/* Cinematic Depth Glows */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <HolographicGlobe />

      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* Scaled Headlines */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="max-w-6xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[9.5rem] font-black mb-10 leading-[0.8] tracking-tighter uppercase break-words relative flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white"
            >
              We build
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-brand-primary italic relative"
            >
              software
              <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl rounded-full -z-10" />
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white"
            >
              that scales.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/40 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-16 tracking-tight"
          >
            Reliable apps for modern companies. <br className="hidden md:block" /> 
            We turn complex ideas into simple solutions.
          </motion.p>
        </motion.div>

        {/* Multi-CTA Pill Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-10"
        >
          <Link href="/init">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="div"
              className="bg-black text-white flex items-center gap-3 px-12 py-5 text-xs font-black uppercase tracking-widest"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </HoverBorderGradient>
          </Link>
          
          <Link href="/engineering" className="text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-brand-primary transition-all duration-300 flex items-center gap-4 group">
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all">
               <Play size={14} fill="currentColor" />
             </div>
             See our work
          </Link>
        </motion.div>
      </div>

      {/* Subtle Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}