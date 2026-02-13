"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const technologies = [
  "Next.js",
  "React",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Docker",
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
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const stats = [
    { value: "100", suffix: "%", label: "Data Ownership" },
    { value: "500", suffix: "ms", label: "Avg. Load Time" },
    { value: "24/7", suffix: "", label: "System Uptime" },
  ];

  return (
    <section className="py-24 relative overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Header Block */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Engineered for
              <br />
              <span className="text-gradient">World-Class Teams</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Our infrastructure powers the next generation of digital
              enterprises with uncompromising speed and reliability.
            </p>
          </div>

          {/* Stats Blocks */}
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-8 flex flex-col justify-center items-center text-center glow-hover"
            >
              <span className="text-4xl font-bold text-primary mb-2">
                {stat.value === "24/7" ? (
                  "24/7"
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </span>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-16 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 items-center whitespace-nowrap"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              {[
                ...technologies,
                ...technologies,
                ...technologies,
                ...technologies,
              ].map((tech, i) => (
                <span
                  key={i}
                  className="text-lg font-medium text-muted-foreground/40 flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
