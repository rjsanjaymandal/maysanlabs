"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Twitter, Linkedin, Send, Instagram, Facebook } from "lucide-react";

const links = [
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "About", href: "/about" },
  { name: "Architecture", href: "/architecture" },
  { name: "Insights", href: "/insights" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/maysanlabs" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/maysanlabs" },
  { name: "LinkedIn", icon: Linkedin, href: "https://in.linkedin.com/company/maysanlabs" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/maysanlabs" },
];

export default function ContactFooter() {
  return (
    <footer className="bg-[var(--bg-dark)] border-t border-white/5 pb-20 md:pb-0">
      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/[0.08] via-brand-primary/[0.03] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-medium mb-6">
              <Send size={12} />
              Get Started
            </span>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
              Ready to <span className="text-brand-primary">scale</span>?
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Let&apos;s build something great together. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/init" className="group px-7 py-3 bg-brand-primary rounded-full font-medium text-sm text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] flex items-center gap-2">
                <span>Book a Call</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <Link href="mailto:business@maysanlabs.com" className="px-7 py-3 rounded-full border border-white/15 bg-white/[0.03] text-white/70 font-medium text-sm transition-all duration-300 hover:bg-white/[0.06] hover:text-white hover:border-white/25 flex items-center gap-2">
                  <Mail size={14} />
                  <span>Contact Us</span>
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
              <Link href="/" className="flex items-center gap-4 mb-5 group">
                <div className="relative h-14 w-14 transition-all duration-300 rounded-full overflow-hidden border border-white/10 bg-white/[0.03] shadow-md flex items-center justify-center">
                  <Image 
                    src="/icon-rounded-v2.png" 
                    alt="Maysan Labs" 
                    fill
                    className="object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-wider text-white uppercase group-hover:text-[#1A6DD6] transition-colors duration-200">
                    Maysan <span className="text-[#1A6DD6]">Labs</span>
                  </span>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase font-semibold mt-0.5">
                    Build • Scale • Grow
                  </span>
                </div>
              </Link>
              <p className="text-white/70 text-sm mb-6 max-w-sm leading-relaxed">
                 Enterprise SaaS development studio building scalable applications for businesses that demand precision.
              </p>
              <div className="flex gap-3.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-[#1A6DD6] hover:border-[#1A6DD6]/30 hover:bg-[#1A6DD6]/5 hover:-translate-y-0.5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10"
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-5">Company</h3>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/60 hover:text-brand-primary text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-5">Contact</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-white/60 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-primary group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-all duration-300">
                    <MapPin size={14} />
                  </div>
                  <span>Gurgaon, India</span>
                </div>
                
                <a href="mailto:business@maysanlabs.com" className="flex items-center gap-3 text-white/60 text-sm group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/40 group-hover:text-brand-primary group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5 transition-all duration-300">
                    <Mail size={14} />
                  </div>
                  <span className="text-brand-primary group-hover:text-white transition-colors duration-300">business@maysanlabs.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Maysan Labs. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-white/65 hover:text-brand-primary text-sm transition-all duration-300 hover:translate-y-[-1px] inline-block">Privacy Policy</a>
              <a href="#" className="text-white/65 hover:text-brand-primary text-sm transition-all duration-300 hover:translate-y-[-1px] inline-block">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}