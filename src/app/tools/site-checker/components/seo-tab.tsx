"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { ActionItemCard, CrawlerRadar, GoogleSearchPreview, HeadingsHierarchyMap, SchemaMarkupGraph } from ".";
import type { SeoAuditResult } from "@/app/actions/analyzeSitemap";

export function SeoTabError({ error }: { error: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-foreground">SEO Audit Unavailable</h3>
            <p className="text-sm text-foreground/60 mt-1">{error}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SeoTabContent({ seoResults }: { seoResults: SeoAuditResult }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 text-left">
      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-foreground mb-1">Indexation & Core Tag Analysis</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-foreground/45">Sitemap endpoint audit sample</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${seoResults.sitemapFetched ? "bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981]" : "bg-amber-400/10 border-amber-400/20 text-amber-400"}`}>
                {seoResults.sitemapFetched ? "Sitemap Exposed" : "Missing Sitemap"}
              </span>
            </div>
          </div>
          <span className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${seoResults.indexability === "healthy" ? "bg-[#10b981]/5 border-[#10b981]/20 text-[#10b981]" : "bg-amber-400/5 border-amber-400/20 text-amber-400"}`}>
            {seoResults.indexability === "healthy" ? "CRAWL HEALTHY" : "NEEDS ACTION"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <MiniStat label="Sitemap Score" value={`${seoResults.seoScore}`} suffix="/100" highlighted />
          <MiniStat label="Audited Pages" value={seoResults.totalUrls.toString()} mono />
          <MiniStat label="Missing Meta" value={seoResults.missingMeta.toString()} warn={seoResults.missingMeta > 0} />
          <MiniStat label="Broken Links" value={seoResults.brokenLinks.toString()} warn={seoResults.brokenLinks > 0} danger />
          <MiniStat label="Missing Schema" value={seoResults.missingSchemas.toString()} warn={seoResults.missingSchemas > 0} />
          <MiniStat label="Avg Page Weight" value={seoResults.urlsList.length > 0 ? Math.round(seoResults.totalPageSize / seoResults.urlsList.length).toString() : "0"} suffix="KB" mono />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MiniCheck label="Canonical" ok={seoResults.missingCanonical === 0} detail={seoResults.missingCanonical > 0 ? `${seoResults.missingCanonical} Missing` : "Verified"} />
          <MiniCheck label="OpenGraph Tags" ok={seoResults.missingOgTags === 0} detail={seoResults.missingOgTags > 0 ? `${seoResults.missingOgTags} Incomplete` : "Healthy"} />
          <MiniCheck label="Twitter Cards" ok={seoResults.missingTwitterCard === 0} detail={seoResults.missingTwitterCard > 0 ? "Missing" : "Verified"} />
          <MiniCheck label="Missing Alt Text" ok={seoResults.totalAltMissing === 0} detail={seoResults.totalAltMissing > 0 ? `${seoResults.totalAltMissing} Elements` : "All Present"} />
        </div>
      </div>

      <CrawlerRadar
        hasViewport={!seoResults.urlsList.some(p => !p.hasViewport)}
        hasHtmlLang={!seoResults.urlsList.some(p => !p.hasHtmlLang)}
        https={!seoResults.urlsList.some(p => !p.https)}
        isNoindex={seoResults.noindexPages > 0}
      />

      <HeadingsHierarchyMap
        h1Count={seoResults.urlsList[0]?.h1Count ?? 1}
        h2Count={seoResults.urlsList[0]?.h2Count ?? 3}
        title={seoResults.urlsList[0]?.title ?? ""}
      />

      <SchemaMarkupGraph hasSchema={!seoResults.urlsList.some(p => !p.hasSchema)} />

      <GoogleSearchPreview
        url={seoResults.url}
        title={seoResults.urlsList[0]?.title ?? ""}
        description={seoResults.urlsList[0]?.description ?? ""}
      />

      {seoResults.urlsList.length > 0 && (
        <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8 overflow-hidden">
          <div className="mb-4">
            <h2 className="text-base font-bold text-foreground">Sitemap URL Audit Sample</h2>
            <p className="text-xs text-foreground/45">Detailed parameter checklist on crawled sitemap routes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] text-foreground/40 font-mono text-[9px] uppercase tracking-wider">
                  <th className="py-3 pr-4 font-bold">Audited Endpoint</th>
                  <th className="py-3 px-3 text-center font-bold">Score</th>
                  <th className="py-3 px-3 text-center font-bold">Status</th>
                  <th className="py-3 px-3 text-center font-bold">Title</th>
                  <th className="py-3 px-3 text-center font-bold">Meta Description</th>
                  <th className="py-3 px-3 text-center font-bold">Headings</th>
                  <th className="py-3 pl-3 text-center font-bold">Schema</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px] text-foreground/80">
                {seoResults.urlsList.map((page, index) => {
                  let displayPath = page.url;
                  try { const parsed = new URL(page.url); displayPath = parsed.pathname === "/" ? "/" : parsed.pathname; } catch { }
                  const checks = [!!page.title, !!page.description, page.h1Count === 1, page.status === 200, page.hasSchema];
                  const passed = checks.filter(Boolean).length;
                  const pageScore = Math.round((passed / checks.length) * 100);
                  return (
                    <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3.5 pr-4 truncate max-w-[200px] text-foreground/90 font-medium" title={page.url}>{displayPath}</td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold ${pageScore >= 80 ? "bg-[#10b981]/10 text-[#10b981]" : pageScore >= 50 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400"}`}>{pageScore}</span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${page.status === 200 ? "bg-[#10b981]/15 text-[#10b981]" : "bg-red-500/15 text-red-400"}`}>{page.status}</span>
                      </td>
                      <td className="py-3.5 px-3 text-center">{page.title ? <CheckCircle size={13} className="text-[#10b981] mx-auto" /> : <XCircle size={13} className="text-red-400 mx-auto" />}</td>
                      <td className="py-3.5 px-3 text-center">{page.description ? <CheckCircle size={13} className="text-[#10b981] mx-auto" /> : <XCircle size={13} className="text-amber-400 mx-auto" />}</td>
                      <td className="py-3.5 px-3 text-center text-foreground/45 text-[10px]">H1:{page.h1Count} / H2:{page.h2Count}</td>
                      <td className="py-3.5 pl-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] ${page.hasSchema ? "bg-[#14b8a6]/15 text-[#14b8a6]" : "bg-white/[0.03] text-foreground/35 border border-white/5"}`}>{page.hasSchema ? "JSON-LD" : "None"}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white/[0.03] border-white/[0.08] rounded-3xl p-6 md:p-8">
        <div className="mb-4">
          <h2 className="text-base font-bold text-foreground">Sitemap Action Recommendations</h2>
          <p className="text-xs text-foreground/45">Inject these semantic and indexation fixes to solidify SEO health</p>
        </div>
        <div className="space-y-3">
          {seoResults.suggestions.map((s, idx) => (
            <ActionItemCard key={idx} suggestion={s} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({ label, value, suffix, mono, highlighted, warn, danger }: {
  label: string; value: string; suffix?: string; mono?: boolean; highlighted?: boolean; warn?: boolean; danger?: boolean;
}) {
  const color = danger && warn ? "text-red-400" : warn ? "text-amber-400" : highlighted ? "text-brand-primary" : "";
  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
      <span className="text-[10px] text-foreground/45 font-semibold block mb-1">{label}</span>
      <p className={`text-xl font-bold ${color} ${mono ? "font-mono" : ""}`}>
        {value}<span className="text-xs text-foreground/40 font-normal">{suffix}</span>
      </p>
    </div>
  );
}

function MiniCheck({ label, ok, detail }: { label: string; ok: boolean; detail: string }) {
  return (
    <div className="bg-white/[0.02] border-white/[0.06] rounded-xl p-3 flex justify-between items-center">
      <span className="text-[10px] text-foreground/45 uppercase tracking-wider font-medium">{label}</span>
      <span className={`text-[10px] font-bold font-mono ${ok ? "text-[#10b981]" : "text-amber-400"}`}>{detail}</span>
    </div>
  );
}
