"use client";

import React, { useState, useEffect, useCallback } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]";

export default function GlitchText({
  text,
  className = "",
  glitchInterval = 3000,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    let iterations = 0;
    const maxIterations = 3;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iterations += 1;
      if (iterations > text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isGlitching) triggerGlitch();
    }, glitchInterval);

    return () => clearInterval(timer);
  }, [glitchInterval, isGlitching, triggerGlitch]);

  return <span className={className}>{displayText}</span>;
}
