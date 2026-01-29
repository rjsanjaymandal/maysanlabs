"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import ContactFooter from "@/components/ContactFooter";
import styles from "./Insights.module.css";
import Link from "next/link";
import { ArrowRight, Terminal as TerminalIcon, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TacticalOverlay from "@/components/TacticalOverlay";
import { useState } from "react";

export default function InsightsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "terminal">("grid");

  const articles = [
    {
      id: "1",
      category: "TECH_DEEP_DIVE",
      title: "The Architecture of a Scalable Enterprise",
      date: "2026.01.20",
      excerpt:
        "Exploring the technical stack required to scale a global brand without a corporate team.",
    },
    {
      id: "2",
      category: "OPERATIONS",
      title: "Edge Distribution: Why It Matters",
      date: "2026.01.18",
      excerpt:
        "How edge computing is redefining speed for modern digital platforms.",
    },
    {
      id: "3",
      category: "SYSTEMS_INTEGRITY",
      title: "Building Resilient MERN Stacks",
      date: "2026.01.15",
      excerpt:
        "Best practices for maintaining 99.9% uptime in high-traffic environments.",
    },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <TacticalOverlay />
      <PageHeader
        label="DATA_STREAM"
        title="TECHNICAL_INSIGHTS"
        subtitle="Deep-dives into modular architecture, tactical automation, and the future of digital platforms."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.viewToggle}>
            <button
              className={`${styles.toggleBtn} ${viewMode === "grid" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} /> <span>GRID_VIEW</span>
            </button>
            <button
              className={`${styles.toggleBtn} ${viewMode === "terminal" ? styles.activeToggle : ""}`}
              onClick={() => setViewMode("terminal")}
            >
              <TerminalIcon size={16} /> <span>TERMINAL_READER</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                className={styles.grid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {articles.map((post, i) => (
                  <motion.article
                    key={post.id}
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={styles.cardMeta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.date}>{post.date}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <Link href={`#`} className={styles.readMore}>
                      <span>ACCESS_FULL_LOG</span> <ArrowRight size={16} />
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="terminal"
                className={styles.terminalReader}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <div className={styles.terminalHeader}>
                  <div className={styles.dots}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                  </div>
                  <div className={styles.headerText}>
                    STREAM_PROTOCOL // VIEW: TERMINAL_READER
                  </div>
                </div>
                <div className={styles.terminalContent}>
                  {articles.map((post, i) => (
                    <div key={post.id} className={styles.terminalEntry}>
                      <div className={styles.entryHeader}>
                        <span className={styles.entryTag}>[LOG_0{i + 1}]</span>
                        <span className={styles.entryDate}>{post.date}</span>
                        <span className={styles.entryCategory}>
                          {post.category}
                        </span>
                      </div>
                      <h3 className={styles.terminalTitle}>{post.title}</h3>
                      <p className={styles.terminalText}>{post.excerpt}</p>
                      <div className={styles.entryFooter}>
                        <span className={styles.cursor}>_</span>
                        <span className={styles.entryLink}>
                          REQUEST_FILE_PTR_{post.id}
                        </span>
                      </div>
                      {i < articles.length - 1 && (
                        <div className={styles.separator} />
                      )}
                    </div>
                  ))}
                  <div className={styles.blinkingLine}>
                    [DATA_STREAM_END_REACHED]
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
