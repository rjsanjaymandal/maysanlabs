"use client";

import React, { useRef, useState, MouseEvent } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.card} ${featured ? styles.featured : ""} ${className}`}
    >
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, hsla(var(--primary), 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
