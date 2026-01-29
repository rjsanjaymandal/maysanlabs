"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import styles from "./ContactFooter.module.css";

export default function ContactFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Engineering the next
            <br />
            <span className="text-gradient">high-tech empire.</span>
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We build the infrastructure, you lead the growth.
          </motion.p>

          <motion.div
            className={styles.ctaWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="mailto:business@maysanlabs.com"
              className="btn btn-primary"
            >
              <Mail size={20} />
              <span>Request Infrastructure Audit</span>
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className={styles.bottomGrid}>
          <div>
            <h4 className={styles.columnHeader}>Maysan Labs</h4>
            <p>The architects behind modern, automated enterprise systems.</p>
          </div>

          <div>
            <h4 className={styles.columnHeader}>Contact</h4>
            <div className={styles.linkGroup}>
              <Link
                href="mailto:business@maysanlabs.com"
                className={styles.contactLink}
              >
                <Mail size={14} /> business@maysanlabs.com
              </Link>
            </div>
          </div>

          <div>
            <h4 className={styles.columnHeader}>Location</h4>
            <p className={styles.contactLink}>
              <MapPin size={14} /> Gurgaon, India
            </p>
          </div>

          <div className={styles.copyright}>
            <p>© {new Date().getFullYear()} Maysan Labs.</p>
            <p>Built for the Future.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
