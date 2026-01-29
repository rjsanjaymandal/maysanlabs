"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1.2,
        smoothWheel: true,
        anchors: true, // Enable anchor support
      }}
    >
      {children}
    </ReactLenis>
  );
}
