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
        "rounded-md border px-4 text-sm font-medium",
        "transition-colors duration-150 active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-bg",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" &&
          "border-accent-bg bg-accent-bg text-on-accent hover:opacity-90",
        variant === "ghost" &&
          "border-border bg-transparent text-secondary hover:border-border-strong hover:text-primary",
        className,
      )}
      {...props}
    />
  );
}
