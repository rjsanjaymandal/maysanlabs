"use client";

import { motion } from "framer-motion";
import styles from "./SocialProof.module.css";

export default function SocialProof() {
  const stats = [
    { value: "100%", label: "Data Ownership" },
    { value: "500ms", label: "Avg. Load Time" },
    { value: "24/7", label: "System Uptime" },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Trusted by High-Performance Teams
        </motion.h2>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.stat}>{stat.value}</span>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
