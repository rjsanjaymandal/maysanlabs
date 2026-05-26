"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealImageProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollRevealImage({
  children,
  className = "",
  direction = "up",
}: ScrollRevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const clipMap = {
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
  };

  const yMap = {
    up: 40,
    down: -40,
    left: 0,
    right: 0,
  };

  const xMap = {
    up: 0,
    down: 0,
    left: 40,
    right: -40,
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{
          clipPath: clipMap[direction],
          y: yMap[direction],
          x: xMap[direction],
        }}
        animate={
          isInView
            ? { clipPath: "inset(0)", y: 0, x: 0 }
            : {}
        }
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
