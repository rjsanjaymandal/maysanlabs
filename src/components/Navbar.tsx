"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Use setTimeout to avoid calling setState synchronously
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] ${
        mounted && scrolled ? "bg-[var(--bg-dark)] py-2 md:py-3 shadow-lg shadow-black/20" : "bg-transparent py-4 md:py-5"
      }`}>
        <div className="container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 md:gap-3 group">
            <Image src="/logo.png" alt="Maysan Labs" width={44} height={44} className="object-contain rounded-full" priority />
            <span className="font-semibold text-white text-base md:text-lg">Maysan Labs</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  pathname === item.href ? "text-brand-primary" : "text-white/50 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/init" className="group relative px-6 py-2.5 bg-[#1A6DD6] rounded-full font-extrabold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A6DD6] via-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Book a Call</span>
            </Link>
          </div>

          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white/50 hover:text-white bg-white/[0.03] border border-white/5 rounded-full hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden px-4 pb-4">
        <Link 
          href="/init"
          className="group relative flex items-center justify-center gap-2.5 w-full py-4 bg-[#1A6DD6] rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white shadow-xl shadow-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A6DD6] via-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Phone size={15} className="relative z-10" />
          <span className="relative z-10">Book a Call</span>
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-24">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium py-3 px-4 rounded-xl block transition-all duration-200 ${
                        pathname === item.href 
                          ? "text-brand-primary bg-brand-primary/5" 
                          : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}