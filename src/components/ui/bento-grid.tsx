"use client";

import { ArrowRightIcon } from "lucide-react";
import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import Link from "next/link";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
        "bg-card border border-white/5 transition-all duration-700",
        className,
      )}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(163, 230, 53, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">{background}</div>
      
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-10 transition-all duration-500 group-hover:-translate-y-12">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary border border-white/5 group-hover:bg-brand-primary group-hover:text-black transition-all duration-700 shadow-2xl mb-8">
          <Icon className="h-8 w-8 origin-left transform-gpu transition-all duration-500 ease-in-out" />
        </div>
        <h3 className="text-3xl font-black tracking-tighter uppercase text-white group-hover:text-brand-primary transition-colors duration-700 italic">
          {name}
        </h3>
        <p className="max-w-lg text-white/30 font-medium text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-700">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Link
          href={href}
          className="pointer-events-auto flex items-center gap-2 text-sm font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all duration-300"
        >
          {cta}
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
};

export { BentoCard, BentoGrid };
