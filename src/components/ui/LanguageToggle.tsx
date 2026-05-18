"use client";

import { Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "عربي", name: "العربية" },
];

export default function LanguageToggle({ currentLang = "en" }: { currentLang?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Mobile Inline Segmented Switcher */}
      <div className="flex lg:hidden items-center p-1 bg-white/[0.03] border border-white/5 rounded-full shadow-inner">
        {languages.map((lang) => (
          <Link
            key={lang.code}
            href={`/${lang.code === "en" ? "" : lang.code}`}
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 ${
              currentLang === lang.code
                ? "bg-[#1A6DD6] text-white shadow-md shadow-blue-500/20"
                : "text-white/45 hover:text-white/70"
            }`}
          >
            {lang.label}
          </Link>
        ))}
      </div>

      {/* Desktop Dropdown Switcher */}
      <div className="hidden lg:block relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/5 text-white/60 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-all duration-200"
          aria-label="Select language"
        >
          <Globe size={18} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-12 mt-2 w-40 bg-[var(--bg-dark)] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={`/${lang.code === "en" ? "" : lang.code}`}
                className={`block px-4 py-3 text-sm transition-colors ${
                  currentLang === lang.code
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="font-medium">{lang.label}</span>
                <span className="text-white/40 ml-2 text-xs">{lang.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}