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
        <div className={styles.infoLine}>
          <span className={styles.label}>SYS_SEC_V:</span>
          <span className={styles.value}>ENCRYPTED</span>
        </div>
        <div className={styles.infoLine}>
          <span className={styles.label}>LOC_NODE:</span>
          <span className={styles.value}>EDGE_01</span>
        </div>
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
