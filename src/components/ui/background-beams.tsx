"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

class Beam {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.length = Math.random() * 200 + 100;
    this.speed = Math.random() * 0.5 + 0.1;
    this.opacity = Math.random() * 0.5;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.length) {
      this.y = this.height + this.length;
      this.x = Math.random() * this.width;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createLinearGradient(
      this.x,
      this.y,
      this.x,
      this.y + this.length
    );
    gradient.addColorStop(0, "rgba(163, 230, 53, 0)");
    gradient.addColorStop(0.5, `rgba(163, 230, 53, ${this.opacity})`);
    gradient.addColorStop(1, "rgba(163, 230, 53, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, 1, this.length);
  }
}

export default function BackgroundBeams({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    let rafId: number;

    const setCanvasSize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize, { passive: true });

    const beams: Beam[] = [];
    const beamCount = 30;

    for (let i = 0; i < beamCount; i++) {
      beams.push(new Beam(width, height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      beams.forEach((beam) => {
        beam.update();
        beam.draw(ctx);
      });
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(rafId);
    };
  }, [isMounted]);

  if (!isMounted) return <div className={cn("absolute inset-0 z-0 bg-transparent", className)} />;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="opacity-40"
      />
    </div>
  );
}
