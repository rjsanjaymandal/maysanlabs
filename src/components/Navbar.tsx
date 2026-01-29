"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const navLinks = [
    { name: "Solutions", href: "/#solution" },
    { name: "Process", href: "/#process" },
    { name: "Engineering", href: "/#tech-specs" },
    { name: "Architecture", href: "/architecture" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isOpen
          ? "bg-black border-b border-white/5"
          : isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/5"
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
          <Link
            href="/init"
            className="btn btn-primary btn-sm text-sm px-5 py-2"
          >
            Initialize
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-[70] p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="fixed top-20 left-0 right-0 h-auto pb-8 px-6 md:hidden flex flex-col space-y-6 z-[60] shadow-2xl border-b border-white/10"
            style={{ backgroundColor: "#000000" }}
          >
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
                Initialize Project
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
