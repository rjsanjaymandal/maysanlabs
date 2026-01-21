"use client";

import { motion } from "framer-motion";
import {
  Store,
  Cpu,
  Zap,
  ShieldCheck,
  Smartphone,
  Search,
  BarChart3,
  MessageSquareQuote,
  TrendingUp,
  Layout,
} from "lucide-react";
import styles from "./Solution.module.css";
import SpotlightCard from "./SpotlightCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as any;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as any;

export default function Solution() {
  const solutions = [
    {
      title: "CRM Systems",
      desc: "Custom relationship management tools built for your specific workflow.",
      icon: <TrendingUp size={32} />,
      features: ["Lead Tracking", "Client Portals", "Automated Follow-ups"],
      size: "col-span-12 md:col-span-8",
      variant: "featured",
    },
    {
      title: "ERP Solutions",
      desc: "Centralized enterprise resource planning.",
      icon: <Layout size={32} />,
      features: ["Inventory Control", "Mobile Management", "Analytics"],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Web Development",
      desc: "High-performance, modern websites.",
      icon: <Store size={32} />,
      features: ["Next.js Speed", "SEO Optimization", "Responsive"],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Customised AI Tools",
      desc: "Tailor-made automation and LLM utilities.",
      icon: <Cpu size={32} />,
      features: ["LLM Integration", "Workflows", "Data Extraction"],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Cloud Space for CA",
      desc: "Secure storage for CA & Legal firms.",
      icon: <ShieldCheck size={32} />,
      features: ["Encryption", "Document Management", "Client Sharing"],
      size: "col-span-12 md:col-span-4",
    },
  ];

  return (
    <section id="solution" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Our Solutions</span>
          <h2 className={styles.title}>The Engineering Excellence</h2>
          <p className={styles.subtitle}>
            Scalable architectures designed for modern digital dominance.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((sol, index) => (
            <motion.div
              key={index}
              className={`${sol.size} bento-item`}
              variants={itemVariants}
            >
              <SpotlightCard featured={sol.variant === "featured"}>
                <div className={styles.featureInner}>
                  <div className={styles.iconWrapper}>{sol.icon}</div>
                  <h3 className={styles.featureTitle}>{sol.title}</h3>
                  <p className={styles.featureDesc}>{sol.desc}</p>
                  <ul className={styles.featureList}>
                    {sol.features.map((feature, fIndex) => (
                      <li key={fIndex} className={styles.featureItem}>
                        <Zap size={14} /> <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
