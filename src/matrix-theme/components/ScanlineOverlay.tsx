import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../shared/lib/cn";

export interface ScanlineOverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Layout wrapper; global scanlines are rendered via matrix.css body::after */
export function ScanlineOverlay({
  children,
  className,
  ...props
}: ScanlineOverlayProps) {
  return (
    <div className={cn("relative min-h-svh w-full", className)} {...props}>
      {children}
    </div>
  );
}
