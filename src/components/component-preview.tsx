"use client";

import { cn } from "@/utils/cn";
import { RotateCw } from "lucide-react";
import { cloneElement, useState } from "react";

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

  const reTrigger = () => {
    setReTriggerKey(Date.now());
  };

  return (
    <div
      className={cn(
        "flex min-h-[350px] w-full items-center justify-center rounded-md p-10",
        className
      )}
    >
      {hasReTrigger && (
        <div
          className="absolute right-4 top-3 cursor-pointer"
          onClick={reTrigger}
        >
          <RotateCw className="h-4 w-4 text-zinc-500" />
        </div>
      )}
      {hasReTrigger
        ? cloneElement(component, { key: reTriggerKey })
        : component}
    </div>
  );
}
