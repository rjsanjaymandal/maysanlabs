"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, CheckCircle2, Download, Mail } from "lucide-react";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        localStorage.setItem("exitIntentShown", "true");
      }
    };

    const saved = localStorage.getItem("exitIntentShown");
    if (saved) {
      const timeout = setTimeout(() => {
        setHasShown(true);
      }, 0);
      return () => clearTimeout(timeout);
    }

    document.addEventListener("mouseleave", handleExitIntent);
    return () => document.removeEventListener("mouseleave", handleExitIntent);
  }, [hasShown]);

  const closePopup = () => setIsVisible(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent" }),
      });
    } catch {
      // Silently fail — popup shouldn't block the user
    }
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={closePopup}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); closePopup(); } }}
            role="button"
            tabIndex={-1}
            aria-label="Close popup"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            role="dialog"
            aria-modal="true"
            aria-label="Exit intent popup"
            className="relative w-[90vw] max-w-[500px] pointer-events-all"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-[90vw] max-w-[500px] pointer-events-all"
            >
              <div className="bg-[var(--bg-dark)] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <button
                  onClick={closePopup}
                  aria-label="Close popup"
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-[#60A5FA] to-brand-primary" />

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <Download size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">
                    Free Resource
                  </span>
                </div>

                {!submitted ? (
                  <>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      The 2026 Enterprise SaaS Scaling Checklist
                    </h3>
                    <p className="text-foreground/50 text-sm mb-5 leading-relaxed">
                      How to architect for your first 100k users — database sharding, edge caching, multi-tenancy, and more.
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {[
                        "Database sharding & read replica strategy",
                        "Edge caching for sub-50ms global latency",
                        "Multi-tenant isolation patterns",
                        "CI/CD pipeline for zero-downtime deploys",
                        "Cost forecasting at every scale tier",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-foreground/60 text-sm">
                          <CheckCircle2 size={14} className="text-brand-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/30" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                          placeholder="Enter your email"
                          aria-label="Email for SaaS scaling checklist"
                          className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      {emailError && (
                        <p className="text-red-400 text-xs">{emailError}</p>
                      )}
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-xl font-bold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all"
                      >
                        Send Me the Checklist
                        <ArrowRight size={16} />
                      </button>
                    </form>

                    <p className="text-center text-foreground/30 text-xs mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Checklist Sent!</h3>
                    <p className="text-foreground/50 text-sm mb-6">
                      Check your inbox for <strong className="text-foreground/70">{email}</strong> — the 2026 SaaS Scaling Checklist is on its way.
                    </p>
                    <button
                      onClick={closePopup}
                      className="px-6 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-foreground/60 hover:text-foreground transition-all"
                    >
                      Continue browsing
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}