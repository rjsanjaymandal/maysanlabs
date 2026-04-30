"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechRetail",
    message: "Maysan Labs fixed our website speed and made it much more reliable. Truly essential partners.",
  },
  {
    name: "Priya Mehta",
    role: "Founder, StyleHub",
    message: "They built a system that is fast, easy to use, and ready for our future growth. Professional team.",
  },
  {
    name: "Ankit Gupta",
    role: "Director, CloudFirst",
    message: "Our team loves the new tools Maysan Labs built for us. Everything works perfectly and smooth.",
  },
];

export default function Testimonials() {
  return (
    <section className="sec-xl container-main relative">
      <div className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-mono mb-8 inline-flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
          Voices
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="heading-lg sm:heading-xl text-silver-gradient"
        >
          What clients <br />
          <span className="text-brand-gradient italic">say.</span>
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="maysan-card flex flex-col justify-between group"
          >
            <div>
               <div className="flex gap-1 mb-12">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-brand-primary" />
                  ))}
               </div>
                <p className="text-xl md:text-2xl text-white/30 mb-20 leading-tight font-medium uppercase tracking-tighter group-hover:text-white transition-colors duration-700">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
            </div>
            
            <div className="flex items-center gap-6 pt-12 border-t border-white/5">
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center font-black text-brand-primary shadow-2xl group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 uppercase">
                 {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-white text-lg tracking-tighter uppercase italic">{testimonial.name}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
