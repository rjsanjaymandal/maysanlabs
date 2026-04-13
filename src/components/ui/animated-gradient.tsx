"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
  borderRadius?: string;
  duration?: number;
}

const colors = [
  "#A3E635",
  "#D9FF00",
  "#4D7C0F",
  "#84CC16",
  "#22D3EE",
  "#A3E635",
];

export function AnimatedGradientBorder({
  className,
  children,
  borderRadius = "24px",
  duration = 4,
}: AnimatedGradientProps) {
  return (
    <div
      className={cn("relative group", className)}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(${colors.map((color, i) => {
            const offset = (i / colors.length) * 100;
            return `${color} ${offset}%`;
          }).join(", ")}), conic-gradient(from 0deg at 50% 50%, var(--brand-primary), var(--brand-light), var(--brand-primary))`,
          backgroundSize: "200% 200%",
          animation: `gradient-rotate ${duration}s ease infinite`,
          borderRadius,
        }}
      />
      <div
        className="absolute inset-[2px]"
        style={{ background: "#0d1117", borderRadius: `calc(${borderRadius} - 2px)` }}
      />
      {children && (
        <div className="relative z-10" style={{ borderRadius }}>
          {children}
        </div>
      )}
    </div>
  );
}

export function ShimmerButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 rounded-full font-bold text-sm overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-[var(--brand-gradient)] opacity-90 group-hover:opacity-100 transition-opacity" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          transform: "skewX(-20deg) translateX(-150%)",
          animation: "shimmer 2s infinite",
        }}
      />
      <span className="relative z-10 text-[var(--brand-dark-text)]">
        {children}
      </span>
    </button>
  );
}