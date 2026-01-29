"use client";

import { motion, Variants } from "framer-motion";
import { Check, Zap, Rocket, Shield } from "lucide-react";
import styles from "./Pricing.module.css";
import SpotlightCard from "./SpotlightCard";

const plans = [
  {
    name: "Starter",
    price: "49,999",
    description: "Perfect for agile startups and department-level pilots.",
    features: [
      "Custom Web Development",
      "Basic SEO Setup",
      "Standard Support",
      "Secure Hosting",
    ],
    icon: <Zap size={24} />,
    color: "hsl(var(--muted))",
  },
  {
    name: "Enterprise",
    price: "1,49,999",
    description: "Full-scale solutions for growing businesses.",
    features: [
      "Custom CRM/ERP",
      "Advanced AI Tools",
      "24/7 Priority Support",
      "Cloud Space Setup",
      "Dedicated Project Manager",
    ],
    icon: <Rocket size={24} />,
    color: "hsl(var(--primary))",
    featured: true,
  },
  {
    name: "Secure Cloud",
    price: "24,999",
    description: "Specialized for CA and Legal firms.",
    features: [
      "Bank-level Encryption",
      "Document Management",
      "Automatic Backups",
      "Client Sharing Portal",
    ],
    icon: <Shield size={24} />,
    color: "hsl(var(--accent))",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.label}>Pricing Plans</span>
          <h2 className={styles.title}>Scalable Solutions for Every Goal</h2>
          <p className={styles.subtitle}>
            Choose the package that fits your business needs. Transparent
            pricing, no hidden fees.
          </p>
        </motion.div>

        <motion.div
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Starter Plan */}
          <motion.div className={styles.bentoItemSmall} variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.pricingInner}>
                <div
                  className={styles.iconWrapper}
                  style={{ color: plans[0].color }}
                >
                  {plans[0].icon}
                </div>
                <h3 className={styles.planName}>{plans[0].name}</h3>
                <div className={styles.priceWrapper}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{plans[0].price}</span>
                </div>
                <ul className={styles.featureList}>
                  {plans[0].features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <Check size={14} className={styles.checkIcon} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-secondary w-full">
                  Select Plan
                </button>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Enterprise Plan (Featured - Large) */}
          <motion.div className={styles.bentoItemLarge} variants={itemVariants}>
            <SpotlightCard featured>
              <div className={`${styles.pricingInner} ${styles.innerLarge}`}>
                <div className={styles.featuredBadge}>
                  MOST POPULAR ARCHITECTURE
                </div>
                <div className={styles.largeContent}>
                  <div className={styles.largeLeft}>
                    <div
                      className={styles.iconWrapper}
                      style={{ color: plans[1].color }}
                    >
                      {plans[1].icon}
                    </div>
                    <h3 className={styles.planName}>{plans[1].name}</h3>
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>₹</span>
                      <span className={styles.price}>{plans[1].price}</span>
                    </div>
                    <p className={styles.planDesc}>{plans[1].description}</p>
                    <button className="btn btn-primary">
                      Implement This Stack
                    </button>
                  </div>
                  <div className={styles.largeRight}>
                    <ul className={styles.featureListGrid}>
                      {plans[1].features.map((f, i) => (
                        <li key={i} className={styles.featureItemBold}>
                          <Zap size={16} className={styles.zapIcon} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Secure Cloud Plan */}
          <motion.div className={styles.bentoItemSmall} variants={itemVariants}>
            <SpotlightCard>
              <div className={styles.pricingInner}>
                <div
                  className={styles.iconWrapper}
                  style={{ color: plans[2].color }}
                >
                  {plans[2].icon}
                </div>
                <h3 className={styles.planName}>{plans[2].name}</h3>
                <div className={styles.priceWrapper}>
                  <span className={styles.currency}>₹</span>
                  <span className={styles.price}>{plans[2].price}</span>
                </div>
                <ul className={styles.featureList}>
                  {plans[2].features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <Check size={14} className={styles.checkIcon} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-secondary w-full">
                  Select Plan
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
