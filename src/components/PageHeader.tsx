"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  label: string;
}

export default function PageHeader({
  title,
  subtitle,
  label,
}: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 relative bg-[var(--bg-dark)]">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container-main relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
            {label}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-5 leading-tight">
            {title.split("_").map((word, i) => (
              <span key={i}>
                {i > 0 && " "}
                {i === 1 ? <span className="text-brand-primary">{word}</span> : word}
              </span>
            ))}
          </h1>
          <p className="text-foreground/50 text-lg md:text-xl leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent" />
    </section>
  );
}
