"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
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
      
      {/* Background Decor */}
      <div className="radial-blur -top-40 -left-40 opacity-10" />

      <section className="sec-xl">
        <div className="container-main">
          {!isSubmitted ? (
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <span className="label-mono mb-8 block">Get in Touch</span>
                <h1 className="heading-xl mb-12">
                  Book a <span className="text-brand-primary italic">Call.</span>
                </h1>
                <p className="text-body-dim max-w-xl mx-auto mt-6 text-xl font-medium leading-relaxed">
                  Tell us about your project details and we will schedule a conversation to discuss the next steps.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onSubmit={handleSubmit} 
                className="maysan-card border-brand-primary/10 bg-black/20 backdrop-blur-3xl p-10 md:p-16"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="md:col-span-2">
                    <label className="label-mono !text-[9px] !mb-4">
                      Your Name / Company *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe / Acme Corp"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary/50 outline-none transition-all duration-300 font-mono text-sm placeholder:text-white/10"
                    />
                  </div>

                  <div>
                    <label className="label-mono !text-[9px] !mb-4">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary/50 outline-none transition-all duration-300 font-mono text-sm placeholder:text-white/10"
                    />
                  </div>

                  <div>
                    <label className="label-mono !text-[9px] !mb-4">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary/50 outline-none transition-all duration-300 font-mono text-sm placeholder:text-white/10"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="label-mono !text-[9px] !mb-4">
                      Project Details / Requirements
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about what you're building..."
                      rows={5}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-primary/50 outline-none transition-all duration-300 font-mono text-sm placeholder:text-white/10 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pill-btn pill-btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>SENDING...</>
                  ) : (
                    <>
                      SEND_MESSAGE <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            </div>
          ) : (
            /* Success State */
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="max-w-2xl mx-auto text-center"
            >
              <div className="w-24 h-24 bg-brand-primary rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-[0_0_40px_rgba(163,230,53,0.4)] glow-brand">
                <CheckCircle size={48} className="text-black" />
              </div>
              <h2 className="heading-xl mb-6">Message <br /><span className="text-brand-primary italic">Sent.</span></h2>
              <p className="text-body-dim mb-16 text-xl font-medium max-w-md mx-auto">
                We&apos;ve received your request. Our team will get back to you shortly to schedule your call.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="pill-btn pill-btn-secondary mx-auto min-w-[280px]"
              >
                Send Another Message <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
