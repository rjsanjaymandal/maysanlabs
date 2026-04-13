"use client";

import { cn } from "@/lib/utils";

interface FloatingParticlesProps {
  className?: string;
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
}

const generateParticles = (count: number, minSize: number, maxSize: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * (maxSize - minSize) + minSize,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.5 + 0.1,
  }));
};

export function FloatingParticles({
  className,
  count = 20,
  color = "var(--brand-primary)",
  minSize = 2,
  maxSize = 6,
}: FloatingParticlesProps) {
  const particles = generateParticles(count, minSize, maxSize);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
            opacity: particle.opacity,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function GlowingOrb({
  className,
  size = 300,
  color = "var(--brand-primary)",
  blur = 80,
}: {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
}) {
  return (
    <div
      className={cn("absolute rounded-full pointer-events-none", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        opacity: 0.3,
      }}
    />
  );
}