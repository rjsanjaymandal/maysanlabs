"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 210, 255, 0.12), transparent 40%)`
  );

  const borderBg = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 210, 255, 0.35), transparent 40%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlightBg }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderBg,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}
