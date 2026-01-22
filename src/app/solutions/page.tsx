import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import TechnicalSpecs from "@/components/TechnicalSpecs";
import styles from "./Solutions.module.css";
import { Layers, Database, Code, Zap } from "lucide-react";

export default function SolutionsPage() {
  const offerings = [
    {
      icon: <Layers size={24} />,
      title: "Core Infrastructure",
      description:
        "High-performance MERN stack architecture designed for heavy load and 99.99% uptime.",
    },
    {
      icon: <Database size={24} />,
      title: "Data Operations",
      description:
        "Encrypted, high-redundancy database management with real-time replication.",
    },
    {
      icon: <Code size={24} />,
      title: "API Protocols",
      description:
        "Modular API development with advanced security layers and lightning-fast responses.",
    },
    {
      icon: <Zap size={24} />,
      title: "AI Integration",
      description:
        "Autonomous agents and LLM-powered workflows integrated directly into your stack.",
    },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <PageHeader
        label="OPS_READY"
        title="DEPLOYMENT_SOLUTIONS"
        subtitle="Scalable digital infrastructure engineered for the one-person empire. We build the systems, you run the world."
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

      <TechnicalSpecs />

      <ContactFooter />
    </main>
  );
}
