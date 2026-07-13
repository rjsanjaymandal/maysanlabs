export interface CheckedPage {
  url: string;
  status: number;
  title: string;
  description: string;
  h1Count: number;
  h2Count: number;
  hasSchema: boolean;
  hasCanonical: boolean;
  canonical: string;
  isNoindex: boolean;
  hasOgTitle: boolean;
  hasOgDesc: boolean;
  hasOgImage: boolean;
  hasTwitterCard: boolean;
  hasViewport: boolean;
  hasHtmlLang: boolean;
  missingAltCount: number;
  wordCount: number;
  pageSize: number;
  https: boolean;
  hasHsts: boolean;
  hstsMaxAge: number | null;
  hasCsp: boolean;
  hasXFrameOptions: boolean;
  xFrameOptionsValue: string | null;
  hasXContentTypeOptions: boolean;
  hasReferrerPolicy: boolean;
  hasPermissionsPolicy: boolean;
  mixedContentCount: number;
  formCount: number;
  insecureFormCount: number;
}

export interface IndiaTelemetry {
  ipAddress: string;
  serverCountry: string;
  serverCity: string;
  serverIsp: string;
  isCdn: boolean;
  cdnName: string;
  latencyMs: number;
  upiIntegrated: boolean;
  upiGateways: string[];
  dpdpCompliant: boolean;
  dpdpPrivacy: boolean;
  dpdpCookie: boolean;
  dpdpReference: boolean;
}

export interface SslCertInfo {
  valid: boolean;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  tlsVersion: string;
}

export interface SecurityAudit {
  score: number;
  grade: "good" | "needs-work" | "poor";
  httpsAllPages: boolean;
  missingHeaders: string[];
  mixedContentCount: number;
  insecureFormCount: number;
  sslCert: SslCertInfo | null;
  suggestions: string[];
}

export interface SeoAuditResult {
  url: string;
  totalUrls: number;
  seoScore: number;
  indexability: "healthy" | "action-required" | "poor";
  missingMeta: number;
  brokenLinks: number;
  missingSchemas: number;
  noindexPages: number;
  missingCanonical: number;
  canonicalMismatch: number;
  missingOgTags: number;
  missingTwitterCard: number;
  missingViewport: number;
  missingHtmlLang: number;
  totalAltMissing: number;
  totalWordCount: number;
  totalPageSize: number;
  suggestions: string[];
  sitemapFetched: boolean;
  urlsList: CheckedPage[];
  indiaTelemetry?: IndiaTelemetry;
  security: SecurityAudit;
}
