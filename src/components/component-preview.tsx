"use client";

import { useState } from "react";
import { motion, useAnimation } from "motion/react";

import { cn } from "@/utils/cn";

import { Button } from "./ui/button";

type ComponentPreviewProps = {
  component: React.ReactElement;
  hasReTrigger?: boolean;
  className?: string;
};

export function ComponentPreview({
  component,
  hasReTrigger = false,
  className,
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(Date.now());
  const [isClicking, setIsClicking] = useState<boolean>(false);

  const controls = useAnimation();

  const reTrigger = async () => {
    setIsClicking(true);
    await controls.start("click");
    setIsClicking(false);
    setReTriggerKey(Date.now());
  };

  return (
    <div
      className={cn(
        "flex min-h-[350px] w-full items-center justify-center rounded-md p-10",
        className
      )}
      key={reTriggerKey}
    >
      {hasReTrigger && (
        <Button
          className="absolute right-4 top-3 cursor-pointer z-10"
          size="icon"
          variant="ghost"
          onClick={reTrigger}
          onMouseEnter={() => {
            if (!isClicking) controls.start("enter");
          }}
          onMouseLeave={() => {
            if (!isClicking) controls.start("leave");
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            variants={{
              leave: {
                rotate: "0deg",
              },
              click: {
                rotate: "360deg",
                transition: {
                  duration: 0.7,
                  ease: "easeInOut",
                },
              },
              enter: {
                rotate: "-50deg",
              },
            }}
            animate={controls}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </motion.svg>
        </Button>
      )}
      {component}
    </div>
  );
}
