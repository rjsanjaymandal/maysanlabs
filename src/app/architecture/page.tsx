import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import BlueprintGrid from "@/components/BlueprintGrid";
import styles from "./Architecture.module.css";
import TacticalOverlay from "@/components/TacticalOverlay";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Architecture",
  description:
    "Explore the technical blueprint of Maysan Labs' Neo-Monolith architecture. Modular stacks, autonomous agents, and global edge distribution.",
  alternates: {
    canonical: "/architecture",
  },
};

export default function ArchitecturePage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <TacticalOverlay />

      <PageHeader
        label="CORE_ENGINE"
        title="SYSTEM_ARCHITECTURE"
        subtitle="Visualizing the industrial engineering behind our modular SaaS ecosystems. Built for scale, security, and low-latency global operations."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.blueprintWrapper}>
            <div className={styles.techMeta}>
              <span className={styles.metaTag}>// ARCH_v1.0.4</span>
              <span className={styles.metaTag}>// TYPE: NEO_MONOLITH</span>
              <span className={styles.metaTag}>// UPTIME: 99.99%</span>
            </div>
            <BlueprintGrid />
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>01. Modular Core</h3>
              <p className={styles.detailText}>
                Our architecture follows the Neo-Monolith pattern: a unified
                core with high-performance modular extensions. This provides the
                speed of a monolith with the scalability of microservices.
              </p>
            </div>
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>02. Autonomous Agents</h3>
              <p className={styles.detailText}>
                AI layers are integrated directly into the event loop, allowing
                for autonomous background processing, predictive load
                management, and self-healing operation logs.
              </p>
            </div>
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>03. Edge Sovereignty</h3>
              <p className={styles.detailText}>
                Data is computed as close to the user as possible (under 30ms
                latency) while maintaining strict global state synchronization
                through our proprietary sync protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
