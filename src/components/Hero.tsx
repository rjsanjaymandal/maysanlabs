"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import WordPullUp from "@/components/ui/word-pull-up";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden bg-background">
      {/* Dynamic Background Depth */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#A3E635"
        />
      </div>
      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* Editorial Headline */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <WordPullUp
              words="Engineering the future of software."
              className="heading-xl text-silver-gradient italic"
            />
          </motion.div>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="mt-8 sm:mt-12"
          >
            <p className="text-white/40 text-lg sm:text-xl md:text-3xl max-w-3xl mx-auto font-medium leading-tight tracking-tighter uppercase px-4">
              High-performance systems for <br />
              <span className="text-brand-gradient">global scale.</span>
            </p>
          </motion.div>
        </div>

        {/* Studio CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-12 mt-12"
        >
          <Link href="/init" className="group relative px-12 py-5 bg-brand-primary rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_0_50px_rgba(163,230,53,0.4)]">
            <span className="relative z-10 text-xs font-black uppercase tracking-widest text-black flex items-center gap-3">
              Start Project
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </Link>
          
          <Link href="/engineering" className="text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all duration-500 flex items-center gap-6 group">
             <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-700 shadow-2xl">
               <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform duration-500" />
             </div>
             Our Studio
          </Link>
        </motion.div>
      </div>

      {/* Grid Floor Effect */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
    </section>
  );
}