"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechRetail India",
    message: "Maysan Labs transformed our online infrastructure. Architecture stability increased significantly while latency dropped by 60%. Essential engineering partners.",
  },
  {
    name: "Priya Mehta",
    role: "Founder, StyleHub",
    message: "They delivered exact technical specifications with zero debt. Fast, professional, and the modular system they built is ready for another decade of growth.",
  },
  {
    name: "Ankit Gupta",
    role: "Director, CloudFirst Solutions",
    message: "Our custom internal tools work perfectly. The move to a mission-critical microservices mesh was seamless. Highly recommended for enterprise projects.",
  },
];

export default function Testimonials() {
  return (
    <section className="sec-xl container-main">
      <div className="text-center mb-20">
        <span className="announcement-bar">System Validation</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
          Client <span className="text-brand-primary italic">Benchmarks.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="maysan-card flex flex-col justify-between"
          >
            <div>
               <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-brand-primary text-brand-primary" />
                  ))}
               </div>
               <Quote size={32} className="text-brand-primary/20 mb-6" />
                <p className="text-white/85 mb-10 leading-relaxed font-medium">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center font-bold text-brand-primary">
                 {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-tighter">{testimonial.name}</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/60">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
