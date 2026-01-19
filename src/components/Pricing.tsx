"use client";

import { motion } from "framer-motion";
import { Check, Zap, Rocket, Shield } from "lucide-react";
import styles from "./Pricing.module.css";

const plans = [
  {
    name: "Starter",
    price: "49,999",
    description: "Perfect for small projects and solo entrepreneurs.",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`${plan.featured ? styles.featuredWrapper : ""}`}
              variants={itemVariants}
            >
              <SpotlightCard featured={plan.featured}>
                <div className={styles.pricingInner}>
                  <div
                    className={styles.iconWrapper}
                    style={{ color: plan.color }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.period}>/project</span>
                  </div>
                  <p className={styles.planDesc}>{plan.description}</p>

                  <ul className={styles.featureList}>
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className={styles.featureItem}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"} ${styles.cta}`}
                  >
                    Select This Plan
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
