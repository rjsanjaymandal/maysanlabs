"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
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
    { name: "Solutions", href: "/#solution" },
    { name: "Process", href: "/#process" },
    { name: "Engineering", href: "/#tech-specs" },
    { name: "Architecture", href: "/architecture" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-4 sm:top-6 left-0 right-0 z-[9999] px-2 sm:px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      <div
        className={`container mx-auto max-w-5xl h-14 sm:h-16 flex items-center justify-between transition-all duration-500 rounded-full px-4 sm:px-6 ${
          isOpen
            ? "bg-background border border-border rounded-2xl"
            : isScrolled
              ? "bg-background/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-100 transition-all flex items-center gap-1.5 sm:gap-4 group shrink-0"
        >
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-black shadow-2xl flex items-center justify-center p-0.5 group-hover:border-primary/50 transition-colors">
            <img
              src="/logo.png"
              alt="Maysan Labs Logo"
              className="object-contain w-full h-full transform transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-tighter text-base sm:text-xl text-foreground">
              MAYSAN<span className="text-primary">LABS</span>
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-medium mt-0.5">
              Enterprise Engineering
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                pathname === link.href
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Desktop Get in Touch - Hidden on Mobile/Tablet */}
          <div className="hidden md:block">
            <Link
              href="/init"
              className="btn btn-primary px-5 py-2 text-xs rounded-full shrink-0"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1.5 sm:p-2 text-foreground rounded-full hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="md:hidden fixed top-20 sm:top-24 left-2 right-2 z-[9998]"
          >
            <div className="bg-background/40 dark:bg-black/40 backdrop-blur-[32px] border border-white/5 dark:border-white/10 p-4 sm:p-6 flex flex-col space-y-3 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden max-h-[75vh] relative">
              {/* Subtle Glow Header */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              <div className="flex flex-col space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-xl font-black tracking-tighter px-4 py-3 rounded-2xl transition-all duration-300 block ${
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:text-primary hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.03 + 0.1 }}
                  className="pt-4 border-t border-border mt-2"
                >
                  <Link
                    href="/init"
                    className="btn btn-primary w-full text-center py-3 sm:py-4 rounded-xl text-sm"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
