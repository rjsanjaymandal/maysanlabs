"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

declare global {
  interface Window {
    __cookieConsent?: "accepted" | "declined" | null;
  }
}

const STORAGE_KEY = "cookie-consent";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.__cookieConsent === "accepted";
}

export function getStoredConsent(): "accepted" | "declined" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    const raf = requestAnimationFrame(() => {
      setConsent(stored);
      window.__cookieConsent = stored ?? null;
      setMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    window.__cookieConsent = "accepted";
    setConsent("accepted");
    window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    window.__cookieConsent = "declined";
    setConsent("declined");
    window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
  };

  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-lg"
      >
        <div className="glass-strong rounded-2xl p-5 shadow-2xl shadow-black/30">
          <div className="flex items-start gap-3 mb-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
              <Cookie size={16} />
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              We use cookies to improve your experience. By continuing, you
              agree to our use of cookies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 rounded-full bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-glow-sm hover:brightness-110 active:scale-[0.97]"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
            >
              Decline
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}