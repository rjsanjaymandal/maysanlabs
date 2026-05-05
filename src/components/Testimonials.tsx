"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechRetail",
    message: "Maysan Labs delivered a scalable architecture that handled our Black Friday traffic without issues. Their code quality is exceptional.",
    metric: "3x faster",
    metricLabel: "Page load time",
  },
  {
    name: "Priya Mehta",
    role: "Founder, StyleHub",
    message: "They built a platform that scaled from 10K to 500K users seamlessly. True partners in our growth journey.",
    metric: "500K",
    metricLabel: "Active users",
  },
  {
    name: "Ankit Gupta",
    role: "CTO, CloudFirst",
    message: "The enterprise features they implemented helped us close deals with Fortune 500 companies. Outstanding technical depth.",
    metric: "$2M",
    metricLabel: "New revenue",
  },
];

export default function Testimonials() {
  return (
    <section className="sec-xl relative bg-black/20">
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
              <Star size={12} />
              Testimonials
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-white"
          >
            What our clients say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all duration-300"
            >
              <div className="absolute top-5 right-5 text-white/10">
                <Quote size={28} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-brand-primary fill-brand-primary" />
                  ))}
                </div>
                
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center font-semibold text-white/70 text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{testimonial.name}</p>
                      <p className="text-white/35 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-brand-primary font-semibold text-lg">{testimonial.metric}</p>
                    <p className="text-white/30 text-xs">{testimonial.metricLabel}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
