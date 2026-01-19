"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Decorative Elements */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`${styles.badge} animate-pulse-soft`}>
            <Sparkles size={14} />
            One-Person Empire E-commerce Stack
          </span>
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Engineering the Future of
          <br />
          <span className="text-gradient">Digital Enterprise.</span>
        </motion.h1>

        <motion.p
          className={styles.subheadline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          From custom ERPs to specialized CA Cloud ecosystems. We build the
          high-performance tools that power modern industry.
        </motion.p>

        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
