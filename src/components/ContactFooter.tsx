"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Github, Twitter, Linkedin, Send } from "lucide-react";

const links = [
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export default function ContactFooter() {
  return (
    <footer className="bg-[var(--bg-dark)] border-t border-white/5">
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-brand-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Send size={12} />
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5">
              Ready to <span className="text-brand-primary">scale</span>?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              Let&apos;s build something great together. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/init" className="group px-8 py-4 bg-gradient-to-r from-brand-primary to-[#60A5FA] rounded-full font-extrabold text-sm text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(26,109,214,0.6)] hover:scale-105 active:scale-95 flex items-center gap-2 uppercase tracking-wider hover:brightness-110">
                Book a Call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="mailto:business@maysanlabs.com" className="px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/70 font-semibold text-sm transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/25 flex items-center gap-2">
                  <Mail size={16} />
                  Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Links Section */}
      <section className="py-16 border-t border-white/5">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/5">
                   <Image src="/logo.png" alt="Maysan Labs" width={32} height={32} className="object-contain rounded-full" />
                </div>
                <span className="font-semibold text-white text-lg">Maysan Labs</span>
              </Link>
              <p className="text-white/40 text-sm mb-6 max-w-sm leading-relaxed">
                Enterprise SaaS development studio building scalable applications for businesses that demand precision.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Company</h4>
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/40 hover:text-brand-primary text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-white/40 text-sm">
                  <MapPin size={14} className="text-brand-primary" />
                  Gurgaon, India
                </div>
                <a href="mailto:business@maysanlabs.com" className="text-brand-primary hover:text-white text-sm transition-colors duration-200">
                  business@maysanlabs.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} Maysan Labs. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/30 hover:text-white/50 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 hover:text-white/50 text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}