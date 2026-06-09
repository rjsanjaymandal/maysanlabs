"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);

    if (typeof window !== "undefined") {
      console.error("Critical error captured:", error);
    }
  }, [error]);

  return (
    <html>
      <body className="bg-[var(--bg-dark)] text-foreground min-h-screen flex flex-col">

        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="glass-strong rounded-2xl p-8 shadow-2xl shadow-black/30 text-center">
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
                A critical error occurred
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-[var(--text-on-white)]/60 text-sm mb-8"
              >
                Something went seriously wrong. Please try refreshing the page.
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
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}