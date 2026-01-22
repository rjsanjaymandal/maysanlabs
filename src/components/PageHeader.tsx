"use client";

import { motion } from "framer-motion";
import styles from "./PageHeader.module.css";
import GlitchText from "./GlitchText";

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
    <section className={styles.headerSection}>
      <div className="blueprint-line-v" style={{ left: "10%", opacity: 0.1 }} />
      <div className="blueprint-line-v" style={{ left: "90%", opacity: 0.1 }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.content}
        >
          <span className={styles.label}>{label}</span>
          <h1 className={styles.title}>
            <GlitchText text={title} />
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>
      </div>
      <div className={styles.bottomBorder} />
    </section>
  );
}
