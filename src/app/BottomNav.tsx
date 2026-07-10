import { BarChart3, List, MessageCircle } from 'lucide-react'
import { cn } from '../shared/lib/cn'

export type AppTab = 'checklist' | 'dashboard' | 'chat'

interface BottomNavProps {
  active: AppTab
  onChange: (tab: AppTab) => void
}

const TABS: Array<{
  id: AppTab
  label: string
  icon: typeof List
}> = [
  { id: 'checklist', label: 'Checklist', icon: List },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
]

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface"
      style={{
        height: 'var(--bottom-nav-height, 4rem)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
      aria-label="Navegación principal"
    >
      <ul className="flex h-full items-stretch">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id

          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center gap-1 text-xs transition-colors',
                  isActive
                    ? 'text-accent-bg'
                    : 'text-secondary hover:text-primary',
                )}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.25 : 2} />
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
