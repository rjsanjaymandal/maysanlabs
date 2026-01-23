"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import styles from "./Hero.module.css";
import GlitchText from "./GlitchText";
import DataMarker from "./DataMarker";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
} as any;

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
} as any;

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
          <DataMarker label="SYS_BOOT_01" position="tr" />

          <motion.h1 className={styles.headline} variants={itemVariants}>
            <GlitchText text="MODULAR_SYSTEMS" />
            <br />
            <span className={`${styles.accentText} hollow-text`}>
              <GlitchText text="INDUSTRIAL_SCALE" glitchInterval={5000} />
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
              <span>INITIALIZE_PROJECT_v4</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="#pricing" className={styles.secondaryCta}>
              DEPLOYMENT_LOGS
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
