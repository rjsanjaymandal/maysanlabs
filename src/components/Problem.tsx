"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Users, Database } from "lucide-react";
import styles from "./Problem.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Problem() {
  const problems = [
    {
      title: "Plugin Chaos",
      text: "Enterprise systems often require dozens of expensive external plugins just to function. It creates a brittle dependency chain.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "Operation Bottlenecks",
      text: "Managing siloed tools for CRM, ERP, and Cloud storage wastes time. You shouldn't have to fight your own technology.",
      icon: <Users size={24} />,
    },
    {
      title: "Data Fragility",
      text: "Relying on closed platforms means you don't truly own your records. Own your infrastructure, own your business future.",
      icon: <Database size={24} />,
    },
  ];

  return (
    <section id="problem" className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.label}>The Challenge</span>
          <h2 className={styles.title}>Broken Infrastructure Stifles Growth</h2>
          <p className={styles.description}>
            Modern firms need unified systems. Fragmented tools lead to manual
            errors and lost opportunities.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problems.map((prob, index) => (
            <motion.div
              key={index}
              className={`${styles.card} glass`}
              variants={itemVariants}
            >
              <div className={styles.iconWrapper}>{prob.icon}</div>
              <h3 className={styles.cardTitle}>{prob.title}</h3>
              <p className={styles.cardText}>{prob.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
