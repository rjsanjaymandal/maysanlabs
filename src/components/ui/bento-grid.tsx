"use client";

import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
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
        "grid w-full auto-rows-fr grid-cols-1 md:grid-cols-3 gap-4",
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative col-span-3 md:col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(163, 230, 53, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">{background}</div>
      
      <div className="relative z-10 p-6">
        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/60 mb-4 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all duration-200">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          {name}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative z-10 px-6 pb-6">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-medium hover:gap-2 transition-all duration-200"
        >
          {cta}
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </motion.div>
  );
};

export { BentoCard, BentoGrid };
