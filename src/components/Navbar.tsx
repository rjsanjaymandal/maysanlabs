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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["solution", "pricing", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveLink(current || "");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Services", href: "#solution" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

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
                <a
                  href={link.href}
                  className={`${styles.link} ${activeLink === link.href.replace("#", "") ? styles.activeLink : ""}`}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <div className={styles.ctaWrapper}>
              <Link href="tel:+919660641530" className={styles.cta}>
                <span>Contact Experts</span>
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
            className={styles.mobileMenuWrapper}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={styles.mobileMenu}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.mobileLinks}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={styles.mobileLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                    <ChevronRight size={18} />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{ marginTop: "1.5rem" }}
                >
                  <Link
                    href="tel:+919660641530"
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      borderRadius: "0",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={18} />
                    <span>9660 641 530</span>
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
