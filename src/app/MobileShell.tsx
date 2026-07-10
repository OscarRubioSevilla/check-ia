import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export interface ProgressHeaderProps extends PropsWithChildren {
  className?: string
}

/** Sticky header slot for global progress (e.g. completion %). */
export function ProgressHeader({ children, className }: ProgressHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-20 border-b border-gray-200 bg-white',
        className,
      )}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div
        className="px-4 py-3"
        style={{
          paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
          paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
        }}
      >
        {children}
      </div>
    </header>
  )
}

export interface MobileShellProps extends PropsWithChildren {
  header?: ReactNode
  bottomPanel?: ReactNode
  className?: string
}

export function MobileShell({
  header,
  children,
  bottomPanel,
  className,
}: MobileShellProps) {
  return (
    <div
      className={cn(
        'flex min-h-svh flex-col bg-gray-50 text-gray-700',
        className,
      )}
    >
      {header ? <ProgressHeader>{header}</ProgressHeader> : null}

      <main
        className="flex-1 overflow-y-auto overscroll-y-contain pb-24"
        style={{
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {children}
      </main>

      {bottomPanel ? (
        <div
          className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            paddingLeft: 'env(safe-area-inset-left, 0px)',
            paddingRight: 'env(safe-area-inset-right, 0px)',
          }}
        >
          {bottomPanel}
        </div>
      ) : null}
    </div>
  )
}
