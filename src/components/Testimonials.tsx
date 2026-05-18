"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/[0.01] border border-white/[0.05] rounded-2xl p-5 hover:border-brand-primary/30 hover:bg-brand-primary/[0.01] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/5 overflow-hidden group"
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
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center font-medium text-brand-primary text-sm font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">{testimonial.name}</p>
                      <p className="text-white/40 text-[10px]">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 font-extrabold text-base drop-shadow-[0_0_10px_rgba(59,130,246,0.15)]">{testimonial.metric}</p>
                    <p className="text-white/35 text-[9px] uppercase tracking-wider font-semibold">{testimonial.metricLabel}</p>
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
