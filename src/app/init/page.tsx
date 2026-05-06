"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import FAQ from "@/components/FAQ";
import { Send, CheckCircle } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";
import { motion } from "framer-motion";

export default function InitPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    const data = new FormData();
    data.append("companyName", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.phone);
    data.append("requirements", formData.message);

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit} 
                className="bg-white/[0.02] border border-white/5 rounded-xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Name / Company *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe / Acme Corp"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-base focus:border-brand-primary/50 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-base focus:border-brand-primary/50 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-base focus:border-brand-primary/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Project Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you're building..."
                      rows={4}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-base focus:border-brand-primary/50 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 px-6 py-3.5 bg-gradient-to-r from-brand-primary to-[#60A5FA] rounded-full font-extrabold text-sm text-white shadow-lg hover:shadow-[0_0_30px_rgba(26,109,214,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider hover:brightness-110"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send size={16} />}
                </button>
              </motion.form>
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
