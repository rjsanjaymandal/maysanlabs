"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X, ChevronRight } from "lucide-react";
import styles from "./Navbar.module.css";

import { usePathname } from "next/navigation";

const MotionLink = motion(Link);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Solutions", href: "/#solution" },
    { name: "Process", href: "/#process" },
    { name: "Engineering", href: "/#tech-specs" },
    { name: "Architecture", href: "/architecture" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "/about" },
  ];

  const lenis = useLenis();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      // Simple check to avoid hydration mismatch and complex state
      return (
        pathname === "/" &&
        typeof window !== "undefined" &&
        window.location.hash === href.replace("/", "")
      );
    }
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith("/#") && pathname === "/") {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const element = document.getElementById(targetId);
        if (element && lenis) {
          lenis.scrollTo(element, { offset: -80 });
          setIsOpen(false);
        }
      }
    },
    [pathname, lenis],
  );

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
          isOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={styles.container}>
          <div className={styles.logoArea}>
            <Link
              href="/"
              className={styles.logo}
              onClick={() => setIsOpen(false)}
            >
              Maysan<span className="text-gradient">Labs</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <div key={link.name} className={styles.linkWrapper}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${styles.link} ${isActive(link.href) ? styles.activeLink : ""}`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <div className={styles.ctaWrapper}>
              <Link href="/init" className="btn btn-primary">
                <span className={styles.desktopOnly}>INITIALIZE_PROJECT</span>
                <span className={styles.mobileOnly}>INITIALIZE</span>
              </Link>
            </div>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.mobileMenuCover}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={styles.mobileSheet}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.sheetHandle} />

              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <MotionLink
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className={`${styles.mobileSheetLink} ${isActive(link.href) ? styles.activeSheetLink : ""}`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                  >
                    <span className={styles.linkIndex}>0{i + 1}</span>
                    <span className={styles.linkName}>{link.name}</span>
                    <ChevronRight size={18} className={styles.linkArrow} />
                  </MotionLink>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={styles.sheetAction}
                >
                  <Link
                    href="/init"
                    className="btn btn-primary btn-block"
                    onClick={() => setIsOpen(false)}
                  >
                    INITIALIZE_SYSTEM
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
