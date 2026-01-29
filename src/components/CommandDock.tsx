"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import {
  LayoutGrid,
  Shield,
  Rss,
  Terminal,
  Terminal as TerminalIcon,
  ChevronUp,
} from "lucide-react";
import styles from "./CommandDock.module.css";

export default function CommandDock() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showStatus, setShowStatus] = useState(false);

  // Hide dock on terminal/init page
  const isTerminalPage = pathname === "/init";

  useEffect(() => {
    if (isTerminalPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(false);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTerminalPage, lastScrollY]);

  const lenis = useLenis();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);
      if (element && lenis) {
        lenis.scrollTo(element, { offset: -80 });
      }
    }
  };

  const dockItems = [
    { icon: <LayoutGrid size={20} />, label: "Process", href: "/#process" },
    { icon: <Shield size={20} />, label: "Philosophy", href: "/about" },
    { icon: <Rss size={20} />, label: "Insights", href: "/insights" },
    { icon: <Terminal size={20} />, label: "INIT", href: "/init" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false; // Fragments
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.dockWrapper}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={styles.dock}
          >
            <div className={styles.dockContent}>
              <div className={styles.dockLeft}></div>

              <div className={styles.navGroup}>
                {dockItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`${styles.dockItem} ${isActive(item.href) ? styles.activeItem : ""}`}
                  >
                    {item.icon}
                    <span className={styles.itemLabel}>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className={styles.dockRight}>
                <button
                  className={`${styles.terminalBtn} ${showStatus ? styles.activeBtn : ""}`}
                  onClick={() => setShowStatus(!showStatus)}
                >
                  <TerminalIcon size={18} />
                </button>
              </div>
            </div>

            {/* Status Panel Overlay */}
            <AnimatePresence>
              {showStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={styles.statusPanel}
                >
                  <div className={styles.panelHeader}>
                    <span className={styles.panelTitle}>
                      CORE_PROCESS_STATUS
                    </span>
                    <button
                      onClick={() => setShowStatus(false)}
                      className={styles.closeBtn}
                    >
                      <ChevronUp size={14} />
                    </button>
                  </div>
                  <div className={styles.panelGrid}>
                    <div className={styles.panelItem}>
                      <span className={styles.itemTag}>LOAD</span>
                      <span className={styles.itemValue}>0.42_ms</span>
                    </div>
                    <div className={styles.panelItem}>
                      <span className={styles.itemTag}>UPTIME</span>
                      <span className={styles.itemValue}>99.98%</span>
                    </div>
                    <div className={styles.panelItem}>
                      <span className={styles.itemTag}>CLIENT_ID</span>
                      <span className={styles.itemValue}>ALPHA_V1</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
