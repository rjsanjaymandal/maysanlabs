"use client";

import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<50ms", label: "Response Time" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden noise-bg">
      {/* Animated Gradient Orbs */}
      <div
        aria-hidden="true"
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
        aria-hidden="true"
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
        aria-hidden="true"
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

      {/* Grid Background with beams */}
      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40" />

      {/* Animated Beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute h-[1px] w-[500px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ top: "20%", left: "-500px" }}
          animate={{ left: ["-20%", "120%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute h-[1px] w-[400px] bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"
          style={{ top: "45%", left: "-400px" }}
          animate={{ left: ["-10%", "110%"] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(var(--primary),0.1),transparent_50%)]" />
      </div>

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_75%)]" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm text-muted-foreground mb-8"
          >
            <CheckCircle size={14} className="text-primary" />
            <span>Trusted by enterprise teams across India</span>
          </motion.div>

          {/* Headline with TextReveal */}
          <div className="mb-8">
            <TextReveal
              as="h1"
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-[0.85] mb-6"
            >
              Engineering Enterprise Velocity
            </TextReveal>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12 font-medium"
          >
            SaaS infrastructure, modular architectures, and autonomous
            operational layers — engineered for the
            <span className="text-foreground"> modern digital empire</span>.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <MagneticButton
              href="/init"
              className="btn btn-primary text-lg px-8 py-4"
            >
              <Zap size={20} className="mr-1" />
              Get in Touch
              <ArrowRight size={20} className="ml-1" />
            </MagneticButton>
            <MagneticButton
              href="#solution"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Explore Solutions
            </MagneticButton>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
