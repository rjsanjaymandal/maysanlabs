"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Vikram Singh",
    role: "Founder, Maysan Shop (Client)",
    message: "Maysan Labs built our entire e-commerce platform from scratch. The inventory management, order processing, and payment integration work flawlessly. Our sales increased 300% in the first quarter.",
    metric: "300%",
    metricLabel: "Sales increase",
  },
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
    <section className="py-16 md:py-20 relative bg-black/10">
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
            className="heading-md text-white"
          >
            What clients say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-brand-primary/20 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 text-brand-primary/[0.1]">
                <Quote size={24} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-0.5 mb-3.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="text-brand-primary fill-brand-primary" />
                  ))}
                </div>
                
                <p className="text-white/60 text-sm mb-4.5 leading-relaxed">
                  &ldquo;{testimonial.message}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center font-medium text-brand-primary text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{testimonial.name}</p>
                      <p className="text-white/40 text-[10px]">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-brand-primary font-medium text-base">{testimonial.metric}</p>
                    <p className="text-white/35 text-[10px]">{testimonial.metricLabel}</p>
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
