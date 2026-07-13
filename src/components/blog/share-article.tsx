"use client";

import { useState, useCallback } from "react";
import { Link, Share2, Check } from "lucide-react";

interface ShareArticleProps {
  url: string;
  title: string;
  variant?: "desktop" | "mobile";
}

export default function ShareArticle({ url, title, variant = "mobile" }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url, title]);

  if (variant === "desktop") {
    return (
      <button
        type="button"
        onClick={handleShare}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 flex items-center justify-center text-foreground/40 hover:text-brand-primary hover:border-brand-primary/30 transition-all"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Link size={14} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/80 dark:bg-white/[0.05] border border-gray-100 dark:border-white/10 rounded-lg text-sm font-medium text-foreground/50 hover:text-brand-primary hover:border-brand-primary/30 transition-colors"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
