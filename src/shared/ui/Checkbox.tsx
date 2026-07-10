import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({
  label,
  className,
  id,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        "flex min-h-12 w-full cursor-pointer touch-manipulation items-center gap-3",
        "rounded-sm border border-matrix-dim/60 bg-matrix-panel px-4 py-2",
        "font-mono text-sm text-matrix-primary",
        "transition-colors duration-150 hover:border-matrix-primary/50",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-matrix-primary",
        className,
      )}
    >
      <input
        type="checkbox"
        id={checkboxId}
        className="size-5 shrink-0 accent-matrix-primary"
        {...props}
      />
      <span className="flex-1 text-left leading-snug">{label}</span>
    </label>
  );
}
