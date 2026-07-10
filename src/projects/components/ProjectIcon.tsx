import type { LucideIcon } from 'lucide-react'
import {
  ClipboardList,
  Lock,
  Package,
  Plane,
  Rocket,
  Salad,
  Target,
} from 'lucide-react'
import { cn } from '@/shared/lib/cn'

const ICON_BY_PROJECT_ID: Record<string, LucideIcon> = {
  'inventario-qr': Package,
  'cuentas-compartidas': Lock,
  'juego-naves': Rocket,
  'app-estudio': ClipboardList,
  calorias: Salad,
  viajes: Plane,
  'meta-concreta': Target,
}

export interface ProjectIconProps {
  projectId: string
  className?: string
}

export function ProjectIcon({ projectId, className }: ProjectIconProps) {
  const Icon = ICON_BY_PROJECT_ID[projectId] ?? Package

  return (
    <Icon
      className={cn('shrink-0', className)}
      aria-hidden
      strokeWidth={1.75}
    />
  )
}
