

import { cn } from "@/lib/utils";

interface LogoMarqueeProps {
  className?: string;
  duration?: number;
}

export default function LogoMarquee({
  className,
  duration = 30,
}: LogoMarqueeProps) {
  const logos = [
    { name: "EduMaysan", icon: "M" },
    { name: "FlashFashion", icon: "F" },
    { name: "TechRetail", icon: "T" },
    { name: "StyleHub", icon: "S" },
    { name: "CloudFirst", icon: "C" },
    { name: "DataSync", icon: "D" },
    { name: "AppFlow", icon: "A" },
    { name: "NexTech", icon: "N" },
    { name: "ScaleUp", icon: "U" },
  ];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        } as React.CSSProperties
      }
    >
      <div className="flex overflow-hidden py-1">
        <div className="flex shrink-0 items-center gap-8 md:gap-12 animate-marquee">
          {logos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="flex items-center gap-3 px-5 py-2.5 bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-xl hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300 opacity-45 hover:opacity-90 group cursor-default shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm font-bold group-hover:bg-brand-primary/20 transition-colors">
                {logo.icon}
              </div>
              <span className="text-sm font-extrabold text-foreground tracking-tight group-hover:text-brand-primary transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-8 md:gap-12 animate-marquee" aria-hidden>
          {logos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="flex items-center gap-3 px-5 py-2.5 bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-xl hover:border-brand-primary/20 hover:bg-white/[0.04] transition-all duration-300 opacity-45 hover:opacity-90 group cursor-default shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary text-sm font-bold group-hover:bg-brand-primary/20 transition-colors">
                {logo.icon}
              </div>
              <span className="text-sm font-extrabold text-foreground tracking-tight group-hover:text-brand-primary transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
