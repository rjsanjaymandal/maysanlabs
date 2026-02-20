"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

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
      className={`fixed top-6 left-0 right-0 z-[9999] px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
    >
      <div
        className={`container mx-auto max-w-5xl h-16 flex items-center justify-between transition-all duration-500 rounded-full px-6 ${
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
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="text-primary font-black text-sm">M</span>
          </div>
          <span className="hidden sm:inline">
            Maysan<span className="text-primary">Labs</span>
          </span>
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

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <Link
            href="/init"
            className="hidden sm:inline-flex btn btn-primary px-5 py-2 text-xs rounded-full"
          >
            Get in Touch
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground rounded-full hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-24 left-4 right-4 transition-all duration-500 transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="glass-card p-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Link
              href="/init"
              className="btn btn-primary w-full text-center py-4 rounded-xl"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
