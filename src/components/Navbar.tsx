"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

function subscribeToServerSnapshot() {
  return () => {};
}

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribeToServerSnapshot,
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Products", href: "/products/edu-maysan" },
    { name: "Engineering", href: "/engineering" },
    { name: "Architecture", href: "/architecture" },
    { name: "Insights", href: "/insights" },
    { name: "Blog", href: "/blog" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
              <span className="font-bold text-white text-lg">M</span>
            </div>
            <span className="font-bold text-lg text-foreground uppercase hidden sm:block">
              Maysan<span className="font-accent">labs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-bold tracking-wider transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary text-foreground/60 hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* CTA */}
            <Link
              href="/init"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-foreground transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`p-2.5 rounded-lg transition-colors ${
                isOpen ? "bg-foreground text-background" : "bg-secondary/50 text-foreground"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-lg"
          >
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Links */}
              <div className="px-4 py-6 space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-4 px-4 rounded-xl text-lg font-semibold transition-colors ${
                        pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {link.name}
                      <ArrowRight size={18} className="text-foreground/30" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-4 py-4 border-t border-border">
                <Link
                  href="/init"
                  className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 text-sm font-bold tracking-wider uppercase rounded-xl hover:bg-foreground transition-colors"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Theme Toggle */}
              <div className="px-4 py-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-secondary/50 text-foreground/70 font-medium hover:bg-secondary transition-colors"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
                </button>
              </div>

              {/* Footer */}
              <div className="mt-auto px-4 py-6 border-t border-border">
                <div className="text-center text-xs text-foreground/40">
                  © {new Date().getFullYear()} Maysan Labs
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  return <NavbarContent key={pathname} />;
}
