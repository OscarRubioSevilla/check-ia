import type { CriterionScoreAggregate } from '../../checklist/services/scoring'

interface ScoreBreakdownProps {
  criteria: CriterionScoreAggregate[]
}

export function ScoreBreakdown({ criteria }: ScoreBreakdownProps) {
  const scored = criteria.filter((entry) => entry.scoredProjects > 0)

  if (scored.length === 0) {
    return (
      <section className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-sm font-semibold text-primary">
          Mejores y peores criterios
        </h2>
        <p className="mt-2 text-sm text-secondary">
          Sin datos suficientes para el desglose.
        </p>
      </section>
    )
  }

  const sorted = [...scored].sort((left, right) => right.avgScore - left.avgScore)
  const best = sorted.slice(0, 3)
  const worst = [...sorted].reverse().slice(0, 3)

  return (
    <section
      className="rounded-lg border border-border bg-surface p-4"
      aria-label="Desglose de criterios"
    >
      <h2 className="text-sm font-semibold text-primary">
        Mejores y peores criterios
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-success">
            Más fuertes
          </h3>
          <ul className="mt-2 space-y-2">
            {best.map((entry) => (
              <li
                key={entry.criterionId}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="min-w-0 truncate text-primary">{entry.label}</span>
                <span className="shrink-0 font-medium text-success">
                  {entry.avgScore}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-error">
            Más débiles
          </h3>
          <ul className="mt-2 space-y-2">
            {worst.map((entry) => (
              <li
                key={entry.criterionId}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="min-w-0 truncate text-primary">{entry.label}</span>
                <span className="shrink-0 font-medium text-error">
                  {entry.avgScore}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
