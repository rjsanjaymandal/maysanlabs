"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

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
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[201] pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-[90vw] max-w-[500px] h-[80vh] max-h-[600px] pointer-events-all"
            >
              <div className="bg-[var(--bg-dark)] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden h-full w-full">
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={16} />
                </button>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-[#60A5FA] to-brand-primary" />
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <Sparkles size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-brand-primary text-xs font-semibold uppercase tracking-wider">
                    Wait! Before You Go
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Get a Free Project Consultation
                </h3>
                <p className="text-white/50 mb-6 leading-relaxed">
                  Our experts are ready to discuss your project. Get insights on architecture, timeline, and pricing - absolutely free.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    30-minute free discovery call
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    Technical roadmap & recommendations
                  </div>
                  <div className="flex items-center gap-3 text-white/60 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    No obligation, no pressure
                  </div>
                </div>

                <Link
                  href="/init"
                  onClick={closePopup}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-brand-primary rounded-xl font-bold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all"
                >
                  Book Free Consultation
                  <ArrowRight size={16} />
                </Link>

                <p className="text-center text-white/30 text-xs mt-4">
                  Limited slots available this week
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}