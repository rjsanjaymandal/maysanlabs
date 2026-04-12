"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Cpu } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HolographicGlobe } from "@/components/HolographicGlobe";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-[#0d1117]">
      {/* Background Beams Effect (Aceternity) */}
      <BackgroundBeams />
      <HolographicGlobe />

      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* Scaled Headlines */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-5xl"
        >
          <h1 className="hero-title text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter uppercase break-words">
            We build <em className="text-[var(--brand-primary)] not-italic font-medium italic">high-fidelity</em> <br />
            Enterprise<br className="block sm:hidden" /> Infrastructure.
          </h1>
          
          <p className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Engineered systems for autonomous scale. We resolve complexity through industrial-grade code and surgical precision.
          </p>
        </motion.div>

        {/* Multi-CTA Pill Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/init">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="div"
              className="bg-black text-white flex items-center gap-2"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight size={18} />
            </HoverBorderGradient>
          </Link>
          
          <Link href="/engineering" className="pill-btn pill-btn-secondary min-w-[200px] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] h-[58px]">
             <Play size={16} fill="currentColor" />
             Watch Breakdown
          </Link>
        </motion.div>


      </div>

      {/* Background Visual Asset (Surgical Frame) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/20 to-transparent" />
    </section>
  );
}