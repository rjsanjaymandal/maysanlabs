"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Search, CheckCircle, AlertTriangle, XCircle, Download, 
  BarChart3, Gauge, Loader2, Sparkles, Smartphone, Monitor, Clock, 
  Share2, History, ChevronDown, ChevronUp, Zap, 
  FileText, Shield, ArrowRight, User, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { analyzeSitemap } from "@/app/actions/analyzeSitemap";
import type { SeoAuditResult } from "@/app/actions/analyzeSitemap";
import type { WebVitalResult } from "@/lib/pagespeed-types";

import { OverallScoreCircle, MetricBadge, MiniScoreCard } from "./components/metric-display";
import { SpeedSimulator } from "./components/speed-simulator";
import { HeadingsHierarchyMap, SchemaMarkupGraph, CrawlerRadar, GoogleSearchPreview } from "./components/seo-widgets";
import { ActionItemCard } from "./components/action-item-card";
import { IndianMarketTelemetryHub } from "./components/india-telemetry";
import { RadarChart, ScoreHistoryChart } from "./components/charts";
import { ScanRecord, perfSteps, seoSteps, metricInfo, HISTORY_KEY, MAX_HISTORY, loadHistory, getLabel } from "./components/constants";

export default function SiteCheckerClient() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [scanning, setScanning] = useState(false);

  const [leadCaptured, setLeadCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [perfResults, setPerfResults] = useState<WebVitalResult | null>(null);
  const [seoResults, setSeoResults] = useState<SeoAuditResult | null>(null);
  const [perfStep, setPerfStep] = useState("");
  const [seoStep, setSeoStep] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"performance" | "seo" | "india">("performance");
  const resultsRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
    return () => abortRef.current?.abort();
  }, []);

  const validateUrl = (input: string): string | null => {
    if (!input.trim()) return "Please enter a URL";
    try {
      const urlObj = new URL(input.startsWith("http") ? input : `https://${input}`);
      if (!urlObj.hostname.includes(".")) return "Please enter a valid domain (e.g. example.com)";
      return null;
    } catch {
      return "Invalid URL format. Try: example.com";
    }
  };

  const startScan = useCallback(async () => {
    const error = validateUrl(url);
    setUrlError(error);
    if (error) return;

    setScanning(true);
    setScanError(null);
    setPerfResults(null);
    setSeoResults(null);
    setShowLeadForm(false);
    setLeadCaptured(false);
    setPerfStep(perfSteps[0]);
    setSeoStep("");

    const fullUrl = url.startsWith("http") ? url : `https://${url}`;

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    let perfStepIdx = 1;
    const perfInterval = setInterval(() => {
      if (perfStepIdx < perfSteps.length) {
        setPerfStep(perfSteps[perfStepIdx - 1]);
        perfStepIdx++;
      }
    }, 600);

    const perfPromise = fetch("/api/pagespeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: fullUrl, strategy }),
      signal,
    }).then(async (res) => {
      clearInterval(perfInterval);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "PageSpeed scan failed");
      }
      const result: WebVitalResult = await res.json();
      return result;
    });

    let seoStepIdx = 1;
    const seoInterval = setInterval(() => {
      if (seoStepIdx <= seoSteps.length) {
        setSeoStep(seoSteps[seoStepIdx - 1]);
        seoStepIdx++;
      }
    }, 800);

    const seoPromise = analyzeSitemap(fullUrl).then((result) => {
      clearInterval(seoInterval);
      setSeoStep("SEO audit complete!");
      return result;
    }).catch((err) => {
      clearInterval(seoInterval);
      console.error("Sitemap audit failed:", err);
      return null;
    });

    try {
      const [perf, seo] = await Promise.all([perfPromise, seoPromise]);

      clearInterval(perfInterval);
      clearInterval(seoInterval);

      if (perf) {
        setPerfStep("PageSpeed report ready!");
        setPerfResults(perf);
      }

      if (seo) {
        setSeoResults(seo);
        setSeoStep("SEO audit complete!");
      }

      setTimeout(() => {
        setScanning(false);

        const m = perf ? [perf.lcp, perf.inp, perf.cls, perf.ttfb] : [];
        const poor = m.filter((x) => x.grade === "poor").length;
        const needs = m.filter((x) => x.grade === "needs-work").length;
        const overall = poor > 0 ? "Poor" : needs > 0 ? "Needs Work" : "Good";

        const newRecord: ScanRecord = { url: fullUrl, strategy, timestamp: Date.now(), overall, perf: perf?.performance ?? 0, seoScore: seo?.seoScore ?? 0 };
        try { const raw = localStorage.getItem(HISTORY_KEY); const existing = raw ? JSON.parse(raw) : []; existing.unshift(newRecord); localStorage.setItem(HISTORY_KEY, JSON.stringify(existing.slice(0, MAX_HISTORY))); } catch { }
        setHistory(prev => [newRecord, ...prev].slice(0, MAX_HISTORY));

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 400);
    } catch (err) {
      clearInterval(perfInterval);
      clearInterval(seoInterval);
      setScanError(err instanceof Error ? err.message : "Scan failed. Please verify target url indexation status and try again.");
      setScanning(false);
    }
  }, [url, strategy]);

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
        body: JSON.stringify({ email, company, source: "site-checker" }),
      });
      if (res.ok) setLeadCaptured(true);
      else { const d = await res.json(); setLeadError(d.error || "Something went wrong."); }
    } catch { setLeadError("Network error. Please try again."); }
    finally { setLeadSubmitting(false); }
  }, [email, company]);

  const metrics = perfResults ? [perfResults.lcp, perfResults.inp, perfResults.cls, perfResults.ttfb] : [];
  const poorCount = metrics.filter((m) => m.grade === "poor").length;
  const needsWorkCount = metrics.filter((m) => m.grade === "needs-work").length;
  const gradedCount = metrics.filter((m) => m.grade !== null).length;
  const overallGrade: string | null = gradedCount === 0 ? null : poorCount > 0 ? "poor" : needsWorkCount > 0 ? "needs-work" : "good";

  const combinedScore = perfResults
    ? Math.round(
        (perfResults.performance * 0.4 +
          perfResults.seo * 0.2 +
          (seoResults?.seoScore ?? 0) * 0.2 +
          (perfResults.accessibility ?? 75) * 0.1 +
          (perfResults.bestPractices ?? 70) * 0.1)
      )
    : 0;

  const copyResults = () => {
    if (!perfResults) return;
    const lines = [
      `SEO Report for ${perfResults.url} (${strategy})`,
      `Overall: ${getLabel(overallGrade)}`,
      `Performance: ${perfResults.performance}/100 | SEO: ${perfResults.seo}/100`,
      ``,
      `LCP: ${perfResults.lcp.value ?? "—"}s (${getLabel(perfResults.lcp.grade)})`,
      `INP: ${perfResults.inp.value ?? "—"}ms (${getLabel(perfResults.inp.grade)})`,
      `CLS: ${perfResults.cls.value ?? "—"} (${getLabel(perfResults.cls.grade)})`,
      `TTFB: ${perfResults.ttfb.value ?? "—"}s (${getLabel(perfResults.ttfb.grade)})`,
      ``,
      `Suggestions:`,
      ...perfResults.suggestions.map((s) => `  › ${s}`),
    ];
    if (seoResults) {
      lines.push(``, `SEO Audit:`, `  Score: ${seoResults.seoScore}/100`, `  Pages: ${seoResults.totalUrls}`, `  Missing Meta: ${seoResults.missingMeta}`, `  Broken Links: ${seoResults.brokenLinks}`, `  Schema Issues: ${seoResults.missingSchemas}`);
    }
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const scrollToSection = (tab: "performance" | "seo" | "india") => {
    setActiveSection(tab);
    setTimeout(() => {
      document.getElementById("tab-view-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
  };

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(128,128,128,0.04)_1px,transparent_0)] bg-[size:28px_28px] pointer-events-none z-0 dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_0)]" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
      
      <div className="relative z-10 flex-grow">
        <Navbar />
        
        <div className="pt-32 pb-20 px-4">
          <div className="container-main max-w-6xl mx-auto">
            
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Zap size={12} />
                Free Site Health Audit Tool
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-[-0.02em] font-sans">
                SEO & Website <span className="bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] bg-clip-text text-transparent drop-shadow-sm">Health Checker</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
                One click connects and runs a full-fidelity analysis of Core Web Vitals, sitemap indexes, headings hierarchy, JSON-LD schemas, and crawler indexability.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl relative">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" />
                  <input
                    type="text"
                    aria-label="Website URL"
                    placeholder="Enter website domain (e.g., example.com)"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setUrlError(null); }}
                    disabled={scanning}
                    className="w-full bg-white/50 border border-gray-200 dark:bg-white/[0.04] dark:border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-foreground placeholder:text-gray-400 dark:placeholder:text-foreground/30 focus:border-[#1A6DD6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A6DD6]/50 transition-all text-sm disabled:opacity-50 font-mono shadow-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={scanning}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded-xl font-bold text-sm text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.35)] shadow-[0_0_15px_rgba(26,109,214,0.15)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0 uppercase tracking-widest"
                >
                  {scanning ? (
                    <><Loader2 size={16} className="animate-spin" /> Scanning...</>
                  ) : (
                    <><Search size={16} /> Run Health Audit</>
                  )}
                </button>
              </form>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2 p-1 bg-white/[0.02] border-white/[0.06] rounded-lg">
                  <button type="button" onClick={() => setStrategy("mobile")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "mobile" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white" : "text-foreground/50 hover:text-foreground"}`}>
                    <Smartphone size={13} /> Mobile
                  </button>
                  <button type="button" onClick={() => setStrategy("desktop")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "desktop" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white" : "text-foreground/50 hover:text-foreground"}`}>
                    <Monitor size={13} /> Desktop
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-foreground/30 font-medium">
                  {history.length > 0 && (
                    <button type="button" onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 text-foreground/40 hover:text-foreground/70 transition-all">
                      <History size={13} /> History ({history.length}) {showHistory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  )}
                </div>
              </div>

              {showHistory && history.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-white/[0.03] rounded-xl border-white/[0.06] max-h-48 overflow-y-auto z-30 relative text-left">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] text-foreground/30 font-mono">Scan history</span>
                    <button onClick={clearHistory} className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors">Clear All</button>
                  </div>
                  {history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 text-xs border-b border-white/[0.03] last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-foreground/40 font-mono truncate max-w-[180px]">{h.url.replace("https://", "")}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${h.overall === "Good" ? "bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400" : h.overall === "Needs Work" ? "bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400" : "bg-red-500/10 text-red-600 dark:bg-red-400/10 dark:text-red-400"}`}>{h.overall}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-foreground/30">P:{h.perf}</span>
                        {h.seoScore > 0 && <span className="text-foreground/30">SEO:{h.seoScore}</span>}
                        <span className="text-foreground/30">{h.strategy === "mobile" ? <Smartphone size={10} /> : <Monitor size={10} />}</span>
                        <button onClick={() => { setUrl(h.url); setStrategy(h.strategy as "mobile" | "desktop"); setShowHistory(false); }} className="text-[#1A6DD6] hover:underline font-semibold">Re-scan</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {urlError && <p className="text-red-400 text-xs mt-2 font-mono text-left">{urlError}</p>}
            </motion.div>

            {scanning && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl text-left">
                <div className="flex items-center gap-3 mb-4">
                  <Loader2 size={18} className="text-brand-primary animate-spin" />
                  <span className="text-sm font-semibold text-foreground/70">Running deep telemetry scan on <span className="text-[#1A6DD6] font-mono">{url.startsWith("http") ? url : `https://${url}`}</span></span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1.5">
                      <Zap size={11} className="text-[#1A6DD6]" />
                      <span className="text-foreground/50">Performance & Core Web Vitals (Google PSI)</span>
                      {perfStep === "PageSpeed report ready!" && <span className="text-[#10b981] text-[10px] ml-auto font-bold font-mono">Done</span>}
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-1/2 h-full rounded-full bg-gradient-to-r from-transparent via-[#1A6DD6] to-transparent" />
                    </div>
                    <p className="text-[10px] text-foreground/30 font-mono mt-1">{perfStep}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1.5">
                      <FileText size={11} className="text-[#14b8a6]" />
                      <span className="text-foreground/50">SEO & Sitemap Node Audit (XML Parser)</span>
                      {seoStep === "SEO audit complete!" && <span className="text-[#10b981] text-[10px] ml-auto font-bold font-mono">Done</span>}
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-1/2 h-full rounded-full bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent" />
                    </div>
                    <p className="text-[10px] text-foreground/30 font-mono mt-1">{seoStep || "Waiting for thread connection..."}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {scanError && !scanning && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border-red-500/25 rounded-3xl p-6 md:p-8 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Health Scan Aborted</h3>
                    <p className="text-xs text-foreground/50 mt-1 leading-relaxed">{scanError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {(perfResults || seoResults) && !scanning && (
                <motion.div ref={resultsRef} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex items-center justify-between p-3.5 bg-white/50 dark:bg-white/[0.01] border-green-500/20 dark:border-[#10b981]/20 rounded-xl text-left">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#10b981]/10 flex items-center justify-center border border-[#10b981]/20">
                        <Check size={11} className="text-[#10b981]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">Website Audit Completed</h4>
                        <p className="text-[9px] text-foreground/45 font-medium">All diagnostic parameters resolved successfully</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-foreground/35">Just now</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <div className="lg:col-span-6 bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A6DD6]/5 blur-2xl rounded-full pointer-events-none" />
                      <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold absolute top-5 left-6">
                        Overall Website Score
                      </span>
                      
                      <div className="my-6">
                        <OverallScoreCircle score={combinedScore} />
                      </div>
                      
                      <p className="text-xs text-foreground/50 max-w-sm leading-relaxed font-light mt-2">
                        {combinedScore >= 80
                          ? "Your website is in excellent shape! Core metrics are fully optimized."
                          : combinedScore >= 60
                          ? "Your website is good, but there's room for improvement. Fix the highlighted issues."
                          : "Critical structural issues are affecting page experience. Optimize assets immediately."}
                      </p>

                      <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
                        <button onClick={() => scrollToSection("seo")} className="px-4 py-2 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded-lg font-bold text-xs text-white hover:shadow-[0_0_15px_rgba(26,109,214,0.3)] hover:scale-[1.01] transition-all flex items-center gap-1 uppercase tracking-wider">
                          <span>View All Issues</span>
                          <ArrowRight size={11} />
                        </button>
                        <button onClick={copyResults} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-foreground/55 hover:text-foreground hover:border-white/20 transition-all text-xs flex items-center gap-1.5 font-bold">
                          {copied ? <><CheckCircle size={12} className="text-[#10b981]" /> Copied</> : <><Share2 size={12} /> Share Report</>}
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
                      <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold absolute top-5 left-6">
                        Performance Radar Analysis
                      </span>
                      <RadarChart 
                        scores={{
                          perf: perfResults?.performance ?? 50,
                          seo: seoResults?.seoScore ?? 50,
                          sec: seoResults?.urlsList[0]?.https ? 90 : 50,
                          mob: perfResults?.mobile ?? 50,
                          ux: perfResults?.bestPractices ?? 50
                        }} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <MiniScoreCard title="Performance" score={perfResults?.performance ?? 0} status={perfResults && perfResults.performance >= 75 ? "Good" : "Needs Work"} icon={Zap} colorClass="text-[#1A6DD6]" />
                    <MiniScoreCard title="SEO Check" score={seoResults?.seoScore ?? 0} status={seoResults && seoResults.seoScore >= 80 ? "Good" : "Needs Work"} icon={Search} colorClass="text-[#14b8a6]" />
                    <MiniScoreCard title="Security" score={seoResults?.urlsList[0]?.https ? 95 : 45} status={seoResults?.urlsList[0]?.https ? "Good" : "Needs Work"} icon={Shield} colorClass="text-[#1A6DD6]" />
                    <MiniScoreCard title="Mobile" score={perfResults?.mobile ?? 0} status={perfResults && perfResults.mobile >= 75 ? "Good" : "Needs Work"} icon={Smartphone} colorClass="text-[#10b981]" />
                    <MiniScoreCard title="UX Index" score={perfResults?.accessibility ?? 75} status={(perfResults?.accessibility ?? 75) >= 80 ? "Good" : "Needs Work"} icon={User} colorClass="text-amber-400" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                    <div className="lg:col-span-6 bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl min-h-[220px]">
                      <div>
                        <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold block mb-4">Top Issues Found</span>
                        <div className="space-y-3">
                          {perfResults?.suggestions.slice(0, 3).map((s, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2.5 last:border-0">
                              <span className="text-xs text-foreground/80 font-medium truncate max-w-[280px]">{s}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${idx === 0 ? "bg-red-400/10 text-red-400 border border-red-400/20" : "bg-amber-400/10 text-amber-400 border border-amber-400/20"}`}>
                                {idx === 0 ? "High" : "Medium"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => scrollToSection("seo")} className="text-[#1A6DD6] hover:underline text-xs font-bold flex items-center gap-1 mt-6 w-fit uppercase tracking-wider">
                        <span>View All Issues</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="lg:col-span-6 bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                      <ScoreHistoryChart overallScore={combinedScore} />
                    </div>
                  </div>

                  <div id="tab-view-section" className="flex items-center gap-2 p-1 bg-white/[0.03] border-white/[0.08] rounded-xl w-fit mx-auto backdrop-blur-xl pt-10">
                    <button onClick={() => setActiveSection("performance")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "performance" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                      <Zap size={13} /> Performance
                    </button>
                    <button onClick={() => setActiveSection("seo")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "seo" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                      <FileText size={13} /> SEO & Sitemap
                    </button>
                    <button onClick={() => setActiveSection("india")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "india" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                      🇮🇳 India
                    </button>
                  </div>

                  {perfResults && activeSection === "performance" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
                      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                          <div>
                            <h2 className="text-base font-bold text-foreground">Measured Speed Vitals</h2>
                            <p className="text-xs text-foreground/45">GPU paint schedules and main thread delay checks</p>
                          </div>
                          <span className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${overallGrade === "good" ? "bg-[#10b981]/5 border-[#10b981]/20 text-[#10b981]" : overallGrade === "needs-work" ? "bg-amber-400/5 border-amber-400/20 text-amber-400" : "bg-red-400/5 border-red-400/20 text-red-400"}`}>
                            {getLabel(overallGrade).toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                          <MetricBadge label="LCP" value={perfResults.lcp.value !== null ? `${perfResults.lcp.value.toFixed(1)}s` : null} grade={perfResults.lcp.grade} info={metricInfo.LCP} />
                          <MetricBadge label="INP" value={perfResults.inp.value !== null ? `${perfResults.inp.value}ms` : null} grade={perfResults.inp.grade} info={metricInfo.INP} />
                          <MetricBadge label="CLS" value={perfResults.cls.value !== null ? perfResults.cls.value.toFixed(2) : null} grade={perfResults.cls.grade} info={metricInfo.CLS} />
                          <MetricBadge label="TTFB" value={perfResults.ttfb.value !== null ? `${perfResults.ttfb.value.toFixed(1)}s` : null} grade={perfResults.ttfb.grade} info={metricInfo.TTFB} />
                        </div>

                        <div className="border-t border-white/5 pt-4">
                          <button type="button" onClick={() => setShowDetailed(!showDetailed)} className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/75 transition-all">
                            <Clock size={12} /> {showDetailed ? "Hide" : "Show"} Detailed Lighthouse metrics {showDetailed ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                          </button>
                          
                          <AnimatePresence>
                            {showDetailed && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                  <MetricBadge label="FCP" value={perfResults.fcp.value !== null ? `${perfResults.fcp.value.toFixed(1)}s` : null} grade={perfResults.fcp.grade} info={metricInfo.FCP} />
                                  <MetricBadge label="TBT" value={perfResults.tbt.value !== null ? `${perfResults.tbt.value}ms` : null} grade={perfResults.tbt.grade} info={metricInfo.TBT} />
                                  <MetricBadge label="Speed Index" value={perfResults.si.value !== null ? `${perfResults.si.value.toFixed(1)}s` : null} grade={perfResults.si.grade} info={metricInfo.SI} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <SpeedSimulator lcp={perfResults.lcp.value ?? 4} fcp={perfResults.fcp.value ?? 2} ttfb={perfResults.ttfb.value ?? 0.8} />

                      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-foreground">Prioritized Action Items</h3>
                          <p className="text-xs text-foreground/45">Resolve these metrics to accelerate page load thresholds</p>
                        </div>
                        <div className="space-y-3">
                          {perfResults.suggestions.map((s, i) => (
                            <ActionItemCard key={i} suggestion={s} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {seoResults && activeSection === "seo" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
                      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                          <div>
                            <h2 className="text-base font-bold text-foreground mb-1">Indexation & Core Tag Analysis</h2>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-foreground/45">Sitemap endpoint audit sample</span>
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${seoResults.sitemapFetched ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]" : "bg-amber-400/10 border-amber-400/20 text-amber-400"}`}>
                                {seoResults.sitemapFetched ? "Sitemap Exposed" : "Missing Sitemap"}
                              </span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${seoResults.indexability === "healthy" ? "bg-[#10b981]/5 border-[#10b981]/20 text-[#10b981]" : "bg-amber-400/5 border-amber-400/20 text-amber-400"}`}>
                            {seoResults.indexability === "healthy" ? "CRAWL HEALTHY" : "NEEDS ACTION"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-[#1A6DD6] font-bold uppercase tracking-wider block mb-1">Sitemap Score</span>
                            <p className="text-xl font-black text-foreground">{seoResults.seoScore}<span className="text-xs text-foreground/40 font-normal">/100</span></p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Audited Pages</span>
                            <p className="text-xl font-bold text-foreground font-mono">{seoResults.totalUrls}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Missing Meta</span>
                            <p className={`text-xl font-bold font-mono ${seoResults.missingMeta > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingMeta}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Broken Links</span>
                            <p className={`text-xl font-bold font-mono ${seoResults.brokenLinks > 0 ? "text-red-400" : "text-[#10b981]"}`}>{seoResults.brokenLinks}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Missing Schema</span>
                            <p className={`text-xl font-bold font-mono ${seoResults.missingSchemas > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingSchemas}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
                            <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Avg Page Weight</span>
                            <p className="text-xl font-bold text-foreground font-mono">{seoResults.urlsList.length > 0 ? Math.round(seoResults.totalPageSize / seoResults.urlsList.length) : 0}<span className="text-xs text-foreground/40 font-normal">KB</span></p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-white/[0.02] border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Canonical</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingCanonical > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingCanonical > 0 ? `${seoResults.missingCanonical} Missing` : "Verified"}</span>
                          </div>
                          <div className="bg-white/[0.02] border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">OpenGraph Tags</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingOgTags > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingOgTags > 0 ? `${seoResults.missingOgTags} Incomplete` : "Healthy"}</span>
                          </div>
                          <div className="bg-white/[0.02] border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Twitter Cards</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingTwitterCard > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingTwitterCard > 0 ? "Missing" : "Verified"}</span>
                          </div>
                          <div className="bg-white/[0.02] border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Missing Alt Text</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.totalAltMissing > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.totalAltMissing > 0 ? `${seoResults.totalAltMissing} Elements` : "All Present"}</span>
                          </div>
                        </div>
                      </div>

                      <CrawlerRadar 
                        hasViewport={!seoResults.urlsList.some(p => !p.hasViewport)}
                        hasHtmlLang={!seoResults.urlsList.some(p => !p.hasHtmlLang)}
                        https={!seoResults.urlsList.some(p => !p.https)}
                        isNoindex={seoResults.noindexPages > 0}
                      />

                      <HeadingsHierarchyMap 
                        h1Count={seoResults.urlsList[0]?.h1Count ?? 1}
                        h2Count={seoResults.urlsList[0]?.h2Count ?? 3}
                        title={seoResults.urlsList[0]?.title ?? ""}
                      />

                      <SchemaMarkupGraph hasSchema={!seoResults.urlsList.some(p => !p.hasSchema)} />

                      <GoogleSearchPreview 
                        url={seoResults.url} 
                        title={seoResults.urlsList[0]?.title ?? ""} 
                        description={seoResults.urlsList[0]?.description ?? ""} 
                      />

                      {seoResults.urlsList.length > 0 && (
                        <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 overflow-hidden">
                          <div className="mb-4">
                            <h3 className="text-base font-bold text-foreground">Sitemap URL Audit Sample</h3>
                            <p className="text-xs text-foreground/45">Detailed parameter checklist on crawled sitemap routes</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-white/[0.08] text-foreground/40 font-mono text-[9px] uppercase tracking-wider">
                                  <th className="py-3 pr-4 font-bold">Audited Endpoint</th>
                                  <th className="py-3 px-3 text-center font-bold">Score</th>
                                  <th className="py-3 px-3 text-center font-bold">Status</th>
                                  <th className="py-3 px-3 text-center font-bold">Title</th>
                                  <th className="py-3 px-3 text-center font-bold">Meta Description</th>
                                  <th className="py-3 px-3 text-center font-bold">Headings</th>
                                  <th className="py-3 pl-3 text-center font-bold">Schema</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5 font-mono text-[11px] text-foreground/80">
                                {seoResults.urlsList.map((page, index) => {
                                  let displayPath = page.url;
                                  try { const parsed = new URL(page.url); displayPath = parsed.pathname === "/" ? "/" : parsed.pathname; } catch { }
                                  const checks = [!!page.title, !!page.description, page.h1Count === 1, page.status === 200, page.hasSchema];
                                  const passed = checks.filter(Boolean).length;
                                  const pageScore = Math.round((passed / checks.length) * 100);
                                  return (
                                    <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                                      <td className="py-3.5 pr-4 truncate max-w-[200px] text-foreground/90 font-medium" title={page.url}>{displayPath}</td>
                                      <td className="py-3.5 px-3 text-center">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold ${pageScore >= 80 ? "bg-[#10b981]/10 text-[#10b981]" : pageScore >= 50 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>{pageScore}</span>
                                      </td>
                                      <td className="py-3.5 px-3 text-center">
                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${page.status === 200 ? "bg-[#10b981]/15 text-[#10b981]" : "bg-red-500/15 text-red-400"}`}>{page.status}</span>
                                      </td>
                                      <td className="py-3.5 px-3 text-center">{page.title ? <CheckCircle size={13} className="text-[#10b981] mx-auto" /> : <XCircle size={13} className="text-red-400 mx-auto" />}</td>
                                      <td className="py-3.5 px-3 text-center">{page.description ? <CheckCircle size={13} className="text-[#10b981] mx-auto" /> : <XCircle size={13} className="text-amber-400 mx-auto" />}</td>
                                      <td className="py-3.5 px-3 text-center text-foreground/45 text-[10px]">H1:{page.h1Count} / H2:{page.h2Count}</td>
                                      <td className="py-3.5 pl-3 text-center">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] ${page.hasSchema ? "bg-[#14b8a6]/15 text-[#14b8a6]" : "bg-white/[0.03] text-foreground/35 border border-white/5"}`}>{page.hasSchema ? "JSON-LD" : "None"}</span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-foreground">Sitemap Action Recommendations</h3>
                          <p className="text-xs text-foreground/45">Inject these semantic and indexation fixes to solidify SEO health</p>
                        </div>
                        <div className="space-y-3">
                          {seoResults.suggestions.map((s, idx) => (
                            <ActionItemCard key={idx} suggestion={s} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {seoResults?.indiaTelemetry && activeSection === "india" && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <IndianMarketTelemetryHub telemetry={seoResults.indiaTelemetry} />
                      
                      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 text-left">
                        <h4 className="text-sm font-bold text-foreground mb-4">India Compliance & Checkout Best Practices</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground/75 leading-relaxed font-light">
                          <div className="space-y-3 p-4 bg-white/[0.02] border-white/[0.06] rounded-xl">
                            <h5 className="font-bold text-[#14b8a6] flex items-center gap-1.5">
                              <Zap size={13} />
                              Indian Core Web Vitals
                            </h5>
                            <ul className="space-y-2 list-disc list-inside pl-1 text-[11px]">
                              <li>Jio 4G/5G mobile latencies: Ensure all image assets use WebP or AVIF compressions.</li>
                              <li>AWS ap-south-1 Edge locations: Enable a Cloudflare caching proxy to deliver static resources locally from Mumbai or Bangalore PoPs.</li>
                              <li>Main Thread Block Reduction: Heavy JS bundles delay paints on lower-end Android handsets common in rural India.</li>
                            </ul>
                          </div>

                          <div className="space-y-3 p-4 bg-white/[0.02] border-white/[0.06] rounded-xl">
                            <h5 className="font-bold text-amber-400 flex items-center gap-1.5">
                              <Shield size={13} />
                              DPDP Act (2023) Guidance
                            </h5>
                            <ul className="space-y-2 list-disc list-inside pl-1 text-[11px]">
                              <li>Indian Consent Mandates: The DPDP Act requires unambiguous explicit consent.</li>
                              <li>Localized Languages: Indian compliance encourages displaying data usage in local languages.</li>
                              <li>User Data Deletion APIs: Build account features for quick data disposal requests.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!leadCaptured && showLeadForm && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-tr from-[#1A6DD6]/10 to-[#14b8a6]/10 border border-white/[0.08] rounded-3xl p-6 md:p-8 backdrop-blur-xl relative text-left">
                      <div className="absolute top-3 right-4">
                        <button type="button" onClick={() => setShowLeadForm(false)} className="text-foreground/45 hover:text-foreground text-xs font-mono">Dismiss</button>
                      </div>
                      <div className="max-w-xl">
                        <h3 className="text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                          <Sparkles size={16} className="text-[#00d2ff]" />
                          Download Premium SEO Audit Blueprint
                        </h3>
                        <p className="text-xs text-foreground/50 mb-5 leading-relaxed font-light">
                          Get a detailed custom PDF outlining a complete diagnostic strategy for your domain, optimized for Indian network scaling and DPDP legislation.
                        </p>
                        
                        <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1">
                            <input type="email" required placeholder="Business Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/[0.04] border-white/[0.08] rounded-xl px-4 py-3 text-xs focus:border-[#1A6DD6]/50 focus:outline-none" />
                          </div>
                          <div className="flex-grow">
                            <input type="text" required placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-white/[0.04] border-white/[0.08] rounded-xl px-4 py-3 text-xs focus:border-[#1A6DD6]/50 focus:outline-none" />
                          </div>
                          <button type="submit" disabled={leadSubmitting} className="px-5 py-3 bg-[#1A6DD6] hover:bg-[#1A6DD6]/90 transition-all font-bold text-xs uppercase tracking-wider text-white rounded-xl disabled:opacity-50 shrink-0">
                            {leadSubmitting ? "Generating..." : "Get PDF Blueprint"}
                          </button>
                        </form>
                        {leadError && <p className="text-red-400 text-[10px] mt-2 font-mono">{leadError}</p>}
                      </div>
                    </motion.div>
                  )}

                  {!showLeadForm && (
                    <div className="text-center pt-4">
                      <button onClick={() => setShowLeadForm(true)} className="px-8 py-4 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] hover:shadow-[0_0_35px_rgba(26,109,214,0.4)] shadow-[0_0_15px_rgba(26,109,214,0.2)] rounded-full font-bold text-sm tracking-widest text-white transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 uppercase">
                        <Download size={14} />
                        Export Full Audit Report
                      </button>
                    </div>
                  )}

                  {leadCaptured && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-white/[0.03] border-[#10b981]/25 rounded-3xl text-center backdrop-blur-xl">
                      <CheckCircle className="text-[#10b981] mx-auto mb-3" size={24} />
                      <h4 className="text-sm font-bold text-foreground">SEO Audit PDF Dispatched!</h4>
                      <p className="text-xs text-foreground/45 mt-1 max-w-sm mx-auto font-light">
                        We have dispatched your custom technical audit blueprint to {email}. Please review your inbox folder shortly.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!scanning && !perfResults && !seoResults && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/[0.02] border-white/[0.06] rounded-3xl p-6 text-center hover:border-[#1A6DD6]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#1A6DD6]/10 flex items-center justify-center mx-auto mb-3.5"><Gauge size={18} className="text-[#1A6DD6]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Core Web Vitals</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Interactive speeds including LCP, INP, CLS, and latency checks.</p>
                  </div>
                  <div className="bg-white/[0.02] border-white/[0.06] rounded-3xl p-6 text-center hover:border-[#1A6DD6]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center mx-auto mb-3.5"><BarChart3 size={18} className="text-[#14b8a6]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">PSI / Lighthouse</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Fidelity grades on Accessibility, Best Practices, and performance audits.</p>
                  </div>
                  <div className="bg-white/[0.02] border-white/[0.06] rounded-3xl p-6 text-center hover:border-[#1A6DD6]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center mx-auto mb-3.5"><FileText size={18} className="text-[#10b981]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Sitemap Audit</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Crawls robots and XML sitemaps to verify meta headers and SSL encryption.</p>
                  </div>
                  <div className="bg-white/[0.02] border-white/[0.06] rounded-3xl p-6 text-center hover:border-[#1A6DD6]/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#1A6DD6]/10 flex items-center justify-center mx-auto mb-3.5"><Shield size={18} className="text-[#1A6DD6]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Rich Indexation</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Scans structured JSON-LD schemas and headings outlines required for snippets.</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-foreground/35 font-medium uppercase tracking-[0.2em]">Engineered and Maintained by Maysan Labs Studio</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <ContactFooter />
    </main>
  );
}
