"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

export default function StatsSection() {
  return (
    <section className="py-10 md:py-14 border-y border-gray-100 dark:border-white/[0.06] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.02] to-transparent pointer-events-none" />
      <div className="container-main relative z-10">
        <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-white/[0.06] rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] overflow-hidden max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent mb-1 tabular-nums">
              <NumberTicker value={99.9} decimalPlaces={1} />%
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground/80 mb-0.5">
              Uptime SLA
            </p>
            <p className="text-xs text-foreground/50 leading-relaxed max-w-[140px]">
              Enterprise-grade reliability
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent mb-1 tabular-nums">
              <NumberTicker value={50} />+
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground/80 mb-0.5">
              Projects Delivered
            </p>
            <p className="text-xs text-foreground/50 leading-relaxed max-w-[140px]">
              Across 12 industries
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-brand-primary to-brand-light bg-clip-text text-transparent mb-1 tabular-nums">
              <NumberTicker value={24} />hr
            </p>
            <p className="text-xs md:text-sm font-semibold text-foreground/80 mb-0.5">
              Response Time
            </p>
            <p className="text-xs text-foreground/50 leading-relaxed max-w-[140px]">
              Priority support guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
