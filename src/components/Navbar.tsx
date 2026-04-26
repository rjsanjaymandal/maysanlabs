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
        scrolled ? "bg-background/80 backdrop-blur-2xl py-4 shadow-xl" : "bg-transparent py-8"
      }`}>
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative group/logo">
              <div className="absolute inset-0 bg-brand-primary blur-2xl opacity-0 group-hover/logo:opacity-20 transition-opacity duration-500" />
              <div className="w-10 h-10 rounded-sm flex items-center justify-center relative z-10 overflow-hidden ring-1 ring-white/10 bg-black/40 backdrop-blur-md">
                 <Image src="/logo.png" alt="Maysan Labs Logo" width={40} height={40} className="object-cover scale-110" priority />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-white text-2xl leading-none tracking-tighter uppercase">Maysan Labs</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group px-2 py-1 ${
                  pathname === item.href ? "text-brand-primary" : "text-white/50 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-brand-primary transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${pathname === item.href ? "scale-x-100" : ""}`} />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/init" className="relative group overflow-hidden bg-brand-primary px-8 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest text-black hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.3)] transition-all duration-500">
              <span className="relative z-10">Start Project</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors border border-white/5 bg-white/5 rounded-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                     <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.3)] overflow-hidden border border-white/10 bg-black">
                       <Image src="/logo.png" alt="Maysan Labs Logo" width={40} height={40} className="object-cover scale-110" priority />
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
                        pathname === item.href ? "text-brand-primary" : "text-white/30 hover:text-white"
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
                   <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.4em]">Node_Status</span>
                   <span className="text-xs text-brand-primary">Operational // 99.9% Uptime</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}