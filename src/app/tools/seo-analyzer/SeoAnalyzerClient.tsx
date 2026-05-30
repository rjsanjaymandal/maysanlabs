"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Globe, Search, CheckCircle, AlertTriangle, XCircle, Mail, Download, 
  BarChart3, Gauge, Loader2, Sparkles, Smartphone, Monitor, Clock, 
  RefreshCw, Share2, History, ChevronDown, ChevronUp, Info, Zap, 
  FileText, Shield, ExternalLink, Code, Play, Pause, Server, Layers, ListCollapse
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { analyzeSitemap } from "@/app/actions/analyzeSitemap";
import type { SeoAuditResult, CheckedPage } from "@/app/actions/analyzeSitemap";
import type { WebVitalResult } from "@/lib/pagespeed-types";

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

function getLetterGrade(score: number): { letter: string; color: string } {
  if (score >= 90) return { letter: "A", color: "text-[#10b981]" };
  if (score >= 75) return { letter: "B", color: "text-[#14b8a6]" };
  if (score >= 60) return { letter: "C", color: "text-amber-400" };
  if (score >= 40) return { letter: "D", color: "text-orange-400" };
  return { letter: "F", color: "text-red-400" };
}

function SiteScoreCircle({ score, size = 140 }: { score: number; size?: number }) {
  const { letter, color } = getLetterGrade(score);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const strokeColor = score >= 75 ? "#10b981" : score >= 60 ? "#fbbf24" : score >= 40 ? "#fb923c" : "#f87171";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90 absolute">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none" />
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={r} 
          stroke={strokeColor} 
          strokeWidth="8" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray={circ} 
          strokeDashoffset={offset} 
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }} 
        />
      </svg>
      {/* Visual background pulse effect */}
      <div className="absolute inset-2 bg-gradient-to-tr from-white/[0.01] to-white/[0.03] rounded-full blur-sm" />
      <div className="text-center z-10">
        <span className={`text-4xl font-black ${color}`}>{letter}</span>
        <p className="text-[10px] text-foreground/45 mt-0.5 tracking-wider uppercase">{score}/100</p>
      </div>
    </div>
  );
}

const metricInfo: Record<string, string> = {
  LCP: "Largest Contentful Paint measures when the main content of a page is likely loaded. Good is < 2.5s.",
  INP: "Interaction to Next Paint measures interaction responsiveness across the entire page lifecycle. Good is < 200ms.",
  CLS: "Cumulative Layout Shift measures the visual stability of a page's layout. Good is < 0.1.",
  TTFB: "Time to First Byte measures the latency of the network request before receiving the first byte. Good is < 0.8s.",
  FCP: "First Contentful Paint measures when the browser renders the first piece of DOM content. Good is < 1.8s.",
  TBT: "Total Blocking Time measures the total duration of blocking JavaScript between FCP and TBT. Good is < 200ms.",
  SI: "Speed Index measures how quickly content is visually displayed during page load. Good is < 3.4s.",
};

function GradeIcon({ grade, size = 20 }: { grade: string | null; size?: number }) {
  switch (grade) {
    case "good": return <CheckCircle size={size} className="text-[#10b981]" />;
    case "needs-work": return <AlertTriangle size={size} className="text-amber-400" />;
    case "poor": return <XCircle size={size} className="text-red-400" />;
    default: return <Loader2 size={size} className="text-foreground/30 animate-pulse animate-spin" />;
  }
}

function MetricBadge({ value, grade, label, info }: { value: string | null; grade: string | null; label: string; info?: string }) {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 relative hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold">{label}</span>
          {info && (
            <button 
              type="button" 
              onClick={() => setShowInfo(!showInfo)} 
              className="text-foreground/20 hover:text-foreground/50 transition-colors"
            >
              <Info size={11} />
            </button>
          )}
        </div>
        <GradeIcon grade={grade} size={16} />
      </div>
      <p className="text-xl font-bold font-sans text-foreground">{value ?? "—"}</p>
      <AnimatePresence>
        {showInfo && info && (
          <motion.div 
            ref={infoRef}
            initial={{ opacity: 0, y: 5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="absolute z-30 bottom-full left-0 mb-2 p-3 bg-slate-950/95 border border-white/15 rounded-xl text-[10px] text-foreground/70 w-56 shadow-2xl backdrop-blur-xl"
          >
            {info}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (score === null) return null;
  const color = score >= 90 ? "from-[#10b981] to-[#14b8a6]" : score >= 60 ? "from-amber-400 to-yellow-300" : "from-red-500 to-rose-400";
  return (
    <div className="flex-1 min-w-[140px] bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
      <p className="text-[10px] text-foreground/40 font-medium uppercase tracking-widest mb-1.5">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
          <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${score}%` }} />
        </div>
        <span className="text-xs font-bold text-foreground font-mono w-6 text-right">{score}</span>
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

// ----------------------------------------------------
// Upgraded Sub-component 1: Speed Paint Simulator
// ----------------------------------------------------
function SpeedSimulator({ lcp, fcp, ttfb }: { lcp: number; fcp: number; ttfb: number }) {
  const [step, setStep] = useState(3); // Default to fully loaded LCP view
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    { label: "0.0s Connection", desc: "Browser initiates socket request. Page is blank.", time: 0 },
    { label: `${ttfb.toFixed(1)}s TTFB`, desc: "First byte received from server. Skeleton DOM loading.", time: ttfb },
    { label: `${fcp.toFixed(1)}s FCP`, desc: "First Contentful Paint. Skeletons painted, fallback text visible.", time: fcp },
    { label: `${lcp.toFixed(1)}s LCP`, desc: "Largest Contentful Paint. Primary hero components fully active.", time: lcp },
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setStep(0);
      let curr = 0;
      playIntervalRef.current = setInterval(() => {
        curr++;
        if (curr < steps.length) {
          setStep(curr);
        } else {
          setIsPlaying(false);
          if (playIntervalRef.current) clearInterval(playIntervalRef.current);
        }
      }, 1800);
    }
  };

  useEffect(() => {
    return () => { if (playIntervalRef.current) clearInterval(playIntervalRef.current); };
  }, []);

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Smartphone size={16} className="text-[#1A6DD6]" />
            Above-the-Fold Speed Paint Simulator
          </h3>
          <p className="text-xs text-foreground/40">Visualize what users actually see at each milestone</p>
        </div>
        <button 
          onClick={handlePlayPause}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6DD6]/10 border border-[#1A6DD6]/20 text-[#1A6DD6] hover:bg-[#1A6DD6]/20 transition-all rounded-lg text-xs font-semibold"
        >
          {isPlaying ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Play Load Simulation</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left pane: Milestones and slider */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            {steps.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => { setStep(idx); setIsPlaying(false); }}
                className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  step === idx 
                    ? "bg-[#1A6DD6]/5 border-[#1A6DD6]/30 shadow-lg shadow-[#1A6DD6]/5" 
                    : "bg-transparent border-transparent hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono ${step === idx ? "text-[#1A6DD6]" : "text-foreground/50"}`}>{s.label}</span>
                  <span className="text-[9px] font-mono text-white/30">Step {idx + 1}</span>
                </div>
                <p className="text-xs text-foreground/45 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-[10px] text-white/35 font-mono">
              <span>Start</span>
              <span>Interactive ({lcp.toFixed(1)}s)</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={3} 
              step={1}
              value={step}
              onChange={(e) => { setStep(parseInt(e.target.value)); setIsPlaying(false); }}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#1A6DD6]" 
            />
          </div>
        </div>

        {/* Right pane: Simulated smartphone screen */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[200px] h-[380px] rounded-[30px] border-4 border-slate-800 bg-[#03050d] relative overflow-hidden shadow-2xl flex flex-col p-3 text-[10px] select-none">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-xl z-25" />
            
            {/* Simulation viewports */}
            <div className="flex-1 flex flex-col justify-between pt-4 relative">
              {step === 0 && (
                <div className="absolute inset-0 bg-[#03050d] flex flex-col items-center justify-center text-center p-4">
                  <Loader2 size={24} className="text-white/20 animate-spin animate-pulse" />
                  <p className="text-[10px] text-white/30 mt-3 font-mono">http get/socket request...</p>
                </div>
              )}

              {step === 1 && (
                <div className="absolute inset-0 bg-[#03050d] flex flex-col p-2 space-y-3">
                  <div className="w-full h-6 bg-white/[0.03] border border-white/[0.04] rounded flex items-center px-1.5 justify-between">
                    <div className="w-6 h-2 bg-white/10 rounded" />
                    <div className="w-12 h-2 bg-white/10 rounded" />
                  </div>
                  <div className="flex-1 border border-white/[0.04] rounded-lg p-2 bg-white/[0.01] flex flex-col justify-center items-center">
                    <Server size={20} className="text-[#1A6DD6]/30 animate-pulse" />
                    <span className="text-[8px] text-white/20 mt-2 font-mono">TTFB resolved</span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="absolute inset-0 bg-[#03050d] flex flex-col p-2 space-y-3">
                  <div className="w-full h-6 bg-white/[0.03] border border-white/[0.04] rounded flex items-center px-1.5 justify-between">
                    <div className="w-6 h-2 bg-[#1A6DD6]/20 rounded" />
                    <div className="flex gap-1.5">
                      <div className="w-8 h-2 bg-white/10 rounded" />
                      <div className="w-8 h-2 bg-white/10 rounded" />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col space-y-2 p-1">
                    <div className="w-3/4 h-3 bg-white/10 rounded animate-pulse" />
                    <div className="w-1/2 h-2 bg-white/5 rounded" />
                    <div className="w-full h-16 bg-white/[0.02] border border-white/[0.04] rounded-lg mt-2 flex items-center justify-center">
                      <span className="text-[8px] text-white/20 font-mono">Loading hero container...</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#03050d] flex flex-col p-2 space-y-3"
                >
                  <div className="w-full h-6 bg-white/[0.03] border border-[#1A6DD6]/20 rounded flex items-center px-1.5 justify-between">
                    <div className="w-10 h-2 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded" />
                    <div className="flex gap-1.5">
                      <div className="w-8 h-2 bg-white/20 rounded" />
                      <div className="w-8 h-2 bg-white/20 rounded" />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col space-y-2.5 p-1 text-left">
                    <span className="px-2 py-0.5 border border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981] rounded-full text-[6px] w-fit font-bold">ACTIVE</span>
                    <div className="space-y-1">
                      <div className="w-full h-3 bg-white/30 rounded" />
                      <div className="w-4/5 h-3 bg-white/30 rounded" />
                    </div>
                    <div className="w-full h-24 bg-gradient-to-b from-[#1A6DD6]/10 to-transparent border border-white/10 rounded-lg p-2 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                        <span className="text-[6px] text-white/50">Maysan Labs Studio</span>
                        <span className="text-[6px] text-[#10b981] font-bold">99.9%</span>
                      </div>
                      <div className="w-full h-6 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded flex items-center justify-center font-bold text-black text-[6px]">
                        EXPLORE PLATFORM
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom screen bar */}
            <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mt-1" />
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component 2: Interactive Headings Tree
// ----------------------------------------------------
function HeadingsHierarchyMap({ h1Count, h2Count, title }: { h1Count: number; h2Count: number; title: string }) {
  const issues = [];
  if (h1Count === 0) issues.push("Missing <h1> element! Every page must have exactly one root heading.");
  if (h1Count > 1) issues.push(`Found ${h1Count} <h1> elements! Multiple H1s dilute SEO weight.`);

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <ListCollapse size={16} className="text-[#10b981]" />
          Visual Heading Node Hierarchy
        </h3>
        <p className="text-xs text-foreground/40">Audit semantic title nesting mapped for optimal indexing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Tree Map Render */}
        <div className="md:col-span-7 bg-black/30 border border-white/[0.03] rounded-xl p-5 min-h-[220px] flex flex-col justify-center">
          <div className="space-y-4 relative pl-4 border-l border-white/10">
            {/* H1 Node */}
            <div className="relative">
              <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-4 h-px bg-white/20" />
              <div className={`p-3 rounded-lg border flex items-center gap-2 text-xs font-semibold ${
                h1Count === 1 
                  ? "bg-[#10b981]/5 border-[#10b981]/25 text-[#10b981]" 
                  : "bg-amber-400/5 border-amber-400/25 text-amber-400"
              }`}>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/40">H1</span>
                <span className="truncate max-w-[280px]">{title || "Missing Title Node"}</span>
                {h1Count !== 1 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-auto" />}
              </div>
            </div>

            {/* H2 Branches */}
            <div className="pl-6 space-y-3 relative">
              <span className="absolute -left-[9px] top-0 bottom-4 w-px bg-white/10" />
              {Array.from({ length: Math.min(3, h2Count || 1) }).map((_, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-3.5 h-px bg-white/10" />
                  <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.01] flex items-center gap-2 text-[11px] text-foreground/70">
                    <span className="font-mono text-[8px] px-1 py-0.5 rounded bg-black/20 text-foreground/40">H2</span>
                    <span className="font-medium">Audited Sitemap Page Module #{idx + 1}</span>
                  </div>
                </div>
              ))}
              {h2Count > 3 && (
                <div className="text-[10px] text-foreground/30 pl-4 font-mono">
                  + {h2Count - 3} more structural subheadings
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Diagnostics & Guidance */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4">
            <span className="text-[9px] text-[#10b981] font-bold uppercase tracking-wider block mb-1">Heading Telemetry</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-white/40 font-medium">H1 Tags</span>
                <p className={`text-xl font-bold font-mono ${h1Count === 1 ? "text-[#10b981]" : "text-amber-400"}`}>{h1Count}</p>
              </div>
              <div>
                <span className="text-xs text-white/40 font-medium">H2 Tags</span>
                <p className="text-xl font-bold font-mono text-[#14b8a6]">{h2Count}</p>
              </div>
            </div>
          </div>

          {issues.length > 0 ? (
            <div className="p-3 bg-amber-400/5 border border-amber-400/20 rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1">
                <AlertTriangle size={12} /> Core Violations
              </span>
              <ul className="space-y-1 text-[11px] text-amber-400/80 pl-1 list-disc list-inside">
                {issues.map((iss, i) => <li key={i}>{iss}</li>)}
              </ul>
            </div>
          ) : (
            <div className="p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl">
              <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wide flex items-center gap-1">
                <CheckCircle size={12} /> Layout Perfect
              </span>
              <p className="text-[11px] text-[#10b981]/80 mt-1 leading-relaxed">
                Heading structure is perfectly nested. Standard HTML crawler protocols are verified.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component 3: Schema Object Graph
// ----------------------------------------------------
function SchemaMarkupGraph({ hasSchema }: { hasSchema: boolean }) {
  const [activeSchema, setActiveSchema] = useState<string | null>("Organization");

  const schemaMockups: Record<string, string> = {
    Organization: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Maysan Labs",
  "url": "https://maysanlabs.com",
  "logo": "https://maysanlabs.com/logo-rounded-v2.webp",
  "sameAs": [
    "https://linkedin.com/company/maysanlabs"
  ]
}`,
    WebSite: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Maysan Labs",
  "url": "https://maysanlabs.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://maysanlabs.com/tools/seo-analyzer?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`
  };

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Code size={16} className="text-[#14b8a6]" />
          JSON-LD Schema Markup Object Graph
        </h3>
        <p className="text-xs text-foreground/40">Inspect metadata structures exposed for Google Rich Snippets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Node Graph view */}
        <div className="md:col-span-6 bg-black/30 border border-white/[0.03] rounded-xl p-5 min-h-[240px] flex flex-col justify-center">
          {hasSchema ? (
            <div className="flex flex-col items-center gap-6 relative">
              <span className="absolute top-6 bottom-6 w-px bg-white/10 z-0" />
              
              {/* Parent Root Node */}
              <div 
                onClick={() => setActiveSchema("WebSite")}
                className={`px-4 py-2.5 rounded-lg border z-10 cursor-pointer transition-all duration-300 font-mono text-[11px] ${
                  activeSchema === "WebSite" 
                    ? "bg-[#1A6DD6]/10 border-[#1A6DD6]/30 text-[#1a73e8]" 
                    : "bg-white/[0.02] border-white/5 text-foreground/50 hover:border-white/20"
                }`}
              >
                WebSite Schema
              </div>

              {/* Sub-node 1 */}
              <div 
                onClick={() => setActiveSchema("Organization")}
                className={`px-4 py-2.5 rounded-lg border z-10 cursor-pointer transition-all duration-300 font-mono text-[11px] ${
                  activeSchema === "Organization" 
                    ? "bg-[#14b8a6]/10 border-[#14b8a6]/30 text-[#14b8a6]" 
                    : "bg-white/[0.02] border-white/5 text-foreground/50 hover:border-white/20"
                }`}
              >
                Organization Schema
              </div>
            </div>
          ) : (
            <div className="text-center p-6 space-y-2">
              <XCircle className="text-red-400 mx-auto" size={24} />
              <p className="text-xs text-foreground/70 font-semibold">No Schemas Located</p>
              <p className="text-[10px] text-foreground/40 leading-relaxed">
                This page is not exposing schema microdata. Inject JSON-LD to rank higher on rich-feature searches.
              </p>
            </div>
          )}
        </div>

        {/* JSON Console Code Box */}
        <div className="md:col-span-6">
          <div className="bg-[#03050d] border border-white/10 rounded-xl overflow-hidden font-mono text-[10px] text-foreground/80 flex flex-col h-[240px] shadow-2xl">
            <div className="px-3 py-2 bg-white/5 border-b border-white/8 flex items-center justify-between text-[9px] text-white/40">
              <span>json-ld-telemetry-console.json</span>
              <span className="text-[#14b8a6] animate-pulse">● Live Stream</span>
            </div>
            <div className="flex-1 p-4 overflow-auto text-left leading-normal whitespace-pre text-cyan-400/90 selection:bg-white/10">
              {hasSchema && activeSchema ? schemaMockups[activeSchema] : `{\n  "error": "No Schema microdata detected"\n}`}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component 4: Crawler Indexability Radar
// ----------------------------------------------------
function CrawlerRadar({ hasViewport, hasHtmlLang, https, isNoindex }: { hasViewport: boolean; hasHtmlLang: boolean; https: boolean; isNoindex: boolean }) {
  const checks = [
    { label: "SSL Encryption", value: https, desc: "Secure connections prevent packet tampering." },
    { label: "Mobile Viewport Node", value: hasViewport, desc: "Controls layout sizing on modern devices." },
    { label: "Html Lang Tag", value: hasHtmlLang, desc: "Identifies system languages for indexing." },
    { label: "Noindex Directives", value: !isNoindex, desc: "Confirms sitemaps expose searchable paths." },
  ];

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Shield size={16} className="text-[#1A6DD6]" />
          Crawler Indexability Radar
        </h3>
        <p className="text-xs text-foreground/40">Verify access controls and standards tags required for search visibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Animated Radar Loop */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-44 h-44 rounded-full border border-white/5 flex items-center justify-center bg-black/40 overflow-hidden shadow-inner select-none">
            {/* Sweeper Glow */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_60%,rgba(26,109,214,0.15))] animate-spin-slow pointer-events-none rounded-full" />
            
            {/* Sub-rings */}
            <div className="absolute w-32 h-32 rounded-full border border-white/5" />
            <div className="absolute w-20 h-20 rounded-full border border-white/5" />
            
            {/* Center Signal */}
            <div className="w-4 h-4 rounded-full bg-[#1A6DD6] shadow-[0_0_15px_#1A6DD6] animate-ping" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#1A6DD6] absolute" />
          </div>
        </div>

        {/* Validation List */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checks.map((c, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 flex items-start gap-3 transition-colors hover:border-white/10"
              >
                <div className="mt-0.5 shrink-0">
                  {c.value ? (
                    <CheckCircle size={14} className="text-[#10b981]" />
                  ) : (
                    <AlertTriangle size={14} className="text-amber-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{c.label}</h4>
                  <p className="text-[10px] text-foreground/45 mt-0.5 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component 5: Action Drawer Cards
// ----------------------------------------------------
function ActionItemCard({ suggestion }: { suggestion: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const s = suggestion.toLowerCase();
  
  const isLcp = s.includes("lcp") || s.includes("largest contentful") || s.includes("hero image");
  const isCls = s.includes("cls") || s.includes("layout shift") || s.includes("dimension") || s.includes("width");
  const isSchema = s.includes("schema") || s.includes("json-ld") || s.includes("microdata");
  const isSitemap = s.includes("sitemap");
  const isAlt = s.includes("alt text") || s.includes("alt tag");

  let codeTemplate = "";
  if (isLcp) {
    codeTemplate = `// Optimized Above-the-Fold Image handling in Next.js (app/Hero.tsx)
import Image from 'next/image';

export function HeroImage() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/hero-banner.webp"
        alt="Core Branding Banner"
        fill
        priority // Preloads optimized webp asset immediately
        fetchPriority="high" // High-priority browser request queue
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        className="object-cover"
      />
    </div>
  );
}`;
  } else if (isCls) {
    codeTemplate = `<!-- 1. Always specify explicit dimensions to prevent shifts -->
<img 
  src="/banner.png" 
  width="800" 
  height="400" 
  alt="Promotional Banner" 
  class="w-full h-auto" 
/>

<!-- 2. Reserve spaces in CSS layout grids using aspect ratio -->
<div class="aspect-[21/9] bg-slate-900 w-full">
  <div class="dynamic-loaded-ad-container"></div>
</div>`;
  } else if (isSchema) {
    codeTemplate = `// Add Structured JSON-LD microdata inside Next.js (app/page.tsx)
export default function Page() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maysan Labs",
    "url": "https://maysanlabs.com"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <main>...</main>
    </>
  );
}`;
  } else if (isSitemap) {
    codeTemplate = `// Static sitemap.ts generation in Next.js App Router (app/sitemap.ts)
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://maysanlabs.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://maysanlabs.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ];
}`;
  } else if (isAlt) {
    codeTemplate = `// 1. Accessibility skip: Ensure descriptive alt tags
<Image src="/platform.png" alt="Analytics Dashboard Graph Screen" />

// 2. Decorative elements skip: Expose empty strings for screen readers
<Image src="/glow.png" alt="" aria-hidden="true" />`;
  }

  return (
    <div className="bg-[#03050d]/40 border border-white/[0.04] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-start gap-3 min-w-0 pr-4">
          <span className="mt-0.5 shrink-0 text-[#10b981]">
            <CheckCircle size={14} className="text-[#1A6DD6]" />
          </span>
          <span className="text-xs text-foreground/80 font-medium text-left leading-relaxed">{suggestion}</span>
        </div>
        <div className="shrink-0 text-foreground/45">
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && codeTemplate && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-[#03050d] border-t border-white/5"
          >
            <div className="p-4 space-y-3 font-mono text-[9px] text-left">
              <span className="text-[10px] font-bold text-[#14b8a6] tracking-wider block font-sans uppercase">Code Recommendation Fix</span>
              <pre className="p-3 bg-black/45 border border-white/5 rounded-lg overflow-x-auto text-cyan-400/90 select-all whitespace-pre leading-relaxed">
                {codeTemplate}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  const [perfStep, setPerfStep] = useState("");
  const [seoStep, setSeoStep] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScanRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seoError, setSeoError] = useState<string | null>(null);
  const [showDetailed, setShowDetailed] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"performance" | "seo">("performance");
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
    setSeoError(null);
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
      setSeoError(err?.message || "SEO sitemap query timed out or failed. Re-run scan to connect cleanly.");
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
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const combinedScore = perfResults
    ? Math.round(
        (perfResults.performance * 0.4 +
          perfResults.seo * 0.2 +
          (seoResults?.seoScore ?? 0) * 0.2 +
          (perfResults.accessibility ?? 70) * 0.1 +
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
    }).catch(() => {
      // Clipboard API not available (HTTP or older browser)
    });
  };

  const resetAll = () => {
    setUrl("");
    setScanError(null);
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
    <main id="main-content" className="min-h-screen bg-[#03050d] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Visual background ambient light blurs */}
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-[#1A6DD6]/5 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#14b8a6]/4 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 flex-grow">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container-main max-w-6xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Zap size={12} />
                All-in-One Site Scouter
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-[-0.02em] font-sans">
                SEO & Website <span className="bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] bg-clip-text text-transparent drop-shadow-sm">Health Checker</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-light">
                One click connects and runs a full-fidelity analysis of Core Web Vitals, sitemap indexes, headings hierarchy, JSON-LD schemas, and crawler indexability.
              </p>
            </motion.div>

            {/* Input */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl relative">
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
                    className="w-full bg-black/35 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-foreground placeholder:text-foreground/30 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all text-sm disabled:opacity-50 font-mono"
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
                <div className="flex items-center gap-2 p-1 bg-black/20 rounded-lg border border-white/[0.06]">
                  <button type="button" onClick={() => setStrategy("mobile")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "mobile" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white" : "text-foreground/50 hover:text-foreground"}`}>
                    <Smartphone size={13} /> Mobile
                  </button>
                  <button type="button" onClick={() => setStrategy("desktop")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${strategy === "desktop" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white" : "text-foreground/50 hover:text-foreground"}`}>
                    <Monitor size={13} /> Desktop
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/30 font-medium">
                  <span><Zap size={11} className="inline text-brand-primary" /> Live Speed + Sitemap</span>
                  {history.length > 0 && (
                    <button type="button" onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 text-foreground/40 hover:text-foreground/70 transition-all ml-2">
                      <History size={13} /> History ({history.length}) {showHistory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  )}
                </div>
              </div>

              {showHistory && history.length > 0 && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-black/20 rounded-xl border border-white/[0.04] max-h-48 overflow-y-auto z-30 relative">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] text-foreground/30 font-mono">Scan history</span>
                    <button onClick={() => { localStorage.removeItem(HISTORY_KEY); setHistory([]); }} className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors">Clear All</button>
                  </div>
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
                        <button onClick={() => { setUrl(h.url); setStrategy(h.strategy as "mobile" | "desktop"); setShowHistory(false); }} className="text-brand-primary hover:underline font-semibold">Re-scan</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {urlError && <p className="text-red-400 text-xs mt-2 font-mono">{urlError}</p>}
            </motion.div>

            {/* Scanning progress */}
            {scanning && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Loader2 size={18} className="text-brand-primary animate-spin" />
                  <span className="text-sm font-semibold text-foreground/70">Running deep telemetry scan on <span className="text-brand-primary font-mono">{url.startsWith("http") ? url : `https://${url}`}</span></span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs mb-1.5">
                      <Zap size={11} className="text-brand-[#1A6DD6]" />
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
                      <FileText size={11} className="text-brand-[#14b8a6]" />
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

            {/* Scan error banner */}
            {scanError && !scanning && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950/60 border border-red-500/25 rounded-2xl p-6 md:p-8 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Health Scan Aborted</h3>
                    <p className="text-xs text-foreground/50 mt-1 leading-relaxed">{scanError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Output */}
            <AnimatePresence>
              {(perfResults || seoResults) && !scanning && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  
                  {/* Site Score Header Frame */}
                  <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 text-center backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A6DD6]/5 blur-2xl rounded-full pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                      <SiteScoreCircle score={combinedScore} />
                      <div className="text-left space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-bold text-foreground font-mono truncate max-w-sm">{perfResults?.url ?? ""}</h2>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${strategy === "mobile" ? "bg-[#1A6DD6]/10 border-[#1A6DD6]/20 text-[#1A6DD6]" : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"}`}>
                            {strategy === "mobile" ? <><Smartphone size={10} className="inline mr-0.5" /> Mobile</> : <><Monitor size={10} className="inline mr-0.5" /> Desktop</>}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/50 max-w-md leading-relaxed font-light">
                          {combinedScore >= 80
                            ? "Excellent performance score. Your semantic infrastructure and asset sizing is correctly established. Apply the prioritized fixes below to secure maximum score."
                            : combinedScore >= 60
                            ? "Fair structural health. Flagged layout metrics are slowing down crawler parsers and user painting thresholds. Focus on priority action recommendations."
                            : "Critical optimizations are required. Prioritize above-the-fold content preloading and sitemap configuration to prevent high client bounce rates."}
                        </p>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={copyResults} 
                            className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-foreground/40 hover:text-foreground hover:border-white/20 transition-all text-xs flex items-center gap-1 font-semibold" 
                            title="Copy report"
                          >
                            {copied ? <><CheckCircle size={12} className="text-[#10b981]" /> Copied</> : <><Share2 size={12} /> Share Report</>}
                          </button>
                          <button 
                            type="button"
                            onClick={resetAll} 
                            className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-foreground/40 hover:text-foreground hover:border-white/20 transition-all text-xs flex items-center gap-1 font-semibold" 
                            title="New scan"
                          >
                            <RefreshCw size={12} /> Re-scan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center border-t border-white/5 pt-5">
                      <ScoreBar label="Core Web Vitals" score={perfResults?.performance ?? null} />
                      <ScoreBar label="Lighthouse SEO" score={perfResults?.seo ?? null} />
                      {seoResults && <ScoreBar label="Sitemap Node Health" score={seoResults.seoScore} />}
                      <ScoreBar label="Accessibility" score={perfResults?.accessibility ?? null} />
                      <ScoreBar label="System Best Practices" score={perfResults?.bestPractices ?? null} />
                    </div>
                  </div>

                  {/* Section tabs */}
                  <div className="flex items-center gap-2 p-1 bg-slate-950/60 border border-white/10 rounded-xl w-fit mx-auto backdrop-blur-xl">
                    <button onClick={() => scrollToSection("perf-section")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "performance" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                      <Zap size={13} /> Performance Vitals
                    </button>
                    <button onClick={() => scrollToSection("seo-section")} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "seo" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}>
                      <FileText size={13} /> Sitemap & SEO Audit
                    </button>
                  </div>

                  {/* -------------------- PERFORMANCE PANEL -------------------- */}
                  {perfResults && activeSection === "performance" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="perf-section" 
                      className="space-y-6 scroll-mt-24"
                    >
                      {/* Metric Badges */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
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
                          <button 
                            type="button"
                            onClick={() => setShowDetailed(!showDetailed)} 
                            className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/75 transition-all"
                          >
                            <Clock size={12} /> {showDetailed ? "Hide" : "Show"} Detailed Lighthouse metrics {showDetailed ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                          </button>
                          
                          <AnimatePresence>
                            {showDetailed && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }} 
                                animate={{ opacity: 1, height: "auto" }} 
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden mt-4"
                              >
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

                      {/* Speed Paint Simulator Component */}
                      <SpeedSimulator 
                        lcp={perfResults.lcp.value ?? 4}
                        fcp={perfResults.fcp.value ?? 2}
                        ttfb={perfResults.ttfb.value ?? 0.8}
                      />

                      {/* Prioritized fixes */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
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

                  {/* -------------------- SEO PANEL -------------------- */}
                  {seoResults && activeSection === "seo" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="seo-section" 
                      className="space-y-6 scroll-mt-24"
                    >
                      {/* Technical Crawl Details */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
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

                        {/* Sitemap Data Metrics Grid */}
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

                        {/* Extended tags grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Canonical</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingCanonical > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingCanonical > 0 ? `${seoResults.missingCanonical} Missing` : "Verified"}</span>
                          </div>
                          <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">OpenGraph Tags</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingOgTags > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingOgTags > 0 ? `${seoResults.missingOgTags} Incomplete` : "Healthy"}</span>
                          </div>
                          <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Twitter Cards</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.missingTwitterCard > 0 ? "text-amber-400" : "text-[#10b981]"}`}>{seoResults.missingTwitterCard > 0 ? "Missing" : "Verified"}</span>
                          </div>
                          <div className="bg-white/[0.01] border border-white/[0.04] rounded-xl p-3 flex justify-between items-center">
                            <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">Missing Alt Text</span>
                            <span className={`text-[10px] font-bold font-mono ${seoResults.totalAltMissing > 0 ? "text-amber-400 animate-pulse" : "text-[#10b981]"}`}>{seoResults.totalAltMissing > 0 ? `${seoResults.totalAltMissing} Elements` : "0 Assets"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Crawler Indexability Radar Component */}
                      <CrawlerRadar 
                        hasViewport={!seoResults.urlsList.some(p => !p.hasViewport)}
                        hasHtmlLang={!seoResults.urlsList.some(p => !p.hasHtmlLang)}
                        https={!seoResults.urlsList.some(p => !p.https)}
                        isNoindex={seoResults.noindexPages > 0}
                      />

                      {/* Interactive Heading Nodes Tree Map */}
                      <HeadingsHierarchyMap 
                        h1Count={seoResults.urlsList[0]?.h1Count ?? 1}
                        h2Count={seoResults.urlsList[0]?.h2Count ?? 3}
                        title={seoResults.urlsList[0]?.title ?? ""}
                      />

                      {/* Interactive JSON-LD Schema Object Graph */}
                      <SchemaMarkupGraph 
                        hasSchema={!seoResults.urlsList.some(p => !p.hasSchema)}
                      />

                      {/* Google Index Search Preview */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <ExternalLink size={15} className="text-[#1A6DD6]" />
                            Google Search Preview Snippet
                          </h3>
                          <p className="text-xs text-foreground/45">Examine how your primary page exposes title and description nodes to indexers</p>
                        </div>
                        <div className="bg-white dark:bg-[#0b0c10] border border-black/10 dark:border-white/5 rounded-xl p-4 font-sans text-left max-w-2xl shadow-inner">
                          <div className="text-[11px] text-[#202124] dark:text-[#bdc1c6] mb-1.5 flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                            <Globe size={11} className="text-[#1a0dab] dark:text-[#8ab4f8]" />
                            <span className="font-mono text-[9px] opacity-75">{seoResults.url}</span>
                          </div>
                          <h4 className="text-[18px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight mb-1 font-medium font-sans">
                            {seoResults.urlsList[0]?.title || "Missing Title Tag Node"}
                          </h4>
                          <p className="text-[12px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed font-sans font-light">
                            {seoResults.urlsList[0]?.description || "Warning: No meta description tag was detected in our crawl checks! Add a unique, keyword-rich meta description element to control organic search snippet descriptions."}
                          </p>
                        </div>
                      </div>

                      {/* Sample Sitemap URL List Table */}
                      {seoResults.urlsList.length > 0 && (
                        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
                          <div className="mb-4">
                            <h3 className="text-base font-bold text-foreground">Sitemap URL Audit Sample</h3>
                            <p className="text-xs text-foreground/45">Detailed parameter checklist on crawled sitemap routes</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-white/10 text-foreground/40 font-mono text-[9px] uppercase tracking-wider">
                                  <th className="py-3 pr-4 font-bold">Audited Endpoint</th>
                                  <th className="py-3 px-3 text-center font-bold">Score</th>
                                  <th className="py-3 px-3 text-center font-bold">Status</th>
                                  <th className="py-3 px-3 text-center font-bold">Title</th>
                                  <th className="py-3 px-3 text-center font-bold">Meta Description</th>
                                  <th className="py-3 px-3 text-center font-bold">Headings Outline</th>
                                  <th className="py-3 pl-3 text-center font-bold">Rich Schema</th>
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

                      {/* Prioritized action suggestions sitemap */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-foreground">Sitemap Action Recommendations</h3>
                          <p className="text-xs text-foreground/45">Inject these semantic and indexation fixes to solidify SEO health</p>
                        </div>
                        <div className="space-y-3">
                          {seoResults.suggestions.map((suggestion, i) => (
                            <ActionItemCard key={i} suggestion={suggestion} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {seoError && (
                    <div className="bg-slate-950/60 border border-amber-400/20 rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-2 text-amber-400">
                        <AlertTriangle size={15} />
                        <span className="text-xs font-bold uppercase tracking-wider">SEO Crawler Delay Warning</span>
                      </div>
                      <p className="text-xs text-foreground/45 mt-2 leading-relaxed">{seoError}</p>
                    </div>
                  )}

                  {/* Lead capture form integration */}
                  {!showLeadForm && (
                    <div className="text-center pt-4">
                      <button 
                        onClick={() => setShowLeadForm(true)} 
                        className="px-8 py-4 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] hover:shadow-[0_0_35px_rgba(26,109,214,0.4)] shadow-[0_0_15px_rgba(26,109,214,0.2)] rounded-full font-bold text-sm tracking-widest text-white transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 uppercase"
                      >
                        <Download size={14} />
                        Export Full Audit Report
                      </button>
                    </div>
                  )}

                  {showLeadForm && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950/60 border-2 border-[#1A6DD6]/30 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
                      {leadCaptured ? (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                          <div className="w-14 h-14 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <CheckCircle size={28} className="text-[#10b981]" />
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-1">Export Dispatched Successfully</h3>
                          <p className="text-xs text-foreground/50 mb-6 max-w-sm mx-auto leading-relaxed">
                            Your full health audit details and framework recommended fixes have been sent to <strong className="text-foreground">{email}</strong>.
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <button onClick={resetAll} className="px-5 py-2.5 bg-white/[0.02] border border-white/10 rounded-full text-xs text-foreground/60 hover:text-white transition-all font-semibold uppercase tracking-wider">Scan Another Domain</button>
                            <Link href="/start" className="px-5 py-2.5 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded-full font-bold text-xs text-white hover:shadow-[0_0_20px_rgba(26,109,214,0.3)] hover:scale-[1.01] transition-all inline-flex items-center gap-1.5 uppercase tracking-wider">
                              <Sparkles size={13} /> Book Free Strategy Call
                            </Link>
                          </div>
                        </motion.div>
                      ) : (
                        <>
                          <div className="flex items-start gap-4 mb-6 text-left">
                            <div className="w-12 h-12 rounded-xl bg-[#1A6DD6]/10 border border-[#1A6DD6]/20 flex items-center justify-center shrink-0">
                              <Mail size={20} className="text-[#1A6DD6]" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground">Get Your Full Audit Report</h3>
                              <p className="text-xs text-foreground/50 leading-relaxed font-light mt-0.5">Dispatches a complete diagnostic checklist with copy-pasteable framework solutions directly to your inbox.</p>
                            </div>
                          </div>
                          <form onSubmit={handleLeadSubmit} className="space-y-4 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label htmlFor="lead-email" className="text-[10px] uppercase tracking-wider font-bold text-foreground/50 mb-1.5 block">Email Address</label>
                                <input id="lead-email" type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/35 focus:border-[#1A6DD6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A6DD6]/50 transition-all text-xs font-mono" />
                              </div>
                              <div>
                                <label htmlFor="lead-company" className="text-[10px] uppercase tracking-wider font-bold text-foreground/50 mb-1.5 block">Company Name</label>
                                <input id="lead-company" type="text" required placeholder="Your Company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-black/35 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/35 focus:border-[#1A6DD6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A6DD6]/50 transition-all text-xs" />
                              </div>
                            </div>
                            {leadError && <p className="text-red-400 text-xs font-mono">{leadError}</p>}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                              <button type="submit" disabled={leadSubmitting} className="px-6 py-3 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded-full font-bold text-xs text-white hover:shadow-[0_0_20px_rgba(26,109,214,0.3)] hover:scale-[1.01] transition-all inline-flex items-center gap-1.5 disabled:opacity-50 uppercase tracking-wider">
                                {leadSubmitting ? <><Loader2 size={13} className="animate-spin animate-spin-slow" /> Sending...</> : <><Download size={13} /> Export Report</>}
                              </button>
                              <p className="text-[9px] text-foreground/30 font-medium">By submitting, you agree to receive optimized performance updates. Unsubscribe anytime.</p>
                            </div>
                          </form>
                        </>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state dashboard overview */}
            {!scanning && !perfResults && !seoResults && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#1A6DD6]/10 flex items-center justify-center mx-auto mb-3.5"><Gauge size={18} className="text-[#1A6DD6]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Core Web Vitals</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Interactive speeds including LCP, INP, CLS, and latency latency checks.</p>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center mx-auto mb-3.5"><BarChart3 size={18} className="text-[#14b8a6]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">PSI / Lighthouse Scores</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Fidelity grades on Accessibility, Best Practices, and performance audits.</p>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center mx-auto mb-3.5"><FileText size={18} className="text-[#10b981]" /></div>
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Sitemap Audit</h3>
                    <p className="text-[10px] text-foreground/45 leading-relaxed font-light">Crawls robots and XML sitemaps to verify meta headers and SSL encryption.</p>
                  </div>
                  <div className="bg-white/[0.01] border border-white/[0.04] rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
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
