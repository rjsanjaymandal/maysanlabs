"use client";

import { ArrowRightIcon } from "lucide-react";
import { ReactNode, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from "framer-motion";
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

  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    centerX.set(width / 2);
    centerY.set(height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(centerX.get());
    mouseY.set(centerY.get());
  }

  const rotateX = useTransform(
    [springY, centerY],
    ([y, halfH]: number[]) => (halfH ? ((y - halfH) / halfH) * -6 : 0)
  );
  const rotateY = useTransform(
    [springX, centerX],
    ([x, halfW]: number[]) => (halfW ? ((x - halfW) / halfW) * 6 : 0)
  );

  return (
    <motion.div
      key={name}
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, rotateX, rotateY }}
      className={cn(
        "group relative col-span-3 md:col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
        "p-[1px] bg-[var(--glass-chip-bg)] hover:bg-[var(--glass-chip-bg)] transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 shadow-lg hover:shadow-2xl",
        className,
      )}
    >
      {/* Dynamic Cursor-Tracking Ambient Card Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(26, 109, 214, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Dynamic Cursor-Tracking 1px Border Stroke Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 -z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              rgba(26, 109, 214, 0.45),
              transparent 80%
            )
          `,
        }}
      />

      {/* High-contrast solid dark backdrop container */}
      <div className="relative flex flex-col justify-between h-full w-full rounded-[15px] bg-[var(--surface-elevated)] overflow-hidden p-6 z-10">
        <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500">{background}</div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] rounded-xl flex items-center justify-center text-foreground/50 mb-5 group-hover:bg-brand-primary/15 group-hover:text-brand-primary transition-all duration-300">
            <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-foreground/45 text-sm leading-relaxed group-hover:text-foreground/60 transition-colors duration-300">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-6">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-brand-primary text-xs font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all duration-300"
          >
            <span>{cta}</span>
            <ArrowRightIcon className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export { BentoCard, BentoGrid };
