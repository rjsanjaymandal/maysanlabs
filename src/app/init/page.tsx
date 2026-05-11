"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import MultiStepForm from "@/components/MultiStepForm";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function InitPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="bg-[var(--bg-dark)] min-h-screen relative overflow-hidden text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 via-brand-primary/2 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container-main relative">
{!isSubmitted ? (
            <div className="max-w-2xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
                  <Send size={12} />
                  Get in Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
                  Start a <span className="text-brand-primary">project</span>
                </h1>
                <p className="text-white/45 text-lg">
                  Tell us about your project and we&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>

              <MultiStepForm />
            </div>
          ) : (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="max-w-md mx-auto text-center py-20"
            >
              <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-black" />
              </div>
              <h2 className="heading-md text-white mb-4">Message Sent</h2>
              <p className="text-white/45 mb-8">
                We&apos;ve received your request. Our team will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-brand-primary text-sm hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <FAQ />

      <ContactFooter />
    </main>
  );
}
