"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Smartphone } from "lucide-react";
import styles from "./TechnicalSpecs.module.css";

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
      title: "MERN Stack",
      text: "React, Node.js, Express, MongoDB. Industry standard for performance.",
      icon: <Cpu size={24} />,
    },
    {
      title: "Next.js 15",
      text: "Server-side rendering for elite SEO and instant load times.",
      icon: <Zap size={24} />,
    },
    {
      title: "Secure Architecture",
      text: "Enterprise-grade security protocols for all data transactions.",
      icon: <Shield size={24} />,
    },
    {
      title: "Cloud Native",
      text: "Optimized for high-availability cloud environments.",
      icon: <Smartphone size={24} />,
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
          <span className={styles.label}>Hardware & Infrastructure</span>
          <h2 className={styles.title}>Under the Hood</h2>
          <p className={styles.subtitle}>
            Built for scale. Engineered for absolute control.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              className={`${styles.card} glass`}
              variants={itemVariants}
            >
              <div className={styles.iconWrapper}>{spec.icon}</div>
              <h3 className={styles.cardTitle}>{spec.title}</h3>
              <p className={styles.cardText}>{spec.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
