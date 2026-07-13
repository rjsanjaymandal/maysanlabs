"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-28 left-6 z-50 w-11 h-11 rounded-full bg-white/80 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center text-foreground/60 hover:text-brand-primary hover:border-brand-primary/30 transition-all duration-300 md:left-auto md:right-6 md:bottom-24"
    >
      <ArrowUp size={18} />
    </button>
  );
}
