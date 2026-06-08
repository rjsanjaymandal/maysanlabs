"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Search } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import dynamic from "next/dynamic";
const SearchModal = dynamic(() => import("@/components/SearchModal"), {
  loading: () => null,
});

import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
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

  // Keyboard shortcut: Cmd/Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus trap when mobile menu is open
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;
    const firstFocusable = menuRef.current.querySelector<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])");
    firstFocusable?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Tools", href: "/tools" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-[100] transition-[background-color,padding,box-shadow] duration-200 ${
        mounted && scrolled ? "bg-[var(--bg-dark)] py-2 md:py-3 shadow-lg shadow-black/20" : "bg-transparent py-4 md:py-5"
      }`}>
        <div className="container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div 
              className="relative h-9 w-9 rounded-full overflow-hidden flex items-center justify-center border border-[var(--glass-chip-border)] bg-[var(--glass-chip-bg)] transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(26,109,214,0.35)]"
            >
              <Image 
                src="/logo-rounded-v2.webp" 
                alt="Maysan Labs Logo"
                width={36}
                height={36}
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,UklGRlYAAABXRUJQVlA4WAoAAAAQAAAAJQAJUAoAAAMR0RQgACD+/BkAg/38AgA="
                className="h-full w-full object-contain" 
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-foreground/90 transition-colors duration-300 group-hover:text-foreground uppercase">
              Maysan <span className="text-[#1A6DD6] group-hover:text-blue-400 transition-colors duration-300">Labs</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 relative group py-1.5 ${
                  pathname === item.href ? "text-brand-primary" : "text-foreground/45 hover:text-foreground"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-brand-primary transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              aria-keyshortcuts="Control+K Meta+K"
              className="w-9 h-9 flex items-center justify-center text-foreground/50 hover:text-foreground bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-full transition-all duration-200 hover:border-[var(--text-on-white)]/20 focus-ring"
            >
              <Search size={15} />
            </button>
            <Link href="/start" className="group relative px-6 py-2.5 bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-full font-bold text-[9px] uppercase tracking-widest text-foreground/90 shadow-lg shadow-black/10 overflow-hidden transition-all duration-300 hover:bg-[#1A6DD6] hover:border-[#1A6DD6] hover:text-white hover:shadow-blue-500/20 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Book a Call</span>
            </Link>
          </div>

          <button 
            type="button"
            className="lg:hidden w-11 h-11 flex items-center justify-center text-foreground/50 hover:text-foreground bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-full hover:bg-[var(--glass-chip-bg)] hover:border-[var(--text-on-white)]/20 transition-all duration-200 focus-ring"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
 
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden px-4 pb-4">
        <Link 
          href="/start"
          className="group relative flex items-center justify-center gap-2.5 w-full py-4 bg-[#1A6DD6] rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white shadow-xl shadow-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A6DD6] via-[#2563EB] to-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Phone size={15} className="relative z-10" />
          <span className="relative z-10">Book a Call</span>
        </Link>
      </div>
 
      {isOpen && (
          <div 
            ref={menuRef}
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[60] animate-fade-in bg-background/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6 pt-24 justify-between overflow-y-auto">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  {navItems.map((item, index) => (
                    <div
                      key={item.name}
                      style={{ animationDelay: `${index * 35}ms` }}
                      className="animate-fade-in-up"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={`text-base font-semibold py-3.5 px-5 rounded-xl block transition-all duration-200 active:scale-[0.98] ${
                          pathname === item.href 
                            ? "text-[#1A6DD6] bg-[#1A6DD6]/5" 
                            : "text-foreground/60 hover:text-foreground hover:bg-[var(--text-on-white)]/[0.03]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Actions: Preferences */}
              <div className="flex items-center justify-between border-t border-[var(--sec-border)] pt-6 mt-6 pb-20">
                <span className="text-foreground/40 text-xs font-semibold uppercase tracking-wider">Preferences</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                    aria-label="Open search"
                    className="w-9 h-9 flex items-center justify-center text-foreground/50 hover:text-foreground bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-full transition-all duration-200 focus-ring"
                  >
                    <Search size={15} />
                  </button>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}

      {isSearchOpen && <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
