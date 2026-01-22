import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import styles from "./About.module.css";
import { Cpu, Shield, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <PageHeader
        label="CORE_INTEL"
        title="ENGINEERING_PHILOSOPHY"
        subtitle="At Maysan Labs, we believe in the Neo-Monolith: digital systems built with industrial precision, designed for maximum resilience and individual sovereignty."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Cpu size={24} />
              </div>
              <h3 className={styles.cardTitle}>Precision Stacks</h3>
              <p className={styles.cardText}>
                We don't do 'bloat'. Every line of code is a structural
                necessity. Our stacks are optimized for speed, security, and
                scalability.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Shield size={24} />
              </div>
              <h3 className={styles.cardTitle}>Digital Sovereignty</h3>
              <p className={styles.cardText}>
                Powering the one-person empire. We build tools that give you
                full ownership of your data and your customer relationships.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Globe size={24} />
              </div>
              <h3 className={styles.cardTitle}>Edge Distribution</h3>
              <p className={styles.cardText}>
                Global availability is a standard, not a feature. We deploy your
                infrastructure to the edge for zero-latency operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.manifesto}>
        <div className="container">
          <div className={styles.manifestoContent}>
            <span className={styles.tag}>// THE_MANIFESTO</span>
            <h2 className={styles.manifestoTitle}>
              CONSTRUCTING_THE_FUTURE_ALONE
            </h2>
            <p className={styles.manifestoText}>
              The era of massive, inefficient teams is ending. The technology to
              operate a global brand from a single node is here. Maysan Labs is
              the architect of this transition. We provide the structural
              integrity needed to scale without boundaries.
            </p>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
