"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, Users, IndianRupee, TrendingUp, Clock,
  Building2, ShoppingCart, Globe, ArrowRight, BarChart3,
  Shield, Code2
} from "lucide-react";
import Link from "next/link";

const scenarios = [
  {
    name: "SaaS Startup",
    icon: Code2,
    users: 200,
    arpu: 1500,
    budget: 1000000,
    note: "B2B SaaS, 200 customers @ ₹1,500/mo",
    color: "from-blue-500 to-brand-primary",
  },
  {
    name: "E-commerce",
    icon: ShoppingCart,
    users: 1000,
    arpu: 300,
    budget: 500000,
    note: "D2C brand, 1,000 orders/mo @ ₹300 avg",
    color: "from-green-500 to-emerald-400",
  },
  {
    name: "Marketplace",
    icon: Globe,
    users: 500,
    arpu: 800,
    budget: 800000,
    note: "Multi-vendor, 500 sellers @ ₹800/mo",
    color: "from-cyan-500 to-teal-400",
  },
  {
    name: "Enterprise",
    icon: Building2,
    users: 50,
    arpu: 25000,
    budget: 1500000,
    note: "B2B platform, 50 clients @ ₹25,000/mo",
    color: "from-amber-500 to-orange-400",
  },
];

const altCosts = {
  "In-house Gurugram Dev Team": 2400000,
  "Traditional Legacy Agency": 1200000,
  "Freelancer Development": 600000,
};

export default function RoiCalculator() {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [users, setUsers] = useState<number>(scenarios[0].users);
  const [arpu, setArpu] = useState<number>(scenarios[0].arpu);
  const [projectBudget, setProjectBudget] = useState<number>(scenarios[0].budget);
  const [showAltCompare, setShowAltCompare] = useState<boolean>(true);

  const annualRevenue = users * arpu * 12;
  const netProfit = annualRevenue - projectBudget;
  const roi = projectBudget > 0 ? ((annualRevenue - projectBudget) / projectBudget) * 100 : 0;
  const monthsToProfit = users * arpu > 0 ? Math.ceil(projectBudget / (users * arpu)) : null;

  const applyScenario = (index: number) => {
    setActiveScenario(index);
    setUsers(scenarios[index].users);
    setArpu(scenarios[index].arpu);
    setProjectBudget(scenarios[index].budget);
  };

  const getSavings = (altCost: number) => {
    return altCost - projectBudget;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.03] via-transparent to-brand-primary/[0.03] pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator size={12} />
            Interactive ROI Calculator
          </span>
          <h2 className="heading-lg text-foreground mb-4">
            Calculate Your{" "}
            <span className="text-brand-primary">Custom Product ROI</span>
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Estimate your software growth, timeline efficiency, and net resource savings compared to traditional development alternatives in India.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            
            {/* Left Column: Interactive Inputs (Span 6) */}
            <div className="lg:col-span-6 bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block mb-3">1. Select Business Scenario</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scenarios.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.name}
                        onClick={() => applyScenario(i)}
                        className={`relative rounded-xl p-4 text-left transition-all duration-300 group ${
                          activeScenario === i
                            ? "bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(26,109,214,0.1)]"
                            : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${
                          activeScenario === i ? "bg-brand-primary/20" : "bg-white/[0.05]"
                        }`}>
                          <Icon size={14} className={activeScenario === i ? "text-brand-primary" : "text-foreground/40"} />
                        </div>
                        <p className={`text-xs font-semibold mb-0.5 ${activeScenario === i ? "text-brand-primary" : "text-foreground/70"}`}>
                          {s.name}
                        </p>
                        <p className="text-[9px] text-foreground/40 leading-tight">{s.note}</p>
                        {activeScenario === i && (
                          <div className={`absolute inset-0 rounded-xl border-2 border-brand-primary/30 bg-gradient-to-br ${s.color} opacity-[0.03] pointer-events-none`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 border-t border-white/5 pt-5">
                <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block mb-2">2. Scoping Metrics</span>
                
                {/* Custom Project Budget Input & Slider */}
                <div className="bg-black/10 border border-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                        <IndianRupee size={14} className="text-brand-primary" />
                      </div>
                      <label htmlFor="proj-budget-input" className="text-xs font-semibold text-foreground">Estimated Software Budget</label>
                    </div>
                    <span className="text-xs font-bold text-brand-primary">₹{(projectBudget / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="space-y-2">
                    <input
                      id="proj-budget-slider"
                      type="range"
                      min={100000}
                      max={3000000}
                      step={50000}
                      value={projectBudget}
                      onChange={(e) => setProjectBudget(Number(e.target.value))}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <input
                      id="proj-budget-input"
                      type="number"
                      min={50000}
                      value={projectBudget}
                      onChange={(e) => setProjectBudget(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/10 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                        <Users size={14} className="text-brand-primary" />
                      </div>
                      <label htmlFor="users-input" className="text-xs font-semibold text-foreground">Target Customer Count</label>
                    </div>
                    <div className="relative">
                      <input
                        id="users-input"
                        type="number"
                        min={1}
                        value={users}
                        onChange={(e) => setUsers(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 pr-12 text-sm text-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-bold"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 text-[10px] font-mono">users</span>
                    </div>
                  </div>

                  <div className="bg-black/10 border border-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-primary/15 flex items-center justify-center">
                        <IndianRupee size={14} className="text-brand-primary" />
                      </div>
                      <label htmlFor="arpu-input" className="text-xs font-semibold text-foreground">Avg Revenue/User/Mo</label>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 text-xs font-mono">₹</span>
                      <input
                        id="arpu-input"
                        type="number"
                        min={1}
                        value={arpu}
                        onChange={(e) => setArpu(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-7 pr-4 py-2 text-sm text-foreground focus-border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Calculations & Dashboard (Span 6) */}
            <div className="lg:col-span-6 bg-white/[0.04] border border-white/[0.1] rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest block mb-1">Projected Annual Revenue</span>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                    ₹{(annualRevenue / 100000).toFixed(1)} Lakhs
                  </p>
                  <p className="text-[10px] text-foreground/45 mt-1 leading-relaxed">
                    Producted Year 1 gross billing outline, calculated dynamically based on target volume.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <div className="bg-black/25 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] text-foreground/40 block mb-1 font-semibold uppercase">Initial Investment</span>
                    <span className="text-lg font-bold text-foreground">₹{(projectBudget / 100000).toFixed(1)}L</span>
                  </div>
                  
                  <div className={`rounded-2xl p-4 border ${
                    netProfit > 0 ? "bg-green-500/5 border-green-500/10 text-green-400" : "bg-red-500/5 border-red-500/10 text-red-400"
                  }`}>
                    <span className="text-[10px] block mb-1 font-semibold uppercase opacity-65">Year 1 Net Profit</span>
                    <span className="text-lg font-bold">
                      {netProfit >= 0 ? "+" : ""}
                      ₹{(netProfit / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground/50">Return on Investment (ROI)</span>
                    <span className={`font-bold flex items-center gap-1.5 text-sm ${roi > 0 ? "text-green-400" : "text-foreground/40"}`}>
                      <TrendingUp size={14} />
                      {roi > 0 ? `+${roi.toFixed(0)}%` : "0%"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-foreground/50">Breakeven Timeline</span>
                    <span className="font-semibold text-brand-primary flex items-center gap-1.5">
                      <Clock size={12} />
                      {monthsToProfit ? (
                        monthsToProfit <= 12 ? (
                          `${monthsToProfit} Months`
                        ) : (
                          `${monthsToProfit} Months (> 1 year)`
                        )
                      ) : (
                        "Needs more monthly active users"
                      )}
                    </span>
                  </div>
                </div>

                {/* Alternative Comparison Toggle */}
                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => setShowAltCompare(!showAltCompare)}
                    className="text-xs text-brand-primary hover:text-brand-light transition-colors font-medium flex items-center gap-1.5"
                  >
                    <BarChart3 size={12} />
                    {showAltCompare ? "Hide" : "Show"} Indian developer market alternatives
                  </button>
                  
                  <AnimatePresence>
                    {showAltCompare && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 bg-black/20 border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5"
                      >
                        {Object.entries(altCosts).map(([label, cost]) => {
                          const saved = getSavings(cost);
                          const isSaved = saved > 0;
                          return (
                            <div key={label} className="px-4 py-2.5 flex justify-between items-center text-[10px]">
                              <span className="text-foreground/50">{label}</span>
                              <div className="text-right">
                                <span className="text-foreground/70 block">₹{(cost / 100000).toFixed(1)}L/yr</span>
                                <span className={`font-bold block ${isSaved ? "text-green-400" : "text-foreground/30"}`}>
                                  {isSaved ? `Save ₹${(saved / 100000).toFixed(1)}L` : `+₹${(Math.abs(saved) / 100000).toFixed(1)}L`}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-center">
                <p className="text-[9px] text-foreground/30 leading-relaxed">
                  ROI = (Annual Revenue - Initial Budget) / Initial Budget &times; 100. Comparisons based on average Gurugram & Bengaluru staffing benchmark metrics.
                </p>
              </div>
            </div>
          </div>

          {/* Fully bespoke bottom consultation block - NO PRICING */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                  <Shield size={20} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Ready to engineer your custom solution?</p>
                  <p className="text-xs text-foreground/50">Schedule a free technical requirements scoping call with our Gurugram engineering team.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right hidden sm:block">
                  <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">Billing Scope</p>
                  <p className="text-xs font-semibold text-brand-primary">Custom Milestone Quotation</p>
                </div>
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all w-full md:w-auto justify-center"
                >
                  Book Custom Scoping Call
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}