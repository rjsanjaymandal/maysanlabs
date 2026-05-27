"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Defer state updates to avoid cascading render warnings and comply with strict eslint rules
    const raf = requestAnimationFrame(() => {
      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileViewport);
      setMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Generate particles only once on the client to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!mounted) return [];
    // Cap count on mobile to reduce rendering workload
    const adjustedCount = isMobile ? Math.min(count, 8) : count;
    return generateParticles(adjustedCount, minSize, maxSize);
  }, [mounted, count, minSize, maxSize, isMobile]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
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
                  willChange: "transform",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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