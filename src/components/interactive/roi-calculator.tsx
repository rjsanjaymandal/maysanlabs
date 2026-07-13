"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Users, IndianRupee, TrendingUp, Clock, Building2, ShoppingCart, Globe, ArrowRight, BarChart3, Code2 } from "lucide-react";
import Link from "next/link";

const scenarios = [
  { name: "SaaS", icon: Code2, users: 200, arpu: 1500, budget: 1000000, note: "200 customers @ ₹1,500/mo" },
  { name: "E-commerce", icon: ShoppingCart, users: 1000, arpu: 300, budget: 500000, note: "1,000 orders/mo @ ₹300 avg" },
  { name: "Marketplace", icon: Globe, users: 500, arpu: 800, budget: 800000, note: "500 sellers @ ₹800/mo" },
  { name: "Enterprise", icon: Building2, users: 50, arpu: 25000, budget: 1500000, note: "50 clients @ ₹25,000/mo" },
];

const altCosts: Record<string, number> = {
  "In-house team (Gurgaon)": 2400000,
  "Traditional agency": 1200000,
  "Freelancer": 600000,
};

export default function RoiCalculator() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [users, setUsers] = useState(scenarios[0].users);
  const [arpu, setArpu] = useState(scenarios[0].arpu);
  const [projectBudget, setProjectBudget] = useState(scenarios[0].budget);
  const [showComparison, setShowComparison] = useState(false);

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

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] via-transparent to-brand-primary/[0.02] pointer-events-none" />
      <div className="container-narrow relative z-10">
        <div className="text-center mb-12">
          <span className="badge-section mb-4 inline-flex gap-2">
            <Calculator size={12} /> ROI Calculator
          </span>
          <h2 className="heading-md text-foreground mb-3">
            What&apos;s your <span className="text-gradient-brand">return on investment</span>?
          </h2>
          <p className="text-foreground/60 text-sm max-w-lg mx-auto">
            Choose a scenario and adjust the numbers to estimate your first-year returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 space-y-5">
            <div className="grid grid-cols-2 gap-2">
              {scenarios.map((s, i) => {
                const Icon = s.icon;
                const active = activeScenario === i;
                return (
                  <button
                    key={s.name}
                    onClick={() => applyScenario(i)}
                    className={`text-left rounded-xl p-3 border transition-all ${
                      active ? "border-brand-primary/50 bg-brand-primary/10" : "border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/[0.1]"
                    }`}
                  >
                    <Icon size={14} className={active ? "text-brand-primary" : "text-foreground/30"} />
                    <p className={`text-xs font-semibold mt-2 ${active ? "text-brand-primary" : "text-foreground/60"}`}>{s.name}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">{s.note}</p>
                  </button>
                );
              })}
            </div>

            <div className="space-y-4 border-t border-gray-100 dark:border-white/[0.06] pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <IndianRupee size={14} className="text-brand-primary" />
                  Project Budget
                </label>
                <span className="text-xs font-bold text-brand-primary">₹{(projectBudget / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min={100000}
                max={3000000}
                step={50000}
                value={projectBudget}
                onChange={(e) => setProjectBudget(Number(e.target.value))}
                className="w-full accent-brand-primary"
              />
              <input
                type="number"
                value={projectBudget}
                onChange={(e) => setProjectBudget(Math.max(0, Number(e.target.value)))}
                className="w-full bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-2 text-sm font-mono font-bold focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Users size={14} className="text-brand-primary" /> Customers
                </label>
                <input
                  type="number"
                  min={1}
                  value={users}
                  onChange={(e) => setUsers(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-2.5 text-sm font-bold focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-2 mb-2">
                  <IndianRupee size={14} className="text-brand-primary" /> ARPU
                </label>
                <input
                  type="number"
                  min={1}
                  value={arpu}
                  onChange={(e) => setArpu(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/[0.06] rounded-xl px-4 py-2.5 text-sm font-bold focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">Year 1 Revenue</span>
              <p className="text-3xl md:text-4xl font-black text-foreground mt-1">
                ₹{(annualRevenue / 100000).toFixed(1)} Lakhs
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-xl p-4 border border-gray-100 dark:border-white/[0.06]">
                <span className="text-xs text-foreground/50 block mb-1">Investment</span>
                <span className="text-lg font-bold">₹{(projectBudget / 100000).toFixed(1)}L</span>
              </div>
              <div className={`rounded-xl p-4 border ${netProfit > 0 ? "bg-green-500/5 border-green-500/10" : "bg-red-500/5 border-red-500/10"}`}>
                <span className="text-xs opacity-70 block mb-1">Net Profit</span>
                <span className={`text-lg font-bold ${netProfit > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {netProfit >= 0 ? "+" : ""}₹{(netProfit / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/50">ROI</span>
                <span className={`font-bold flex items-center gap-1 ${roi > 0 ? "text-green-600 dark:text-green-400" : "text-foreground/40"}`}>
                  <TrendingUp size={14} />{roi > 0 ? `+${roi.toFixed(0)}%` : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/50">Breakeven</span>
                <span className="font-semibold text-brand-primary flex items-center gap-1">
                  <Clock size={12} />
                  {monthsToProfit ? `${monthsToProfit} months` : "—"}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/[0.06]">
              <button onClick={() => setShowComparison(!showComparison)} className="text-xs text-brand-primary hover:text-brand-light font-medium flex items-center gap-1.5">
                <BarChart3 size={12} />
                {showComparison ? "Hide" : "Compare"} vs alternatives
              </button>
              <AnimatePresence>
                {showComparison && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden divide-y divide-gray-100 dark:divide-white/[0.06]">
                    {Object.entries(altCosts).map(([label, cost]) => {
                      const saved = projectBudget - cost;
                      return (
                        <div key={label} className="px-4 py-2.5 flex justify-between text-xs">
                          <span className="text-foreground/50">{label}</span>
                          <span className={`font-semibold ${saved > 0 ? "text-green-600 dark:text-green-400" : "text-foreground/30"}`}>
                            {saved > 0 ? `Save ₹${(saved / 100000).toFixed(1)}L` : `+₹${(Math.abs(saved) / 100000).toFixed(1)}L`}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6">
              <Link href="/start" className="flex items-center justify-center gap-2 w-full bg-brand-primary text-white py-3 rounded-full font-bold text-sm hover:shadow-lg hover:shadow-brand-primary/25 transition-all">
                Get a custom quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-xs text-foreground/30 text-center mt-8">
          Estimates based on average market data. Actual results depend on your specific business model and execution.
        </p>
      </div>
    </section>
  );
}
