"use client";

import { cn } from "@/utils/cn";
import { RotateCw } from "lucide-react";
import { useState } from "react";
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
  const [isAnimateSpin, setIsAnimateSpin] = useState(false);

  const reTrigger = () => {
    setReTriggerKey(Date.now());
    setIsAnimateSpin(true);
    setTimeout(() => setIsAnimateSpin(false), 1000);
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
          className={cn(
            "absolute right-4 top-3 cursor-pointer z-10 group",
            isAnimateSpin && "animate-spin-fast"
          )}
          size="icon"
          onClick={reTrigger}
        >
          <RotateCw className="h-4 w-4 text-zinc-500 group-hover:text-grey-100 transition-colors" />
        </Button>
      )}
      {component}
    </div>
  );
}
