"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Briefcase, Mail, Phone, FileText, CheckCircle } from "lucide-react";

export default function InitPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    requirements: "",
    email: "",
    contact: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />
      <div className="container max-w-2xl flex-1 flex flex-col justify-center py-12 px-4">
        <div className="bg-card border border-border/50 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Initialize Project
                </h1>
                <p className="text-muted-foreground">
                  Provide your organization details to establish a protocol.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="companyName"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Briefcase size={16} className="text-primary" />
                    Company / Organization Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <label
                    htmlFor="requirements"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <FileText size={16} className="text-primary" />
                    Project Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe your core objectives, tech stack preference, or timeline..."
                    rows={4}
                    className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30 resize-none"
                  />
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Mail size={16} className="text-primary" />
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@company.com"
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <label
                      htmlFor="contact"
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <Phone size={16} className="text-primary" />
                      Contact Number
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="tel"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-lg shadow-primary/20"
                  >
                    Initialize Protocol
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Protocol Established</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Initialization request for{" "}
                <span className="text-foreground font-bold">
                  {formData.companyName}
                </span>{" "}
                has been securely logged. Our engineering team will analyze the
                parameters and establish contact at{" "}
                <span className="text-foreground font-mono">
                  {formData.email}
                </span>
                .
              </p>
              <button
                onClick={() => setIsSubmitted(false)} // Optional: Reset for demo
                className="text-sm text-primary hover:underline underline-offset-4"
              >
                Initialize another project
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
