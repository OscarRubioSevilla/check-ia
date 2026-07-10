import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../shared/lib/cn";

export interface TerminalPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TerminalPanel({
  children,
  className,
  ...props
}: TerminalPanelProps) {
  return (
    <div
      className={cn(
        "w-full rounded-sm border border-matrix-primary/70 bg-matrix-panel p-4",
        "shadow-[0_0_12px_rgba(0,255,65,0.2),inset_0_0_24px_rgba(0,255,65,0.04)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
