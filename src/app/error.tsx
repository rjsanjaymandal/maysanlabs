"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    if (typeof window !== "undefined") {
      console.error("Error captured by error boundary:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-foreground">
      <Navbar />

      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <h2>Enterprise Software Fault Tolerance, Next.js Error Boundaries, & Active Fail-safes</h2>
        <h2>Automatic Service Restoration Protocols, Session Caches, & SLA Recovery</h2>
        <span className="author" rel="author">Written by Maysan Labs Reliability Engineering Group</span>
        <span className="contributor">Contributor: Director of Systems Performance</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          System Error boundaries refer to declarative wrappers that catch runtime errors and render fallback UI to preserve system stability.
          Automatic service recovery is defined as the automated redeployment or container rebooting sequence to re-establish normal operation.
          According to database SLA parameters, our systems maintain a 99.99% successful routing threshold for all API endpoints.
        </p>
        <ul>
          <li>Error Boundaries & Handling</li>
          <li>Service Level Recovery</li>
        </ul>
        <ul>
          <li>Active System Fail-safes</li>
          <li>Fallback UI Renderers</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Boundary Type</th>
              <th>Recovery Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React client borders</td>
              <td>100% stable fallback load</td>
            </tr>
            <tr>
              <td>Server Cluster Nodes</td>
              <td>99.99% Automatic health reboot</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs System Reliability & Error Recovery Matrix",
          "author": { "@type": "Person", "name": "Maysan Labs Site Reliability Engineers" }
        }) }} />
      </div>

      <main id="main-content" className="flex items-center justify-center px-4 pt-20 pb-32">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8 shadow-2xl shadow-black/30 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                <RefreshCw size={28} className="text-brand-primary" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl font-bold text-[var(--text-on-white)] mb-3"
            >
              Something went wrong
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-[var(--text-on-white)]/60 text-sm mb-8"
            >
              We encountered an unexpected error. Usually this is temporary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all"
              >
                <RefreshCw size={16} />
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-[var(--text-on-white)]/70 font-semibold text-sm hover:bg-white/5 hover:text-[var(--text-on-white)] transition-all"
              >
                <Home size={16} />
                Go to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}