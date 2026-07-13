import Link from "next/link";
import { ArrowRight, Cpu, Layers, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Build",
    desc: "Custom software engineered for your business — SaaS platforms, automation tools, and web apps built from scratch.",
    icon: Cpu,
    href: "/services",
    cta: "See services",
    gradient: "from-blue-500 to-brand-primary",
  },
  {
    number: "02",
    title: "Scale",
    desc: "Cloud infrastructure that handles millions of users. Automatic backups, 99.9% uptime, and fast performance worldwide.",
    icon: Layers,
    href: "/services/cloud",
    cta: "Scale with us",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    number: "03",
    title: "Grow",
    desc: "Strategy, analytics, and continuous improvement. We help you find more customers and increase revenue.",
    icon: TrendingUp,
    href: "/contact",
    cta: "Start growing",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function BuildScaleGrow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {steps.map((step) => (
        <Link
          key={step.title}
          href={step.href}
          className="group relative flex flex-col gap-5 rounded-2xl border border-gray-100 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-8 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-primary/[0.04] hover:border-brand-primary/20 transition-all duration-300"
        >
          {/* Step number */}
          <span className="absolute top-6 right-6 text-5xl font-black text-foreground/[0.04] dark:text-foreground/[0.03] pointer-events-none select-none tabular-nums">
            {step.number}
          </span>

          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} bg-opacity-10 flex items-center justify-center relative z-10`}>
            <step.icon size={20} className="text-white" />
          </div>

          <h3 className={`text-2xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
            {step.title}
          </h3>

          <p className="text-sm text-foreground/60 leading-relaxed">
            {step.desc}
          </p>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/50 group-hover:text-foreground/80 group-hover:gap-2.5 transition-all mt-auto">
            {step.cta}
            <ArrowRight size={12} />
          </span>
        </Link>
      ))}
    </div>
  );
}
