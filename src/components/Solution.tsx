"use client";

import { motion, Variants } from "framer-motion";
import {
  Store,
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
} from "lucide-react";
import styles from "./Solution.module.css";
import SpotlightCard from "./SpotlightCard";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Solution() {
  const solutions = [
    {
      title: "E-commerce Platform Generation",
      desc: "End-to-end e-commerce solutions to establish, manage, and scale your online presence.",
      icon: <Store size={32} />,
      features: [
        "Integrated Payment Gateways",
        "Inventory Management",
        "User-friendly Experience",
      ],
      size: "col-span-12 md:col-span-8",
      variant: "featured",
    },
    {
      title: "CRM Module",
      desc: "Manage and enhance customer interactions with centralized data and automation.",
      icon: <TrendingUp size={32} />,
      features: [
        "Engagement Tracking",
        "Communication Automation",
        "Relationship Building",
      ],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Customized Software",
      desc: "Tailored applications that align with your organizational workflows and growth.",
      icon: <Cpu size={32} />,
      features: [
        "Scalable Architecture",
        "Secure Development",
        "Operational Performance",
      ],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Cloud Solutions",
      desc: "Securely store and process data on high-performance, scalable cloud infrastructure.",
      icon: <ShieldCheck size={32} />,
      features: ["Cloud Migration", "Optimization", "High Availability"],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Employee Management",
      desc: "Streamline human resource operations and improve team productivity.",
      icon: <Layout size={32} />,
      features: [
        "Attendance & Records",
        "Performance Tracking",
        "Payroll Integration",
      ],
      size: "col-span-12 md:col-span-4",
    },
    {
      title: "Digital & Performance Marketing",
      desc: "Enhance brand visibility and audience engagement with measurable business growth. Note: Marketing shoots conducted exclusively in Jaipur and Chandigarh.",
      icon: <BarChart3 size={32} />,
      features: [
        "Campaign Strategy",
        "Content Creation",
        "Performance Analytics",
      ],
      size: "col-span-12 md:col-span-12",
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
          <h2 className={`${styles.title} hollow-text`}>
            The Engineering Excellence
          </h2>
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
