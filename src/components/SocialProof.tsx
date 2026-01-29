"use client";

import { motion } from "framer-motion";

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

export default function SocialProof() {
  const stats = [
    { value: "100%", label: "Data Ownership" },
    { value: "500ms", label: "Avg. Load Time" },
    { value: "24/7", label: "System Uptime" },
  ];

  return (
    <section className="py-24 bg-card border-y border-border overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Header Block */}
          <div className="md:col-span-2 lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Engineered for World-Class Teams
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our infrastructure powers the next generation of digital
              enterprises with uncompromising speed and reliability.
            </p>
          </div>

          {/* Stats Blocks */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 bg-background border border-border rounded-lg flex flex-col justify-center items-center text-center"
            >
              <span className="text-4xl font-bold text-primary mb-2 display-block">
                {stat.value}
              </span>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Marquee Block */}
        <div className="mt-16 relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />

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
                  className="text-xl font-medium text-muted-foreground/60 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
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
