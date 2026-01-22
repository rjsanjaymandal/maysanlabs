"use client";

import React from "react";
import styles from "./DataMarker.module.css";

interface DataMarkerProps {
  label: string;
  position?: "tl" | "tr" | "bl" | "br";
}

export default function DataMarker({
  label,
  position = "tr",
}: DataMarkerProps) {
  return (
    <div className={`${styles.marker} ${styles[position]}`}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
