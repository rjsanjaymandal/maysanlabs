"use client";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  className?: string;
}

export function GridPattern({
  width = 40,
  height = 40,
  className,
}: GridPatternProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        "[mask-image:linear-gradient(to_bottom,white,transparent,white)]",
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h1v1H0zM${width} 0h1v1H${width}zM0 ${height}h1v1H0zM${width} ${height}h1v1H${width}z' fill='%23ffffff' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: `${width}px ${height}px`,
      }}
    />
  );
}