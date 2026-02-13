"use client";

import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<50ms", label: "Response Time" },
  { value: "50+", label: "Projects Delivered" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden noise-bg">
      {/* Animated Gradient Orbs */}
      <div
        className="orb"
        style={{
          width: 600,
          height: 600,
          background: "hsla(82, 85%, 55%, 0.08)",
          top: "-10%",
          right: "-10%",
        }}
      />
      <div
        className="orb"
        style={{
          width: 500,
          height: 500,
          background: "hsla(82, 85%, 55%, 0.05)",
          bottom: "-15%",
          left: "-10%",
          animationDelay: "-7s",
        }}
      />
      <div
        className="orb"
        style={{
          width: 300,
          height: 300,
          background: "hsla(220, 70%, 50%, 0.06)",
          top: "40%",
          left: "30%",
          animationDelay: "-14s",
        }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm text-muted-foreground mb-8"
          >
            <CheckCircle size={14} className="text-primary" />
            <span>Trusted by enterprise teams across India</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground mb-8 leading-[0.95]"
          >
            Build Systems That
            <br />
            <span className="text-gradient">Scale Globally</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Enterprise-grade SaaS infrastructure, modular architectures, and
            autonomous operational layers — engineered for the modern digital
            enterprise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/init" className="btn btn-primary text-lg px-8 py-4">
              <Zap size={20} className="mr-1" />
              Get in Touch
              <ArrowRight size={20} className="ml-1" />
            </Link>
            <Link
              href="#solution"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Explore Solutions
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
