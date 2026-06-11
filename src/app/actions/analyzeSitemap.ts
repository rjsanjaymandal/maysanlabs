"use server";

import { analyzeSitemap as analyzeSitemapImpl } from "@/lib/seo-audit/orchestrator";
import type { SeoAuditResult } from "@/lib/seo-audit/types";

export async function analyzeSitemap(sitemapUrl: string): Promise<SeoAuditResult> {
  return analyzeSitemapImpl(sitemapUrl);
}

export type {
  CheckedPage,
  IndiaTelemetry,
  SslCertInfo,
  SecurityAudit,
  SeoAuditResult,
} from "@/lib/seo-audit/types";
