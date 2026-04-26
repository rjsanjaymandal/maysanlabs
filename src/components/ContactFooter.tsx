"use client";

import Link from "next/link";
import Image from "next/image";
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
    <footer className="bg-background border-t border-white/5">
      {/* Main CTA Section */}
      <section className="sec-xl overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="container-main text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="label-mono mb-10 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
              Let's build together
            </div>
            <h2 className="text-4xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.9] uppercase">
              Start your <br /><span className="text-brand-primary italic">next project.</span>
            </h2>
            <p className="text-white/30 mb-16 max-w-xl mx-auto font-medium text-xl leading-relaxed tracking-tight">
              We help you build fast, reliable apps that your users will love.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/init" className="bg-brand-primary px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest text-black hover:shadow-[0_0_40px_rgba(163,230,53,0.5)] transition-all duration-700">
                Book a Free Call
              </Link>
              <Link href="mailto:business@maysanlabs.com" className="bg-white/5 border border-white/10 px-12 py-5 rounded-full text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all duration-700">
                Send us an Email
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-32 border-t border-white/5 bg-background">
        <div className="container-main">
          <div className="grid md:grid-cols-4 gap-24 lg:gap-40">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center relative z-10 overflow-hidden ring-1 ring-white/10 bg-black/40 backdrop-blur-md group-hover:ring-brand-primary/50 transition-all duration-700">
                   <Image src="/logo.png" alt="Maysan Labs Logo" width={40} height={40} className="object-cover scale-110" />
                </div>
                <span className="font-black text-white text-2xl tracking-tighter uppercase">Maysan Labs</span>
              </Link>
              <p className="text-white/20 text-lg leading-relaxed max-w-sm font-medium tracking-tight">
                Reliable software engineering for companies that value speed, quality, and results.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-12">Navigation</h4>
              <div className="flex flex-col gap-6">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/20 hover:text-brand-primary text-xs font-black uppercase tracking-widest transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-12">Contact</h4>
              <div className="flex flex-col gap-6">
                <p className="text-white/20 text-xs font-black uppercase tracking-widest leading-loose">
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
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} Maysan Labs Studios
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
