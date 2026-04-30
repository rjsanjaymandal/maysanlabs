"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function ContactFooter() {
  const links = [
    { name: "Services", href: "/services" },
    { name: "Engineering", href: "/engineering" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <footer className="bg-[var(--bg-dark)] border-t border-white/5">
      {/* Main CTA Section */}
      <section className="sec-xl overflow-hidden relative">
        <div className="container-main text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-mono mb-12 block">Final thought</span>
            <h2 className="heading-xl text-white mb-16 italic">
              Ready to <br /><span className="text-brand-primary">Build?</span>
            </h2>
            <p className="text-body-dim mb-20 max-w-2xl mx-auto font-medium text-xl md:text-3xl leading-tight tracking-tighter uppercase">
              Join leading businesses engineering their future <br className="hidden md:block" /> 
              with Maysan Labs quality standards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <Link href="/init" className="group relative px-12 py-5 bg-brand-primary rounded-full overflow-hidden transition-all duration-700 hover:shadow-[0_0_50px_rgba(163,230,53,0.4)]">
                <span className="relative z-10 text-xs font-black uppercase tracking-widest text-black flex items-center gap-3">
                  Start Project
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </Link>
              
              <Link href="mailto:business@maysanlabs.com" className="text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-500 flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-2xl border border-white/5 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all duration-700">
                   <Mail size={16} className="group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 Direct Email
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-32 border-t border-white/5 bg-black/20">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 lg:gap-40">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10 overflow-hidden ring-1 ring-white/10 bg-black/40 backdrop-blur-md group-hover:ring-brand-primary/50 transition-all duration-700">
                   <Image src="/logo.png" alt="Maysan Labs Logo" width={48} height={48} className="object-cover scale-110" />
                </div>
                <span className="font-black text-white text-3xl tracking-tighter uppercase italic">Maysan Labs</span>
              </Link>
              <p className="text-body-dim text-xl leading-tight max-w-sm font-medium tracking-tighter uppercase">
                Software engineering for companies that value speed, quality, and results.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="label-mono !text-[10px] !mb-12">Narrative</h4>
              <div className="flex flex-col gap-6">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-ghost hover:text-brand-primary text-xs font-black uppercase tracking-widest transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="label-mono !text-[10px] !mb-12">Contact</h4>
              <div className="flex flex-col gap-8">
                <p className="text-body-dim text-xs font-black uppercase tracking-widest leading-loose">
                  Gurgaon, HR, India
                </p>
                <Link href="mailto:business@maysanlabs.com" className="text-brand-primary hover:text-white transition-all duration-500 font-black uppercase tracking-widest text-xs">
                  business@maysanlabs.com
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-ghost uppercase tracking-[0.6em]">
              © {new Date().getFullYear()} Maysan Labs Studios — Precision Engineering
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
