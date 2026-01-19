"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const height = useTransform(scrollY, [0, 100], [80, 64]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
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
        style={{ height }}
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""} ${
          isOpen ? styles.menuOpen : ""
        }`}
      >
        <div className={`container ${styles.container}`}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => setIsOpen(false)}
          >
            Maysan<span className="text-gradient">Labs</span>
          </Link>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={styles.link}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className={styles.actions}>
            <Link
              href="tel:+919660641530"
              className={`btn btn-primary ${styles.cta}`}
            >
              <Phone size={16} />
              <span>Call Us</span>
            </Link>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${styles.mobileMenu} glass`}
          >
            <div className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="tel:+919660641530"
                className="btn btn-primary"
                onClick={() => setIsOpen(false)}
              >
                <Phone size={18} />
                <span>9660641530</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
