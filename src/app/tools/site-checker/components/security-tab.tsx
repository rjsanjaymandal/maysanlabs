"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, AlertTriangle, ExternalLink, Award } from "lucide-react";
import type { SecurityAudit } from "@/app/actions/analyzeSitemap";
import { ActionItemCard } from "./action-item-card";

interface SecurityTabProps {
  security: SecurityAudit;
}

export function SecurityTab({ security }: SecurityTabProps) {
  const gradeColor = security.grade === "good" ? "text-[#10b981]" : security.grade === "needs-work" ? "text-amber-400" : "text-red-400";
  const gradeBg = security.grade === "good" ? "bg-[#10b981]/10 border-[#10b981]/20" : security.grade === "needs-work" ? "bg-amber-400/10 border-amber-400/20" : "bg-red-400/10 border-red-400/20";

  const headers = [
    { key: "Strict-Transport-Security", label: "HSTS", passed: !security.missingHeaders.includes("Strict-Transport-Security") },
    { key: "Content-Security-Policy", label: "CSP", passed: !security.missingHeaders.includes("Content-Security-Policy") },
    { key: "X-Frame-Options", label: "Clickjacking Protection", passed: !security.missingHeaders.includes("X-Frame-Options") },
    { key: "X-Content-Type-Options", label: "MIME Sniff Protection", passed: !security.missingHeaders.includes("X-Content-Type-Options") },
    { key: "Referrer-Policy", label: "Referrer Policy", passed: !security.missingHeaders.includes("Referrer-Policy") },
    { key: "Permissions-Policy", label: "Permissions Policy", passed: !security.missingHeaders.includes("Permissions-Policy") },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground mb-1">Website Security Audit</h2>
            <p className="text-xs text-foreground/45">HTTP security headers, mixed content, and SSL/TLS analysis</p>
          </div>
          <span className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${gradeBg} ${gradeColor}`}>
            {security.grade === "good" ? "SECURE" : security.grade === "needs-work" ? "NEEDS WORK" : "INSECURE"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
            <Shield size={16} className="mx-auto mb-1.5 text-[#1A6DD6]" />
            <span className="text-[10px] text-[#1A6DD6] font-bold uppercase tracking-wider block mb-1">Security Score</span>
            <p className="text-xl font-black text-foreground">{security.score}<span className="text-xs text-foreground/40 font-normal">/100</span></p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
            <Award size={16} className="mx-auto mb-1.5 text-[#10b981]" />
            <span className="text-[10px] text-[#10b981] font-bold uppercase tracking-wider block mb-1">HTTPS Pages</span>
            <p className={`text-xl font-bold font-mono ${security.httpsAllPages ? "text-[#10b981]" : "text-amber-400"}`}>
              {security.httpsAllPages ? "All" : "Partial"}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
            <AlertTriangle size={16} className="mx-auto mb-1.5 text-amber-400" />
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">Missing Headers</span>
            <p className={`text-xl font-bold font-mono ${security.missingHeaders.length > 0 ? "text-amber-400" : "text-[#10b981]"}`}>
              {security.missingHeaders.length > 0 ? security.missingHeaders.length : 0}
            </p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
            <ExternalLink size={16} className="mx-auto mb-1.5 text-[#14b8a6]" />
            <span className="text-[10px] text-[#14b8a6] font-bold uppercase tracking-wider block mb-1">Mixed Content</span>
            <p className={`text-xl font-bold font-mono ${security.mixedContentCount > 0 ? "text-red-400" : "text-[#10b981]"}`}>
              {security.mixedContentCount > 0 ? security.mixedContentCount : 0}
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-3">Security Headers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {headers.map((h) => (
              <div key={h.key} className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs ${h.passed ? "bg-[#10b981]/5 border-[#10b981]/15" : "bg-amber-400/5 border-amber-400/15"}`}>
                <span className="font-medium text-foreground/80">{h.label}</span>
                <span className={`flex items-center gap-1 text-[10px] font-bold ${h.passed ? "text-[#10b981]" : "text-amber-400"}`}>
                  {h.passed ? <><CheckCircle size={10} /> Present</> : <><XCircle size={10} /> Missing</>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {security.sslCert && (
          <div className="border-t border-white/5 pt-4 mb-4">
            <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-wider mb-3">SSL / TLS Certificate</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Issuer</span>
                <p className="text-xs font-mono text-foreground/80 truncate" title={security.sslCert.issuer}>{security.sslCert.issuer}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Subject</span>
                <p className="text-xs font-mono text-foreground/80 truncate" title={security.sslCert.subject}>{security.sslCert.subject}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <span className="text-[10px] text-foreground/45 font-semibold block mb-1">TLS Version</span>
                <p className="text-xs font-mono text-foreground/80">{security.sslCert.tlsVersion}</p>
              </div>
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3">
                <span className="text-[10px] text-foreground/45 font-semibold block mb-1">Expires In</span>
                <p className={`text-xs font-mono ${security.sslCert.daysRemaining > 30 ? "text-[#10b981]" : security.sslCert.daysRemaining > 0 ? "text-amber-400" : "text-red-400"}`}>
                  {security.sslCert.valid ? `${security.sslCert.daysRemaining} days (${security.sslCert.validTo})` : "Expired"}
                </p>
              </div>
            </div>
          </div>
        )}

        {security.insecureFormCount > 0 && (
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-center gap-2 text-xs text-red-400">
              <AlertTriangle size={12} />
              <span className="font-semibold">{security.insecureFormCount} form(s) submit over HTTP instead of HTTPS</span>
            </div>
          </div>
        )}
      </div>

      {security.suggestions.length > 0 && (
        <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
          <div className="mb-4">
            <h3 className="text-base font-bold text-foreground">Security Recommendations</h3>
            <p className="text-xs text-foreground/45">Resolve these issues to improve your website security posture</p>
          </div>
          <div className="space-y-3">
            {security.suggestions.map((s, i) => (
              <ActionItemCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
