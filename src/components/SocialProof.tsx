"use client";

import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, Shield, Zap, Globe } from "lucide-react";

const technologies = [
  "NEXT_JS_15",
  "REACT_LIB",
  "NODE_RUNTIME",
  "MONGO_DB_ATLAS",
  "TAILWIND_V4",
  "FRAMER_ENGINE",
  "TYPE_SCRIPT_CORE",
  "POSTGRE_SQL",
  "AWS_CLOUD",
  "DOCKER_CONTAINER",
];

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

export default function SocialProof() {
  const stats = [
    { value: "100", suffix: "%", label: "DATA_OWNERSHIP", icon: <Shield size={14} /> },
    { value: "500", suffix: "ms", label: "AVG_LATENCY", icon: <Activity size={14} /> },
    { value: "24/7", suffix: "", label: "SYSTEM_UPTIME", icon: <Zap size={14} /> },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 tactical-grid opacity-5" />
      
      <div className="container relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-border/20 border border-border p-1"
        >
          {/* Header Block */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 p-12 flex flex-col justify-center bg-card relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary font-bold block mb-6">
              [ PERFORMANCE_TELEMETRY ]
            </span>
            <h2 className="text-massive leading-[0.8] mb-8">
              WORLD_CLASS<br />
              <span className="text-primary italic">VELOCITY</span>
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed max-w-sm">
              uncompromising speed and data sovereignty for the next generation of global digital empires.
            </p>
          </motion.div>

          {/* Stats Blocks */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-1">
             {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card-brutalist p-10 flex flex-col justify-between bg-card group"
                >
                  <div className="flex justify-between items-start mb-12">
                     <div className="text-primary opacity-30 group-hover:opacity-100 transition-opacity">
                        {stat.icon}
                     </div>
                     <span className="font-mono text-[8px] opacity-30 uppercase tracking-tighter">TELEMETRY_NODE_0{index+1}</span>
                  </div>
                  
                  <div>
                    <div className="text-5xl font-mono font-black text-foreground mb-4 tracking-tighter group-hover:text-primary transition-colors">
                      {stat.value === "24/7" ? "24/7" : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
             ))}
             
             {/* Filler Node */}
             <motion.div 
                variants={itemVariants}
                className="card-brutalist p-10 bg-primary/5 border border-primary/10 flex flex-col justify-center items-center group"
             >
                <Globe size={32} className="text-primary/20 group-hover:text-primary group-hover:rotate-90 transition-all duration-700" />
                <span className="font-mono text-[8px] mt-4 opacity-30">GLOBAL_SYNC_ACTIVE</span>
             </motion.div>
          </div>
        </motion.div>

        {/* Technical Marquee (Data Stream) */}
        <div className="mt-24 border-t border-b border-border py-8 relative overflow-hidden" aria-label="System library status">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-20 items-center whitespace-nowrap"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[
                ...technologies,
                ...technologies,
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground/40"
                >
                  <span className="text-primary font-bold">[ OK ]</span>
                  <span>{tech}</span>
                  <div className="w-1 h-1 bg-primary/20" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
