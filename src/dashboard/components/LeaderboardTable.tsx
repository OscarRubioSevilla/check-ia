import type { ProjectScoreSummary } from '../../checklist/services/scoring'
import { ProjectIcon } from '../../projects/components/ProjectIcon'
import { cn } from '../../shared/lib/cn'

interface LeaderboardTableProps {
  projects: ProjectScoreSummary[]
}

export function LeaderboardTable({ projects }: LeaderboardTableProps) {
  return (
    <section
      className="overflow-hidden rounded-lg border border-border bg-surface"
      aria-label="Ranking de proyectos"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-primary">Leaderboard</h2>
        <p className="text-xs text-secondary">
          Ordenado por promedio de puntuación
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-secondary">
              <th className="px-4 py-2 font-medium">#</th>
              <th className="px-4 py-2 font-medium">Proyecto</th>
              <th className="px-4 py-2 font-medium">Prom.</th>
              <th className="px-4 py-2 font-medium">Total</th>
              <th className="px-4 py-2 font-medium">%</th>
              <th className="px-4 py-2 font-medium">Verdes</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.projectId}
                className={cn(
                  'border-b border-border last:border-b-0',
                  project.recommended && 'bg-accent-muted/30',
                )}
              >
                <td className="px-4 py-3 text-secondary">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ProjectIcon
                      projectId={project.projectId}
                      className="size-4 shrink-0 text-accent-bg"
                    />
                    <span className="font-medium text-primary">
                      {project.projectName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-primary">
                  {project.avgScore > 0 ? project.avgScore : '—'}
                </td>
                <td className="px-4 py-3 text-secondary">
                  {project.totalScore}/{project.maxPossible}
                </td>
                <td className="px-4 py-3 text-secondary">
                  {project.completionPercent}%
                </td>
                <td className="px-4 py-3 text-secondary">{project.greenCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
