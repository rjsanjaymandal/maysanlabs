"use client";

import { motion } from "framer-motion";
import { Server, Database, Globe, Shield, Cpu, Zap } from "lucide-react";
import styles from "./BlueprintGrid.module.css";

const ArchitectureNode = ({ icon, title, label, x, y }: any) => (
  <motion.div
    className={styles.node}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    style={{ left: x, top: y }}
  >
    <div className={styles.iconBox}>{icon}</div>
    <div className={styles.nodeMeta}>
      <span className={styles.label}>{label}</span>
      <h4 className={styles.title}>{title}</h4>
    </div>
  </motion.div>
);

export default function BlueprintGrid() {
  return (
    <div className={styles.container}>
      <div className="blueprint-bg absolute inset-0 opacity-20" />

      <div className={styles.grid}>
        {/* Layer 01: Global Edge */}
        <ArchitectureNode
          icon={<Globe size={24} />}
          title="EDGE_NETWORK"
          label="L01_INGRESS"
          x="10%"
          y="10%"
        />

        {/* Layer 02: Processing */}
        <ArchitectureNode
          icon={<Cpu size={24} />}
          title="AUTONOMOUS_API"
          label="L02_COMPUTE"
          x="50%"
          y="30%"
        />
        <ArchitectureNode
          icon={<Server size={24} />}
          title="SOCKET_LAYER"
          label="L02_SYNC"
          x="20%"
          y="50%"
        />

        {/* Layer 03: Security & Data */}
        <ArchitectureNode
          icon={<Shield size={24} />}
          title="ENCRYPTION_VAULT"
          label="L03_SEC"
          x="80%"
          y="40%"
        />
        <ArchitectureNode
          icon={<Database size={24} />}
          title="REDUNDANT_DB"
          label="L03_STATE"
          x="60%"
          y="75%"
        />

        {/* Tactical Connections (SVG Lines) */}
        <svg className={styles.lines}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsla(var(--primary), 0)" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsla(var(--primary), 0)" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="10%" x2="50%" y2="30%" className={styles.line} />
          <line x1="50%" y1="30%" x2="80%" y2="40%" className={styles.line} />
          <line x1="50%" y1="30%" x2="60%" y2="75%" className={styles.line} />
          <line x1="20%" y1="50%" x2="50%" y2="30%" className={styles.line} />

          {/* Animated Pulses */}
          <motion.line
            x1="10%"
            y1="10%"
            x2="50%"
            y2="30%"
            className={styles.pulseLine}
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    </div>
  );
}
