import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 w-full touch-manipulation items-center justify-center",
        "rounded-sm border px-4 font-mono text-sm font-medium uppercase tracking-wider",
        "transition-colors duration-150 active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix-primary",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" &&
          "border-matrix-primary bg-matrix-panel text-matrix-primary hover:bg-matrix-primary/10",
        variant === "ghost" &&
          "border-matrix-dim/50 bg-transparent text-matrix-muted hover:border-matrix-primary/50 hover:text-matrix-primary",
        className,
      )}
      {...props}
    />
  );
}
