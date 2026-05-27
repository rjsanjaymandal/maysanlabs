"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2, TrendingUp, Clock, Download, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const platforms = [
  { name: "Shopify Basic", feePct: 2.0, baseCost: 3300 }, // Approx ₹3,300/mo
  { name: "Shopify Plus", feePct: 0.25, baseCost: 170000 }, // Approx ₹1.7L/mo
  { name: "WooCommerce", feePct: 0, baseCost: 12500 }, // Approx ₹12.5k/mo
  { name: "Custom Platform", feePct: 1.0, baseCost: 34000 }, // Approx ₹34k/mo
];

export default function HeadlessRoiClient() {
  const [monthlySales, setMonthlySales] = useState(1000000); // Default ₹10L/mo
  const [aov, setAov] = useState(1500); // Default ₹1,500 AOV
  const [selectedPlatform, setSelectedPlatform] = useState(0);
  const [conversionRate, setConversionRate] = useState(1.8);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

  const platform = platforms[selectedPlatform];

  const calculations = useMemo(() => {
    const ordersPerMonth = monthlySales / aov;
    
    // Conversion rate increases typically by 22% due to instant page load speeds
    const liftMultiplier = 0.22;
    const newConversionRate = conversionRate * (1 + liftMultiplier);
    const monthlyRevenueLift = monthlySales * liftMultiplier;
    
    // Traditional platform transaction fees
    const platformTransactionFees = monthlySales * (platform.feePct / 100);
    const platformBaseCosts = platform.baseCost;
    const totalPlatformCostMonthly = platformTransactionFees + platformBaseCosts;

    // Headless infrastructure monthly estimate in INR (approx ₹10k base + volume auto-scale)
    const headlessHostingCostMonthly = 10000 + Math.min(20000, (monthlySales * 0.0005));
    const totalHeadlessCostMonthly = headlessHostingCostMonthly; // Bypasses transactional billing overrides
    
    const monthlySavings = totalPlatformCostMonthly - totalHeadlessCostMonthly;
    const annualNetSavings = (monthlySavings * 12) + (monthlyRevenueLift * 12);
    const estimatedMigrationCost = 1500000; // Approx ₹15L scoping build
    
    const roiPercent = (annualNetSavings / estimatedMigrationCost) * 100;
    const breakEvenMonths = Math.ceil(estimatedMigrationCost / (monthlySavings + monthlyRevenueLift));

    return {
      ordersPerMonth: Math.round(ordersPerMonth),
      newConversionRate: Math.round(newConversionRate * 100) / 100,
      monthlyRevenueLift: Math.round(monthlyRevenueLift),
      totalPlatformCostMonthly: Math.round(totalPlatformCostMonthly),
      totalHeadlessCostMonthly: Math.round(totalHeadlessCostMonthly),
      annualNetSavings: Math.round(annualNetSavings),
      roiPercent: Math.round(roiPercent),
      breakEvenMonths: Math.max(1, breakEvenMonths),
    };
  }, [monthlySales, aov, conversionRate, platform]);

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) return;
    setLeadSubmitting(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source: "headless-roi" }),
      });

      if (res.ok) {
        setIsSubmitted(true);
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
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Calculator size={12} />
                Commerce Math
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Online Store <span className="text-brand-primary">Profit Calculator</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base">
                See how much more money your store can make by boosting loading speeds, increasing customer sales, and lowering platform fees.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Sliders Box */}
              <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 space-y-6">
                <div>
                  <label htmlFor="sales-slider" className="flex justify-between text-sm font-semibold mb-2">
                    <span>Monthly Store Revenue</span>
                    <span className="text-brand-primary font-mono">₹{monthlySales.toLocaleString()}</span>
                  </label>
                  <input
                    id="sales-slider"
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                  />
                  <div className="flex justify-between text-[10px] text-foreground/30 font-mono mt-1">
                    <span>₹10k</span>
                    <span>₹500k</span>
                    <span>₹10L+</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="aov-input" className="text-xs font-semibold text-foreground/70 block mb-1.5">Average Order Value (AOV)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 text-xs font-mono">₹</span>
                      <input
                        id="aov-input"
                        type="number"
                        min={5}
                        max={10000}
                        value={aov}
                        onChange={(e) => setAov(Math.max(5, Number(e.target.value)))}
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-7 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-brand-primary/50 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="conv-slider" className="flex justify-between text-xs font-semibold text-foreground/70 mb-1.5">
                      <span>Conversion Rate</span>
                      <span className="text-brand-primary font-mono">{conversionRate}%</span>
                    </label>
                    <input
                      id="conv-slider"
                      type="range"
                      min={0.2}
                      max={6.0}
                      step={0.1}
                      value={conversionRate}
                      onChange={(e) => setConversionRate(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-foreground/70 block mb-3">Current E-commerce Platform</span>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="E-commerce platforms">
                    {platforms.map((plat, idx) => (
                      <button
                        key={plat.name}
                        role="radio"
                        aria-checked={selectedPlatform === idx}
                        onClick={() => setSelectedPlatform(idx)}
                        className={`p-3 rounded-xl text-left border transition-all text-xs ${
                          selectedPlatform === idx
                            ? "bg-brand-primary/10 border-brand-primary/40 text-foreground"
                            : "bg-black/20 border-white/5 hover:border-white/10 text-foreground/60"
                        }`}
                      >
                        <p className="font-bold">{plat.name}</p>
                        <p className="text-[9px] text-foreground/40 mt-0.5">
                          {plat.feePct > 0 ? `${plat.feePct}% transaction fee` : "No transaction fees"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculations Box */}
              <div className="lg:col-span-5 bg-white/[0.04] border border-white/[0.1] rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">Projected Annual Savings</span>
                    <p className="text-4xl md:text-5xl font-black text-foreground">
                      ₹{calculations.annualNetSavings.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-foreground/40 mt-1">Calculated from speed conversion boost & bypassed fees</p>
                  </div>

                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50">Speed Conversion Lift</span>
                      <span className="font-bold text-green-400 flex items-center gap-1">
                        <TrendingUp size={12} />
                        {conversionRate}% → {calculations.newConversionRate}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50">Annual Speed Revenue Gain</span>
                      <span className="font-bold text-foreground">
                        +₹{(calculations.monthlyRevenueLift * 12).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50">Platform Tech Costs (Annual)</span>
                      <span className="font-bold text-red-400">
                        ₹{(calculations.totalPlatformCostMonthly * 12).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-foreground/50">Headless Costs (Annual)</span>
                      <span className="font-bold text-green-400">
                        ₹{(calculations.totalHeadlessCostMonthly * 12).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar Chart styled in CSS */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[9px] text-foreground/40 font-bold uppercase tracking-wider">Estimated Tech Costs Comparison</div>
                    <div className="space-y-1">
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-400 h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                      <div className="flex justify-between text-[8px] text-foreground/30">
                        <span>Current Stack Costs</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: `${Math.max(10, (calculations.totalHeadlessCostMonthly / calculations.totalPlatformCostMonthly) * 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-[8px] text-foreground/30">
                        <span>Headless Jamstack Costs</span>
                        <span>{Math.round((calculations.totalHeadlessCostMonthly / calculations.totalPlatformCostMonthly) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <div className="flex items-center justify-between text-xs p-3 bg-brand-primary/5 border border-brand-primary/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-brand-primary" />
                      <span className="text-foreground/70">Breakeven timeline</span>
                    </div>
                    <span className="font-bold text-brand-primary">{calculations.breakEvenMonths} months</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lead capture hook card */}
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
                  <h3 className="text-xl font-bold text-foreground mb-2">ROI Report Unlocked!</h3>
                  <p className="text-sm text-foreground/50 mb-6">
                    We have compiled your Platform migration roadmap. A custom copy is on its way to <strong className="text-foreground">{email}</strong>.
                  </p>
                  <Link
                    href="/start"
                    className="px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all inline-flex items-center gap-2"
                  >
                    <Sparkles size={14} />
                    Schedule Migration Scoping
                  </Link>
                </motion.div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-lg font-bold text-foreground">Unlock Migration Roadmap & Detailed Audit</h3>
                    <p className="text-xs text-foreground/50 leading-relaxed">
                      Enter your details to generate a highly detailed, printable PDF breakdown including headless checkout integration paths (Shopify headless vs Medusa API) and full scaling analysis.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="w-full md:w-auto flex-1 max-w-md space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-primary/50 transition-all"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand-primary/50 transition-all"
                      />
                    </div>
                    {leadError && (
                      <p className="text-red-400 text-[10px]">{leadError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full py-2.5 bg-brand-primary text-black hover:shadow-[0_0_20px_rgba(26,109,214,0.4)] rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          Unlock Roadmap PDF
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
    </div>
  );
}
