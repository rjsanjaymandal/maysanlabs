"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  z: number;
}

export default function HolographicGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Generate technical wireframe points
    const points: Point[] = [];
    const latLines = 18;
    const lonLines = 24;
    const isMobile = width < 768;
    const radius = Math.min(width, height) * (isMobile ? 0.25 : 0.3);

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
        // Rotate around Y axis
        const x = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
        const y = p.y;

        // Rotate around X axis
        const yFinal = y * Math.cos(rotX) - z * Math.sin(rotX);
        const zFinal = y * Math.sin(rotX) + z * Math.cos(rotX);

        const perspective = 600;
        const scale = perspective / (perspective + zFinal);
        
        return {
            x: x * scale + width * (isMobile ? 0.85 : 0.8), // Offset to bottom right
            y: yFinal * scale + height * (isMobile ? 0.9 : 0.85),
            scale,
            z: zFinal
        };
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    const targetRotationX = 0;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Combine atmospheric rotation with subtle mouse parallax
      targetRotationY += 0.002;
      const finalRotY = targetRotationY + (mouseX * 0.2);
      const finalRotX = targetRotationX + (mouseY * 0.1);

      ctx.strokeStyle = "rgba(163, 230, 53, 0.12)";
      ctx.lineWidth = 0.5;

      // Draw Latitudinal Rings
      for (let i = 0; i <= latLines; i++) {
          ctx.beginPath();
          for (let j = 0; j <= lonLines; j++) {
              const p = points[i * (lonLines + 1) + j];
              const proj = project(p, finalRotY, finalRotX);
              if (j === 0) ctx.moveTo(proj.x, proj.y);
              else ctx.lineTo(proj.x, proj.y);
          }
          ctx.stroke();
      }

      // Draw Longitudinal Rings
      for (let j = 0; j <= lonLines; j++) {
          ctx.beginPath();
          for (let i = 0; i <= latLines; i++) {
              const p = points[i * (lonLines + 1) + j];
              const proj = project(p, finalRotY, finalRotX);
              if (i === 0) ctx.moveTo(proj.x, proj.y);
              else ctx.lineTo(proj.x, proj.y);
          }
          ctx.stroke();
      }

      // Draw Tech Nodes at intersections
      points.forEach((p, idx) => {
          if (idx % 12 === 0) { // Slightly sparser for a more technical feel
              const proj = project(p, finalRotY, finalRotX);
              if (proj.z < 0) { 
                  const opacity = 0.5 * proj.scale;
                  ctx.fillStyle = `rgba(163, 230, 53, ${opacity})`;
                  ctx.fillRect(proj.x - 0.75, proj.y - 0.75, 1.5, 1.5);
                  
                  if (idx % 48 === 0) {
                      ctx.shadowBlur = 15;
                      ctx.shadowColor = "rgba(163, 230, 53, 0.6)";
                      ctx.fillRect(proj.x - 1, proj.y - 1, 2, 2);
                      ctx.shadowBlur = 0;
                  }
              }
          }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
      }}
    >
      <canvas
        ref={canvasRef}
        className="opacity-40"
      />
    </div>
  );
}
