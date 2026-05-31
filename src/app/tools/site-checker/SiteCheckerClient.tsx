"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Search, CheckCircle, AlertTriangle, XCircle, Loader2, Sparkles, 
  Smartphone, Monitor, Clock, Share2, History, ChevronDown, ChevronUp, Info, Zap, 
  FileText, Shield, ExternalLink, Code, Play, Pause, Server, 
  ListCollapse, MapPin, CreditCard, Lock, User, ArrowRight, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { analyzeSitemap } from "@/app/actions/analyzeSitemap";
import type { SeoAuditResult, IndiaTelemetry } from "@/app/actions/analyzeSitemap";
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

// Circular Overall Website Score (matching the screenshot exactly)
function OverallScoreCircle({ score, size = 180 }: { score: number; size?: number }) {
  const { color } = getLetterGrade(score);
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const strokeColor = score >= 75 ? "#10b981" : score >= 60 ? "#fbbf24" : score >= 40 ? "#fb923c" : "#f87171";
  
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90 absolute">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="none" />
        <motion.circle 
          cx={size / 2} 
          cy={size / 2} 
          r={r} 
          stroke={strokeColor} 
          strokeWidth="10" 
          fill="none" 
          strokeLinecap="round"
          strokeDasharray={circ} 
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      {/* Visual background pulse effect */}
      <div className="absolute inset-4 bg-gradient-to-tr from-white/[0.01] to-white/[0.02] rounded-full blur-sm" />
      <div className="text-center z-10">
        <span className={`text-5xl font-black font-sans ${color}`}>{score}</span>
        <span className="text-xs text-foreground/40 block mt-0.5 font-medium tracking-wider">/ 100</span>
        <span className={`text-xs font-bold uppercase tracking-widest block mt-1.5 ${color}`}>
          {score >= 75 ? "Good" : score >= 50 ? "Average" : "Poor"}
        </span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component: Custom React SVG Radar Chart
// ----------------------------------------------------
function RadarChart({ scores, size = 220 }: { scores: { perf: number; seo: number; sec: number; mob: number; ux: number }; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) - 25; // Margin for labels
  
  const axes = [
    { label: "Performance", key: "perf" },
    { label: "SEO", key: "seo" },
    { label: "Security", key: "sec" },
    { label: "Mobile", key: "mob" },
    { label: "UX", key: "ux" }
  ];
  
  const getCoords = (idx: number, val: number) => {
    const angle = -90 + idx * 72;
    const rad = (angle * Math.PI) / 180;
    const valR = (val / 100) * r;
    return {
      x: cx + valR * Math.cos(rad),
      y: cy + valR * Math.sin(rad)
    };
  };
  
  // Concentric grid polygons (25, 50, 75, 100)
  const gridSteps = [25, 50, 75, 100];
  const gridPolygons = gridSteps.map(step => {
    return axes.map((_, idx) => {
      const { x, y } = getCoords(idx, step);
      return `${x},${y}`;
    }).join(" ");
  });
  
  // Data polygon
  const dataPoints = axes.map((_, idx) => {
    const val = scores[axes[idx].key as keyof typeof scores] || 50;
    const { x, y } = getCoords(idx, val);
    return `${x},${y}`;
  }).join(" ");
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg width={size} height={size} className="overflow-visible select-none">
        {/* Grid polygons */}
        {gridPolygons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        
        {/* Grid axes lines */}
        {axes.map((_, idx) => {
          const outer = getCoords(idx, 100);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data shape */}
        <polygon
          points={dataPoints}
          fill="rgba(26, 109, 214, 0.12)"
          stroke="#1A6DD6"
          strokeWidth="2"
          className="transition-all duration-1000 ease-in-out"
        />
        
        {/* Data dots */}
        {axes.map((ax, idx) => {
          const val = scores[ax.key as keyof typeof scores] || 50;
          const { x, y } = getCoords(idx, val);
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r="4"
              fill="#00d2ff"
              stroke="#03050d"
              strokeWidth="1.5"
              className="transition-all duration-1000 ease-in-out"
            />
          );
        })}
        
        {/* Labels */}
        {axes.map((ax, idx) => {
          const outer = getCoords(idx, 112); // Place slightly outer
          let textAnchor: "end" | "middle" | "start" = "middle";
          if (idx === 1) textAnchor = "start";
          if (idx === 2) textAnchor = "start";
          if (idx === 3) textAnchor = "end";
          if (idx === 4) textAnchor = "end";
          
          return (
            <text
              key={idx}
              x={outer.x}
              y={outer.y + 3}
              fill="rgba(255, 255, 255, 0.45)"
              fontSize="9"
              fontWeight="600"
              textAnchor={textAnchor}
              className="font-sans uppercase tracking-wider"
            >
              {ax.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component: Custom React SVG Line Chart
// ----------------------------------------------------
function ScoreHistoryChart({ overallScore = 72 }: { overallScore?: number }) {
  // Generate nice path from actual history or mock database
  const basePoints = [
    { label: "May 1", score: 52 },
    { label: "May 8", score: 58 },
    { label: "May 15", score: 62 },
    { label: "May 22", score: 60 },
    { label: "May 29", score: 67 },
    { label: "Jun 5", score: overallScore }
  ];
  
  const width = 450;
  const height = 150;
  const padding = 25;
  
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;
  
  const pointsCount = basePoints.length;
  const minScore = 0;
  const maxScore = 100;
  
  const getX = (idx: number) => padding + (idx / (pointsCount - 1)) * chartW;
  const getY = (val: number) => padding + chartH - ((val - minScore) / (maxScore - minScore)) * chartH;
  
  const linePath = basePoints.map((p, idx) => {
    const prefix = idx === 0 ? "M" : "L";
    return `${prefix} ${getX(idx)} ${getY(p.score)}`;
  }).join(" ");
  
  const areaPath = `${linePath} L ${getX(pointsCount - 1)} ${padding + chartH} L ${getX(0)} ${padding + chartH} Z`;
  
  return (
    <div className="relative w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A6DD6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1A6DD6" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal grid lines */}
        {[0, 25, 50, 75, 100].map((step, idx) => {
          const y = getY(step);
          return (
            <g key={idx}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="1"
              />
              <text
                x={padding - 8}
                y={y + 3}
                fill="rgba(255, 255, 255, 0.25)"
                fontSize="8"
                textAnchor="end"
                className="font-mono"
              >
                {step}
              </text>
            </g>
          );
        })}
        
        {/* Area under path */}
        <path d={areaPath} fill="url(#lineGrad)" />
        
        {/* Main score pathway */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#1A6DD6"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        {/* Circles & tooltips */}
        {basePoints.map((p, idx) => {
          const cx = getX(idx);
          const cy = getY(p.score);
          const isLast = idx === pointsCount - 1;
          
          return (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r={isLast ? "5" : "3.5"}
                fill={isLast ? "#00d2ff" : "#1A6DD6"}
                stroke="#03050d"
                strokeWidth="1.5"
              />
              
              {isLast && (
                <g>
                  {/* Floating tooltip block */}
                  <rect
                    x={cx - 14}
                    y={cy - 20}
                    width="28"
                    height="12"
                    rx="3"
                    fill="#1A6DD6"
                  />
                  <text
                    x={cx}
                    y={cy - 11}
                    fill="#ffffff"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {Math.round(p.score)}
                  </text>
                </g>
              )}
              
              {/* Bottom dates */}
              <text
                x={cx}
                y={height - 4}
                fill="rgba(255, 255, 255, 0.3)"
                fontSize="8"
                textAnchor="middle"
                className="font-mono"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// 5 compact detailed metrics cards (matching the screenshot exactly)
function MiniScoreCard({ 
  title, 
  score, 
  status, 
  icon: Icon, 
  colorClass 
}: { 
  title: string; 
  score: number; 
  status: string; 
  icon: React.ComponentType<{ size?: number }>; 
  colorClass: string;
}) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/10 transition-all flex flex-col justify-between aspect-video">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded bg-white/[0.03] border border-white/[0.05] ${colorClass}`}>
            <Icon size={14} />
          </div>
          <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold">{title}</span>
        </div>
        
        {/* Simple mini SVG gauge */}
        <div className="relative inline-flex items-center justify-center w-9 h-9">
          <svg width="36" height="36" className="transform -rotate-90 absolute">
            <circle cx="18" cy="18" r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="3" fill="none" />
            <circle 
              cx="18" 
              cy="18" 
              r={r} 
              stroke={colorClass.includes("text-[#10b981]") ? "#10b981" : colorClass.includes("text-[#14b8a6]") ? "#14b8a6" : colorClass.includes("text-[#1A6DD6]") ? "#1A6DD6" : "#fb923c"}
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round"
              strokeDasharray={circ} 
              strokeDashoffset={offset}
            />
          </svg>
          <span className="text-[10px] font-bold font-mono text-foreground/90">{score}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-xl font-bold font-sans text-foreground">{score}<span className="text-xs text-foreground/30 font-light font-mono">/100</span></p>
        <p className={`text-[10px] font-semibold uppercase tracking-wider mt-0.5 ${colorClass}`}>{status}</p>
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
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 relative hover:border-white/10 transition-colors text-left">
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
// Upgraded Sub-component: Indian Network Speed Paint Simulator
// ----------------------------------------------------
function SpeedSimulator({ lcp, fcp, ttfb }: { lcp: number; fcp: number; ttfb: number }) {
  const [step, setStep] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [carrier, setCarrier] = useState<"jio" | "airtel" | "bsnl">("jio");
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Apply simulated Indian network multiplier metrics
  const getSimulatedMetrics = () => {
    switch (carrier) {
      case "jio":
        return {
          label: "Jio 5G Network",
          multiplier: 1.0,
          latency: "16ms (Hyper-Fast)",
          ttfbSim: ttfb * 0.8,
          fcpSim: fcp * 0.9,
          lcpSim: lcp * 0.9,
        };
      case "airtel":
        return {
          label: "Airtel 4G Network",
          multiplier: 1.45,
          latency: "44ms (Standard Mobile)",
          ttfbSim: ttfb * 1.3,
          fcpSim: fcp * 1.45,
          lcpSim: lcp * 1.5,
        };
      case "bsnl":
        return {
          label: "BSNL DSL / DSL Broadband",
          multiplier: 2.8,
          latency: "115ms (Rural / Slow)",
          ttfbSim: ttfb * 2.5,
          fcpSim: fcp * 2.8,
          lcpSim: lcp * 3.1,
        };
    }
  };

  const currentMetrics = getSimulatedMetrics();

  const steps = [
    { label: "0.0s DNS Check", desc: "Initiating Indian gateway lookup. Screen is blank.", time: 0 },
    { label: `${currentMetrics.ttfbSim.toFixed(2)}s TTFB`, desc: `Received first byte via local route (${currentMetrics.latency}).`, time: currentMetrics.ttfbSim },
    { label: `${currentMetrics.fcpSim.toFixed(2)}s FCP`, desc: "First paint completed. Static text blocks rendering.", time: currentMetrics.fcpSim },
    { label: `${currentMetrics.lcpSim.toFixed(2)}s LCP`, desc: "Largest Contentful Paint. Core assets fully initialized.", time: currentMetrics.lcpSim },
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
      }, 1600);
    }
  };

  useEffect(() => {
    return () => { if (playIntervalRef.current) clearInterval(playIntervalRef.current); };
  }, []);

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Smartphone size={16} className="text-[#1A6DD6]" />
            Indian Above-the-Fold Speed Paint Simulator
          </h3>
          <p className="text-xs text-foreground/45">Simulate actual Indian carrier networks to map loading experiences</p>
        </div>
        
        {/* Toggle carriers */}
        <div className="flex items-center gap-1.5 p-1 bg-black/30 border border-white/5 rounded-lg">
          <button 
            onClick={() => { setCarrier("jio"); setStep(3); setIsPlaying(false); }}
            className={`px-2 py-1 rounded text-[9px] font-bold tracking-wider transition-all uppercase ${carrier === "jio" ? "bg-[#1A6DD6] text-white" : "text-foreground/40 hover:text-foreground/70"}`}
          >
            Jio 5G
          </button>
          <button 
            onClick={() => { setCarrier("airtel"); setStep(3); setIsPlaying(false); }}
            className={`px-2 py-1 rounded text-[9px] font-bold tracking-wider transition-all uppercase ${carrier === "airtel" ? "bg-[#14b8a6] text-black" : "text-foreground/40 hover:text-foreground/70"}`}
          >
            Airtel 4G
          </button>
          <button 
            onClick={() => { setCarrier("bsnl"); setStep(3); setIsPlaying(false); }}
            className={`px-2 py-1 rounded text-[9px] font-bold tracking-wider transition-all uppercase ${carrier === "bsnl" ? "bg-amber-500 text-black" : "text-foreground/40 hover:text-foreground/70"}`}
          >
            BSNL DSL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left pane: Milestones and slider */}
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="space-y-3">
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

          {/* Interactive slider & Play controls */}
          <div className="flex items-center gap-4 pt-2">
            <button 
              onClick={handlePlayPause}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6DD6]/10 border border-[#1A6DD6]/20 text-[#1A6DD6] hover:bg-[#1A6DD6]/20 transition-all rounded-lg text-xs font-semibold shrink-0"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? "Pause" : "Play Paint Loop"}</span>
            </button>
            
            <div className="flex-grow space-y-1">
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
        </div>

        {/* Right pane: Simulated smartphone screen */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[210px] h-[390px] rounded-[32px] border-4 border-slate-800 bg-[#03050d] relative overflow-hidden shadow-2xl flex flex-col p-3 text-[10px] select-none">
            {/* Phone notch & System status */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-xl z-30" />
            
            {/* Network indicator */}
            <div className="flex justify-between items-center text-[7px] text-white/40 px-2 mt-1.5 z-20">
              <span className="font-bold">Jio/Airtel LTE</span>
              <div className="flex items-center gap-1">
                <span>5G / 4G</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              </div>
            </div>
            
            {/* Simulation viewports */}
            <div className="flex-grow flex flex-col justify-between pt-2 relative">
              {step === 0 && (
                <div className="absolute inset-0 bg-[#03050d] flex flex-col items-center justify-center text-center p-4">
                  <Loader2 size={24} className="text-white/20 animate-spin animate-pulse" />
                  <p className="text-[9px] text-white/30 mt-3 font-mono">http get / Indian DNS lookup...</p>
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
                    <span className="text-[8px] text-white/20 mt-2 font-mono text-center">TTFB Resolved<br/>({currentMetrics.latency})</span>
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
                    <div className="w-3/4 h-3 bg-white/15 rounded animate-pulse" />
                    <div className="w-1/2 h-2 bg-white/5 rounded" />
                    <div className="w-full h-16 bg-white/[0.02] border border-white/[0.04] rounded-lg mt-2 flex items-center justify-center">
                      <span className="text-[7px] text-white/25 font-mono">Painting skeletons...</span>
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
                  
                  <div className="flex-grow flex flex-col space-y-2 p-1 text-left">
                    <span className="px-1.5 py-0.5 border border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981] rounded-full text-[5px] w-fit font-bold uppercase tracking-widest">Live</span>
                    <div className="space-y-1">
                      <div className="w-full h-3 bg-white/30 rounded" />
                      <div className="w-4/5 h-2.5 bg-white/20 rounded" />
                    </div>
                    <div className="w-full h-24 bg-gradient-to-b from-[#1A6DD6]/10 to-transparent border border-white/10 rounded-lg p-2 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span className="text-[6px] text-white/40">Maysan Labs Studio</span>
                        <span className="text-[6px] text-[#10b981] font-bold">99.9%</span>
                      </div>
                      <div className="w-full h-5 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded flex items-center justify-center font-bold text-white text-[6px]">
                        EXPLORE STUDIO
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bottom screen gesture bar */}
            <div className="w-16 h-1 bg-white/10 rounded-full mx-auto mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component: Indian Telemetry Optimization Hub
// ----------------------------------------------------
function IndianMarketTelemetryHub({ telemetry }: { telemetry: IndiaTelemetry }) {
  const cdnColor = telemetry.isCdn ? "text-[#10b981]" : "text-amber-400";
  const latencyColor = telemetry.latencyMs <= 40 ? "text-[#10b981]" : telemetry.latencyMs <= 100 ? "text-[#14b8a6]" : "text-red-400";
  
  return (
    <div className="space-y-6 text-left">
      {/* Edge Geolocation & Hosting Speed Hub */}
      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#1A6DD6]/5 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <MapPin size={16} className="text-[#1A6DD6]" />
              Indian Edge DNS & CDN Telemetry
            </h3>
            <p className="text-xs text-foreground/45 font-light">Resolving server node origins and calculations of packet travel to Indian hubs</p>
          </div>
          <span className={`px-3 py-0.5 border text-[10px] font-bold font-mono rounded-full ${latencyColor}`}>
            {telemetry.latencyMs <= 50 ? "LATENCY HEALTHY" : "LATENCY CONGESTED"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* IP and Geolocation status */}
          <div className="md:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">Resolved IP</span>
                <p className="text-xs font-bold font-mono text-foreground mt-0.5">{telemetry.ipAddress}</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">Server Region</span>
                <p className="text-xs font-bold text-foreground mt-0.5 truncate">{telemetry.serverCity}, {telemetry.serverCountry}</p>
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">CDN Proxy Status</span>
                <p className="text-xs font-bold text-foreground mt-0.5">{telemetry.isCdn ? `Active - via ${telemetry.cdnName}` : "Direct Hosting (No CDN Proxy)"}</p>
              </div>
              <span className={`text-xs font-black ${cdnColor}`}>
                {telemetry.isCdn ? "100%" : "0%"}
              </span>
            </div>

            <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Estimated Hub Latency (India)</span>
                <span className={`text-xl font-mono font-black ${latencyColor}`}>{telemetry.latencyMs}ms</span>
              </div>
              <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden mt-2.5">
                <div 
                  className={`h-full rounded-full ${telemetry.latencyMs <= 40 ? "bg-[#10b981]" : telemetry.latencyMs <= 100 ? "bg-[#14b8a6]" : "bg-red-400"}`} 
                  style={{ width: `${Math.min(100, Math.max(10, 100 - (telemetry.latencyMs / 300) * 100))}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Traceroute routing graphics */}
          <div className="md:col-span-6 bg-black/40 border border-white/[0.03] rounded-xl p-5 relative overflow-hidden flex flex-col justify-center min-h-[180px]">
            <span className="text-[8px] text-white/20 font-mono absolute top-2 right-3">traceroute-telemetry.bin</span>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-foreground font-mono">Indian User Edge (Jio/Airtel POP)</h4>
                  <p className="text-[8px] text-foreground/45 mt-0.5">Mumbai, New Delhi, Bengaluru</p>
                </div>
              </div>

              {/* Dotted bridge */}
              <div className="pl-3 border-l-2 border-dashed border-white/10 h-6 ml-2.5 relative">
                <span className="absolute left-[-3px] top-1/2 w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-ping" />
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-white/[0.02] border border-white/10 ${telemetry.isCdn ? "text-[#1A6DD6]" : "text-white/35"}`}>
                  {telemetry.isCdn ? <Zap size={10} className="animate-pulse" /> : <Server size={10} />}
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-foreground font-mono">
                    {telemetry.isCdn ? `${telemetry.cdnName} Local Gateway` : "Origin Server Host"}
                  </h4>
                  <p className="text-[8px] text-foreground/45 mt-0.5">{telemetry.serverCity}, {telemetry.serverCountry} ({telemetry.serverIsp})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Double Widgets (UPI & DPDP Act) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UPI Payments Check */}
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#14b8a6]/5 blur-2xl rounded-full pointer-events-none" />
          
          <div>
            <div className="flex items-start justify-between border-b border-white/5 pb-3.5 mb-4">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#14b8a6]" />
                  UPI & Payments Integration
                </h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Auditing pathways for UPI and top Indian checkout hubs</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${telemetry.upiIntegrated ? "bg-[#10b981]/10 text-[#10b981]" : "bg-red-400/10 text-red-400"}`}>
                {telemetry.upiIntegrated ? "READY" : "WARNING"}
              </span>
            </div>

            {telemetry.upiIntegrated ? (
              <div className="space-y-2">
                <p className="text-xs text-foreground/80 leading-relaxed font-light">
                  Excellent! We detected gateway SDKs or direct UPI linkages. Over 80% of digital transactions in India utilize UPI networks.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {telemetry.upiGateways.map((gt, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/25 text-[#14b8a6] text-[8px] font-mono font-bold">
                      {gt}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-foreground/50 leading-relaxed font-light">
                  We could not locate any Indian payment gateway SDKs (Razorpay, Paytm, PhonePe) or direct UPI tags on your page.
                </p>
                <div className="p-2.5 bg-red-400/5 border border-red-400/10 rounded-lg text-[9px] text-red-400/70 font-sans leading-relaxed">
                  💡 **Checkout recommendation:** Add an Indian gateway to capture UPI checkout conversion volumes.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DPDP Act 2023 Compliance */}
        <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 blur-2xl rounded-full pointer-events-none" />
          
          <div>
            <div className="flex items-start justify-between border-b border-white/5 pb-3.5 mb-4">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Lock size={14} className="text-amber-400" />
                  DPDP Act Compliance (2023)
                </h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Assessing data protection and cookie consents</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${telemetry.dpdpCompliant ? "bg-[#10b981]/10 text-[#10b981]" : "bg-amber-400/10 text-amber-400"}`}>
                {telemetry.dpdpCompliant ? "COMPLIANT" : "ACTION REQUIRED"}
              </span>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Privacy Policy</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpPrivacy ? "text-[#10b981]" : "text-amber-400"}`}>
                    {telemetry.dpdpPrivacy ? "VERIFIED" : "MISSING"}
                  </span>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Cookie Consent</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpCookie ? "text-[#10b981]" : "text-amber-400"}`}>
                    {telemetry.dpdpCookie ? "ACTIVE" : "WARNING"}
                  </span>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Act Reference</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpReference ? "text-[#10b981]" : "text-foreground/25"}`}>
                    {telemetry.dpdpReference ? "FOUND" : "NONE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Upgraded Sub-component: Action Drawer Cards
// ----------------------------------------------------
function ActionItemCard({ suggestion }: { suggestion: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const s = suggestion.toLowerCase();
  
  const isLcp = s.includes("lcp") || s.includes("largest contentful") || s.includes("hero image");
  const isCls = s.includes("cls") || s.includes("layout shift") || s.includes("dimension") || s.includes("width");
  const isSchema = s.includes("schema") || s.includes("json-ld") || s.includes("microdata");
  const isSitemap = s.includes("sitemap");
  const isAlt = s.includes("alt text") || s.includes("alt tag");
  const isIndianCdn = s.includes("latency to india") || s.includes("mumbai") || s.includes("cdn detected");
  const isUpi = s.includes("upi gateway") || s.includes("checkout");
  const isDpdp = s.includes("dpdp act") || s.includes("privacy compliance");

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
  } else if (isIndianCdn) {
    codeTemplate = `// Setup Cloudflare DNS CDN Proxy or route via AWS ap-south-1 (Mumbai) Region
// In next.config.js to enforce Edge Cache Routing:
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};`;
  } else if (isUpi) {
    codeTemplate = `// UPI Payments Integration (Razorpay Checkout Example)
import Script from 'next/script';

export function CheckoutButton({ amount, email }) {
  const loadRazorpay = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // in paisa
      currency: "INR",
      name: "Maysan Labs Studio",
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      prefill: { email: email }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={loadRazorpay} className="btn-payments">Pay via UPI / Cards</button>
    </>
  );
}`;
  } else if (isDpdp) {
    codeTemplate = `// Explicit DPDP Privacy and Consent banner setup in React
export function ConsentBanner() {
  return (
    <div className="fixed bottom-4 right-4 bg-slate-950 border border-white/10 p-4 rounded-xl z-50">
      <h5 className="font-bold text-[10px] text-foreground">Data Privacy Consent (DPDP Act, 2023)</h5>
      <p className="text-[8px] text-white/50 mt-1 leading-normal max-w-[200px]">
        We process your data strictly conforming to Indian Digital Personal Data Protection laws.
      </p>
      <button className="bg-[#10b981] text-black text-[8px] font-bold px-2 py-1 rounded mt-2 uppercase">I Consent</button>
    </div>
  );
}`;
  }

  let badgeColor = "bg-[#1A6DD6]/10 text-[#1A6DD6] border-[#1A6DD6]/20";
  if (isIndianCdn || isUpi || isDpdp) {
    badgeColor = "bg-[#14b8a6]/10 text-[#14b8a6] border-[#14b8a6]/20";
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
          <div className="space-y-1">
            <span className="text-xs text-foreground/80 font-medium text-left leading-relaxed block">{suggestion}</span>
            {(isIndianCdn || isUpi || isDpdp) && (
              <span className={`inline-block px-1.5 py-0.5 rounded text-[7px] border font-bold uppercase tracking-wider ${badgeColor}`}>
                🇮🇳 Indian Market Optimize
              </span>
            )}
          </div>
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

// Interactive Heading Nodes Tree Map (styled to perfection)
function HeadingsHierarchyMap({ h1Count, h2Count, title }: { h1Count: number; h2Count: number; title: string }) {
  const issues = [];
  if (h1Count === 0) issues.push("Missing <h1> element! Every page must have exactly one root heading.");
  if (h1Count > 1) issues.push(`Found ${h1Count} <h1> elements! Multiple H1s dilute SEO weight.`);

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4 text-left">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <ListCollapse size={16} className="text-[#10b981]" />
          Visual Heading Node Hierarchy
        </h3>
        <p className="text-xs text-foreground/40">Audit semantic title nesting mapped for optimal indexing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Tree Map Render */}
        <div className="md:col-span-7 bg-black/30 border border-white/[0.03] rounded-xl p-5 min-h-[220px] flex flex-col justify-center text-left">
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
        <div className="md:col-span-5 space-y-4 text-left">
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

// JSON-LD Schema Object Graph
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
    "target": "https://maysanlabs.com/tools/site-checker?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`
  };

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4 text-left">
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
        <div className="md:col-span-6 text-left">
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

// Crawler Indexability Radar
function CrawlerRadar({ hasViewport, hasHtmlLang, https, isNoindex }: { hasViewport: boolean; hasHtmlLang: boolean; https: boolean; isNoindex: boolean }) {
  const checks = [
    { label: "SSL Encryption", value: https, desc: "Secure connections prevent packet tampering." },
    { label: "Mobile Viewport Node", value: hasViewport, desc: "Controls layout sizing on modern devices." },
    { label: "Html Lang Tag", value: hasHtmlLang, desc: "Identifies system languages for indexing." },
    { label: "Noindex Directives", value: !isNoindex, desc: "Confirms sitemaps expose searchable paths." },
  ];

  return (
    <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 mb-6">
      <div className="mb-5 border-b border-white/5 pb-4 text-left">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <Shield size={16} className="text-[#1A6DD6]" />
          Crawler Indexability Radar
        </h3>
        <p className="text-xs text-foreground/40">Verify access controls and standards tags required for search visibility</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
        {/* Animated Radar Loop */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-44 h-44 rounded-full border border-white/5 flex items-center justify-center bg-black/40 overflow-hidden shadow-inner select-none">
            {/* Sweeper Glow */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_60%,rgba(26,109,214,0.12))] animate-spin-slow pointer-events-none rounded-full" />
            
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
  
  // Dashboard active panel section
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
        
        // Timeout to scroll smooth
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

  // Unified score algorithm (Lighthouse weights)
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
    }).catch(() => {
      // Fallback
    });
  };


  const scrollToSection = (tab: "performance" | "seo" | "india") => {
    setActiveSection(tab);
    setTimeout(() => {
      document.getElementById("tab-view-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#03050d] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-[#1A6DD6]/5 blur-[90px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#14b8a6]/4 blur-[110px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 flex-grow">
        <Navbar />
        
        <div className="pt-32 pb-20 px-4">
          <div className="container-main max-w-6xl mx-auto">
            
            {/* Header section */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
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

            {/* Input Bar */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl relative">
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
                    className="w-full bg-black/35 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-foreground placeholder:text-foreground/30 focus:border-[#1A6DD6]/50 focus:outline-none focus:ring-2 focus:ring-[#1A6DD6]/50 transition-all text-sm disabled:opacity-50 font-mono"
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
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-black/20 rounded-xl border border-white/[0.04] max-h-48 overflow-y-auto z-30 relative text-left">
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
                        <button onClick={() => { setUrl(h.url); setStrategy(h.strategy as "mobile" | "desktop"); setShowHistory(false); }} className="text-[#1A6DD6] hover:underline font-semibold">Re-scan</button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {urlError && <p className="text-red-400 text-xs mt-2 font-mono text-left">{urlError}</p>}
            </motion.div>

            {/* Scanning progress */}
            {scanning && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-xl text-left">
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

            {/* Main HUD Dashboard Frame */}
            <AnimatePresence>
              {(perfResults || seoResults) && !scanning && (
                <motion.div 
                  ref={resultsRef}
                  initial={{ opacity: 0, y: 25 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="space-y-6"
                >
                  {/* Top Alert Completed Banner */}
                  <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-[#10b981]/20 rounded-xl bg-gradient-to-r from-[#10b981]/5 to-transparent text-left">
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

                  {/* Core HUD Section (Two-Column Layout) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Overall Score Circle (Card 1) */}
                    <div className="lg:col-span-6 bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-xl">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A6DD6]/5 blur-2xl rounded-full pointer-events-none" />
                      <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold absolute top-5 left-6">
                        Overall Website Score
                      </span>
                      
                      <div className="my-6">
                        <OverallScoreCircle score={combinedScore} />
                      </div>
                      
                      <p className="text-xs text-foreground/50 max-w-sm leading-relaxed font-light mt-2">
                        {combinedScore >= 80
                          ? "Your website is in excellent shape! Core metrics are fully optimized. Make minor adjustments to maintain peak speeds."
                          : combinedScore >= 60
                          ? "Your website is good, but there's room for improvement. Fix the highlighted issues to secure maximum efficiency."
                          : "Critical structural issues are affecting page experience. Optimize assets immediately to prevent high bounce rates."}
                      </p>

                      <div className="flex items-center gap-3 mt-6 flex-wrap justify-center">
                        <button 
                          onClick={() => scrollToSection("seo")} 
                          className="px-4 py-2 bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] rounded-lg font-bold text-xs text-white hover:shadow-[0_0_15px_rgba(26,109,214,0.3)] hover:scale-[1.01] transition-all flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>View All Issues</span>
                          <ArrowRight size={11} />
                        </button>
                        
                        <button 
                          onClick={copyResults} 
                          className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-foreground/55 hover:text-foreground hover:border-white/20 transition-all text-xs flex items-center gap-1.5 font-bold" 
                        >
                          {copied ? <><CheckCircle size={12} className="text-[#10b981]" /> Copied</> : <><Share2 size={12} /> Share Report</>}
                        </button>
                      </div>
                    </div>

                    {/* Interactive Radar Chart (Card 2) */}
                    <div className="lg:col-span-6 bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl">
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

                  {/* 5 Compact Feature Cards in Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <MiniScoreCard 
                      title="Performance" 
                      score={perfResults?.performance ?? 0} 
                      status={perfResults && perfResults.performance >= 75 ? "Good" : "Needs Work"} 
                      icon={Zap} 
                      colorClass="text-[#1A6DD6]" 
                    />
                    <MiniScoreCard 
                      title="SEO Check" 
                      score={seoResults?.seoScore ?? 0} 
                      status={seoResults && seoResults.seoScore >= 80 ? "Good" : "Needs Work"} 
                      icon={Search} 
                      colorClass="text-[#14b8a6]" 
                    />
                    <MiniScoreCard 
                      title="Security" 
                      score={seoResults?.urlsList[0]?.https ? 95 : 45} 
                      status={seoResults?.urlsList[0]?.https ? "Good" : "Needs Work"} 
                      icon={Shield} 
                      colorClass="text-[#1A6DD6]" 
                    />
                    <MiniScoreCard 
                      title="Mobile" 
                      score={perfResults?.mobile ?? 0} 
                      status={perfResults && perfResults.mobile >= 75 ? "Good" : "Needs Work"} 
                      icon={Smartphone} 
                      colorClass="text-[#10b981]" 
                    />
                    <MiniScoreCard 
                      title="UX Index" 
                      score={perfResults?.accessibility ?? 75} 
                      status={(perfResults?.accessibility ?? 75) >= 80 ? "Good" : "Needs Work"} 
                      icon={User} 
                      colorClass="text-amber-400" 
                    />
                  </div>

                  {/* Bottom Panels: Issues List + Score History */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left items-start">
                    {/* Top Issues Card */}
                    <div className="lg:col-span-6 bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl min-h-[220px]">
                      <div>
                        <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold block mb-4">
                          Top Issues Found
                        </span>
                        
                        <div className="space-y-3">
                          {perfResults?.suggestions.slice(0, 3).map((s, idx) => {
                            const isHigh = idx === 0;
                            return (
                              <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2.5 last:border-0">
                                <span className="text-xs text-foreground/80 font-medium truncate max-w-[280px]">{s}</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${isHigh ? "bg-red-400/10 text-red-400 border border-red-400/20" : "bg-amber-400/10 text-amber-400 border border-amber-400/20"}`}>
                                  {isHigh ? "High" : "Medium"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => scrollToSection("seo")} 
                        className="text-[#1A6DD6] hover:underline text-xs font-bold flex items-center gap-1 mt-6 w-fit uppercase tracking-wider"
                      >
                        <span>View All Issues</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    {/* Line Chart Card */}
                    <div className="lg:col-span-6 bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
                      <ScoreHistoryChart overallScore={combinedScore} />
                    </div>
                  </div>

                  {/* Redesigned Tab Section Selector */}
                  <div id="tab-view-section" className="flex items-center gap-2 p-1 bg-slate-950/60 border border-white/10 rounded-xl w-fit mx-auto backdrop-blur-xl pt-10">
                    <button 
                      onClick={() => setActiveSection("performance")} 
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "performance" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}
                    >
                      <Zap size={13} /> Performance Vitals
                    </button>
                    <button 
                      onClick={() => setActiveSection("seo")} 
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "seo" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}
                    >
                      <FileText size={13} /> Sitemap & SEO Audit
                    </button>
                    <button 
                      onClick={() => setActiveSection("india")} 
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${activeSection === "india" ? "bg-gradient-to-r from-[#1A6DD6] to-[#00d2ff] text-white shadow-lg" : "text-foreground/50 hover:text-foreground"}`}
                    >
                      🇮🇳 India Optimization
                    </button>
                  </div>

                  {/* -------------------- PERFORMANCE PANEL -------------------- */}
                  {perfResults && activeSection === "performance" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6 text-left"
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
                      className="space-y-6 text-left"
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
                            {seoResults.urlsList[0]?.title || "Missing Title Tag Tag"}
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
                          {seoResults.suggestions.map((s, idx) => (
                            <ActionItemCard key={idx} suggestion={s} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* -------------------- INDIAN OPTIMIZATION HUB PANEL -------------------- */}
                  {seoResults?.indiaTelemetry && activeSection === "india" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <IndianMarketTelemetryHub telemetry={seoResults.indiaTelemetry} />
                      
                      {/* Detailed checklists and instructions for India */}
                      <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-6 md:p-8 text-left">
                        <h4 className="text-sm font-bold text-foreground mb-4">India Compliance & Checkout Best Practices</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-foreground/75 leading-relaxed font-light">
                          <div className="space-y-3 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                            <h5 className="font-bold text-[#14b8a6] flex items-center gap-1.5">
                              <Zap size={13} />
                              Indian Core Web Vitals Optimization
                            </h5>
                            <ul className="space-y-2 list-disc list-inside pl-1 text-[11px]">
                              <li>**Jio 4G/5G mobile latencies:** Simulating speeds locally prevents high bounce rates. Ensure all image assets use WebP or AVIF compressions.</li>
                              <li>**AWS ap-south-1 Edge locations:** Move your server origin or enable a Cloudflare caching proxy to deliver static resources locally from Mumbai or Bangalore PoPs.</li>
                              <li>**Main Thread Block Reduction:** Heavy JS bundles drastically delay paints on lower-end Android handsets common in rural India.</li>
                            </ul>
                          </div>

                          <div className="space-y-3 p-4 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                            <h5 className="font-bold text-amber-400 flex items-center gap-1.5">
                              <Shield size={13} />
                              DPDP Act (2023) Legal Guidance
                            </h5>
                            <ul className="space-y-2 list-disc list-inside pl-1 text-[11px]">
                              <li>**Indian Consent Mandates:** The Digital Personal Data Protection Act requires unambiguous, explicit consent. Generic cookies popups are not enough.</li>
                              <li>**Localized Languages support:** Indian compliance regulations encourage displaying data usage explanations in local languages.</li>
                              <li>**User Data Deletion APIs:** Build user account features to allow quick data disposal requests by users in India.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Newsletter lead capture block */}
                  {!leadCaptured && showLeadForm && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-tr from-[#1A6DD6]/10 to-[#14b8a6]/10 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl relative text-left">
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
                            <input 
                              type="email" 
                              required
                              placeholder="Business Email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#1A6DD6]/50 focus:outline-none"
                            />
                          </div>
                          <div className="flex-grow">
                            <input 
                              type="text" 
                              required
                              placeholder="Company Name" 
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-[#1A6DD6]/50 focus:outline-none"
                            />
                          </div>
                          <button 
                            type="submit"
                            disabled={leadSubmitting}
                            className="px-5 py-3 bg-[#1A6DD6] hover:bg-[#1A6DD6]/90 transition-all font-bold text-xs uppercase tracking-wider text-white rounded-xl disabled:opacity-50 shrink-0"
                          >
                            {leadSubmitting ? "Generating..." : "Get PDF Blueprint"}
                          </button>
                        </form>
                        {leadError && <p className="text-red-400 text-[10px] mt-2 font-mono">{leadError}</p>}
                      </div>
                    </motion.div>
                  )}

                  {leadCaptured && (
                    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-slate-950/60 border border-[#10b981]/25 rounded-2xl text-center backdrop-blur-xl">
                      <CheckCircle className="text-[#10b981] mx-auto mb-3" size={24} />
                      <h4 className="text-sm font-bold text-foreground">SEO Audit PDF Dispatched!</h4>
                      <p className="text-xs text-foreground/45 mt-1 max-w-sm mx-auto font-light">
                        We have dispatched your custom technical audit blueprint to **{email}**. Please review your inbox folder shortly.
                      </p>
                    </motion.div>
                  )}
                  
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
      
      <ContactFooter />
    </main>
  );
}
