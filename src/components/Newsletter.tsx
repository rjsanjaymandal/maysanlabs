"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 border-t border-white/5">
      <div className="container-main">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-brand-primary" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Stay Updated with Our Insights
          </h2>
          <p className="text-white/50 mb-8">
            Get the latest on enterprise software development, cloud architecture, and engineering best practices delivered to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-center gap-4"
            >
              <CheckCircle size={24} className="text-green-500 flex-shrink-0" />
              <div className="text-left">
                <p className="text-white font-semibold">Thanks for subscribing!</p>
                <p className="text-white/50 text-sm">Check your email for confirmation.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-full text-white placeholder:text-white/30 focus:border-brand-primary/50 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_25px_rgba(26,109,214,0.5)] transition-all flex items-center gap-2"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p className="text-white/30 text-xs mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}