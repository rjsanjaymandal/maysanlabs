"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export default function PremiumButton({ 
  children, 
  href, 
  className = "", 
  variant = "primary",
  size = "md",
  showArrow = true,
  icon,
  onClick
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-300 rounded-full overflow-hidden";
  
  const sizeStyles = {
    sm: "px-5 py-2.5 text-[10px]",
    md: "px-7 py-3.5 text-xs",
    lg: "px-9 py-4.5 text-sm"
  };

  const variantStyles = {
    primary: "bg-[#1A6DD6] text-white shadow-lg shadow-blue-500/25 before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 hover:text-white",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30"
  };

  const buttonClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <motion.span 
      className="flex items-center gap-2.5 relative z-10"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      {children}
      {showArrow && variant === "primary" && <ArrowRight size={14} />}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {content}
    </button>
  );
}

export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] md:hidden px-4 pb-4">
      <Link 
        href="/init"
        className="relative flex items-center justify-center gap-2.5 w-full py-4 bg-[#1A6DD6] rounded-2xl font-bold text-[10px] uppercase tracking-widest text-white shadow-xl shadow-blue-500/30 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <Phone size={15} className="relative z-10" />
        <span className="relative z-10">Book a Call</span>
      </Link>
    </div>
  );
}

export function NavCTA() {
  return (
    <Link 
      href="/init" 
      className="relative px-6 py-2.5 bg-[#1A6DD6] rounded-full font-extrabold text-[10px] uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      <span className="relative z-10">Book a Call</span>
    </Link>
  );
}