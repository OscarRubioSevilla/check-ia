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
        "rounded-lg border px-4 text-sm font-medium",
        "transition-colors duration-150 active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        "disabled:pointer-events-none disabled:opacity-40",
        variant === "primary" &&
          "border-blue-500 bg-blue-500 text-white hover:bg-blue-600",
        variant === "ghost" &&
          "border-gray-200 bg-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900",
        className,
      )}
      {...props}
    />
  );
}
