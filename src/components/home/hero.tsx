"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-main relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-foreground/70 text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            Trusted by 50+ businesses globally
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-sans text-[36px] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] text-foreground max-w-4xl">
            Custom software that{" "}
            <span className="text-gradient-brand">runs your business</span>
          </h1>
          <p className="text-foreground/60 text-base sm:text-lg mt-6 max-w-xl mx-auto font-medium">
            SaaS platforms, automation tools, mobile apps, and websites — built by expert engineers.
            No templates. No coding required from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link href="/start" className="w-full sm:w-auto bg-brand-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 text-sm">
            Book a free discovery call
            <ArrowRight size={14} className="shrink-0" aria-hidden="true" />
          </Link>

          <Link href="/case-studies" className="w-full sm:w-auto bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-foreground px-7 py-3.5 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-brand-primary/30 dark:hover:border-brand-primary/30 hover:text-brand-primary transition-all flex items-center justify-center gap-2 shadow-sm text-sm">
            <Play size={10} fill="currentColor" aria-hidden="true" />
            View our work
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
