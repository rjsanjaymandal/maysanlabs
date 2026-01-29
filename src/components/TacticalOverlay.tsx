"use client";

import React from "react";
import styles from "./TacticalOverlay.module.css";
import { motion } from "framer-motion";

export default function TacticalOverlay() {
  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.scanlines} />
      <div className={styles.crtFlicker} />

      <div className={styles.cornerInfo}>
        <div className={styles.statusLine}>
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={styles.statusDot}
          />
          <span className={styles.statusText}>READY_TO_INITIALIZE</span>
        </div>
      </div>
    </div>
  );
}
