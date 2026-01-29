"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, ChevronRight, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";

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
    prompt: "Specify deployment window (e.g. 4_WEEKS, 3_MONTHS):",
    placeholder: "Specify weeks/months",
  },
  {
    id: "INITIALIZE",
    label: "SYSTEM_INIT",
    prompt: "Final verification. Proceed with initialization?",
    placeholder: "Type 'Y' to confirm",
  },
  {
    id: "CONTACT_INFO",
    label: "CONTACT_POINT",
    prompt: "Enter email for protocol transmission:",
    placeholder: "your@email.com",
    final: true,
  },
];

export default function InitPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setFormData] = useState<Record<string, string>>({});
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
    setInputValue("");
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
    <main className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />
      <div className="container max-w-3xl flex-1 flex flex-col justify-center py-12">
        <div className="border border-border rounded-lg bg-card shadow-2xl overflow-hidden flex flex-col h-[600px]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
              <Terminal size={12} /> <span>PROJECT_INITIALIZATION</span>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          <div
            className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-2 scrollbar-hide text-foreground/80"
            ref={scrollRef}
          >
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.startsWith(">")
                    ? "text-primary font-bold mt-4 mb-2"
                    : "text-muted-foreground"
                }
              >
                {log}
              </div>
            ))}

            {!isInitializing && currentStep < steps.length && (
              <div className="mt-6 border-t border-border/50 pt-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <span className="opacity-50">[STEP_0{currentStep + 1}]:</span>
                  <span className="font-bold">{steps[currentStep].prompt}</span>
                </div>

                <div className="flex items-center gap-2 bg-background/50 border border-border rounded px-3 py-2 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                  <ChevronRight
                    size={16}
                    className="text-primary animate-pulse"
                  />
                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
                    placeholder={steps[currentStep].placeholder}
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/30 h-full py-1"
                  />
                  <button
                    onClick={handleNext}
                    className="text-primary hover:text-primary/80 transition-colors p-1"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
