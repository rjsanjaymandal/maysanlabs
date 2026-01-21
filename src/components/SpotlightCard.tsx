"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import styles from "./SpotlightCard.module.css";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  featured = false,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(y, [-300, 300], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-300, 300], [-10, 10]),
    springConfig,
  );

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setPosition({ x: mouseX, y: mouseY });

    // Center-based coordinates for rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${featured ? styles.featured : ""} ${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--primary), 0.15), transparent 40%)`,
        }}
      />
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}
