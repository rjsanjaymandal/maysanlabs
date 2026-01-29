"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import styles from "./Hero.module.css";
import GlitchText from "./GlitchText";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 400]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className={styles.hero}>
      {/* Neo-Monolith Background Layer */}
      <motion.div
        className={styles.gridOverlay}
        style={{ y: yParallax, opacity: 0.15 }}
      />

      <div className={styles.cornerBorderBR} />
      <div className={styles.cornerBorderTL} />

      <motion.div
        className={`container ${styles.container}`}
        style={{ scale, opacity }}
      >
        <motion.div
          className={styles.content}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className={styles.headline} variants={itemVariants}>
            <GlitchText text="CORE_OPERATING_SYSTEMS" glitchInterval={8000} />
            <br />
            <span className={`${styles.accentText} hollow-text`}>
              <GlitchText text="ENTERPRISE_COMMAND" glitchInterval={12000} />
            </span>
          </motion.h1>

          <motion.p className={styles.subheadline} variants={itemVariants}>
            Architecting high-performance digital infrastructure for the modern
            enterprise. Modular SaaS ecosystems and autonomous operational
            layers.
          </motion.p>

          <motion.div className={styles.ctaWrapper} variants={itemVariants}>
            <Link href="/init" className="btn btn-primary">
              <Zap size={20} />
              <span>INITIALIZE_PROJECT</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <div className={styles.indicatorLine} />
        <span className={styles.indicatorText}>SCROLL_TO_INITIALIZE</span>
      </div>
    </section>
  );
}
