"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Globe, Search, CheckCircle, AlertTriangle, XCircle, Mail, Download, BarChart3, Gauge, Loader2, Sparkles, Smartphone, Monitor, Clock, RefreshCw, Share2, History, ChevronDown, ChevronUp, Info, Zap, FileText, Shield, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { analyzeSitemap } from "@/app/actions/analyzeSitemap";
import type { SeoAuditResult } from "@/app/actions/analyzeSitemap";

interface Metric {
  value: number | null;
  grade: "good" | "needs-work" | "poor" | null;
}

interface WebVitalResult {
  url: string;
  strategy: string;
  lcp: Metric;
  inp: Metric;
  cls: Metric;
  ttfb: Metric;
  fcp: Metric;
  tbt: Metric;
  si: Metric;
  mobile: number;
  seo: number;
  performance: number;
  accessibility: number | null;
  bestPractices: number | null;
  suggestions: string[];
}

interface ScanRecord {
  url: string;
  strategy: string;
  timestamp: number;
  overall: string;
  perf: number;
  seoScore: number;
}

const perfSteps = [
  "Requesting Google PageSpeed Insights...",
  "Measuring Largest Contentful Paint (LCP)...",
  "Evaluating Interaction to Next Paint (INP)...",
  "Checking Cumulative Layout Shift (CLS)...",
  "Analyzing server response time (TTFB)...",
  "Scoring performance & SEO...",
  "PageSpeed report ready!",
];

const seoSteps = [
  "Connecting to server...",
  "Locating sitemap.xml & robots.txt...",
  "Parsing XML URL node tree...",
  "Auditing meta titles & descriptions...",
  "Analyzing JSON-LD structured schemas...",
  "Checking HTTP status codes & redirects...",
  "Verifying heading hierarchy & indexability...",
  "Compiling structured crawl report...",
];

const metricInfo: Record<string, string> = {
  LCP: "Largest Contentful Paint measures when the largest content element becomes visible. Target: <2.5s.",
  INP: "Interaction to Next Paint measures responsiveness to user interactions. Target: <200ms.",
  CLS: "Cumulative Layout Shift measures visual stability. Target: <0.1.",
  TTFB: "Time to First Byte measures server response time. Target: <0.8s.",
  FCP: "First Contentful Paint measures when first text/image is painted. Target: <1.8s.",
  TBT: "Total Blocking Time measures how long the main thread is blocked. Target: <200ms.",
  SI: "Speed Index measures how quickly content is visually displayed. Target: <3.4s.",
};

function GradeIcon({ grade, size = 20 }: { grade: string | null; size?: number }) {
  switch (grade) {
    case "good": return <CheckCircle size={size} className="text-green-400" />;
    case "needs-work": return <AlertTriangle size={size} className="text-amber-400" />;
    case "poor": return <XCircle size={size} className="text-red-400" />;
    default: return <Loader2 size={size} className="text-foreground/30 animate-pulse" />;
  }
}

function MetricBadge({ value, grade, label, info }: { value: string | null; grade: string | null; label: string; info?: string }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="bg-black/20 rounded-xl p-4 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-foreground/50 font-medium">{label}</span>
          {info && (
            <button onClick={() => setShowInfo(!showInfo)} className="text-foreground/20 hover:text-foreground/50 transition-colors">
              <Info size={11} />
            </button>
          )}
        </div>
        <GradeIcon grade={grade} size={16} />
      </div>
      <p className="text-xl font-bold text-foreground">{value ?? "—"}</p>
      {showInfo && info && (
        <div className="absolute z-10 top-full left-0 mt-1 p-2 bg-slate-800 border border-white/10 rounded-lg text-[10px] text-foreground/70 w-56 shadow-xl">
          {info}
        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (score === null) return null;
  const color = score >= 90 ? "from-green-500 to-emerald-400" : score >= 50 ? "from-amber-400 to-yellow-300" : "from-red-500 to-rose-400";
  return (
    <div className="flex-1 min-w-[140px] bg-black/20 rounded-xl p-4">
      <p className="text-[10px] text-foreground/50 font-medium mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${score}%` }} />
        </div>
        <span className="text-sm font-bold text-foreground w-8 text-right">{score}</span>
      </div>
    </div>
  );
}

function getLabel(grade: string | null): string {
  switch (grade) {
    case "good": return "Good";
    case "needs-work": return "Needs Work";
    case "poor": return "Poor";
    default: return "—";
  }
}

const HISTORY_KEY = "seo-scan-history";
const MAX_HISTORY = 10;

function loadHistory(): ScanRecord[] {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function saveToHistory(record: ScanRecord) {
  try { const history = loadHistory(); history.unshift(record); localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY))); } catch { }
}

export default function SeoAnalyzerClient() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [scanning, setScanning] = useState(false);

  const [leadCaptured, setLeadCaptured] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [perfResults, setPerfResults] = useState<WebVitalResult | null>(null);
  const [seoResults, setSeoResults] = useState<SeoAuditResult | null>(null);
  const [perfProgress, setPerfProgress] = useState(0);
  const [seoProgress, setSeoProgress] = useState(0);
  const [perfStep, setPerfStep] = useState("");
  const [seoStep, setSeoStep] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seoError, setSeoError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"performance" | "seo">("performance");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHistory(loadHistory()); }, []);

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
    setPerfResults(null);
    setSeoResults(null);
    setSeoError(null);
    setShowLeadForm(false);
    setPerfProgress(0);
    setSeoProgress(0);
    setPerfStep(perfSteps[0]);
    setSeoStep("");

    const fullUrl = url.startsWith("http") ? url : `https://${url}`;

    let perfStepIdx = 1;
    const perfInterval = setInterval(() => {
      if (perfStepIdx < perfSteps.length) {
        setPerfProgress(Math.min((perfStepIdx / perfSteps.length) * 100, 90));
        setPerfStep(perfSteps[perfStepIdx - 1]);
        perfStepIdx++;
      }
    }, 600);

    const perfPromise = fetch("/api/pagespeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: fullUrl, strategy }),
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
        setSeoProgress(Math.min((seoStepIdx / seoSteps.length) * 100, 90));
        setSeoStep(seoSteps[seoStepIdx - 1]);
        seoStepIdx++;
      }
    }, 800);

    const seoPromise = analyzeSitemap(fullUrl).then((result) => {
      clearInterval(seoInterval);
      setSeoProgress(100);
      setSeoStep("SEO audit complete!");
      return result;
    }).catch((err) => {
      clearInterval(seoInterval);
      setSeoError(err?.message || "SEO audit failed");
      return null;
    });

    try {
      const [perf, seo] = await Promise.all([perfPromise, seoPromise]);

      clearInterval(perfInterval);
      clearInterval(seoInterval);

      if (perf) {
        setPerfProgress(100);
        setPerfStep("PageSpeed report ready!");
        setPerfResults(perf);
      }

      if (seo) {
        setSeoResults(seo);
        setSeoProgress(100);
        setSeoStep("SEO audit complete!");
      }

      setTimeout(() => {
        setScanning(false);

        const m = perf ? [perf.lcp, perf.inp, perf.cls, perf.ttfb] : [];
        const poor = m.filter((x) => x.grade === "poor").length;
        const needs = m.filter((x) => x.grade === "needs-work").length;
        const overall = poor > 0 ? "Poor" : needs > 0 ? "Needs Work" : "Good";

        saveToHistory({
          url: fullUrl,
          strategy,
          timestamp: Date.now(),
          overall,
          perf: perf?.performance ?? 0,
          seoScore: seo?.seoScore ?? 0,
        });
        setHistory(loadHistory());
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    } catch (err) {
      clearInterval(perfInterval);
      clearInterval(seoInterval);
      setUrlError(err instanceof Error ? err.message : "Scan failed. Please try again.");
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
        body: JSON.stringify({ email, company, source: "seo-analyzer" }),
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
    });
  };

  const resetAll = () => {
    setUrl("");
    setPerfResults(null);
    setSeoResults(null);
    setScanning(false);
    setShowLeadForm(false);
    setLeadCaptured(false);
    setEmail("");
    setCompany("");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id === "perf-section" ? "performance" : "seo");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container-main max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Zap size={12} />
              All-in-One Tool
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SEO & Website <span className="text-brand-primary">Health Checker</span>
            </h1>
            <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base">
              One scan checks Core Web Vitals, Lighthouse scores, sitemap health, meta tags, schema markup, broken links & more.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-strong rounded-2xl p-6 md:p-8 mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" />
                <input
                  type="text"
                  placeholder="Enter your website URL (e.g., example.com)"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setUrlError(null); }}
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
                  <><Loader2 size={16} className="animate-spin" /> Scanning...</>
                ) : (
                  <><Search size={16} /> Run Audit</>
                )}
              </button>
            </form>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 p-1 bg-black/20 rounded-lg border border-white/[0.06]">
                <button type="button" onClick={() => setStrategy("mobile")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "mobile" ? "bg-brand-primary text-black" : "text-foreground/50 hover:text-foreground"}`}>
                  <Smartphone size={13} /> Mobile
                </button>
                <button type="button" onClick={() => setStrategy("desktop")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "desktop" ? "bg-brand-primary text-black" : "text-foreground/50 hover:text-foreground"}`}>
                  <Monitor size={13} /> Desktop
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/30">
                <span><Zap size={11} className="inline text-brand-primary" /> Speed + SEO</span>
                {history.length > 0 && (
                  <button type="button" onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 text-foreground/40 hover:text-foreground/70 transition-all ml-2">
                    <History size={13} /> History ({history.length}) {showHistory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                )}
              </div>
            </div>

            {showHistory && history.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-black/20 rounded-xl border border-white/[0.04] max-h-48 overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 text-xs border-b border-white/[0.03] last:border-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-foreground/40 font-mono truncate max-w-[180px]">{h.url.replace("https://", "")}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${h.overall === "Good" ? "bg-green-400/10 text-green-400" : h.overall === "Needs Work" ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>{h.overall}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-foreground/30">P:{h.perf}</span>
                      {h.seoScore > 0 && <span className="text-foreground/30">SEO:{h.seoScore}</span>}
                      <span className="text-foreground/30">{h.strategy === "mobile" ? <Smartphone size={10} /> : <Monitor size={10} />}</span>
                      <button onClick={() => { setUrl(h.url); setStrategy(h.strategy as "mobile" | "desktop"); setShowHistory(false); }} className="text-brand-primary hover:underline">Re-scan</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {urlError && <p className="text-red-400 text-xs mt-2">{urlError}</p>}
          </motion.div>

          {/* Scanning progress */}
          {scanning && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 size={18} className="text-brand-primary animate-spin" />
                <span className="text-sm font-semibold text-foreground/70">Running audit on <span className="text-brand-primary">{url.startsWith("http") ? url : `https://${url}`}</span></span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-foreground/50 flex items-center gap-1.5"><Zap size={11} className="text-brand-primary" /> Performance & Core Web Vitals</span>
                    <span className="text-foreground/30">{Math.round(perfProgress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${perfProgress}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-light" />
                  </div>
                  <p className="text-[10px] text-foreground/30 font-mono mt-1">{perfStep}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-foreground/50 flex items-center gap-1.5"><FileText size={11} className="text-brand-primary" /> SEO & Sitemap Audit</span>
                    <span className="text-foreground/30">{Math.round(seoProgress)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${seoProgress}%` }} transition={{ duration: 0.5 }} className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-primary" />
                  </div>
                  <p className="text-[10px] text-foreground/30 font-mono mt-1">{seoStep || "Waiting..."}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {(perfResults || seoResults) && !scanning && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6" ref={resultsRef}>
                {/* Section tabs */}
                <div className="flex items-center gap-2 p-1 bg-black/30 rounded-xl border border-white/[0.06] w-fit mx-auto">
                  <button onClick={() => scrollToSection("perf-section")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeSection === "performance" ? "bg-brand-primary text-black shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                    <Zap size={13} /> Performance
                  </button>
                  <button onClick={() => scrollToSection("seo-section")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeSection === "seo" ? "bg-brand-primary text-black shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                    <FileText size={13} /> SEO Audit
                  </button>
                </div>

                {/* Performance Section */}
                {perfResults && (
                  <div id="perf-section" className="glass-strong rounded-2xl p-6 md:p-8 scroll-mt-24">
                    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-lg font-bold text-foreground">Results for {perfResults.url}</h2>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${strategy === "mobile" ? "bg-brand-primary/10 text-brand-primary" : "bg-cyan-500/10 text-cyan-400"}`}>
                            {strategy === "mobile" ? <><Smartphone size={10} className="inline mr-0.5" /> Mobile</> : <><Monitor size={10} className="inline mr-0.5" /> Desktop</>}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/40">Core Web Vitals & Lighthouse Scores</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <button onClick={copyResults} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground/40 hover:text-foreground hover:border-white/20 transition-all" title="Copy report">
                            {copied ? <CheckCircle size={14} className="text-green-400" /> : <Share2 size={14} />}
                          </button>
                          <button onClick={resetAll} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-foreground/40 hover:text-foreground hover:border-white/20 transition-all" title="New scan">
                            <RefreshCw size={14} />
                          </button>
                        </div>
                        <span className="text-xs text-foreground/40">Overall</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${overallGrade === "good" ? "bg-green-400/10 text-green-400" : overallGrade === "needs-work" ? "bg-amber-400/10 text-amber-400" : overallGrade === "poor" ? "bg-red-400/10 text-red-400" : "bg-white/5 text-foreground/40"}`}>
                          {getLabel(overallGrade)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <MetricBadge label="LCP" value={perfResults.lcp.value !== null ? `${perfResults.lcp.value.toFixed(1)}s` : null} grade={perfResults.lcp.grade} info={metricInfo.LCP} />
                      <MetricBadge label="INP" value={perfResults.inp.value !== null ? `${perfResults.inp.value}ms` : null} grade={perfResults.inp.grade} info={metricInfo.INP} />
                      <MetricBadge label="CLS" value={perfResults.cls.value !== null ? perfResults.cls.value.toFixed(2) : null} grade={perfResults.cls.grade} info={metricInfo.CLS} />
                      <MetricBadge label="TTFB" value={perfResults.ttfb.value !== null ? `${perfResults.ttfb.value.toFixed(1)}s` : null} grade={perfResults.ttfb.grade} info={metricInfo.TTFB} />
                    </div>

                    <div className="mb-6">
                      <button onClick={() => { const el = document.getElementById("perf-detailed"); if (el) el.classList.toggle("hidden"); }} className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/70 transition-all mb-3">
                        <Clock size={12} /> Show detailed metrics <ChevronDown size={10} />
                      </button>
                      <div id="perf-detailed" className="hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <MetricBadge label="FCP" value={perfResults.fcp.value !== null ? `${perfResults.fcp.value.toFixed(1)}s` : null} grade={perfResults.fcp.grade} info={metricInfo.FCP} />
                        <MetricBadge label="TBT" value={perfResults.tbt.value !== null ? `${perfResults.tbt.value}ms` : null} grade={perfResults.tbt.grade} info={metricInfo.TBT} />
                        <MetricBadge label="Speed Index" value={perfResults.si.value !== null ? `${perfResults.si.value.toFixed(1)}s` : null} grade={perfResults.si.grade} info={metricInfo.SI} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <ScoreBar label="Performance" score={perfResults.performance} />
                      <ScoreBar label="SEO" score={perfResults.seo} />
                      <ScoreBar label="Accessibility" score={perfResults.accessibility} />
                      <ScoreBar label="Best Practices" score={perfResults.bestPractices} />
                    </div>
                  </div>
                )}

                {/* SEO Section */}
                {seoResults && (
                  <div id="seo-section" className="glass-strong rounded-2xl p-6 md:p-8 scroll-mt-24">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-bold text-foreground mb-1">SEO Audit — {seoResults.url}</h2>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-foreground/40">Technical Sitemap Indexation Report</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${seoResults.sitemapFetched ? "bg-green-400/10 text-green-400" : "bg-amber-400/10 text-amber-400"}`}>
                            <Globe size={10} />
                            {seoResults.sitemapFetched ? "Sitemap Found" : "Sitemap Not Found"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground/40">Indexability</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${seoResults.indexability === "healthy" ? "bg-green-400/10 text-green-400" : seoResults.indexability === "action-required" ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>
                          {seoResults.indexability === "healthy" ? "Healthy" : seoResults.indexability === "action-required" ? "Needs Action" : "Poor"}
                        </span>
                      </div>
                    </div>

                    {/* SEO Summary Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Overall SEO</span>
                        <p className="text-xl font-black text-foreground">{seoResults.seoScore}<span className="text-xs text-foreground/40 font-normal">/100</span></p>
                        <div className="w-full h-1.5 bg-white/[0.04] rounded-full mt-2 overflow-hidden">
                          <div className={`h-full rounded-full ${seoResults.seoScore >= 85 ? "bg-green-400" : seoResults.seoScore >= 65 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${seoResults.seoScore}%` }} />
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Pages</span>
                        <p className="text-xl font-black text-foreground">{seoResults.totalUrls}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Sitemap URLs</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Meta Tags</span>
                        <p className={`text-xl font-black ${seoResults.missingMeta > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingMeta}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Broken</span>
                        <p className={`text-xl font-black ${seoResults.brokenLinks > 0 ? "text-red-400" : "text-green-400"}`}>{seoResults.brokenLinks}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Links</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Schema</span>
                        <p className={`text-xl font-black ${seoResults.missingSchemas > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingSchemas}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Indexability</span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${seoResults.indexability === "healthy" ? "bg-green-400/10 text-green-400" : seoResults.indexability === "action-required" ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>
                          {seoResults.indexability === "healthy" ? "Healthy" : seoResults.indexability === "action-required" ? "Needs Action" : "Poor"}
                        </span>
                      </div>
                    </div>

                    {/* Advanced SEO Checks */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Canonical</span>
                        <p className={`text-xl font-black ${seoResults.missingCanonical > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingCanonical}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Noindex</span>
                        <p className={`text-xl font-black ${seoResults.noindexPages > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.noindexPages}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Blocked Pages</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">OG Tags</span>
                        <p className={`text-xl font-black ${seoResults.missingOgTags > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingOgTags}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Incomplete</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Twitter Card</span>
                        <p className={`text-xl font-black ${seoResults.missingTwitterCard > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingTwitterCard}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Viewport</span>
                        <p className={`text-xl font-black ${seoResults.missingViewport > 0 ? "text-red-400" : "text-green-400"}`}>{seoResults.missingViewport}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">HTML Lang</span>
                        <p className={`text-xl font-black ${seoResults.missingHtmlLang > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.missingHtmlLang}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Alt Text</span>
                        <p className={`text-xl font-black ${seoResults.totalAltMissing > 0 ? "text-amber-400" : "text-green-400"}`}>{seoResults.totalAltMissing}</p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Missing</p>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-foreground/50 font-medium block mb-1">Page Weight</span>
                        <p className="text-xl font-black text-foreground">{seoResults.urlsList.length > 0 ? Math.round(seoResults.totalPageSize / seoResults.urlsList.length) : 0}<span className="text-xs text-foreground/40 font-normal">KB</span></p>
                        <p className="text-[10px] text-foreground/40 mt-0.5">Avg</p>
                      </div>
                    </div>

                    {/* Issues Breakdown */}
                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle size={14} className="text-brand-primary" />
                        Issues Breakdown
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {[
                          { label: "Meta Tags", value: seoResults.missingMeta, color: seoResults.missingMeta > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "Broken Links", value: seoResults.brokenLinks, color: seoResults.brokenLinks > 0 ? "bg-red-400" : "bg-green-400", max: 20 },
                          { label: "Schema", value: seoResults.missingSchemas, color: seoResults.missingSchemas > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "Canonical", value: seoResults.missingCanonical, color: seoResults.missingCanonical > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "Noindex", value: seoResults.noindexPages, color: seoResults.noindexPages > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "OG Tags", value: seoResults.missingOgTags, color: seoResults.missingOgTags > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "Twitter Card", value: seoResults.missingTwitterCard, color: seoResults.missingTwitterCard > 0 ? "bg-amber-400" : "bg-green-400", max: 20 },
                          { label: "Alt Text", value: seoResults.totalAltMissing, color: seoResults.totalAltMissing > 0 ? "bg-amber-400" : "bg-green-400", max: 10 },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-foreground/60">{item.label}</span>
                              <span className={`font-bold ${item.value > 0 ? "text-amber-400" : "text-green-400"}`}>{item.value}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(item.value * (100 / item.max), 100)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div className="bg-black/20 rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap size={14} className="text-brand-primary" />
                        Prioritized Action Items
                      </h3>
                      <ul className="space-y-3">
                        {seoResults.suggestions.map((suggestion, i) => {
                          const s = suggestion.toLowerCase();
                          const isPositive = s.includes("healthy") || s.includes("excellent") || s.includes("fully populated") || s.includes("successfully exposed") || s.includes("contain microdata") || s.includes("link health is excellent") || s.includes("successful 200") || s.includes("fully populated");
                          const isAction = s.includes("broken") || s.includes("missing") || s.includes("could not locate") || s.includes("ensure every") || s.includes("incomplete") || s.includes("not found") || s.includes("blocked") || s.includes("different domain") || s.includes("page weight") || s.includes("alt text") || s.includes("alt tag");
                          const label = isPositive ? "PASS" : isAction ? "ACTION" : "NOTE";
                          return (
                            <li key={i} className={`flex items-start gap-2.5 text-xs p-3 rounded-lg ${isPositive ? "bg-green-400/5 border border-green-400/10" : "bg-white/[0.02] border border-white/[0.06]"}`}>
                              <span className={`mt-0.5 shrink-0 ${isPositive ? "text-green-400" : "text-brand-primary"}`}>
                                {isPositive ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                              </span>
                              <span className={`${isPositive ? "text-green-400/80" : "text-foreground/60"}`}>
                                <strong className={`${isPositive ? "text-green-400" : "text-foreground/80"}`}>{label}: </strong>{suggestion}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Google Search Preview */}
                    <div className="bg-black/20 rounded-xl p-5 mb-6">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <ExternalLink size={14} className="text-brand-primary" />
                        Google Search Preview (Sampled Index)
                      </h3>
                      <div className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/5 rounded-lg p-4 font-sans text-left max-w-2xl shadow-sm dark:shadow-none">
                        <div className="text-[11px] text-[#202124] dark:text-[#bdc1c6] mb-1 flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                          <Globe size={10} className="text-[#1a0dab] dark:text-[#8ab4f8]" />
                          <span>{seoResults.url}</span>
                        </div>
                        <h4 className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1 font-medium">
                          {seoResults.urlsList[0]?.title || "Missing Title Tag"}
                        </h4>
                        <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed text-xs">
                          {seoResults.urlsList[0]?.description || "Warning: No meta description was detected in our crawl checks! Add a unique, keyword-rich meta description tag to ensure higher organic search click rates."}
                        </p>
                      </div>
                    </div>

                    {/* Sitemap URL Table */}
                    {seoResults.urlsList.length > 0 && (
                      <div className="bg-black/20 rounded-xl p-5 mb-6 overflow-hidden">
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <FileText size={14} className="text-brand-primary" />
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
                              {seoResults.urlsList.map((page, index) => {
                                let displayPath = page.url;
                                try { const parsed = new URL(page.url); displayPath = parsed.pathname === "/" ? "/" : parsed.pathname; } catch { }
                                const checks = [!!page.title, !!page.description, page.h1Count === 1, page.status === 200, page.hasSchema];
                                const passed = checks.filter(Boolean).length;
                                const pageScore = Math.round((passed / checks.length) * 100);
                                return (
                                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 pr-4 font-mono max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-foreground/80">{displayPath}</td>
                                    <td className="py-3 px-3 text-center">
                                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold font-mono ${pageScore >= 80 ? "bg-green-400/10 text-green-400" : pageScore >= 50 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>{pageScore}</span>
                                    </td>
                                    <td className="py-3 px-3 text-center">
                                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${page.status === 200 ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>{page.status}</span>
                                    </td>
                                    <td className="py-3 px-3 text-center">{page.title ? <CheckCircle size={13} className="text-green-400 mx-auto" /> : <XCircle size={13} className="text-red-400 mx-auto" />}</td>
                                    <td className="py-3 px-3 text-center">{page.description ? <CheckCircle size={13} className="text-green-400 mx-auto" /> : <XCircle size={13} className="text-amber-400 mx-auto" />}</td>
                                    <td className="py-3 px-3 text-center font-mono text-[10px] text-foreground/60">H1:{page.h1Count} / H2:{page.h2Count}</td>
                                    <td className="py-3 pl-3 text-center">
                                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] ${page.hasSchema ? "bg-green-400/10 text-green-400" : "bg-white/[0.04] text-foreground/30"}`}>{page.hasSchema ? "JSON-LD" : "None"}</span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {seoError && (
                  <div className="glass-strong rounded-2xl p-6 md:p-8 border border-amber-400/20">
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle size={16} />
                      <span className="text-sm font-semibold">SEO audit note</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-2">{seoError}</p>
                  </div>
                )}

                {/* Combined Suggestions */}
                {perfResults && (
                  <div className="glass-strong rounded-2xl p-6 md:p-8">
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Zap size={14} className="text-brand-primary" />
                      All Optimization Suggestions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[10px] text-brand-primary font-bold uppercase tracking-wider mb-2">Performance</h4>
                        <ul className="space-y-2">
                          {perfResults.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-foreground/60">
                              <span className="text-brand-primary mt-0.5 shrink-0">&#9656;</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {seoResults && (
                        <div>
                          <h4 className="text-[10px] text-brand-primary font-bold uppercase tracking-wider mb-2">SEO</h4>
                          <ul className="space-y-2">
                            {seoResults.suggestions.slice(0, 6).map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/60">
                                <span className="text-brand-primary mt-0.5 shrink-0">&#9656;</span>
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Lead capture */}
                {!showLeadForm && (
                  <div className="text-center">
                    <button onClick={() => setShowLeadForm(true)} className="px-8 py-4 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white hover:shadow-[0_0_30px_rgba(26,109,214,0.35)] shadow-[0_0_15px_rgba(26,109,214,0.15)] rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2">
                      <Download size={14} />
                      Download Full Audit Report
                    </button>
                  </div>
                )}

                {showLeadForm && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-2xl p-6 md:p-8 border-2 border-brand-primary/40">
                    {leadCaptured ? (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                        <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">Report Sent!</h3>
                        <p className="text-sm text-foreground/50 mb-6">
                          Your full audit report has been sent to <strong className="text-foreground">{email}</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <button onClick={resetAll} className="px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-sm text-foreground/70 hover:text-foreground transition-all">Scan Another URL</button>
                          <Link href="/start" className="px-5 py-2.5 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2">
                            <Sparkles size={14} /> Book a Free Audit
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
                            <h3 className="text-lg font-bold text-foreground">Get Your Full Audit Report</h3>
                            <p className="text-sm text-foreground/50">Drop your email to receive the complete checklist with prioritized fixes.</p>
                          </div>
                        </div>
                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="lead-email" className="text-xs font-semibold text-foreground/70 mb-1.5 block">Email Address</label>
                              <input id="lead-email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none transition-all text-sm" />
                            </div>
                            <div>
                              <label htmlFor="lead-company" className="text-xs font-semibold text-foreground/70 mb-1.5 block">Company Name</label>
                              <input id="lead-company" type="text" required placeholder="Your Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none transition-all text-sm" />
                            </div>
                          </div>
                          {leadError && <p className="text-red-400 text-xs">{leadError}</p>}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <button type="submit" disabled={leadSubmitting} className="px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2 disabled:opacity-50">
                              {leadSubmitting ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Download size={14} /> Send Report</>}
                            </button>
                            <p className="text-[10px] text-foreground/30">We respect your privacy. Unsubscribe anytime.</p>
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!scanning && !perfResults && !seoResults && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3"><Gauge size={18} className="text-brand-primary" /></div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Core Web Vitals</h3>
                  <p className="text-xs text-foreground/40">LCP, INP, CLS, TTFB & more</p>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3"><BarChart3 size={18} className="text-brand-primary" /></div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Lighthouse Scores</h3>
                  <p className="text-xs text-foreground/40">Performance, SEO, Accessibility</p>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3"><FileText size={18} className="text-brand-primary" /></div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Sitemap Audit</h3>
                  <p className="text-xs text-foreground/40">Meta tags, schema, broken links</p>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-3"><Shield size={18} className="text-brand-primary" /></div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">Health Scoring</h3>
                  <p className="text-xs text-foreground/40">Per-page & overall grades</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-foreground/30">Brought to you by <span className="text-brand-primary">Maysan Labs</span> — Enterprise SaaS Development</p>
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
