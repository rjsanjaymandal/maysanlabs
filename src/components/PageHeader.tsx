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
    <section className="pt-32 pb-16 bg-muted/10 border-b border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest mb-4 block">
            {label}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {title.replace(/_/g, " ")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
