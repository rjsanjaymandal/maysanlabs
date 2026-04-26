"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechRetail India",
    message: "Maysan Labs fixed our website speed and made it much more reliable. We couldn't be happier with the results. Truly essential partners.",
  },
  {
    name: "Priya Mehta",
    role: "Founder, StyleHub",
    message: "They built a system that is fast, easy to use, and ready for our future growth. A truly professional team that delivers on time.",
  },
  {
    name: "Ankit Gupta",
    role: "Director, CloudFirst Solutions",
    message: "Our team loves the new tools Maysan Labs built for us. Everything works perfectly and the transition was incredibly smooth.",
  },
];

export default function Testimonials() {
  return (
    <section className="sec-xl container-main">
      <div className="text-center mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="label-mono mb-8 inline-flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
          Testimonials
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase"
        >
          What <span className="text-brand-primary italic">people say.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="maysan-card flex flex-col justify-between !p-12 hover:bg-white/[0.04] transition-all duration-700"
          >
            <div>
               <div className="flex gap-2 mb-12">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                  ))}
               </div>
                <p className="text-xl text-white/40 mb-16 leading-relaxed font-medium italic group-hover:text-white/80 transition-colors duration-700">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
            </div>
            
            <div className="flex items-center gap-6 pt-12 border-t border-white/5">
              <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center font-black text-brand-primary shadow-2xl group-hover:bg-brand-primary group-hover:text-black transition-all duration-700">
                 {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-white text-lg tracking-tighter uppercase">{testimonial.name}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
