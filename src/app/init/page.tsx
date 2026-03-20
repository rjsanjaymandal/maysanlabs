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
        alert("CRITICAL_ERROR: FAIL_TO_INIT_UPLINK. ATTEMPT_RECONNECT.");
      }
    } catch (error: unknown) {
      console.error("UPLINK_FAILURE:", error);
      alert("FATAL_ERROR: SYSTEM_OFFLINE.");
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
      <div aria-hidden="true" className="fixed inset-0 tactical-grid opacity-5 pointer-events-none" />
      
      <Navbar />
      
      <div className="container max-w-4xl flex-1 flex flex-col justify-center py-20 px-4 relative z-10">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Sidebar Context */}
            <div className="lg:col-span-4 space-y-12">
               <div>
                  <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold block mb-4">
                    [ SESSION_ID: {sessionId} ]
                  </span>
                  <h1 className="text-massive leading-[0.8] mb-0">
                    INIT<br />
                    PROT<br />
                    OCOL
                  </h1>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                     <Cpu size={14} className="text-primary" />
                     <span>UPLINK: ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                     <Shield size={14} className="text-primary" />
                     <span>ENCRYPTION: AES_256</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                     <Globe size={14} className="text-primary" />
                     <span>ORIGIN: GURGAON_SEC_44</span>
                  </div>
               </div>

               <p className="font-mono text-[10px] uppercase leading-relaxed text-muted-foreground/60 tracking-tight">
                 establishing a high-performance communication tunnel to maysan labs industrial compute core. state your objectives.
               </p>
            </div>

            {/* Form Interface */}
            <div className="lg:col-span-8 border-2 border-border bg-card/30 p-8 md:p-12 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-muted-foreground opacity-20">
                 SYS_V2.0_CONTACT_GATE
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label htmlFor="companyName" className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                    <Command size={14} /> 01_IDENTIFIER
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="ENTER_ORG_NAME..."
                    className="w-full bg-background border-b-2 border-border focus:border-primary px-0 py-4 font-mono text-sm uppercase tracking-widest outline-none transition-all placeholder:text-muted-foreground/20"
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="requirements" className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                    <Terminal size={14} /> 02_OBJECTIVES
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    required
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="DESCRIBE_SYSTEM_REQUIREMENTS..."
                    rows={4}
                    className="w-full bg-background border-b-2 border-border focus:border-primary px-0 py-4 font-mono text-sm uppercase tracking-widest outline-none transition-all placeholder:text-muted-foreground/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label htmlFor="email" className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                      <Mail size={14} /> 03_REPLY_UPLINK
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="CONTACT_EMAIL..."
                      className="w-full bg-background border-b-2 border-border focus:border-primary px-0 py-4 font-mono text-sm uppercase tracking-widest outline-none transition-all placeholder:text-muted-foreground/20"
                    />
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="contact" className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                      <Activity size={14} /> 04_CHRONO_REF
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="tel"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="CONTACT_NUMBER..."
                      className="w-full bg-background border-b-2 border-border focus:border-primary px-0 py-4 font-mono text-sm uppercase tracking-widest outline-none transition-all placeholder:text-muted-foreground/20"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="btn-brutalist w-full bg-primary text-white py-8 font-mono font-black text-xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="animate-spin" size={24} />
                        <span>SENDING_COMMAND...</span>
                      </>
                    ) : (
                      <>
                        <span>EXECUTE_INITIALIZE</span>
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" size={24} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="border-2 border-primary bg-primary/5 p-16 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-primary flex items-center justify-center text-white mx-auto mb-10">
              <CheckCircle size={40} />
            </div>
            <h2 className="font-mono text-4xl font-black uppercase tracking-tighter mb-6">
              UPLINK_ESTABLISHED
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground max-w-md mx-auto leading-loose mb-12">
              transmission received by maysan labs core. we have identified <span className="text-primary font-bold">{formData.companyName}</span> and queued mission-critical analysis. check <span className="text-foreground font-bold">{formData.email}</span> for response.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-mono text-[10px] text-primary hover:underline uppercase tracking-widest"
            >
              [ OPEN_NEW_TUNNEL ]
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
