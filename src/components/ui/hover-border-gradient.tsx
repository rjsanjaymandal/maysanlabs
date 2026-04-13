"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("TOP");

  const rotateDirection = (currentDirection: string) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const index = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (index - 1 + directions.length) % directions.length
      : (index + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingBackgroundPath = (direction: string) => {
    const paths: { [key: string]: string } = {
      TOP: "radial-gradient(20% 50% at 50% 0%, var(--brand-primary) 0%, rgba(163, 230, 53, 0) 100%)",
      LEFT: "radial-gradient(20% 50% at 0% 50%, var(--brand-primary) 0%, rgba(163, 230, 53, 0) 100%)",
      BOTTOM: "radial-gradient(20% 50% at 50% 100%, var(--brand-primary) 0%, rgba(163, 230, 53, 0) 100%)",
      RIGHT: "radial-gradient(20% 50% at 100% 50%, var(--brand-primary) 0%, rgba(163, 230, 53, 0) 100%)",
    };
    return paths[direction];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex w-fit h-fit transition duration-500 flex-col gap-10 items-center justify-center bg-black/50 hover:bg-black/80 text-white rounded-full p-[1px] group",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-8 py-4 rounded-full",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-full"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingBackgroundPath(direction) }}
        animate={{
          background: hovered
            ? [movingBackgroundPath(direction), "radial-gradient(50% 50% at 50% 50%, var(--brand-primary) 0%, rgba(163, 230, 53, 0) 100%)"]
            : movingBackgroundPath(direction),
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-black absolute inset-[1px] rounded-full z-[1]" />
    </Tag>
  );
}
