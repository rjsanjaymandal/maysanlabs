"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LayoutGrid,
  Cpu,
  CreditCard,
  MessageSquare,
  Terminal as TerminalIcon,
  ChevronUp,
} from "lucide-react";
import styles from "./CommandDock.module.css";

export default function CommandDock() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
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
    { icon: <LayoutGrid size={20} />, label: "Grid", href: "#solution" },
    { icon: <Cpu size={20} />, label: "Specs", href: "#specs" },
    { icon: <CreditCard size={20} />, label: "Rates", href: "#pricing" },
    { icon: <MessageSquare size={20} />, label: "Comms", href: "#contact" },
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
                <button className={styles.terminalBtn}>
                  <TerminalIcon size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
