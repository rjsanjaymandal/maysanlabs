"use client";

import dynamic from "next/dynamic";

const loadingSkeleton = () => <div className="min-h-[200px] animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5" />;

export const ArchitectureVisualizer = dynamic(() => import("@/components/visuals/architecture-visualizer"), { ssr: false, loading: loadingSkeleton });
export const BrandShowroom = dynamic(() => import("@/components/home/brand-showroom"), { ssr: false, loading: loadingSkeleton });
export const FAQ = dynamic(() => import("@/components/home/faq"), { ssr: false, loading: loadingSkeleton });
export const Testimonials = dynamic(() => import("@/components/home/testimonials"), { ssr: false, loading: loadingSkeleton });
export const ScrollTimeline = dynamic(() => import("@/components/effects/scroll-timeline"), { ssr: false, loading: loadingSkeleton });
export const ROICalculator = dynamic(() => import("@/components/interactive/roi-calculator"), { ssr: false, loading: loadingSkeleton });
export const Services = dynamic(() => import("@/components/marketing/services"), { ssr: false, loading: loadingSkeleton });
export const ContactFooter = dynamic(() => import("@/components/layout/footer"), { ssr: false, loading: loadingSkeleton });
export const MultiStepForm = dynamic(() => import("@/components/interactive/multi-step-form"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5" />
});
