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
    <section className="relative pt-44 pb-20 overflow-hidden bg-[var(--bg-dark)]">
      {/* Background Beams for consistent depth */}
      <BackgroundBeams />
      
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <span className="announcement-bar !mb-8">
            {label}
          </span>
          <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase">
            {title.split("_").map((word, i) => (
              <span key={i}>
                {i > 0 && " "}
                {i === 1 ? <span className="text-brand-primary italic uppercase">{word}</span> : word}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-white/85 leading-relaxed max-w-2xl font-medium">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Industrial Divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
