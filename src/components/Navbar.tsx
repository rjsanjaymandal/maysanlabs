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
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isOpen
          ? "bg-background border-b border-border"
          : isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight z-[70]">
          Maysan<span className="text-primary">Labs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <Link
            href="/init"
            className="btn btn-primary btn-sm text-sm px-5 py-2"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2 z-[70]">
          {/* Theme Toggle Mobile */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-20 left-0 right-0 h-auto pb-8 px-6 md:hidden flex flex-col space-y-6 z-[60] shadow-2xl border-b border-border bg-background">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-foreground hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-8 border-t border-border">
              <Link
                href="/init"
                className="btn btn-primary w-full text-center py-4"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
