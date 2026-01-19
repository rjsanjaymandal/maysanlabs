"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="glass-dark"
      style={{
        padding: "8rem 0 4rem",
        marginTop: "4rem",
        color: "white",
      }}
    >
      <div className="container">
        <div
          style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
        >
          <motion.h2
            style={{
              fontSize: "3.5rem",
              marginBottom: "1.5rem",
              letterSpacing: "-0.04em",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Stop renting your technology.
            <br />
            <span className="text-gradient">Start owning it.</span>
          </motion.h2>

          <motion.p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.25rem",
              marginBottom: "3.5rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We build it, set it up, and hand you the keys. The empire is yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="tel:+919660641530"
              className="btn btn-primary"
              style={{ padding: "1.25rem 2.5rem", fontSize: "1.125rem" }}
            >
              <Phone size={20} />
              <span>Book a Consulting Call</span>
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div
          style={{
            marginTop: "6rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.95rem",
          }}
        >
          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>
              Maysan Labs
            </h4>
            <p>Building the next generation of solo-run e-commerce empires.</p>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>Contact</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Link
                href="tel:+919660641530"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Phone size={14} /> +91 9660641530
              </Link>
              <Link
                href="mailto:contact@maysanlabs.com"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Mail size={14} /> contact@maysanlabs.com
              </Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: "white", marginBottom: "1rem" }}>Location</h4>
            <p style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={14} /> Rajasthan, India
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <p>© {new Date().getFullYear()} Maysan Labs.</p>
            <p>Designed for Performance.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
