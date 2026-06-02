"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  ArrowDown
} from "lucide-react";

const benefits = [
  "Built Just for Your Business (No Templates)",
  "Highly Secure & Private",
  "Easy for Anyone to Use"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-20 md:pt-24 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container-main relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 md:mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-foreground/70 text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="hidden sm:inline">Trusted by 50+ companies worldwide</span>
            <span className="sm:hidden">50+ companies</span>
          </span>
        </div>

        <div className="mb-5 md:mb-6">
          <h1 className="font-sans heading-xl text-foreground max-w-4xl">
            Get <span className="text-brand-primary">Custom Software & AI tools</span> <br className="hidden md:block" />
            built to grow <span className="text-brand-primary">your business</span>
          </h1>
        </div>

        <div className="mt-3 md:mt-4 max-w-xl md:max-w-2xl mx-auto">
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed">
            We build custom software, mobile apps, and smart AI tools that save you time, reduce your staffing costs, and automate daily business tasks. No tech background required — we handle everything from design to launch.
          </p>
        </div>

        <div className="mt-5 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-1.5 md:gap-2 text-foreground/60 text-[11.5px] sm:text-xs md:text-sm px-3 py-1.5 bg-white/70 dark:bg-white/[0.05] rounded-full shadow-sm border border-gray-100 dark:border-white/10">
              <CheckCircle2 size={12} className="text-brand-primary shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
  
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-3 sm:px-0">
          <Link href="/start" className="w-full sm:w-auto bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors flex items-center justify-center gap-2">
            <span className="text-center">Book a free 30-min discovery call</span>
            <ArrowRight size={14} className="shrink-0" />
          </Link>
          
          <Link href="/products" className="w-full sm:w-auto bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-foreground px-6 py-3 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-brand-primary/30 dark:hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm">
            <Play size={11} fill="currentColor" className="shrink-0" />
            <span>View Our Work</span>
          </Link>
        </div>

        <div className="mt-10 md:mt-16">
          <Link href="#services" className="text-foreground/40 text-xs sm:text-sm hover:text-foreground/60 transition-colors flex flex-col items-center gap-1.5">
            <span>Explore services</span>
            <ArrowDown size={12} className="animate-bounce" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}