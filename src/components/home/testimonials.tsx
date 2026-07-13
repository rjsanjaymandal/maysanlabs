"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const testimonials = [
  {
    name: "Vikram Singh",
    role: "Founder, Maysan Shop",
    message: "Maysan Labs built our entire custom ERP and inventory system from scratch. The regional warehousing, automated order workflows, and UPI payment integrations work flawlessly. Our order fulfillment efficiency jumped dramatically.",
    metric: "300%",
    metricLabel: "Efficiency gain",
  },
  {
    name: "Rahul Sharma",
    role: "CEO, TechRetail India",
    message: "Maysan Labs delivered an ultra-scalable cloud database that handled our Diwali festive sale traffic without a single hiccup. Their engineering quality is truly world-class.",
    metric: "3x faster",
    metricLabel: "Page load time",
  },
  {
    name: "Priya Mehta",
    role: "Founder, StyleHub",
    message: "They engineered a robust system that scaled from 10,000 to 5 Lakh active users seamlessly. True partners in our growth journey.",
    metric: "5 Lakhs",
    metricLabel: "Active users",
  },
  {
    name: "Suraj Devadiga",
    role: "Founder, Flash Fashion",
    message: "Maysan Labs engineered a world-class, ultra-fast e-commerce platform for our clothing brand. Surili from their team spearheaded our digital marketing campaigns, driving massive brand adoption across India.",
    metric: "₹1.5 Cr+",
    metricLabel: "First-Month Sales",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-16 md:py-20 relative bg-[var(--sec-bg-alt)]">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium">
              <Star size={12} />
              Testimonials
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-foreground"
          >
            What clients say
          </motion.h2>
        </div>

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-10 shadow-lg"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-brand-primary fill-brand-primary" />
                  ))}
                </div>

                <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                  &ldquo;{t.message}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-[var(--border-subtle)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center font-bold text-brand-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{t.name}</p>
                      <p className="text-foreground/50 text-xs">{t.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 font-extrabold text-lg drop-shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                      {t.metric}
                    </p>
                    <p className="text-foreground/35 text-xs uppercase tracking-wider font-semibold">
                      {t.metricLabel}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-white/20 hover:bg-white/[0.06] transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-brand-primary"
                      : "w-1.5 bg-white/[0.12] hover:bg-white/[0.2]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-white/20 hover:bg-white/[0.06] transition-all"
            >
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
              className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-foreground/30 hover:text-foreground hover:border-white/20 transition-all ml-2"
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
