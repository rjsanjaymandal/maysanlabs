"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Terminal, Cpu, Shield, Activity, Globe, Command, ArrowRight, CheckCircle, Mail } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

export default function InitPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    requirements: "",
    email: "",
    contact: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(`UL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) return;

    setIsSubmitting(true);

    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("requirements", formData.requirements);
    data.append("email", formData.email);
    data.append("contact", formData.contact);

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Unable to establish uplink. Please try again.");
      }
    } catch (error: unknown) {
      console.error("Communication failure:", error);
      alert("System offline. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-background flex flex-col pt-32 relative overflow-hidden">
      <Navbar />
      
      <div className="container max-w-6xl flex-1 flex flex-col justify-center py-20 px-4 relative z-10">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            {/* Sidebar Context */}
            <div className="lg:col-span-5 space-y-16">
               <div>
                  <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-8 inline-block">
                    Session ID: {sessionId}
                  </span>
                  <h1 className="text-massive leading-[1.1] font-bold mb-10">
                    Start Your <span className="font-accent lowercase text-primary italic">project</span><br />
                    With Us.
                  </h1>
                  <p className="text-lg font-medium text-foreground/50 leading-loose border-l border-border/50 pl-10 max-w-md">
                    Tell us about your project and we will help you build the fast, secure software you need.
                  </p>
               </div>

               <div className="space-y-8">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                     <div className="p-2 bg-secondary/50 rounded-lg text-primary"><Cpu size={14} /></div>
                     <span>Status: Online</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                     <div className="p-2 bg-secondary/50 rounded-lg text-primary"><Shield size={14} /></div>
                     <span>Security: Active</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                     <div className="p-2 bg-secondary/50 rounded-lg text-primary"><Globe size={14} /></div>
                     <span>Location: Sector 44</span>
                  </div>
               </div>
            </div>

            {/* Form Interface */}
            <div className="lg:col-span-7 bg-secondary/20 rounded-[3rem] p-12 md:p-16 border border-primary/5 relative overflow-hidden group hover:border-primary/10 transition-all duration-700 shadow-2xl shadow-primary/5">
              <div className="absolute top-0 right-0 p-8 text-[10px] font-bold text-primary/20 uppercase tracking-widest">
                 Contact Us
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-6">
                  <label htmlFor="companyName" className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                    <Command size={14} className="text-primary/40" /> 01 Your Company
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="w-full bg-transparent border-b border-border/50 focus:border-primary px-0 py-4 text-base font-medium tracking-tight outline-none transition-all placeholder:text-foreground/20"
                  />
                </div>

                <div className="space-y-6">
                  <label htmlFor="requirements" className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                    <Terminal size={14} className="text-primary/40" /> 02 Your Goals
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Describe what you want to build"
                    rows={4}
                    className="w-full bg-transparent border-b border-border/50 focus:border-primary px-0 py-4 text-base font-medium tracking-tight outline-none transition-all placeholder:text-foreground/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-6">
                    <label htmlFor="email" className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                      <Mail size={14} className="text-primary/40" /> 03 Your Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full bg-transparent border-b border-border/50 focus:border-primary px-0 py-4 text-base font-medium tracking-tight outline-none transition-all placeholder:text-foreground/20"
                    />
                  </div>

                  <div className="space-y-6">
                    <label htmlFor="contact" className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] flex items-center gap-3">
                      <Activity size={14} className="text-primary/40" /> 04 Phone Number
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="tel"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+X XXX XXX XXXX"
                      className="w-full bg-transparent border-b border-border/50 focus:border-primary px-0 py-4 text-base font-medium tracking-tight outline-none transition-all placeholder:text-foreground/20"
                    />
                  </div>
                </div>

                <div className="pt-10">
                  <button
                    type="submit"
                    className="btn-surgical w-full flex items-center justify-center gap-6 group py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="animate-spin" size={20} />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND REQUEST</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform duration-500" size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-secondary/20 rounded-[3rem] p-24 text-center border border-primary/20 animate-in fade-in zoom-in duration-1000 max-w-2xl mx-auto py-32">
            <div className="w-24 h-24 bg-primary text-white flex items-center justify-center rounded-[2rem] mx-auto mb-12 shadow-2xl shadow-primary/20">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-4xl font-bold mb-8 tracking-tight">
              Uplink Established
            </h2>
            <p className="text-base font-medium text-foreground/50 leading-loose mb-16 max-w-md mx-auto">
              Transmission received by Maysan Labs core. We have identified <span className="text-primary font-bold">{formData.companyName}</span> and queued mission-critical analysis. Check <span className="text-foreground font-bold">{formData.email}</span> for response.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[10px] font-bold text-primary hover:text-foreground uppercase tracking-[0.3em] transition-colors duration-500"
            >
              [ Open New Tunnel ]
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
