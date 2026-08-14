import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Базовые стили: добавлена плавная физика магнита (увеличение при hover, прожатие при active)
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.95] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-transparent hover:bg-primary/90 hover:border-primary-foreground/30 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--primary)_60%,transparent)] active:border-primary-foreground active:shadow-[0_0_30px_var(--primary)]",
        destructive:
          "bg-destructive text-destructive-foreground border border-transparent hover:bg-destructive/90 hover:border-white/30 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--destructive)_60%,transparent)] active:border-white active:shadow-[0_0_30px_var(--destructive)]",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--primary)_30%,transparent)] active:border-primary active:shadow-[0_0_30px_color-mix(in_srgb,var(--primary)_60%,transparent)]",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent hover:bg-secondary/80 hover:border-primary/30 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--secondary)_50%,transparent)] active:border-primary active:shadow-[0_0_30px_var(--primary)]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:bg-accent/70",
        link: "text-primary underline-offset-4 hover:underline active:opacity-80",
      },
      size: {
        default: "h-8 px-3.5 py-1",
        sm: "h-7 rounded-md px-2.5 text-xs py-0.5",
        lg: "h-9 rounded-md px-6 py-1.5",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
