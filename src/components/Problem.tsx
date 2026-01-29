"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Users, Database } from "lucide-react";
import styles from "./Problem.module.css";
import SpotlightCard from "./SpotlightCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Problem() {
  const problems = [
    {
      title: "Dependency Fragility",
      text: "Modern systems often rely on a brittle chain of expensive plugins. When one breaks, your entire enterprise stalls.",
      icon: <AlertTriangle size={24} />,
      size: "col-span-12 md:col-span-7",
      variant: "featured",
    },
    {
      title: "Siloed Operations",
      text: "Managing fragmented tools for CRM and ERP creates massive bottlenecks.",
      icon: <Users size={24} />,
      size: "col-span-12 md:col-span-5",
    },
    {
      title: "Data Ownership",
      text: "Stop leasing your business intelligence. Own your data infrastructure completely.",
      icon: <Database size={24} />,
      size: "col-span-12 md:col-span-12",
    },
  ];

  return (
    <section id="problem" className={styles.section}>
      <div className={`container`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>The Diagnostic</span>
          <h2 className={`${styles.title} hollow-text`}>
            Systemic Infrastructure Failures
          </h2>
          <p className={styles.description}>
            We identify the hidden fractures in your digital foundation before
            they become critical failures.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              className={`${prob.size} bento-item`}
              variants={itemVariants}
            >
              <SpotlightCard featured={prob.variant === "featured"}>
                <div className={styles.cardInner}>
                  <div className={styles.iconWrapper}>{prob.icon}</div>
                  <h3 className={styles.cardTitle}>{prob.title}</h3>
                  <p className={styles.cardText}>{prob.text}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
