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
    { value: "100", suffix: "%", label: "Full Control", icon: <Shield size={16} /> },
    { value: "500", suffix: "ms", label: "Loading Speed", icon: <Activity size={16} /> },
    { value: "24/7", suffix: "", label: "Always Online", icon: <Zap size={16} /> },
  ];

  return (
    <section className="py-40 relative overflow-hidden bg-background">
      <div className="container relative z-10">
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
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary block mb-6 px-4 py-1.5 bg-primary/10 rounded-full w-fit">
              Our Performance
            </span>
            <h2 className="text-massive leading-[1.1] font-bold mb-8">
              Fast <span className="font-accent lowercase text-primary italic">software</span> for<br />
              Growing Brands.
            </h2>
            <p className="text-sm font-medium text-foreground/50 leading-loose border-l border-border/50 pl-8 max-w-sm">
              We build software that stays fast and keeps your information secure. We measure our success in how well your business grows.
            </p>
          </motion.div>

          {/* Stats Blocks */}
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
             {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-10 flex flex-col justify-between bg-secondary/30 rounded-[2.5rem] border border-transparent hover:border-primary/10 transition-all duration-500 hover:bg-secondary/50 group"
                >
                  <div className="flex justify-between items-start mb-12">
                     <div className="text-primary bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                        {stat.icon}
                     </div>
                     <span className="text-[10px] font-bold text-primary/30 uppercase tracking-widest">Node 0{index+1}</span>
                  </div>
                  
                  <div>
                    <div className="text-5xl font-bold text-foreground mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500">
                      {stat.value === "24/7" ? "24/7" : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
                    </div>
                    <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
             ))}
             
             {/* Filler Node */}
             <motion.div 
                variants={itemVariants}
                className="p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10 flex flex-col justify-center items-center group hover:bg-primary/10 transition-all duration-500"
             >
                <div className="p-6 bg-white rounded-3xl shadow-xl shadow-primary/5 group-hover:scale-110 transition-transform duration-700">
                  <Globe size={32} className="text-primary group-hover:rotate-90 transition-all duration-1000" />
                </div>
                <span className="text-[10px] font-bold mt-6 text-primary tracking-[0.2em] uppercase">Global Sync Active</span>
             </motion.div>
          </div>
        </motion.div>

        {/* Technical Marquee (Data Stream) */}
        <div className="mt-40 border-t border-border/50 py-12 relative overflow-hidden" aria-label="System library status">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-24 items-center whitespace-nowrap"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[
                ...technologies,
                ...technologies,
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 text-[10px] font-bold tracking-[0.3em] text-foreground/30 uppercase"
                >
                  <span className="text-primary/40 font-black">●</span>
                  <span>{tech}</span>
                  <div className="w-1.5 h-px bg-border group-hover:bg-primary/20 transition-colors" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
