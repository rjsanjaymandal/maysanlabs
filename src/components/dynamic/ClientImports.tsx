"use client";

import dynamic from "next/dynamic";

export const ArchitectureVisualizer = dynamic(() => import("@/components/ArchitectureVisualizer"), { ssr: false });
export const BrandShowroom = dynamic(() => import("@/components/BrandShowroom"), { ssr: false });
export const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });
export const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false });
export const ScrollTimeline = dynamic(() => import("@/components/ScrollTimeline"), { ssr: false });
export const ROICalculator = dynamic(() => import("@/components/ROICalculator"), { ssr: false });
export const Services = dynamic(() => import("@/components/Services"), { ssr: false });
export const ContactFooter = dynamic(() => import("@/components/ContactFooter"), { ssr: false });
export const MultiStepForm = dynamic(() => import("@/components/MultiStepForm"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] animate-pulse bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5" />
});
