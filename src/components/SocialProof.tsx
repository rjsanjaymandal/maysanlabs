"use client";

import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, Shield, Zap, TerminalSquare } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(numericTarget)) {
      setDisplay(target);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericTarget * eased);
      setDisplay(String(current));

      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono font-black tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

const enterprises = [
  "DHL LOGISTICS",
  "TITAN CAPITAL",
  "NEXUS VENTURE",
  "CYBERSYSTEMS INC.",
  "QUANTUM DYNAMICS",
  "AEGIS NETWORKS",
];

export default function SocialProof() {
  const stats = [
    { value: "100", suffix: "%", label: "Sovereignty", icon: <Shield size={16} /> },
    { value: "50", suffix: "ms", label: "Runtime Latency", icon: <Activity size={16} /> },
    { value: "99.9", suffix: "%", label: "Uptime SLA", icon: <Zap size={16} /> },
  ];

  return (
    <section className="sec-lg bg-black">
      <div className="container-main">
        
        {/* Trusted By Marquee directly under Hero */}
        <div className="mb-32 relative overflow-hidden" aria-label="Trusted by enterprises">
          <div className="flex overflow-hidden relative">
            {/* Gradient Mask for fading edges */}
            <div className="absolute inset-0 top-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
            <motion.div
              className="flex gap-24 items-center whitespace-nowrap"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[
                ...enterprises,
                ...enterprises,
                ...enterprises,
              ].map((ent, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 text-[11px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase"
                >
                  <span className="text-brand-primary/60 font-black">■</span>
                  <span>{ent}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Header Block */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="announcement-bar !mb-8">
               Metrics Aggregation
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Deterministic<br />
              <span className="text-brand-primary italic lowercase">performance.</span>
            </h2>
            <p className="text-sm font-medium text-white/85 leading-loose border-l border-white/10 pl-8 max-w-sm">
              We monitor throughput, latency, and uptime strictly. Our infrastructure runs on zero-trust principles guaranteeing 10x production speed.
            </p>
          </motion.div>

          {/* Stats Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
             {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="maysan-card flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-start mb-12">
                     <div className="text-brand-primary bg-brand-primary/10 rounded-[var(--radius-md)] w-12 h-12 flex items-center justify-center border border-brand-primary/20 shadow-[0_0_15px_rgba(162,255,0,0.1)] group-hover:scale-110 transition-transform duration-500">
                        {stat.icon}
                     </div>
                     <span className="font-mono text-[9px] font-bold text-brand-primary/60 uppercase tracking-[0.3em]">TELEMETRY_0{index+1}</span>
                  </div>
                  
                  <div>
                    <div className="text-5xl font-black text-white mb-4 tracking-tighter">
                       <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
