"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Smartphone } from "lucide-react";
import styles from "./TechnicalSpecs.module.css";
import SpotlightCard from "./SpotlightCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TechnicalSpecs() {
  const specs = [
    {
      title: "Core Stack",
      text: "MERN Framework (React, Node.js) for ultra-low latency operations.",
      icon: <Cpu size={24} />,
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Next.js 15 Engine",
      text: "Cutting-edge SSR and partial pre-rendering for unmatched speed and SEO dominance.",
      icon: <Zap size={24} />,
      size: "col-span-12 md:col-span-8",
      variant: "featured",
    },
    {
      title: "Encrypted Protocol",
      text: "Bank-level security layers integrated at the core of every transaction.",
      icon: <Shield size={24} />,
      size: "col-span-12 md:col-span-6",
    },
    {
      title: "Cloud Distribution",
      text: "High-availability edge network ensuring your tools are always online.",
      icon: <Smartphone size={24} />,
      size: "col-span-12 md:col-span-6",
    },
  ];

  return (
    <section id="tech-specs" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>System Architecture</span>
          <h2 className={styles.title}>The Engineering Standard</h2>
          <p className={styles.subtitle}>
            We don&apos;t just build apps. We engineer robust, enterprise-grade
            digital foundations.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              className={`${spec.size} bento-item`}
              variants={itemVariants}
            >
              <SpotlightCard featured={spec.variant === "featured"}>
                <div className={styles.cardInner}>
                  <div className={styles.iconWrapper}>{spec.icon}</div>
                  <h3 className={styles.cardTitle}>{spec.title}</h3>
                  <p className={styles.cardText}>{spec.text}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
