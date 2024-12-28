"use client";

import * as React from "react";

import { CodeBlockWrapper } from "@/components/code-block-wrapper";
import { cn } from "@/utils/cn";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  noExpand?: boolean;
}

export function ComponentSource({
  children,
  className,
  noExpand = false,
  ...props
}: ComponentSourceProps) {
  return noExpand ? (
    <div className="my-6 overflow-hidden rounded-md">{children}</div>
  ) : (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("my-6 overflow-hidden rounded-md", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  );
}
