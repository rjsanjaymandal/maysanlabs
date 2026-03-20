"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Terminal } from "lucide-react";
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
    { name: "SOLUTIONS", href: "/#solution" },
    { name: "ENGINEERING", href: "/#tech-specs" },
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
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-8">
        {/* Logo Block (Tactical Branding) */}
        <Link
          href="/"
          className="flex items-center gap-4 group shrink-0"
        >
          <div className="relative w-10 h-10 bg-primary flex items-center justify-center border border-primary overflow-hidden">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono font-black text-white text-xl">M</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-tighter text-xl text-foreground uppercase">
              MAYSAN_LABS
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold mt-1">
              SYS_LEVEL_ENG
            </span>
          </div>
        </Link>

        {/* Desktop Nav (Monospaced Integrity) */}
        <div className="hidden lg:flex items-center border-x border-border/50 px-8 h-full space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-mono text-[10px] tracking-[0.2em] transition-all duration-300 relative py-2 group ${
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${pathname === link.href ? "scale-x-100" : ""}`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* Status Marker (Unique Element) */}
          <div className="hidden xl:flex items-center gap-3 px-4 border-l border-border h-8 font-mono text-[9px] text-muted-foreground">
             <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
             NODE_01_ACTIVE
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Brutalist Call to Action */}
          <Link
            href="/init"
            className="hidden md:flex items-center gap-2 px-6 py-2 bg-foreground text-background font-bold text-[10px] tracking-widest uppercase hover:bg-primary hover:text-white transition-all transform hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(255,69,0,0.3)]"
          >
            INITIALIZE
            <Terminal size={14} />
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

      {/* Mobile Menu (Brutalist Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-0 z-[10000] bg-background grain-overlay"
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
                    className="w-full bg-primary text-white py-6 flex items-center justify-center font-black text-xl gap-4"
                  >
                    INITIALIZE_PROTOCOL
                    <Terminal size={24} />
                  </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
