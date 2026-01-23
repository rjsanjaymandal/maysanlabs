"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Send,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import styles from "./Init.module.css";
import Navbar from "@/components/Navbar";
import TacticalOverlay from "@/components/TacticalOverlay";

const steps = [
  {
    id: "IDENT_CLIENT",
    label: "CLIENT_IDENTITY",
    prompt: "Enter organization name or project alias:",
    placeholder: "e.g. PROJECT_OMEGA",
  },
  {
    id: "SELECT_ARCHITECTURE",
    label: "CORE_ARCHITECTURE",
    prompt:
      "Select primary stack orientation (e.g. MERN, NEXT_GEN, AI_INTEGRATED):",
    placeholder: "MERN / NEXT_GEN / AI",
  },
  {
    id: "DEFINE_TIMELINE",
    label: "SYNC_TIMELINE",
    prompt: "Specify delivery window (e.g. 4_WEEKS, 3_MONTHS):",
    placeholder: "Specify weeks/months",
  },
  {
    id: "INITIALIZE",
    label: "SYSTEM_INIT",
    prompt: "Final verification. Proceed with initialization?",
    placeholder: "Type 'Y' to confirm",
  },
];

export default function InitPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[SYS]: BOOT_SEQUENCE_COMPLETE",
    "[SYS]: WAITING_FOR_INPUT...",
  ]);
  const [isInitializing, setIsInitializing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleNext = () => {
    if (!inputValue) return;

    const step = steps[currentStep];
    setFormData((prev) => ({ ...prev, [step.id]: inputValue }));
    setLogs((prev) => [
      ...prev,
      `> ${inputValue}`,
      `[${step.label}]: DATA_LOGGED`,
    ]);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setInputValue("");
    } else {
      handleFinalize();
    }
  };

  const handleFinalize = () => {
    setIsInitializing(true);
    setLogs((prev) => [
      ...prev,
      "[SYS]: INITIALIZING_PROTOCOL_THETA...",
      "[SYS]: ENCRYPTING_HANDSHAKE...",
      "[SYS]: COMPILING_BLUEPRINT...",
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        "[SYS]: SUCCESS: INITIALIZATION_COMPLETE",
        "[SYS]: OUR_ENGINEERS_WILL_CONTACT_YOU_SHORTLY",
      ]);
      setIsInitializing(false);
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <Navbar />
      <TacticalOverlay />
      <div className="container">
        <div className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div className={styles.controls}>
              <div className={styles.control} />
              <div className={styles.control} />
              <div className={styles.control} />
            </div>
            <div className={styles.terminalTitle}>
              <Terminal size={14} /> <span>PROJECT_INITIALIZATION</span>
            </div>
          </div>

          <div className={styles.terminalBody} ref={scrollRef}>
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.startsWith(">") ? styles.userInput : styles.sysLog
                }
              >
                {log}
              </div>
            ))}
            {!isInitializing && currentStep < steps.length && (
              <div className={styles.activePrompt}>
                <span className={styles.stepCursor}>
                  [STEP_0{currentStep + 1}]:
                </span>
                <span className={styles.promptText}>
                  {steps[currentStep].prompt}
                </span>
                <div className={styles.inputArea}>
                  <ChevronRight size={18} className={styles.chevron} />
                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                    placeholder={steps[currentStep].placeholder}
                    className={styles.input}
                  />
                  <button onClick={handleNext} className={styles.sendBtn}>
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.terminalFooter}>
            <div className={styles.status}>
              <div className={styles.pulse} /> <span>UPLINK_STABLE</span>
            </div>
            <div className={styles.meta}>
              MODE: SECURE_INTAKE // ENV: PRODUCTION
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
