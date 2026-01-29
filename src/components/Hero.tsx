"use client";

import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden">
      {/* Background Gradient - Subtle & Professional */}
      <div className="absolute inset-0 bg-gradient-radial from-secondary/20 to-background pointer-events-none" />

      <div className="container relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Core Operating Systems <br />
            <span className="text-gradient">Enterprise Command</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Architecting high-performance digital infrastructure for the modern
            enterprise. Modular SaaS ecosystems and autonomous operational
            layers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/init" className="btn btn-primary text-lg px-8 py-4">
              <Zap size={20} className="mr-2" />
              Get in Touch
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="#solution"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
