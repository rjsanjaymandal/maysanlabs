"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Shield,
  Rss,
  DollarSign,
  Terminal,
  Terminal as TerminalIcon, // Keep TerminalIcon for the button
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
  }, [lastScrollY]);

  const dockItems = [
    { icon: <LayoutGrid size={20} />, label: "Grid", href: "/solutions" },
    { icon: <Shield size={20} />, label: "Intel", href: "/about" },
    { icon: <Rss size={20} />, label: "Feed", href: "/insights" },
    { icon: <DollarSign size={20} />, label: "Rates", href: "/#pricing" },
    { icon: <Terminal size={20} />, label: "INIT", href: "/init" },
  ];

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
              <div className={styles.dockLeft}>
                <div className={styles.statusDot} />
                <span className={styles.statusText}>SYS_ACTIVE</span>
              </div>

              <div className={styles.navGroup}>
                {dockItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={styles.dockItem}
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
