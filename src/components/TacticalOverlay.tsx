"use client";

import React from "react";
import styles from "./TacticalOverlay.module.css";

export default function TacticalOverlay() {
  return (
    <div className={styles.overlayWrapper}>
      <div className={styles.scanlines} />
      <div className={styles.crtFlicker} />

      <div className={styles.cornerInfo}></div>
    </div>
  );
}
