"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main id="main-content" className="flex items-center justify-center px-4 min-h-[60vh] py-20">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
          <RefreshCw size={28} className="text-brand-primary" />
        </div>
        <h1 className="text-xl font-bold text-foreground">Something went wrong</h1>
        <p className="text-foreground/50 text-sm">This is usually temporary. Try again or head back home.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary rounded-lg text-sm font-semibold text-white hover:shadow-[0_0_20px_rgba(26,109,214,0.3)] transition-all">
            <RefreshCw size={14} /> Try again
          </button>
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-foreground/60 text-sm font-semibold hover:bg-white/[0.04] transition-all">
            <Home size={14} /> Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
