"use client";

import { motion } from "framer-motion";
import BackgroundBeams from "@/components/ui/background-beams";

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
    <section className="relative pt-32 pb-16 overflow-hidden bg-[var(--bg-dark)]">
      <BackgroundBeams />
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-medium mb-6">
            {label}
          </span>
          <h1 className="heading-lg text-white mb-4">
            {title.split("_").map((word, i) => (
              <span key={i}>
                {i > 0 && " "}
                {i === 1 ? <span className="text-brand-primary">{word}</span> : word}
              </span>
            ))}
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
