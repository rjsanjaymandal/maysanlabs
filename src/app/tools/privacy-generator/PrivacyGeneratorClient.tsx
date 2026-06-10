"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Copy, Shield, FileSignature, Download, Sparkles, Loader2, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

export default function PrivacyGeneratorClient() {
  const [companyName, setCompanyName] = useState("Acme Inc.");
  const [websiteUrl, setWebsiteUrl] = useState("acme.com");
  const [supportEmail, setSupportEmail] = useState("legal@acme.com");
  const [jurisdiction, setJurisdiction] = useState("United States");
  const [collectsEmail, setCollectsEmail] = useState(true);
  const [collectsCookies, setCollectsCookies] = useState(true);
  const [collectsPayments, setCollectsPayments] = useState(false);
  const [useGoogleAnalytics, setUseGoogleAnalytics] = useState(true);
  
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const compiledDocuments = useMemo(() => {
    const formattedUrl = websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`;
    const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const privacyText = `PRIVACY POLICY FOR ${companyName.toUpperCase()}
Last updated: ${today}

At ${companyName}, accessible from ${formattedUrl}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ${companyName} and how we use it.

1. INFORMATION WE COLLECT
If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
${collectsEmail ? `- Email Address: We collect email addresses to communicate updates, newsletters, and security notifications.\n` : ""}${collectsPayments ? `- Billing Information: We collect billing details and processing credentials to complete transactional checkouts.\n` : ""}${collectsCookies ? `- Cookies: We utilize session logs and tracking identifiers to manage secure logins and compile analytics.\n` : ""}
2. HOW WE USE YOUR INFORMATION
We use the information we collect in various ways, including to:
- Provide, operate, and maintain our website and SaaS platform
- Improve, personalize, and expand our platform capabilities
- Understand and analyze how you use our platform
- Develop new products, services, features, and functionality
- Communicate with you, either directly or through one of our partners
${useGoogleAnalytics ? `- Perform user telemetry and traffic measurements using Google Analytics integrations.\n` : ""}
3. GDPR & CCPA PRIVACY RIGHTS
Depending on your jurisdiction (under ${jurisdiction} statutes), you are entitled to key privacy protections, including:
- The right to access - You have the right to request copies of your personal data.
- The right to rectification - You have the right to request that we correct any information you believe is inaccurate.
- The right to erasure - You have the right to request that we erase your personal data, under certain conditions.

If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at: ${supportEmail}.`;

    const termsText = `TERMS OF SERVICE FOR ${companyName.toUpperCase()}
Last updated: ${today}

Welcome to ${companyName}!

These terms and conditions outline the rules and regulations for the use of ${companyName}'s Website, located at ${formattedUrl}.

By accessing this website, we assume you accept these terms and conditions. Do not continue to use ${companyName} if you do not agree to take all of the terms and conditions stated on this page.

1. INTELLECTUAL PROPERTY RIGHTS
Other than the content you own, under these Terms, ${companyName} and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.

2. RESTRICTIONS
You are specifically restricted from all of the following:
- Publishing any Website material in any other media without prior clearance
- Selling, sublicensing and/or otherwise commercializing any Website material
- Publicly performing and/or showing any Website material
- Using this Website in any way that is or may be damaging to this Website
- Using this Website contrary to applicable laws and regulations

3. LIMITATION OF LIABILITY
In no event shall ${companyName}, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website. ${companyName}, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.

4. SEVERABILITY & JURISDICTION
If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein. These Terms will be governed by and interpreted in accordance with the laws of the State/Country of ${jurisdiction}, and you submit to the non-exclusive jurisdiction of the state and federal courts located in ${jurisdiction} for the resolution of any disputes.

If you have any queries regarding any of our terms, please contact us at: ${supportEmail}.`;

    return {
      privacy: privacyText,
      terms: termsText,
    };
  }, [companyName, websiteUrl, supportEmail, jurisdiction, collectsEmail, collectsCookies, collectsPayments, useGoogleAnalytics]);

  const copyToClipboard = useCallback(() => {
    const text = activeTab === "privacy" ? compiledDocuments.privacy : compiledDocuments.terms;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab, compiledDocuments]);

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) return;
    setLeadSubmitting(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source: `privacy-generator: ${companyName}` }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "tool_lead", tool: "privacy-generator", email: email.trim().toLowerCase() });
      } else {
        const data = await res.json();
        setLeadError(data.error || "Something went wrong.");
      }
    } catch {
      setLeadError("Network error. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }, [email, company, companyName]);

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <Navbar />

        <Link href="/tools" className="block container-main max-w-4xl mx-auto pt-24 pb-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground/40 hover:text-brand-primary transition-colors">
            <ArrowLeft size={12} />
            Back to All Tools
          </span>
        </Link>

        <div className="pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] max-sm:w-[300px] max-sm:h-[300px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container-main max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Shield size={12} />
                Startup Boilerplates
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Legal Policy & <span className="text-brand-primary">Terms Generator</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base">
                Instantly draft standard, standard-grade privacy policies and terms of service documents tailored for websites and products.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Form Config Block */}
              <div className="lg:col-span-5 bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 space-y-4 backdrop-blur-xl shadow-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-lg">
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <FileSignature size={16} className="text-brand-primary" />
                  Legal Parameters
                </h3>
                
                <div>
                  <label htmlFor="comp-name" className="text-[10px] font-semibold text-foreground/50 block mb-1">Company Name</label>
                  <input
                    id="comp-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-bold"
                  />
                </div>

                <div>
                  <label htmlFor="web-url" className="text-[10px] font-semibold text-foreground/50 block mb-1">Website URL</label>
                  <input
                    id="web-url"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-bold"
                  />
                </div>

                <div>
                  <label htmlFor="sup-email" className="text-[10px] font-semibold text-foreground/50 block mb-1">Legal Support Email</label>
                  <input
                    id="sup-email"
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-bold"
                  />
                </div>

                <div>
                  <label htmlFor="jurisdict-input" className="text-[10px] font-semibold text-foreground/50 block mb-1">Governing Country / State</label>
                  <input
                    id="jurisdict-input"
                    type="text"
                    value={jurisdiction}
                    onChange={(e) => setJurisdiction(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-bold"
                  />
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2">
                  <span className="text-[10px] font-bold text-foreground/50 block mb-2 uppercase tracking-wider">Collected Data Matrices</span>
                  <label className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-lg text-xs cursor-pointer">
                    <span className="text-foreground/75">Collects User Email Addresses</span>
                    <input
                      type="checkbox"
                      checked={collectsEmail}
                      onChange={(e) => setCollectsEmail(e.target.checked)}
                      className="w-3.5 h-3.5 accent-brand-primary cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-lg text-xs cursor-pointer">
                    <span className="text-foreground/75">Utilizes Tracking Cookies</span>
                    <input
                      type="checkbox"
                      checked={collectsCookies}
                      onChange={(e) => setCollectsCookies(e.target.checked)}
                      className="w-3.5 h-3.5 accent-brand-primary cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-lg text-xs cursor-pointer">
                    <span className="text-foreground/75">Handles Payment Processing</span>
                    <input
                      type="checkbox"
                      checked={collectsPayments}
                      onChange={(e) => setCollectsPayments(e.target.checked)}
                      className="w-3.5 h-3.5 accent-brand-primary cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2 bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-lg text-xs cursor-pointer">
                    <span className="text-foreground/75">Uses Google Analytics</span>
                    <input
                      type="checkbox"
                      checked={useGoogleAnalytics}
                      onChange={(e) => setUseGoogleAnalytics(e.target.checked)}
                      className="w-3.5 h-3.5 accent-brand-primary cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Dynamic Preview Area */}
              <div className="lg:col-span-7 bg-white/60 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shadow-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("privacy")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                          activeTab === "privacy"
                            ? "bg-brand-primary text-black"
                            : "bg-white/[0.02] text-foreground/45 hover:bg-white/[0.08]"
                        }`}
                      >
                        Privacy Policy
                      </button>
                      <button
                        onClick={() => setActiveTab("terms")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                          activeTab === "terms"
                            ? "bg-brand-primary text-black"
                            : "bg-white/[0.02] text-foreground/45 hover:bg-white/[0.08]"
                        }`}
                      >
                        Terms of Service
                      </button>
                    </div>

                    <button
                      onClick={copyToClipboard}
                      className="p-2 bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 rounded-lg text-xs flex items-center gap-1.5 transition-all text-foreground/60 hover:text-foreground"
                    >
                      {copied ? (
                        <>
                          <ClipboardCheck size={14} className="text-green-400" />
                          <span className="text-green-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Text compile box */}
                  <div className="bg-slate-50 border border-slate-200 dark:bg-black/40 dark:border-white/5 rounded-2xl p-4 h-96 overflow-y-auto font-mono text-[10px] text-foreground/70 dark:text-foreground/60 leading-relaxed whitespace-pre-wrap">
                    {activeTab === "privacy" ? compiledDocuments.privacy : compiledDocuments.terms}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[9px] sm:text-[10px] text-foreground/30 leading-relaxed">
                    Disclaimer: These legal boilerplates represent general templates. Consult professional counsel for complete customized local statutory compliances.
                  </p>
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-3xl p-6 md:p-8 border-2 border-brand-primary/30"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Legal Bundle Unlocked!</h3>
                  <p className="text-sm text-foreground/50 mb-6">
                    A clean formatted legal bundle (PDF/DOCX) has been dispatched to <strong className="text-foreground">{email}</strong>.
                  </p>
                  <Link
                    href="/start"
                    className="px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2"
                  >
                    <Sparkles size={14} />
                    Schedule Startup Growth Call
                  </Link>
                </motion.div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-lg font-bold text-foreground">Download Startup Legal Bundle (DOCX/PDF)</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed">
                      Lock in premium SaaS compliance blueprints. Enter your details to download editable documents alongside standard GDPR/CCPA compliance verification checklists.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="w-full md:w-auto flex-1 max-w-md space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        aria-label="Email address"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                      />
                      <input
                        type="text"
                        required
                        aria-label="Company name"
                        placeholder="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all"
                      />
                    </div>
                    {leadError && (
                      <p className="text-red-400 text-[10px]">{leadError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2.5 bg-brand-primary text-black hover:shadow-[0_0_20px_rgba(26,109,214,0.4)] rounded-xl font-bold uppercase text-[10px] sm:text-xs md:text-sm tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          Unlock PDF Legal Bundle
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <ContactFooter />
    </main>
  );
}
