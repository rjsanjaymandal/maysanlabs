"use client";

import dynamic from "next/dynamic";

const loadingSkeleton = () => <div className="min-h-[200px] animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5" />;

export const ArchitectureVisualizer = dynamic(() => import("@/components/ArchitectureVisualizer"), { ssr: false, loading: loadingSkeleton });
export const BrandShowroom = dynamic(() => import("@/components/BrandShowroom"), { ssr: false, loading: loadingSkeleton });
export const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false, loading: loadingSkeleton });
export const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false, loading: loadingSkeleton });
export const ScrollTimeline = dynamic(() => import("@/components/ScrollTimeline"), { ssr: false, loading: loadingSkeleton });
export const ROICalculator = dynamic(() => import("@/components/ROICalculator"), { ssr: false, loading: loadingSkeleton });
export const Services = dynamic(() => import("@/components/Services"), { ssr: false, loading: loadingSkeleton });
export const ContactFooter = dynamic(() => import("@/components/ContactFooter"), { ssr: false, loading: loadingSkeleton });
export const MultiStepForm = dynamic(() => import("@/components/MultiStepForm"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5" />
});
