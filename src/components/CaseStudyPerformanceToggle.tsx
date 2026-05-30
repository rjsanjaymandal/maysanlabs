"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  Zap,
  CheckCircle2,
  BarChart3,
  Bug,
  X,
} from "lucide-react";

interface BeforeAfterData {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
  metrics: { label: string; before: string; after: string }[];
}

export default function CaseStudyPerformanceToggle({
  data,
}: {
  title: string;
  challenge: string;
  solution: string;
  data: BeforeAfterData;
}) {
  const [view, setView] = useState<"before" | "after">("before");

  const items = view === "before" ? data.before.items : data.after.items;
  const Icon = view === "before" ? AlertTriangle : CheckCircle2;
  const accentColor = view === "before"
    ? "border-red-500/20 bg-red-500/5 text-red-400"
    : "border-emerald-500/20 bg-emerald-500/5 text-emerald-400";

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white/[0.03] border border-white/[0.06] rounded-full p-1">
          <button
            onClick={() => setView("before")}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              view === "before"
                ? "bg-red-500/20 text-red-400 border border-red-500/20"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            <Bug size={14} />
            Legacy Bottlenecks
          </button>
          <button
            onClick={() => setView("after")}
            className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              view === "after"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            <Zap size={14} />
            Maysan Solution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentColor}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {view === "before" ? data.before.label : data.after.label}
                    </h3>
                    <p className="text-xs text-foreground/40">
                      {view === "before" ? "Before engaging Maysan Labs" : "After Maysan Labs engineering"}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                        view === "before"
                          ? "bg-red-500/[0.02] border-red-500/10"
                          : "bg-emerald-500/[0.02] border-emerald-500/10"
                      }`}
                    >
                      {view === "before" ? (
                        <X size={16} className="text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-foreground/70">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-5 flex items-center gap-2">
              <BarChart3 size={14} className="text-brand-primary" />
              Performance Comparison
            </h4>
            <div className="space-y-4">
              {data.metrics.map((metric, i) => (
                <div key={i}>
                  <p className="text-xs text-foreground/40 mb-2">{metric.label}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-400/70">Before</span>
                        <span className="text-red-400 font-mono font-bold">{metric.before}</span>
                      </div>
                      <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="h-full bg-red-500/40 rounded-full"
                        />
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-foreground/30 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-emerald-400/70">After</span>
                        <span className="text-emerald-400 font-mono font-bold">{metric.after}</span>
                      </div>
                      <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          className="h-full bg-emerald-500/60 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
