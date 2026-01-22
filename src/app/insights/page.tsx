import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import styles from "./Insights.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InsightsPage() {
  const articles = [
    {
      tag: "TECH_DEEP_DIVE",
      title: "The Architecture of a One-Person Empire",
      date: "2026.01.20",
      summary:
        "Exploring the technical stack required to scale a global brand without a corporate team.",
    },
    {
      tag: "OPERATIONS",
      title: "Edge Distribution: Why It Matters",
      date: "2026.01.18",
      summary:
        "How edge computing is redefining speed for modern digital platforms.",
    },
    {
      tag: "SYSTEMS_INTEGRITY",
      title: "Building Resilient MERN Stacks",
      date: "2026.01.15",
      summary:
        "Best practices for maintaining 99.9% uptime in high-traffic environments.",
    },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <PageHeader
        label="DATA_STREAM"
        title="TECHNICAL_INSIGHTS"
        subtitle="Latest updates from the front lines of digital engineering. Code, systems, and strategy."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.list}>
            {articles.map((article, i) => (
              <div key={i} className={styles.article}>
                <div className={styles.articleMeta}>
                  <span className={styles.articleTag}>{article.tag}</span>
                  <span className={styles.articleDate}>{article.date}</span>
                </div>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleSummary}>{article.summary}</p>
                <Link href="#" className={styles.readMore}>
                  <span>STREAM_DATA</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
