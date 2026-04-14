"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Engineering", href: "/engineering" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[var(--bg-dark)]/60 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"
      }`}>
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative group/logo">
              <div className="absolute inset-0 bg-[var(--brand-primary)] blur-xl opacity-0 group-hover/logo:opacity-20 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg relative z-0 overflow-hidden ring-1 ring-white/10 border border-white/5 bg-black">
                 <Image src="/logo.png" alt="Maysan Labs Logo" width={40} height={40} className="object-cover scale-110" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-white text-lg leading-none tracking-tight">Maysan Labs</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-light)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--brand-primary)]"></span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  pathname === item.href ? "text-[var(--brand-primary)]" : "text-white/70 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--brand-gradient)] transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${pathname === item.href ? "scale-x-100" : ""}`} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/init" className="pill-btn pill-btn-primary !py-2.5 !px-6 text-xs">
              Book a Strategy Call
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-[var(--bg-dark)]/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-16">
                 <Link href="/" className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)] overflow-hidden border border-white/10 bg-black">
                       <Image src="/logo.png" alt="Maysan Labs Logo" width={40} height={40} className="object-cover scale-110" />
                     </div>
                 </Link>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white">
                    <X size={32} />
                 </button>
              </div>

              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-black uppercase tracking-tighter ${
                        pathname === item.href ? "text-[var(--brand-primary)]" : "text-white/30 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <Link 
                  href="/init" 
                  onClick={() => setIsOpen(false)}
                  className="pill-btn pill-btn-primary w-full text-center py-6 text-lg"
                >
                  Book a Strategy Call
                </Link>
                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-2">
                   <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">Node_Status</span>
                   <span className="text-xs text-[var(--brand-primary)]">Operational // 99.9% Uptime</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}