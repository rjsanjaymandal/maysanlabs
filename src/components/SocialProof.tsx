"use client";

import { motion } from "framer-motion";
import styles from "./SocialProof.module.css";

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
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.bentoGrid}>
          {/* Header Block */}
          <motion.div
            className={`${styles.bentoItem} ${styles.headerBlock}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.title}>Engineered for World-Class Teams</h2>
            <p className={styles.subtitle}>
              Our infrastructure powers the next generation of digital empires
              with uncompromising speed and reliability.
            </p>
          </motion.div>

          {/* Stats Blocks */}
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`${styles.bentoItem} ${styles.statBlock}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="system-pulse" style={{ marginBottom: "1rem" }} />
              <span className={styles.stat}>{stat.value}</span>
              <p className={styles.label}>{stat.label}</p>
            </motion.div>
          ))}

          {/* Marquee Block */}
          <motion.div
            className={`${styles.bentoItem} ${styles.marqueeBlock}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.marqueeContainer}>
              <motion.div
                className={styles.marquee}
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                {[...technologies, ...technologies].map((tech, i) => (
                  <span key={i} className={styles.techItem}>
                    <div className={styles.dot} />
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
