import type { ProjectScoreSummary } from '../../checklist/services/scoring'
import { ProjectIcon } from '../../projects/components/ProjectIcon'
import { cn } from '../../shared/lib/cn'
import { Medal, Trophy } from 'lucide-react'

interface TopProjectsCardProps {
  projects: ProjectScoreSummary[]
}

const MEDAL_ICONS = [Trophy, Medal, Medal] as const
const MEDAL_COLORS = [
  'text-warning',
  'text-secondary',
  'text-secondary',
] as const

export function TopProjectsCard({ projects }: TopProjectsCardProps) {
  const topThree = projects.slice(0, 3)

  if (topThree.length === 0) {
    return (
      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-primary">Mejores calificaciones</h2>
        <p className="mt-2 text-sm text-secondary">
          Aún no hay puntuaciones. Califica criterios en el checklist.
        </p>
      </section>
    )
  }

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4"
      aria-label="Top 3 proyectos por puntuación"
    >
      <h2 className="text-sm font-semibold text-primary">Mejores calificaciones</h2>
      <ul className="mt-3 space-y-3">
        {topThree.map((project, index) => {
          const Icon = MEDAL_ICONS[index] ?? Medal

          return (
            <li
              key={project.projectId}
              className="flex items-center gap-3 rounded-md border border-border bg-body px-3 py-2"
            >
              <Icon
                className={cn('size-5 shrink-0', MEDAL_COLORS[index])}
                aria-hidden
              />
              <ProjectIcon
                projectId={project.projectId}
                className="size-5 shrink-0 text-accent-bg"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary">
                  {project.projectName}
                </p>
                <p className="text-xs text-secondary">
                  Promedio {project.avgScore}/5 · Total {project.totalScore}/
                  {project.maxPossible}
                </p>
              </div>
              {project.recommended ? (
                <span className="shrink-0 rounded-full bg-accent-muted px-2 py-0.5 text-xs text-accent-bg">
                  Recomendado
                </span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
