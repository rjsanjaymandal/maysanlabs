"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Globe,
  Smartphone,
  LayoutDashboard,
  Users,
  DollarSign,
  Shield,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type Platform = "saas" | "erp" | "mobile" | "web";
type Scale = "startup" | "growth" | "enterprise";

interface Feature {
  id: string;
  label: string;
  icon: typeof Cpu;
}

const platforms: { id: Platform; label: string; desc: string; icon: typeof Cpu }[] = [
  { id: "saas", label: "SaaS Platform", desc: "Multi-tenant cloud app", icon: Globe },
  { id: "erp", label: "Custom ERP", desc: "Business operations system", icon: LayoutDashboard },
  { id: "mobile", label: "Mobile App", desc: "iOS / Android app", icon: Smartphone },
  { id: "web", label: "Web App", desc: "Portal or dashboard", icon: Cpu },
];

const features: Feature[] = [
  { id: "auth", label: "Auth & SSO", icon: Shield },
  { id: "payments", label: "Stripe / Payments", icon: DollarSign },
  { id: "multi-tenant", label: "Multi-tenancy", icon: Layers },
  { id: "dashboard", label: "Real-time Dashboards", icon: BarChart3 },
  { id: "analytics", label: "Analytics Engine", icon: BarChart3 },
  { id: "notifications", label: "Email / Push Notifications", icon: Globe },
];

const scales: { id: Scale; label: string; users: string; desc: string }[] = [
  { id: "startup", label: "Startup", users: "Up to 1k users", desc: "MVP phase" },
  { id: "growth", label: "Growth", users: "1k – 100k users", desc: "Scaling fast" },
  { id: "enterprise", label: "Enterprise", users: "100k – 1M+ users", desc: "Production grade" },
];

const results: Record<string, { timeline: string; stack: string[]; note: string }> = {
  "saas": { timeline: "10 – 14 weeks", stack: ["Next.js", "Supabase", "Stripe", "Redis", "AWS"], note: "Includes multi-tenant isolation, subscription billing, and admin dashboard." },
  "erp": { timeline: "14 – 20 weeks", stack: ["Next.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"], note: "Includes role-based access, automated workflows, and BI reporting." },
  "mobile": { timeline: "12 – 18 weeks", stack: ["React Native", "Node.js", "PostgreSQL", "Firebase", "AWS"], note: "Includes push notifications, offline sync, and mobile-first UI." },
  "web": { timeline: "8 – 12 weeks", stack: ["Next.js", "Supabase", "Vercel", "Tailwind", "TypeScript"], note: "Includes SSR, authentication, and responsive design." },
};

export default function ROICalculator() {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [scale, setScale] = useState<Scale | null>(null);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const canNext = step === 0 ? platform : step === 1 ? selectedFeatures.length >= 2 : scale;

  const handleNext = () => {
    if (!canNext) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const result = platform ? results[platform] : null;
  const featureCost = selectedFeatures.length * 2;
  const scaleMultiplier = scale === "startup" ? 1 : scale === "growth" ? 1.5 : 2.5;
  const estimatedWeeks = result ? Math.round(parseInt(result.timeline.split("–")[0]) * scaleMultiplier + featureCost) : 0;
  const estimatedRange = result ? `${estimatedWeeks} – ${estimatedWeeks + 4} weeks` : "";

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] via-transparent to-brand-primary/[0.02] pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            ROI Estimator
          </span>
          <h2 className="heading-lg sm:heading-xl text-[var(--text-on-white)] mb-3">
            Estimate your{" "}
            <span className="text-brand-primary">build roadmap</span>
          </h2>
          <p className="text-[var(--text-on-white)]/50 max-w-xl mx-auto text-sm">
            Select your needs and get a recommended timeline, stack, and estimated investment range
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            {["Platform", "Features", "Scale", "Roadmap"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i <= step
                      ? "bg-brand-primary text-black"
                      : "bg-white/[0.03] text-foreground/30 border border-white/[0.06]"
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:inline ${i <= step ? "text-foreground/70" : "text-foreground/30"}`}>
                  {s}
                </span>
                {i < 3 && <div className={`w-8 h-px ${i < step ? "bg-brand-primary" : "bg-white/[0.06]"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8 min-h-[360px]">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-5">What are you building?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((p) => {
                      const Icon = p.icon;
                      const selected = platform === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => setPlatform(p.id)}
                          className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
                            selected
                              ? "bg-brand-primary/10 border-brand-primary/30 text-foreground"
                              : "bg-white/[0.02] border-white/[0.06] text-foreground/60 hover:border-white/[0.12] hover:text-foreground"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            selected ? "bg-brand-primary/20" : "bg-white/[0.03]"
                          }`}>
                            <Icon size={18} className={selected ? "text-brand-primary" : "text-foreground/40"} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{p.label}</p>
                            <p className="text-xs text-foreground/40 mt-0.5">{p.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select features (pick 2+)</h3>
                  <p className="text-foreground/40 text-sm mb-5">Each feature adds ~2 weeks to development</p>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((f) => {
                      const Icon = f.icon;
                      const selected = selectedFeatures.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                            selected
                              ? "bg-brand-primary/10 border-brand-primary/30"
                              : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            selected ? "bg-brand-primary/20" : "bg-white/[0.03]"
                          }`}>
                            <Icon size={16} className={selected ? "text-brand-primary" : "text-foreground/40"} />
                          </div>
                          <span className={`text-sm ${selected ? "text-foreground font-medium" : "text-foreground/60"}`}>
                            {f.label}
                          </span>
                          {selected && <Check size={14} className="ml-auto text-brand-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-5">Expected user scale?</h3>
                  <div className="space-y-3">
                    {scales.map((s) => {
                      const Icon = s.id === "startup" ? Users : s.id === "growth" ? BarChart3 : Globe;
                      const selected = scale === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setScale(s.id)}
                          className={`flex items-center gap-4 w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                            selected
                              ? "bg-brand-primary/10 border-brand-primary/30"
                              : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            selected ? "bg-brand-primary/20" : "bg-white/[0.03]"
                          }`}>
                            <Icon size={20} className={selected ? "text-brand-primary" : "text-foreground/40"} />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${selected ? "text-foreground" : "text-foreground/70"}`}>
                              {s.label}
                            </p>
                            <p className="text-xs text-foreground/40">{s.desc}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-foreground/40">{s.users}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && result && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={28} className="text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Your Build Roadmap</h3>
                  <p className="text-foreground/40 text-sm mb-6">{result.note}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-left">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                      <Calendar size={16} className="text-brand-primary mb-2" />
                      <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-sm font-bold text-foreground">{estimatedRange}</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                      <Layers size={16} className="text-brand-primary mb-2" />
                      <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1">Stack</p>
                      <p className="text-sm font-bold text-foreground">{result.stack.join(" + ")}</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                      <Users size={16} className="text-brand-primary mb-2" />
                      <p className="text-[10px] text-foreground/40 uppercase tracking-wider mb-1">Scale</p>
                      <p className="text-sm font-bold text-foreground capitalize">{scale || "—"} tier</p>
                    </div>
                  </div>

                  <Link
                    href="/init"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-[#1565d4] rounded-full font-bold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all duration-200"
                  >
                    Book a Call to Validate This Roadmap
                    <ArrowRight size={16} />
                  </Link>
                  <p className="text-foreground/30 text-xs mt-3">Free 30-min discovery call with our architects</p>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={handleBack}
                  className={`text-sm px-4 py-2 rounded-lg transition-all ${
                    step > 0
                      ? "text-foreground/50 hover:text-foreground bg-white/[0.02] border border-white/[0.06]"
                      : "text-foreground/20 cursor-default"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canNext}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    canNext
                      ? "bg-brand-primary text-black hover:shadow-[0_0_20px_rgba(26,109,214,0.4)]"
                      : "bg-white/[0.03] text-foreground/30 cursor-default"
                  }`}
                >
                  {step === 2 ? "See My Roadmap" : "Next"}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
