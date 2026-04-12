"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactFooter() {
  const links = [
    { name: "Services", href: "/services" },
    { name: "Engineering", href: "/engineering" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <footer className="bg-[#0b0e14] border-t border-white/5">
      {/* Main CTA Section */}
      <section className="sec-xl overflow-hidden relative">
        <div className="radial-blur -top-40 -right-40 opacity-10" />
        <div className="container-main text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="announcement-bar">Work With Us</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mt-10 mb-8 leading-[0.9]">
              Schedule a <br /><span className="text-[var(--brand-primary)] italic">Strategy Call.</span>
            </h2>
            <p className="text-white/70 mb-12 max-w-xl mx-auto font-medium text-lg">
              We operate at the intersection of complex engineering and mission-critical deployment.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/init" className="pill-btn pill-btn-primary min-w-[240px]">
                Book a Strategy Call
              </Link>
              <Link href="mailto:business@maysanlabs.com" className="pill-btn pill-btn-secondary min-w-[240px]">
                Send Email
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-20 border-t border-white/5 bg-black/40">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-16 lg:gap-32">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 bg-[var(--brand-gradient)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <span className="font-black text-black text-xl">M</span>
                </div>
                <div className="flex flex-col">
                   <span className="font-black text-white text-xl tracking-tighter uppercase">Maysan Labs</span>
                   <span className="font-mono text-[8px] text-[var(--brand-primary)] uppercase tracking-[0.4em]">Enterprise_Eng</span>
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Engineering high-performance enterprise SaaS infrastructure and autonomous operational tools with mathematical precision.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navigation</h4>
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/70 hover:text-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connectivity Column */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Connectivity</h4>
              <div className="flex flex-col gap-4 text-white/30 text-xs">
                <p className="font-medium">Gurgaon, Haryana, India</p>
                <Link href="mailto:business@maysanlabs.com" className="hover:text-[var(--brand-primary)] transition-colors duration-300 font-bold">
                  business@maysanlabs.com
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              © {new Date().getFullYear()} Maysan Labs // SYSTEM_ACTIVE
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-light)] animate-pulse" />
                 <span className="text-[10px] font-mono text-[var(--brand-light)] uppercase tracking-widest">Bridge_Operational</span>
              </div>
              <div className="h-4 w-px bg-white/5" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">ISO_27001_COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
