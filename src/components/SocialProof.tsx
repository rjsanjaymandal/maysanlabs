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
    { value: "100", suffix: "%", label: "Security", icon: <Shield size={16} /> },
    { value: "50", suffix: "ms", label: "Speed", icon: <Activity size={16} /> },
    { value: "99.9", suffix: "%", label: "Reliability", icon: <Zap size={16} /> },
  ];

  return (
    <section className="sec-xl bg-background overflow-hidden relative">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-main relative z-10">
        
        {/* Trusted By Marquee */}
        <div className="mb-48 relative overflow-hidden" aria-label="Trusted by companies">
          <div className="flex overflow-hidden relative py-4">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <motion.div
              className="flex gap-40 items-center whitespace-nowrap"
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
                  className="flex items-center gap-6 text-[10px] font-black tracking-[0.3em] text-white/10 uppercase"
                >
                  <div className="w-1 h-1 bg-brand-primary/30 rounded-full" />
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-24"
        >
          {/* Header Block */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="label-mono !mb-8 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              Performance
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.8]">
              Built for<br />
              <span className="text-brand-primary italic">speed.</span>
            </h2>
            <p className="text-2xl font-medium text-white/30 leading-relaxed border-l border-white/5 pl-10 max-w-sm tracking-tight">
              We test everything to ensure your system is fast, reliable, and ready for launch.
            </p>
          </motion.div>

          {/* Stats Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
             {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="maysan-card flex flex-col justify-between group !p-12 hover:bg-white/[0.04] transition-all duration-700"
                >
                  <div className="flex justify-between items-start mb-16">
                     <div className="text-brand-primary bg-white/5 rounded-2xl w-14 h-14 flex items-center justify-center border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 shadow-2xl">
                        {stat.icon}
                     </div>
                  </div>
                  
                  <div>
                    <div className="text-6xl font-black text-white mb-6 tracking-tighter italic">
                       <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs font-black text-white/20 group-hover:text-white/60 transition-colors uppercase tracking-widest">
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
