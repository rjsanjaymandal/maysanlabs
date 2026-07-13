export interface Metric {
  value: number | null;
  grade: "good" | "needs-work" | "poor" | null;
}

export interface WebVitalResult {
  url: string;
  strategy: string;
  lcp: Metric;
  inp: Metric;
  cls: Metric;
  ttfb: Metric;
  fcp: Metric;
  tbt: Metric;
  si: Metric;
  mobile: number;
  seo: number;
  performance: number;
  accessibility: number | null;
  bestPractices: number | null;
  suggestions: string[];
}
