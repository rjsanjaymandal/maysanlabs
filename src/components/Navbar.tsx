"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Phone, Menu, X, ChevronRight } from "lucide-react";
import styles from "./Navbar.module.css";

import { usePathname } from "next/navigation";

const MotionLink = motion(Link);

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

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
    setIsOpen(false);
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
    { name: "Services", href: "/solutions" },
    { name: "Architecture", href: "/architecture" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Pricing", href: "/#pricing" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
                  className={`${styles.link} ${isActive(link.href) ? styles.activeLink : ""}`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <div className={styles.navRight}>
              <Link href="/init" className="btn btn-primary">
                INITIALIZE_PROJECT
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
                    onClick={() => setIsOpen(false)}
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

              <div className={styles.sheetFooter}>
                <span className={styles.footerTag}>SECURE_UPLINK_v1.0.4</span>
                <span className={styles.footerStatus}>// READY</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
