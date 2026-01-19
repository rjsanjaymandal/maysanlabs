"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

const letterAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9] as any,
    },
  }),
};

export default function Hero() {
  const words = ["Engineering", "the", "Future", "of"];

  return (
    <section className={styles.hero}>
      {/* Dynamic Grid Background */}
      <div className={styles.gridOverlay}></div>
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`${styles.badge} animate-pulse-soft`}>
            <Sparkles size={14} />
            The High-Performance Enterprise Stack
          </span>
        </motion.div>

        <h1 className={styles.headline}>
          <div className={styles.wordRow}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterAnimation}
                initial="hidden"
                animate="visible"
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <motion.span
            className="text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Digital Enterprise.
          </motion.span>
        </h1>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          From custom ERPs to specialized CA Cloud ecosystems. We build the
          heavy-duty tools that power modern industry.
        </motion.p>

        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link href="#solution" className="btn btn-primary">
            Explore Services
            <ArrowRight size={18} />
          </Link>
          <Link href="#pricing" className="btn btn-secondary">
            View Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
