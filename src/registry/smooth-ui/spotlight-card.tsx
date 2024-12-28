"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/utils/cn";

export interface SpotlightCardProps<T extends React.ElementType = "div"> {
  as?: T;
  size?: number;
  from?: string;
  via?: string;
  to?: string;
  opacity?: number;
  isAround?: boolean;
  mode?: "before" | "after";
  className?: string;
  children?: React.ReactNode;
}

export function SpotlightCard<T extends React.ElementType = "div">({
  as,
  children,
  className,
  size = 100,
  from = "rgba(255,255,255,0.4)",
  via,
  to = "transparent",
  opacity = 100,
  isAround,
  mode = "before",
  ...props
}: SpotlightCardProps<T> & React.ComponentPropsWithoutRef<T>) {
  const Component = as || "div";

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      if (!e.relatedTarget) {
        document.removeEventListener("mousemove", handleMouseMove);
        mouseX.set(-size);
        mouseY.set(-size);
      }
    },
    [handleMouseMove, mouseX, size, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    document.addEventListener("mousemove", handleMouseMove);
    mouseX.set(-size);
    mouseY.set(-size);
  }, [handleMouseMove, mouseX, size, mouseY]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

  useEffect(() => {
    mouseX.set(-size);
    mouseY.set(-size);
  }, [size, mouseX, mouseY]);

  const gradient = useMemo(() => {
    if (from && via) return `${from}, ${via}, ${to}`;

    return `${from}, ${to}`;
  }, [from, via, to]);

  return (
    <Component
      ref={cardRef}
      className={cn("relative aspect-video overflow-hidden p-[1px]", className)}
      {...props}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 duration-300 group-hover:opacity-100 blur-xl transition-opacity",
          mode === "after" && "z-20"
        )}
        style={{
          background: useMotionTemplate`
            radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${gradient} 80%)
          `,
          opacity: opacity,
        }}
      />

      <div
        className={cn(
          "relative rounded-[inherit]",
          isAround && "h-full w-full bg-background z-20"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
