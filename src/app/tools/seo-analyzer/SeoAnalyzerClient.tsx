"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, CheckCircle2, XCircle, Mail, Download, Clock, Zap, Smartphone, FileText, Sparkles, Loader2, BarChart2, AlertTriangle, Shield, Gauge } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { SeoAuditResult, analyzeSitemap } from "@/app/actions/analyzeSitemap";

const scanSteps = [
  "Connecting to remote host...",
  "Locating sitemap.xml & robots.txt...",
  "Parsing XML URL node tree...",
  "Auditing meta titles & descriptions...",
  "Analyzing JSON-LD structured schemas...",
  "Checking HTTP status codes & redirects...",
  "Verifying heading hierarchy & indexability...",
  "Compiling structured crawl report...",
];

export default function SeoAnalyzerClient() {
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [results, setResults] = useState<SeoAuditResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressStep, setProgressStep] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const validateUrl = (input: string): string | null => {
    if (!input.trim()) return "Please enter a sitemap URL or domain";
    try {
      const urlObj = new URL(input.startsWith("http") ? input : `https://${input}`);
      if (!urlObj.hostname.includes(".")) return "Please enter a valid domain (e.g. example.com)";
      return null;
    } catch {
      return "Invalid URL format. Try: example.com/sitemap.xml";
    }
  };

  const startScan = useCallback(async () => {
    const error = validateUrl(sitemapUrl);
    setUrlError(error);
    if (error) return;

    setScanning(true);
    setScanComplete(false);
    setShowLeadForm(false);
    setResults(null);
    setProgress(0);
    setProgressStep(scanSteps[0]);

    // Start fetching from the server action in parallel
    const auditPromise = analyzeSitemap(sitemapUrl);

    let currentStep = 1;
    const progressInterval = setInterval(() => {
      if (currentStep < scanSteps.length) {
        const stepProgress = (currentStep / scanSteps.length) * 90;
        setProgress(stepProgress);
        setProgressStep(scanSteps[currentStep - 1]);
        currentStep++;
      }
    }, 600);

    try {
      const realResults = await auditPromise;
      clearInterval(progressInterval);
      setProgress(100);
      setProgressStep("Compilation complete!");
      setResults(realResults);
      setTimeout(() => {
        setScanComplete(true);
        setScanning(false);
        setShowLeadForm(true);
        // Scroll to results
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 400);
    } catch {
      clearInterval(progressInterval);
      setScanning(false);
      setUrlError("Failed to audit sitemap. Please check network connectivity and try again.");
    }
  }, [sitemapUrl]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    startScan();
  }, [startScan]);

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) return;
    setLeadSubmitting(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source: "seo-analyzer" }),
      });

      if (res.ok) {
        setLeadCaptured(true);
      } else {
        const data = await res.json();
        setLeadError(data.error || "Something went wrong.");
      }
    } catch {
      setLeadError("Network error. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }, [email, company]);

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="pt-36 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container-main max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <BarChart2 size={12} />
                Free SEO Tool
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sitemap & Technical <span className="text-brand-primary">SEO Analyzer</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base">
                Scan your website&apos;s sitemap for broken links, missing meta tags, bad schema markups, and indexation gaps. Get a clear audit report with prioritized fixes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-strong rounded-2xl p-6 md:p-8 mb-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" />
                  <input
                    type="text"
                    placeholder="Enter sitemap URL or domain (e.g. example.com/sitemap.xml)"
                    value={sitemapUrl}
                    onChange={(e) => { setSitemapUrl(e.target.value); setUrlError(null); }}
                    disabled={scanning}
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none transition-all text-sm disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={scanning}
                  className="px-6 py-3.5 bg-brand-primary rounded-xl font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
                >
                  {scanning ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <Search size={16} />
                      Run Audit
                    </>
                  )}
                </button>
              </form>
              {urlError && (
                <p className="text-red-400 text-xs mt-2">{urlError}</p>
              )}
            </motion.div>

            {scanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl p-6 md:p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Loader2 size={18} className="text-brand-primary animate-spin" />
                  <span className="text-sm font-semibold text-foreground/70">Scanning sitemap structure...</span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-light"
                  />
                </div>
                <p className="text-xs text-foreground/40 font-mono">{progressStep}</p>
              </motion.div>
            )}

            <AnimatePresence>
              {scanComplete && results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                  ref={resultsRef}
                >
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-foreground mb-1">Results for {results.url}</h2>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-foreground/40">Technical Sitemap Indexation Report</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${results.sitemapFetched ? "bg-green-400/10 text-green-400" : "bg-amber-400/10 text-amber-400"}`}>
                            <Globe size={10} />
                            {results.sitemapFetched ? "Sitemap Found" : "Sitemap Not Found"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground/40">Indexability</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${results.indexability === "healthy" ? "bg-green-400/10 text-green-400" : results.indexability === "action-required" ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>
                          {results.indexability === "healthy" ? "Healthy" : results.indexability === "action-required" ? "Needs Action" : "Poor"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Overall SEO</span>
                        <p className="text-xl font-black text-foreground">{results.seoScore}<span className="text-xs text-foreground/40 font-normal">/100</span></p>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full mt-2 overflow-hidden">
                          <div className={`h-full rounded-full ${results.seoScore >= 85 ? "bg-green-400" : results.seoScore >= 65 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${results.seoScore}%` }} />
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Pages</span>
                        <p className="text-xl font-black text-foreground">{results.totalUrls}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Sitemap URLs</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Meta Tags</span>
                        <p className={`text-xl font-black ${results.missingMeta > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingMeta}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Broken</span>
                        <p className={`text-xl font-black ${results.brokenLinks > 0 ? "text-red-400" : "text-green-400"}`}>{results.brokenLinks}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Links</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Schema</span>
                        <p className={`text-xl font-black ${results.missingSchemas > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingSchemas}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Indexability</span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${results.indexability === "healthy" ? "bg-green-400/10 text-green-400" : results.indexability === "action-required" ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>
                          {results.indexability === "healthy" ? "Healthy" : results.indexability === "action-required" ? "Needs Action" : "Poor"}
                        </span>
                      </div>
                    </div>

                    {/* Advanced Checks Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Canonical</span>
                        <p className={`text-xl font-black ${results.missingCanonical > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingCanonical}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Noindex</span>
                        <p className={`text-xl font-black ${results.noindexPages > 0 ? "text-amber-400" : "text-green-400"}`}>{results.noindexPages}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Blocked Pages</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">OG Tags</span>
                        <p className={`text-xl font-black ${results.missingOgTags > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingOgTags}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Incomplete</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Twitter Card</span>
                        <p className={`text-xl font-black ${results.missingTwitterCard > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingTwitterCard}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Viewport</span>
                        <p className={`text-xl font-black ${results.missingViewport > 0 ? "text-red-400" : "text-green-400"}`}>{results.missingViewport}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">HTML Lang</span>
                        <p className={`text-xl font-black ${results.missingHtmlLang > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingHtmlLang}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Alt Text</span>
                        <p className={`text-xl font-black ${results.totalAltMissing > 0 ? "text-amber-400" : "text-green-400"}`}>{results.totalAltMissing}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Page Weight</span>
                        <p className="text-xl font-black text-foreground">{results.urlsList.length > 0 ? Math.round(results.totalPageSize / results.urlsList.length) : 0}<span className="text-xs text-foreground/40 font-normal">KB</span></p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Avg</p>
                      </div>
                    </div>

                    {/* Issues Breakdown visual */}
                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-brand-primary" />
                        Issues Breakdown
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Meta Tags</span>
                            <span className={`font-bold ${results.missingMeta > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingMeta}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.missingMeta > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.missingMeta * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Broken Links</span>
                            <span className={`font-bold ${results.brokenLinks > 0 ? "text-red-400" : "text-green-400"}`}>{results.brokenLinks}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.brokenLinks > 0 ? "bg-red-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.brokenLinks * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Schema</span>
                            <span className={`font-bold ${results.missingSchemas > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingSchemas}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.missingSchemas > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.missingSchemas * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Canonical</span>
                            <span className={`font-bold ${results.missingCanonical > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingCanonical}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.missingCanonical > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.missingCanonical * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Noindex</span>
                            <span className={`font-bold ${results.noindexPages > 0 ? "text-amber-400" : "text-green-400"}`}>{results.noindexPages}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.noindexPages > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.noindexPages * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">OG Tags</span>
                            <span className={`font-bold ${results.missingOgTags > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingOgTags}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.missingOgTags > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.missingOgTags * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Twitter Card</span>
                            <span className={`font-bold ${results.missingTwitterCard > 0 ? "text-amber-400" : "text-green-400"}`}>{results.missingTwitterCard}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.missingTwitterCard > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.missingTwitterCard * 20, 100)}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-foreground/60">Alt Text</span>
                            <span className={`font-bold ${results.totalAltMissing > 0 ? "text-amber-400" : "text-green-400"}`}>{results.totalAltMissing}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${results.totalAltMissing > 0 ? "bg-amber-400" : "bg-green-400"}`} style={{ width: `${Math.min(results.totalAltMissing * 10, 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap size={14} className="text-brand-primary" />
                        Prioritized Action Items
                      </h3>
                      <ul className="space-y-3">
{results.suggestions.map((suggestion, i) => {
  const s = suggestion.toLowerCase();
  const isPositive = s.includes("healthy") || s.includes("excellent") || s.includes("fully populated") || s.includes("successfully exposed") || s.includes("contain microdata") || s.includes("link health is excellent") || s.includes("successful 200") || s.includes("fully populated");
  const isAction = s.includes("broken") || s.includes("missing") || s.includes("could not locate") || s.includes("ensure every") || s.includes("incomplete") || s.includes("not found") || s.includes("blocked") || s.includes("different domain") || s.includes("page weight") || s.includes("alt text") || s.includes("alt tag");
  const label = isPositive ? "PASS" : isAction ? "ACTION" : "NOTE";
  return (
    <li key={i} className={`flex items-start gap-2.5 text-xs p-3 rounded-lg ${isPositive ? "bg-green-400/5 border border-green-400/10" : "bg-white/[0.02] border border-white/[0.06]"}`}>
        <span className={`mt-0.5 shrink-0 ${isPositive ? "text-green-400" : "text-brand-primary"}`}>
          {isPositive ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
        </span>
        <span className={`${isPositive ? "text-green-400/80" : "text-foreground/60"}`}>
          <strong className={`${isPositive ? "text-green-400" : "text-foreground/80"}`}>
            {label}:{" "}
          </strong>
          {suggestion}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Google Search Listing Preview */}
                    <div className="bg-black/20 rounded-xl p-5 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Globe size={14} className="text-brand-primary" />
                        Google Search Preview (Sampled Index)
                      </h3>
                      <div className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/5 rounded-lg p-4 font-sans text-left max-w-2xl shadow-sm dark:shadow-none">
                        <div className="text-[11px] text-[#202124] dark:text-[#bdc1c6] mb-1 flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                          <Globe size={10} className="text-[#1a0dab] dark:text-[#8ab4f8]" />
                          <span>{results.url}</span>
                        </div>
                        <h4 className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1 font-medium">
                          {results.urlsList[0]?.title || "Missing Title Tag"}
                        </h4>
                        <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed text-xs">
                          {results.urlsList[0]?.description || "Warning: No meta description was detected in our crawl checks! Add a unique, keyword-rich meta description tag to ensure higher organic search click rates."}
                        </p>
                      </div>
                    </div>

                    {/* Live Discovered Pages Grid */}
                    <div className="bg-black/20 rounded-xl p-5 mb-6 overflow-hidden">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap size={14} className="text-brand-primary" />
                        Sitemap Audited URL Node Sample
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
<thead>
                             <tr className="border-b border-white/10 text-foreground/40 font-mono text-[10px] uppercase tracking-wider">
                               <th className="py-2.5 pr-4 font-semibold">Audited URL</th>
                               <th className="py-2.5 px-3 text-center font-semibold">Health</th>
                               <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                               <th className="py-2.5 px-3 text-center font-semibold">Title</th>
                               <th className="py-2.5 px-3 text-center font-semibold">Meta Desc</th>
                               <th className="py-2.5 px-3 text-center font-semibold">Heading Tags</th>
                               <th className="py-2.5 pl-3 text-center font-semibold">Schema</th>
                             </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                             {results.urlsList.map((page, index) => {
                               // Extract relative path
                               let displayPath = page.url;
                               try {
                                 const parsed = new URL(page.url);
                                 displayPath = parsed.pathname === "/" ? "/" : parsed.pathname;
                               } catch {
                                 // Use raw url if invalid URL
                               }
                               // Calculate per-page health score
                               const checks = [!!page.title, !!page.description, page.h1Count === 1, page.status === 200, page.hasSchema];
                               const passed = checks.filter(Boolean).length;
                               const pageScore = Math.round((passed / checks.length) * 100);
                               return (
                                 <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                                   <td className="py-3 pr-4 font-mono max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-foreground/80">
                                     {displayPath}
                                   </td>
                                   <td className="py-3 px-3 text-center">
                                     <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold font-mono ${pageScore >= 80 ? "bg-green-400/10 text-green-400" : pageScore >= 50 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>
                                       {pageScore}
                                     </span>
                                   </td>
                                   <td className="py-3 px-3 text-center">
                                     <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${page.status === 200 ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                                       {page.status}
                                     </span>
                                   </td>
                                   <td className="py-3 px-3 text-center">
                                     {page.title ? (
                                       <CheckCircle2 size={13} className="text-green-400 mx-auto" />
                                     ) : (
                                       <XCircle size={13} className="text-red-400 mx-auto" />
                                     )}
                                   </td>
                                   <td className="py-3 px-3 text-center">
                                     {page.description ? (
                                       <CheckCircle2 size={13} className="text-green-400 mx-auto" />
                                     ) : (
                                       <XCircle size={13} className="text-amber-400 mx-auto" />
                                     )}
                                   </td>
                                   <td className="py-3 px-3 text-center font-mono text-[10px] text-foreground/60">
                                     H1:{page.h1Count} / H2:{page.h2Count}
                                   </td>
                                   <td className="py-3 pl-3 text-center">
                                     <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] ${page.hasSchema ? "bg-green-400/10 text-green-400" : "bg-white/[0.04] text-foreground/30"}`}>
                                       {page.hasSchema ? "JSON-LD" : "None"}
                                     </span>
                                   </td>
                                 </tr>
                               );
                             })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {!showLeadForm && (
                      <div className="text-center font-sans mt-8">
                        <button
                          onClick={() => setShowLeadForm(true)}
                          className="px-8 py-4 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.35)] shadow-[0_0_15px_rgba(26,109,214,0.15)] rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2"
                        >
                          <Download size={14} />
                          Download Technical SEO Action Plan
                        </button>
                      </div>
                    )}
                  </div>

                  {showLeadForm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-strong rounded-2xl p-6 md:p-8 border-2 border-brand-primary/40"
                    >
                      {leadCaptured ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-4"
                        >
                          <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={32} className="text-green-400" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">Report Sent!</h3>
                          <p className="text-sm text-foreground/50 mb-6">
                            Your full sitemap technical audit checklist has been sent to <strong className="text-foreground">{email}</strong>.
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button
                              onClick={() => {
                                setSitemapUrl("");
                                setScanComplete(false);
                                setResults(null);
                                setLeadCaptured(false);
                                setEmail("");
                                setCompany("");
                                setShowLeadForm(false);
                              }}
                              className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-sm text-foreground/70 hover:text-foreground transition-all"
                            >
                              Audit Another URL
                            </button>
                            <Link
                              href="/start"
                              className="px-5 py-2.5 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2"
                            >
                              <Sparkles size={14} />
                              Book a Custom SEO Review
                            </Link>
                          </div>
                        </motion.div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                              <Mail size={20} className="text-brand-primary" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-foreground">Unlock Your Custom SEO Technical Checklist</h3>
                              <p className="text-sm text-foreground/50">
                                Drop your email and company name to unlock dynamic recommendations to optimize sitemap discoverability.
                              </p>
                            </div>
                          </div>

                          <form onSubmit={handleLeadSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="lead-email" className="text-xs font-semibold text-foreground/70 mb-1.5 block">
                                  Email Address
                                </label>
                                <input
                                  id="lead-email"
                                  type="email"
                                  required
                                  placeholder="you@company.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none transition-all text-sm"
                                />
                              </div>
                              <div>
                                <label htmlFor="lead-company" className="text-xs font-semibold text-foreground/70 mb-1.5 block">
                                  Company Name
                                </label>
                                <input
                                  id="lead-company"
                                  type="text"
                                  required
                                  placeholder="Your Company"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
                                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none transition-all text-sm"
                                />
                              </div>
                            </div>
                            {leadError && (
                              <p className="text-red-400 text-xs">{leadError}</p>
                            )}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <button
                                type="submit"
                                disabled={leadSubmitting}
                                className="px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2 disabled:opacity-50"
                              >
                                {leadSubmitting ? (
                                  <>
                                    <Loader2 size={14} className="animate-spin" />
                                    Submitting...
                                  </>
                                ) : (
                                  <>
                                    <Download size={14} />
                                    Get Action Plan
                                  </>
                                )}
                              </button>
                              <p className="text-[10px] text-foreground/30">
                                Powered by Maysan Labs. We respect your confidentiality.
                              </p>
                            </div>
                          </form>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!scanning && !scanComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Globe size={18} className="text-brand-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Sitemap Crawl</h3>
                    <p className="text-xs text-foreground/40">Discover all indexed URLs & node structure</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                      <FileText size={18} className="text-brand-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Meta & Schema Audit</h3>
                    <p className="text-xs text-foreground/40">Check titles, descriptions & JSON-LD markup</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Shield size={18} className="text-brand-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Health Scoring</h3>
                    <p className="text-xs text-foreground/40">Per-page health score & indexability grade</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <ContactFooter />
    </div>
  );
}
