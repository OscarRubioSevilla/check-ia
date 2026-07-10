import type { ProjectScoreSummary } from '../../checklist/services/scoring'
import { ProjectIcon } from '../../projects/components/ProjectIcon'

interface ProjectComparisonChartProps {
  projects: ProjectScoreSummary[]
}

export function ProjectComparisonChart({
  projects,
}: ProjectComparisonChartProps) {
  const maxAvg = Math.max(...projects.map((entry) => entry.avgScore), 1)

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4"
      aria-label="Comparación de promedios"
    >
      <h2 className="text-sm font-semibold text-primary">
        Comparación por promedio
      </h2>
      <p className="mt-1 text-xs text-secondary">
        Recomendados vs puntuación real
      </p>

      <ul className="mt-4 space-y-3">
        {projects.map((project) => {
          const widthPercent =
            project.avgScore > 0 ? (project.avgScore / maxAvg) * 100 : 0

          return (
            <li key={project.projectId}>
              <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                <div className="flex min-w-0 items-center gap-2">
                  <ProjectIcon
                    projectId={project.projectId}
                    className="size-3.5 shrink-0 text-accent-bg"
                  />
                  <span className="truncate text-primary">{project.projectName}</span>
                  {project.recommended ? (
                    <span className="shrink-0 text-accent-bg">★</span>
                  ) : null}
                </div>
                <span className="shrink-0 text-secondary">
                  {project.avgScore > 0 ? `${project.avgScore}/5` : '—'}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-border-strong">
                <div
                  className="h-full rounded-full bg-accent-bg transition-[width] duration-300"
                  style={{ width: `${widthPercent}%` }}
                  role="presentation"
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
