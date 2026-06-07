"use client";

import { CreditCard, Lock, MapPin, Server, Zap } from "lucide-react";
import type { IndiaTelemetry } from "@/app/actions/analyzeSitemap";

export function IndianMarketTelemetryHub({ telemetry }: { telemetry: IndiaTelemetry }) {
  const cdnColor = telemetry.isCdn ? "text-[#10b981]" : "text-amber-400";
  const latencyColor = telemetry.latencyMs <= 40 ? "text-[#10b981]" : telemetry.latencyMs <= 100 ? "text-[#14b8a6]" : "text-red-400";

  return (
    <div className="space-y-6 text-left">
      <div className="bg-slate-950/60 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#1A6DD6]/5 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4 flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <MapPin size={16} className="text-[#1A6DD6]" />
              Indian Edge DNS & CDN Telemetry
            </h3>
            <p className="text-xs text-foreground/45 font-light">Resolving server node origins and calculations of packet travel to Indian hubs</p>
          </div>
          <span className={`px-3 py-0.5 border text-[10px] font-bold font-mono rounded-full ${latencyColor}`}>
            {telemetry.latencyMs <= 50 ? "LATENCY HEALTHY" : "LATENCY CONGESTED"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">Resolved IP</span>
                <p className="text-xs font-bold font-mono text-foreground mt-0.5">{telemetry.ipAddress}</p>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl">
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">Server Region</span>
                <p className="text-xs font-bold text-foreground mt-0.5 truncate">{telemetry.serverCity}, {telemetry.serverCountry}</p>
              </div>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] text-foreground/35 uppercase font-bold tracking-wider block">CDN Proxy Status</span>
                <p className="text-xs font-bold text-foreground mt-0.5">{telemetry.isCdn ? `Active - via ${telemetry.cdnName}` : "Direct Hosting (No CDN Proxy)"}</p>
              </div>
              <span className={`text-xs font-black ${cdnColor}`}>{telemetry.isCdn ? "100%" : "0%"}</span>
            </div>

            <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Estimated Hub Latency (India)</span>
                <span className={`text-xl font-mono font-black ${latencyColor}`}>{telemetry.latencyMs}ms</span>
              </div>
              <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden mt-2.5">
                <div className={`h-full rounded-full ${telemetry.latencyMs <= 40 ? "bg-[#10b981]" : telemetry.latencyMs <= 100 ? "bg-[#14b8a6]" : "bg-red-400"}`}
                  style={{ width: `${Math.min(100, Math.max(10, 100 - (telemetry.latencyMs / 300) * 100))}%` }} />
              </div>
            </div>
          </div>

          <div className="md:col-span-6 bg-black/40 border border-white/[0.03] rounded-xl p-5 relative overflow-hidden flex flex-col justify-center min-h-[180px]">
            <span className="text-[8px] text-foreground/30 font-mono absolute top-2 right-3">traceroute-telemetry.bin</span>
            <div className="flex flex-col gap-6 justify-between h-full py-2">
              <div className="flex items-center gap-3 relative z-10 text-left">
                <div className="w-7 h-7 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-foreground font-mono flex items-center gap-1.5">
                    Indian User Edge
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                  </h4>
                  <p className="text-[8px] text-foreground/45 mt-0.5">Mumbai, New Delhi, Bengaluru POPs</p>
                </div>
              </div>

              <div className="relative pl-3.5 my-1 text-left">
                <div className="absolute left-[13px] top-[-10px] bottom-[-10px] w-0.5 h-auto pointer-events-none">
                  <svg className="h-12 w-4 overflow-visible">
                    <path d="M 0,0 L 0,48" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M 0,0 L 0,48" stroke="#00d2ff" strokeWidth="2" strokeDasharray="6 30" strokeDashoffset="0">
                      <animate attributeName="strokeDashoffset" values="36;0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                  </svg>
                </div>
                <span className="text-[8px] font-mono text-foreground/25 uppercase pl-4">Network Hops: {telemetry.isCdn ? "1 Hop (CDN Cached)" : "Multi-Hop Routing"}</span>
              </div>

              <div className="flex items-center gap-3 relative z-10 text-left">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${telemetry.isCdn ? "bg-[#1A6DD6]/10 border border-[#1A6DD6]/30 text-[#1A6DD6] shadow-[0_0_15px_rgba(26,109,214,0.15)]" : "bg-white/[0.02] border border-white/10 text-foreground/40"}`}>
                  {telemetry.isCdn ? <Zap size={11} className="animate-pulse" /> : <Server size={11} />}
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-foreground font-mono">{telemetry.isCdn ? `${telemetry.cdnName} Local Gateway` : "Origin Server Host"}</h4>
                  <p className="text-[8px] text-foreground/45 mt-0.5 truncate max-w-[240px]">{telemetry.serverCity}, {telemetry.serverCountry} ({telemetry.serverIsp})</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950/60 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#14b8a6]/5 blur-2xl rounded-full pointer-events-none" />
          <div>
            <div className="flex items-start justify-between border-b border-white/5 pb-3.5 mb-4">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <CreditCard size={14} className="text-[#14b8a6]" />
                  UPI & Payments Integration
                </h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Auditing pathways for UPI and top Indian checkout hubs</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${telemetry.upiIntegrated ? "bg-[#10b981]/10 text-[#10b981]" : "bg-red-400/10 text-red-400"}`}>
                {telemetry.upiIntegrated ? "READY" : "WARNING"}
              </span>
            </div>
            {telemetry.upiIntegrated ? (
              <div className="space-y-2">
                <p className="text-xs text-foreground/80 leading-relaxed font-light">Excellent! We detected gateway SDKs or direct UPI linkages. Over 80% of digital transactions in India utilize UPI networks.</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {telemetry.upiGateways.map((gt, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#14b8a6]/10 border border-[#14b8a6]/25 text-[#14b8a6] text-[8px] font-mono font-bold">{gt}</span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-foreground/50 leading-relaxed font-light">We could not locate any Indian payment gateway SDKs (Razorpay, Paytm, PhonePe) or direct UPI tags on your page.</p>
                <div className="p-2.5 bg-red-400/5 border border-red-400/10 rounded-lg text-[9px] text-red-400/70 font-sans leading-relaxed">Add an Indian gateway to capture UPI checkout conversion volumes.</div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-950/60 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 blur-2xl rounded-full pointer-events-none" />
          <div>
            <div className="flex items-start justify-between border-b border-white/5 pb-3.5 mb-4">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Lock size={14} className="text-amber-400" />
                  DPDP Act Compliance (2023)
                </h4>
                <p className="text-[10px] text-foreground/45 mt-0.5">Assessing data protection and cookie consents</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${telemetry.dpdpCompliant ? "bg-[#10b981]/10 text-[#10b981]" : "bg-amber-400/10 text-amber-400"}`}>
                {telemetry.dpdpCompliant ? "COMPLIANT" : "ACTION REQUIRED"}
              </span>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Privacy Policy</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpPrivacy ? "text-[#10b981]" : "text-amber-400"}`}>{telemetry.dpdpPrivacy ? "VERIFIED" : "MISSING"}</span>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Cookie Consent</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpCookie ? "text-[#10b981]" : "text-amber-400"}`}>{telemetry.dpdpCookie ? "ACTIVE" : "WARNING"}</span>
                </div>
                <div className="p-2 bg-white/[0.01] border border-white/[0.04] rounded-lg text-center">
                  <span className="text-[7px] text-foreground/35 font-mono uppercase block">Act Reference</span>
                  <span className={`text-[9px] font-bold ${telemetry.dpdpReference ? "text-[#10b981]" : "text-foreground/25"}`}>{telemetry.dpdpReference ? "FOUND" : "NONE"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
