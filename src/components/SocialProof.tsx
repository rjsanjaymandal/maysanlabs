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

        {/* Technology Marquee */}
        <div className={styles.marqueeContainer}>
          <motion.div
            className={styles.marquee}
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...technologies, ...technologies].map((tech, i) => (
              <span key={i} className={styles.techItem}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
