"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, FileText, Cpu, Rocket, ShieldCheck } from "lucide-react";
import styles from "./OperationsRoadmap.module.css";

const stages = [
  {
    tag: "STG_01",
    title: "AUDIT_&_EXTRACT",
    desc: "Comprehensive diagnostic of existing digital infrastructure and pain points.",
    icon: <Search size={24} />,
  },
  {
    tag: "STG_02",
    title: "BLUEPRINT_PHASE",
    desc: "Architecting modular solutions tailored for technical dominance.",
    icon: <FileText size={24} />,
  },
  {
    tag: "STG_03",
    title: "CORE_CONSTRUCTION",
    desc: "Agile build cycles with deep-tech integration and real-time testing.",
    icon: <Cpu size={24} />,
  },
  {
    tag: "STG_04",
    title: "DEPLOY_ORBIT",
    desc: "Seamless transition to live environments with 24/7 telemetry monitoring.",
    icon: <Rocket size={24} />,
  },
  {
    tag: "STG_05",
    title: "ELITE_MAINTENANCE",
    desc: "Ongoing optimization and scaling for sustained enterprise growth.",
    icon: <ShieldCheck size={24} />,
  },
];

export default function OperationsRoadmap() {
  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.line} />
      {stages.map((stage, index) => (
        <motion.div
          key={index}
          className={styles.stage}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.marker}>
            <div className={styles.dot} />
            <div className={styles.iconBox}>{stage.icon}</div>
          </div>
          <div className={styles.content}>
            <span className={styles.tag}>{stage.tag}</span>
            <h3 className={styles.title}>{stage.title}</h3>
            <p className={styles.desc}>{stage.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
