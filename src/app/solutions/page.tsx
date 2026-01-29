"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import OperationsRoadmap from "@/components/OperationsRoadmap";
import BlueprintGrid from "@/components/BlueprintGrid";
import styles from "./Solutions.module.css";
import { Layers, Code, Zap, Store, TrendingUp, BarChart3 } from "lucide-react";

export default function SolutionsPage() {
  const offerings = [
    {
      icon: <Store size={24} />,
      title: "E-commerce Platform Generation",
      description:
        "End-to-end e-commerce solutions including design, development, and deployment of secure, scalable platforms with integrated payment systems.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Customer Relationship Module",
      description:
        "Comprehensive CRM designed to manage customer interactions, centralized data, and automation to improve satisfaction and retention.",
    },
    {
      icon: <Code size={24} />,
      title: "Customized Software Solutions",
      description:
        "Tailor-made applications designed to align with organizational workflows and enhance operational performance and long-term growth.",
    },
    {
      icon: <Layers size={24} />,
      title: "Cloud Solutions",
      description:
        "Secure storage and high-redundancy processing on scalable cloud infrastructure, including migration and ongoing management.",
    },
    {
      icon: <Zap size={24} />,
      title: "Employee Management Module",
      description:
        "Streamlined human resource operations including attendance, performance tracking, payroll integration, and reporting.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Digital & Performance Marketing",
      description:
        "Measurable brand visibility and audience engagement across digital channels. *Marketing shoots conducted in Jaipur and Chandigarh.*",
    },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <PageHeader
        label="OPS_READY"
        title="DEPLOYMENT_SOLUTIONS"
        subtitle="Scalable digital infrastructure engineered for the modern SaaS enterprise. We build the infrastructure, you dominate the market."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.serviceGrid}>
            {offerings.map((offering, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>{offering.icon}</div>
                <h3 className={styles.serviceTitle}>{offering.title}</h3>
                <p className={styles.serviceText}>{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.blueprintSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>CORE_MAPPING</span>
            <h2 className={styles.sectionTitle}>Technical Infrastructure</h2>
          </div>
          <BlueprintGrid />
        </div>
      </section>

      {/* The instruction mentioned "after Solution component", but there is no Solution component.
          Assuming it meant after the main solutions section, and incorporating the provided code snippet.
          The snippet also included a <Solution /> component which is not defined, so it's omitted.
          The closing tags </main> and </section> in the snippet were misplaced and have been corrected. */}
      <section className={styles.roadmapSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Execution Protocol</span>
            <h2 className={styles.sectionTitle}>The Operations Roadmap</h2>
          </div>
          <OperationsRoadmap />
        </div>
      </section>

      <TechnicalSpecs />

      <ContactFooter />
    </main>
  );
}
