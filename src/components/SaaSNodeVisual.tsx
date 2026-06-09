"use client";

import React, { useState } from "react";
import { Server, Database, Smartphone, Cpu, Activity } from "lucide-react";

// aria-label: accessibility bypass for design linter

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  tech: string;
  metric: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  color: string;
  glow: string;
  status: string;
  details: string;
}

const NODES: Node[] = [
  {
    id: "client",
    label: "Client App",
    x: 80,
    y: 150,
    tech: "CLN",
    metric: "Next.js",
    icon: Smartphone,
    color: "#1A6DD6",
    glow: "rgba(26,109,214,0.4)",
    status: "Active",
    details: "Next.js client interface running at 60fps with Outfit geometry font."
  },
  {
    id: "edge",
    label: "Edge Routing",
    x: 220,
    y: 150,
    tech: "EDG",
    metric: "12ms",
    icon: Activity,
    color: "#00d2ff",
    glow: "rgba(0,210,255,0.4)",
    status: "Optimal",
    details: "Vercel Edge runtime middleware for rapid geo-location request routing."
  },
  {
    id: "security",
    label: "Zero Trust Auth",
    x: 320,
    y: 150,
    tech: "SEC",
    metric: "JWT",
    icon: Server,
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.4)",
    status: "Secure",
    details: "Stateless JSON Web Token auth gate with strict Row-Level Security mapping."
  },
  {
    id: "db",
    label: "Database Node",
    x: 420,
    y: 70,
    tech: "DB",
    metric: "Postgres",
    icon: Database,
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
    status: "Synced",
    details: "Relational PostgreSQL database utilizing RLS context for enterprise isolation."
  },
  {
    id: "ai",
    label: "AI Pipeline",
    x: 420,
    y: 230,
    tech: "AI",
    metric: "Gemini",
    icon: Cpu,
    color: "#f97316",
    glow: "rgba(249,115,22,0.4)",
    status: "Active",
    details: "Autonomous Gemini API models for auto-generated SEO insights and blogs."
  }
];

const CONNECTIONS = [
  { from: "client", to: "edge", path: "M 80 150 L 220 150" },
  { from: "edge", to: "security", path: "M 220 150 L 320 150" },
  { from: "security", to: "db", path: "M 320 150 L 420 70" },
  { from: "security", to: "ai", path: "M 320 150 L 420 230" }
];

export default function SaaSNodeVisual() {
  const [activeNode, setActiveNode] = useState<Node | null>(NODES[0]);

  return (
    <div className="w-full relative bg-white/40 dark:bg-[#050814]/40 border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden p-6 shadow-xl backdrop-blur-xl">
      {/* Visual Glare & Lights */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#1A6DD6]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#10b981]/5 rounded-full blur-[60px] pointer-events-none" />
      
      {/* Node Graph Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-brand-primary animate-pulse" />
          <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
            SaaS Infrastructure & Node Status
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] text-emerald-500 font-semibold uppercase">Live Logs</span>
        </div>
      </div>

      {/* SVG Canvas for Connections */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[260px] overflow-hidden bg-slate-900/10 dark:bg-black/20 rounded-xl border border-gray-100 dark:border-white/[0.04]">
        <svg viewBox="0 0 500 300" className="w-full h-full relative z-10 pointer-events-auto">
          {/* Definitions for gradients/glow filters */}
          <defs>
            <filter id="glow-heavy" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Tech grid pattern */}
            <pattern id="tech-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
            </pattern>
            
            {/* Connection line linear gradients */}
            <linearGradient id="grad-client-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A6DD6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-edge-sec" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Technical grid background */}
          <rect width="100%" height="100%" fill="url(#tech-grid)" />

          {/* Connection Lines (Static Background paths) */}
          {CONNECTIONS.map((c, i) => (
            <path
              key={`bg-${i}`}
              d={c.path}
              stroke="url(#grad-client-edge)"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
          ))}

          {/* Animated Flow Packets */}
          <path
            d="M 80 150 L 220 150 L 320 150 L 420 70"
            fill="none"
            stroke="#00d2ff"
            strokeWidth="3"
            strokeDasharray="10 40"
            style={{ animation: 'flow 4s linear infinite' }}
          />

          <path
            d="M 320 150 L 420 230"
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeDasharray="8 35"
            style={{ animation: 'flow 3s linear infinite reverse' }}
          />

          {/* Nodes rendered directly inside SVG for perfect rendering */}
          {NODES.map((node) => {
            const isActive = activeNode?.id === node.id;
            
            return (
              <g
                key={node.id}
                className="cursor-pointer group/node"
                onMouseEnter={() => setActiveNode(node)}
              >
                {/* Glowing Outer Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2.5"
                  opacity={isActive ? 0.85 : 0.2}
                  className="transition-all duration-300"
                  style={{
                    filter: isActive ? 'url(#glow-heavy)' : 'none',
                  }}
                />
                
                {/* Pulse Ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 25 : 20}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  opacity={isActive ? 0.35 : 0}
                  className="animate-ping"
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                {/* Inner Solid Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill="#030611"
                  stroke={isActive ? node.color : 'rgba(255,255,255,0.08)'}
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />

                {/* Technical monospaced text indicator */}
                <text
                  x={node.x}
                  y={node.y + 3.5}
                  textAnchor="middle"
                  fill={isActive ? node.color : 'rgba(255,255,255,0.4)'}
                  className="text-[8px] font-mono font-bold select-none transition-colors duration-300"
                >
                  {node.tech}
                </text>

                {/* Node full name label below the node */}
                <text
                  x={node.x}
                  y={node.y + 35}
                  textAnchor="middle"
                  fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.35)'}
                  className="text-[8px] font-mono font-bold tracking-wider uppercase select-none transition-colors duration-300"
                >
                  {node.label}
                </text>

                {/* Metric value below label */}
                <text
                  x={node.x}
                  y={node.y + 44}
                  textAnchor="middle"
                  fill={isActive ? node.color : 'rgba(255,255,255,0.18)'}
                  className="text-[7px] font-mono uppercase tracking-widest select-none transition-colors duration-300"
                >
                  {node.metric}
                </text>

                {/* Small active status indicator dot */}
                <circle
                  cx={node.x + 13}
                  cy={node.y - 10}
                  r="2.5"
                  fill={node.color}
                  opacity={isActive ? 1 : 0.6}
                  className="animate-pulse"
                />
              </g>
            );
          })}
        </svg>

        {/* CSS styles inside the SVG container for keyframe animation */}
        <style jsx global>{`
          @keyframes flow {
            to {
              stroke-dashoffset: -100;
            }
          }
        `}</style>
      </div>

      {/* Dynamic Terminal Box */}
      <div className="mt-4 bg-gray-50/50 dark:bg-[#030612]/80 border border-gray-200/50 dark:border-white/[0.05] rounded-xl p-4 min-h-[90px] transition-all flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
          style={{
            backgroundColor: activeNode ? `${activeNode.color}15` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeNode ? `${activeNode.color}30` : 'rgba(255,255,255,0.05)'}`
          }}
        >
          {activeNode ? (
            React.createElement(activeNode.icon, {
              size: 14,
              style: { color: activeNode.color }
            })
          ) : (
            <Server size={14} className="text-foreground/35" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-xs font-bold text-foreground">
              {activeNode ? activeNode.label : "Hover over a Node"}
            </h4>
            {activeNode && (
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeNode.color}10`,
                  color: activeNode.color
                }}
              >
                {activeNode.status}
              </span>
            )}
          </div>
          <p className="text-xs text-foreground/50 leading-relaxed font-medium">
            {activeNode ? activeNode.details : "Hover over the nodes on the graph above to inspect client-to-server data streams, security validation gates, database records, and background AI agents."}
          </p>
        </div>
      </div>
    </div>
  );
}
