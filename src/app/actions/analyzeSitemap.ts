"use server";

import { analyzeSitemap as analyzeSitemapImpl } from "@/services/seo-audit/orchestrator";
import type { SeoAuditResult } from "@/services/seo-audit/types";

export async function analyzeSitemap(sitemapUrl: string): Promise<SeoAuditResult> {
  return analyzeSitemapImpl(sitemapUrl);
}

export type {
  CheckedPage,
  IndiaTelemetry,
  SslCertInfo,
  SecurityAudit,
  SeoAuditResult,
} from "@/services/seo-audit/types";
