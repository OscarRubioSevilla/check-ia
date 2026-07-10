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
        "w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
