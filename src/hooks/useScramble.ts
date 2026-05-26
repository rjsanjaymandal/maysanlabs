"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?~0123456789";

export function useScramble(duration = 800) {
  const [text, setText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(
    (finalText: string) => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      let currentIndex = 0;
      const steps = Math.min(duration / 50, finalText.length * 2);

      intervalRef.current = setInterval(() => {
        currentIndex++;
        const progress = currentIndex / steps;

        if (progress >= 1) {
          setText(finalText);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }

        const revealCount = Math.floor(progress * finalText.length);
        const result = finalText
          .split("")
          .map((char, i) =>
            i < revealCount
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("");
        setText(result);
      }, 50);
    },
    [duration]
  );

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return { text, scramble, reset };
}
