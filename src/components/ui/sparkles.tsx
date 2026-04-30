"use client";
import React, { useId, useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const resizeCanvas = () => {
          if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            initParticles();
          }
        };

        const initParticles = () => {
          const density = particleDensity || 120;
          const particles = [];
          for (let i = 0; i < density; i++) {
            particles.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              size: Math.random() * ((maxSize || 3) - (minSize || 1)) + (minSize || 1),
              speedX: (Math.random() - 0.5) * (speed || 1),
              speedY: (Math.random() - 0.5) * (speed || 1),
              opacity: Math.random(),
            });
          }
          particlesRef.current = particles;
        };

        const animate = () => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          particlesRef.current.forEach((p) => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = ctx.canvas.width;
            if (p.x > ctx.canvas.width) p.x = 0;
            if (p.y < 0) p.y = ctx.canvas.height;
            if (p.y > ctx.canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = particleColor || "#FFFFFF";
            ctx.globalAlpha = p.opacity;
            ctx.fill();
          });
          animationRef.current = requestAnimationFrame(animate);
        };

        resizeCanvas();
        animate();
        window.addEventListener("resize", resizeCanvas);

        return () => {
          window.removeEventListener("resize", resizeCanvas);
          cancelAnimationFrame(animationRef.current);
        };
      }
    }
  }, [maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      id={id || "sparkles-canvas"}
      className={cn("h-full w-full", className)}
      style={{
        background: background || "transparent",
      }}
    />
  );
};
