"use client";

import { motion } from "framer-motion";

export function RadarChart({ scores }: { scores: { perf: number; seo: number; sec: number; mob: number; ux: number } }) {
  const items = [
    { label: "Perf", value: scores.perf, color: "#1A6DD6" },
    { label: "SEO", value: scores.seo, color: "#14b8a6" },
    { label: "Sec", value: scores.sec, color: "#10b981" },
    { label: "Mobile", value: scores.mob, color: "#00d2ff" },
    { label: "UX", value: scores.ux, color: "#fbbf24" },
  ];

  const cx = 80, cy = 80, r = 60;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <svg width="180" height="180" viewBox="0 0 160 160" className="drop-shadow-lg">
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, li) => (
          <polygon key={li} points={items.map((_, i) => {
            const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
            const radius = r * level;
            return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
          }).join(" ")}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        ))}
        {items.map((_, i) => {
          const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
          return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />;
        })}
        <polygon points={items.map((item, i) => {
          const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
          const radius = r * (item.value / 100);
          return `${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`;
        }).join(" ")} fill="rgba(26,109,214,0.15)" stroke="#1A6DD6" strokeWidth="2" />
        {items.map((item, i) => {
          const angle = (Math.PI * 2 * i) / items.length - Math.PI / 2;
          const radius = r * (item.value / 100);
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill={item.color} stroke="#03050d" strokeWidth="2" />
              <text x={cx + (r + 16) * Math.cos(angle)} y={cy + (r + 16) * Math.sin(angle)} textAnchor="middle" dominantBaseline="central"
                fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">{item.label}</text>
              <text x={cx + (r + 28) * Math.cos(angle)} y={cy + (r + 28) * Math.sin(angle)} textAnchor="middle" dominantBaseline="central"
                fill={item.color} fontSize="10" fontWeight="bold" fontFamily="monospace">{item.value}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ScoreHistoryChart({ overallScore }: { overallScore: number }) {
  return (
    <div className="h-full flex flex-col">
      <span className="text-[10px] text-foreground/45 uppercase tracking-widest font-semibold block mb-4">Score History Trend</span>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground/40 font-mono">Current Score</span>
            <span className="text-2xl font-black font-mono text-foreground">{overallScore}<span className="text-xs text-foreground/40 font-normal">/100</span></span>
          </div>
          <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallScore}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${overallScore >= 75 ? "bg-gradient-to-r from-[#10b981] to-[#14b8a6]" : overallScore >= 60 ? "bg-gradient-to-r from-amber-400 to-yellow-300" : "bg-gradient-to-r from-red-500 to-rose-400"}`}
            />
          </div>
          <div className="flex justify-between text-[9px] text-foreground/25 font-mono">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          <p className="text-[10px] text-foreground/40 mt-2 font-light leading-relaxed">
            {overallScore >= 80
              ? "Your site is performing well across all tracked dimensions."
              : overallScore >= 60
              ? "Moderate health — addressing the flagged issues will boost your overall score."
              : "Critical issues detected — review the optimization suggestions below."}
          </p>
        </div>
      </div>
    </div>
  );
}
