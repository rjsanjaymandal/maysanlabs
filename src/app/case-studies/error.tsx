"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

export default function CaseStudiesError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-foreground">
      <Navbar />
      <main id="main-content" className="flex items-center justify-center px-4 pt-32 pb-32">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
            <RefreshCw size={28} className="text-brand-primary" />
          </div>
          <h1 className="text-2xl font-bold">Unable to load case study</h1>
          <p className="text-foreground/60 text-sm">We encountered an unexpected error. Please try again.</p>
          <div className="flex flex-col gap-3">
            <button onClick={reset} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all">
              <RefreshCw size={16} /> Try again
            </button>
            <Link href="/case-studies" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-foreground/70 font-semibold text-sm hover:bg-white/5 transition-all">
              <Home size={16} /> All Case Studies
            </Link>
          </div>
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}
