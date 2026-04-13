"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmountX?: number;
  tiltAmountY?: number;
  glareEnabled?: boolean;
  glareColor?: string;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className,
  tiltAmountX = 15,
  tiltAmountY = 15,
  glareEnabled = true,
  glareColor = "rgba(163, 230, 53, 0.3)",
  glareOpacity = 0.3,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`${xSpring}deg`;
  const rotateY = useMotionTemplate`${ySpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    const xPct = mouseX - 0.5;
    const yPct = mouseY - 0.5;

    x.set(xPct * -tiltAmountY);
    y.set(yPct * tiltAmountX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative transition-all duration-300",
        className
      )}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>

      {glareEnabled && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glareColor} 0%, transparent 70%)`,
            opacity: glareOpacity,
            transform: "translateZ(60px)",
          }}
        />
      )}
    </motion.div>
  );
}