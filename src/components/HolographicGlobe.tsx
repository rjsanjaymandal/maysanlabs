import React, { useEffect, useRef, useSyncExternalStore, useState } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function HolographicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useHydrated();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raf = requestAnimationFrame(() => {
      setReducedMotion(mq.matches);
    });
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || reducedMotion || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    const setCanvasSize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const isMobile = width < 768;
    const latLines = isMobile ? 12 : 18;
    const lonLines = isMobile ? 16 : 24;
    const radius = Math.min(width, height) * (isMobile ? 0.25 : 0.3);

    const points: Point[] = [];
    for (let i = 0; i <= latLines; i++) {
        const lat = (Math.PI * i) / latLines;
        for (let j = 0; j <= lonLines; j++) {
            const lon = (2 * Math.PI * j) / lonLines;
            const x = radius * Math.sin(lat) * Math.cos(lon);
            const y = radius * Math.cos(lat);
            const z = radius * Math.sin(lat) * Math.sin(lon);
            points.push({ x, y, z });
        }
    }

    const project = (p: Point, rotY: number, rotX: number) => {
        const x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
        const y = p.y;

        const yFinal = y * Math.cos(rotX) - z * Math.sin(rotX);
        const zFinal = y * Math.sin(rotX) + z * Math.cos(rotX);

        const perspective = 600;
        const scale = perspective / (perspective + zFinal);
        
        return {
            x: x * scale + width * (isMobile ? 0.85 : 0.8),
            y: yFinal * scale + height * (isMobile ? 0.9 : 0.85),
            scale,
            z: zFinal
        };
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    const targetRotationX = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      targetRotationY += 0.002;
      const finalRotY = targetRotationY + (mouseX * 0.2);
      const finalRotX = targetRotationX + (mouseY * 0.1);

      points.forEach((p) => {
        const proj = project(p, finalRotY, finalRotX);
        if (proj.scale > 0) {
          const opacity = proj.scale * 0.5;
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.shadowColor = "rgba(59, 130, 246, 0.6)";
          ctx.fillRect(proj.x - 1, proj.y - 1, 2, 2);
          ctx.shadowBlur = 0;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMounted, reducedMotion]);

  if (!isMounted) return <div className="absolute inset-0 z-0 bg-transparent" />;

  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)"
      }}
    >
      <canvas
        ref={canvasRef}
        className="opacity-40"
      />
    </div>
  );
}