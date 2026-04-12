"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    const setCanvasSize = () => {
      width = containerRef.current!.clientWidth;
      height = containerRef.current!.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const beams: Beam[] = [];
    const beamCount = 30;

    class Beam {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.length = Math.random() * 200 + 100;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.y -= this.speed;
        if (this.y < -this.length) {
          this.y = height + this.length;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
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

    for (let i = 0; i < beamCount; i++) {
      beams.push(new Beam());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      beams.forEach((beam) => {
        beam.update();
        beam.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

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
};
