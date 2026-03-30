"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    window.requestAnimationFrame(() => setMounted(true));
  }, []);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "PRODUCTS", href: "/products/edu-maysan" },
    { name: "ENGINEERING", href: "/engineering" },
    { name: "ARCHITECTURE", href: "/architecture" },
    { name: "INSIGHTS", href: "/insights" },
    { name: "BLOG", href: "/blog" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-foreground/5 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-8">
        {/* Simplified Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative w-8 h-8 bg-primary flex items-center justify-center rounded-sm overflow-hidden">
            <span className="font-bold text-white text-lg">M</span>
          </div>
          <span className="font-bold tracking-tight text-xl text-foreground uppercase">
            MAYSAN<span className="font-accent lowercase ml-1">labs</span>
          </span>
        </Link>

        {/* Desktop Nav (Minimalist) */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-bold tracking-[0.15em] transition-all duration-300 relative py-2 group ${
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground/60 hover:text-primary"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === link.href ? "scale-x-100" : ""}`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle (Subtle) */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground/40 hover:text-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          {/* Premium Call to Action */}
          <Link
            href="/init"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-foreground text-background font-bold text-[10px] tracking-widest uppercase hover:bg-primary transition-all rounded-full"
          >
            GET STARTED
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Surgical Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed inset-0 z-[10000] bg-background"
          >
            <div className="p-8 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center mb-20">
                 <span className="font-mono text-xs text-primary">[ MENU_SYS ]</span>
                 <button onClick={() => setIsOpen(false)} className="p-2">
                   <X size={32} />
                 </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-5xl font-black tracking-tighter uppercase hover:text-primary transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8 border-t border-border">
                  <Link
                    href="/init"
                    className="w-full bg-primary text-white py-6 flex items-center justify-center font-bold text-xl gap-4 rounded-3xl"
                  >
                    GET STARTED
                    <ArrowRight size={24} />
                  </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
