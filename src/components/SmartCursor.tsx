"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import styles from "./SmartCursor.module.css";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotionStore() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export default function SmartCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotionStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    window.requestAnimationFrame(() => {
      if (isTouch || prefersReducedMotion) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });
    let lastElement: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target === lastElement) return;
      lastElement = target;

      const isInteractable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.getAttribute("role") === "button";

      setIsPointer(isInteractable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <motion.div
      ref={cursorRef}
      className={styles.cursor}
      aria-hidden="true"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        scale: isPointer ? 2.5 : 1,
      }}
    >
      <div className={styles.dot} />
    </motion.div>
  );
}
