import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "overflow-hidden [&_svg]:size-[18px] [&_svg]:ml-1 inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium transition-colors duration-100 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-100 text-grey-900 hover:bg-grey-100",
        outline: "border border-grey-500 hover:bg-fd-accent hover:bg-grey-600",
        ghost: "hover:bg-grey- hover:text-grey-100 hover:bg-grey-600",
        secondary: "bg-grey-600 text-fd-secondary-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-5",
        icon: "p-1.5 [&_svg]:size-4 [&_svg]:ml-0",
      },
      shape: {
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      // shape: "pill",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
