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
  { name: "GitHub", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function ContactFooter() {
  return (
    <footer className="bg-[var(--bg-dark)] border-t border-white/5">
      <section className="py-20 relative bg-gradient-to-b from-brand-primary/5/10 to-transparent">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-medium mb-6">
              <Send size={12} />
              Get Started
            </span>
            <h2 className="heading-md text-white mb-4">
              Ready to <span className="text-brand-primary">scale</span>?
            </h2>
            <p className="text-white/45 text-base mb-8 max-w-lg mx-auto">
              Let&apos;s build something great together. Our team is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/init" className="group px-6 py-2.5 bg-brand-primary rounded-full font-medium text-sm text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] flex items-center gap-2">
                Start Project
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              
              <Link href="mailto:business@maysanlabs.com" className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 font-medium text-sm transition-all duration-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                 <Mail size={14} />
                 Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-t border-white/5">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-primary/10 border border-white/5">
                   <Image src="/logo.png" alt="Maysan Labs" width={20} height={20} className="object-cover" />
                </div>
                <span className="font-semibold text-white text-lg">Maysan Labs</span>
              </Link>
              <p className="text-white/40 text-sm mb-5 max-w-xs">
                Enterprise SaaS development studio building scalable applications.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-white/40 hover:text-white hover:border-white/10 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Company</h4>
              <div className="flex flex-col gap-2.5">
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
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">Contact</h4>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <MapPin size={12} className="text-brand-primary" />
                  Gurgaon, India
                </div>
                <a href="mailto:business@maysanlabs.com" className="text-brand-primary hover:text-white text-sm transition-colors duration-200">
                  business@maysanlabs.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Maysan Labs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">Privacy</a>
              <a href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}