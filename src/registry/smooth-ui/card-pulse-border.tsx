import React from "react";
import { cn } from "@/utils/cn";

const CardPulseBorder = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative size-52", className)} {...props}>
    {children}
  </div>
));

CardPulseBorder.displayName = "CardPulseBorder";

interface CardPulseBorderOutlineProps {
  className?: string;
}

function CardPulseBorderOutline({ className }: CardPulseBorderOutlineProps) {
  return (
    <div className="absolute top-0 flex w-full justify-center">
      <div
        className={cn(
          "left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000",
          className
        )}
      />
    </div>
  );
}

const CardPulseBorderContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full items-center justify-center rounded-md border border-border/5 bg-gradient-to-bl from-grey-800 to-grey-900 px-3 py-2",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

CardPulseBorderContent.displayName = "CardPulseBorderContent";

export { CardPulseBorder, CardPulseBorderOutline, CardPulseBorderContent };
