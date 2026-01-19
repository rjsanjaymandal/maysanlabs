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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

import SpotlightCard from "./SpotlightCard";

export default function Solution() {
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
          <span className={styles.label}>Our Solution</span>
          <h2 className={styles.title}>The Engineering Excellence</h2>
          <p className={styles.subtitle}>
            Scalable architectures designed for modern digital dominance.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* CRM Systems */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.featureInner}>
                <div className={styles.iconWrapper}>
                  <TrendingUp className={styles.mainIcon} size={32} />
                </div>
                <h3 className={styles.featureTitle}>CRM Systems</h3>
                <p className={styles.featureDesc}>
                  Custom relationship management tools built for your specific
                  workflow.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <BarChart3 size={18} /> <span>Lead Tracking</span>
                  </li>
                  <li className={styles.featureItem}>
                    <MessageSquareQuote size={18} /> <span>Client Portals</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Zap size={18} /> <span>Automated Follow-ups</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ERP Solutions */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.featureInner}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: "hsl(var(--primary) / 0.15)" }}
                >
                  <Layout className={styles.mainIcon} size={32} />
                </div>
                <h3 className={styles.featureTitle}>ERP Solutions</h3>
                <p className={styles.featureDesc}>
                  Centralized enterprise resource planning for seamless
                  operations.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <ShieldCheck size={18} /> <span>Inventory Control</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Smartphone size={18} /> <span>Mobile Management</span>
                  </li>
                  <li className={styles.featureItem}>
                    <BarChart3 size={18} /> <span>Financial Analytics</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Web Development */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.featureInner}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: "hsl(var(--accent) / 0.1)" }}
                >
                  <Store className={styles.mainIcon} size={32} />
                </div>
                <h3 className={styles.featureTitle}>Web Development</h3>
                <p className={styles.featureDesc}>
                  High-performance, modern websites that convert visitors into
                  customers.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <Zap size={18} /> <span>Next.js Speed</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Search size={18} /> <span>SEO Optimization</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Smartphone size={18} /> <span>Responsive Design</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Custom AI Tools */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.featureInner}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    background: "hsl(var(--accent) / 0.1)",
                    color: "hsl(var(--accent))",
                  }}
                >
                  <Cpu className={styles.mainIcon} size={32} />
                </div>
                <h3 className={styles.featureTitle}>Customised AI Tools</h3>
                <p className={styles.featureDesc}>
                  Tailor-made automation scripts and AI-driven internal
                  utilities.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <Cpu size={18} /> <span>LLM Integration</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Zap size={18} /> <span>Workflow Automation</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Search size={18} /> <span>Data Extraction</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* CA Cloud Space */}
          <motion.div variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.featureInner}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <ShieldCheck className={styles.mainIcon} size={32} />
                </div>
                <h3 className={styles.featureTitle}>Cloud Space for CA</h3>
                <p className={styles.featureDesc}>
                  Secure, encrypted cloud storage designed specifically for CA
                  firms.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}>
                    <ShieldCheck size={18} /> <span>Bank-level Encryption</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Layout size={18} /> <span>Document Management</span>
                  </li>
                  <li className={styles.featureItem}>
                    <Smartphone size={18} /> <span>Easy Client Sharing</span>
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
