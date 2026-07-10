import { useMemo } from 'react'
import { MobileShell } from '../../app/MobileShell'
import {
  computeAllProjectScores,
  computeCriterionAggregates,
  rankProjectsByScore,
} from '../../checklist/services/scoring'
import { useChecklistStore } from '../../checklist/hooks/useChecklistStore'
import { LeaderboardTable } from './LeaderboardTable'
import { ProjectComparisonChart } from './ProjectComparisonChart'
import { ScoreBreakdown } from './ScoreBreakdown'
import { TopProjectsCard } from './TopProjectsCard'

export function DashboardPage() {
  const checked = useChecklistStore((state) => state.checked)
  const ratings = useChecklistStore((state) => state.ratings)
  const scores = useChecklistStore((state) => state.scores)
  const notes = useChecklistStore((state) => state.notes)
  const lastUpdated = useChecklistStore((state) => state.lastUpdated)

  const storeState = useMemo(
    () => ({ checked, ratings, scores, notes, lastUpdated }),
    [checked, ratings, scores, notes, lastUpdated],
  )

  const leaderboard = useMemo(
    () => rankProjectsByScore(computeAllProjectScores(storeState)),
    [storeState],
  )

  const criterionAggregates = useMemo(
    () => computeCriterionAggregates(storeState),
    [storeState],
  )

  const recommended = leaderboard.filter((entry) => entry.recommended)
  const notRecommended = leaderboard.filter((entry) => !entry.recommended)

  return (
    <MobileShell
      header={
        <>
          <h1 className="text-base font-semibold text-primary">
            Dashboard de evaluación
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Ranking y comparación de los 7 proyectos del taller
          </p>
        </>
      }
      bottomPanelOffset="var(--bottom-nav-height, 0px)"
    >
      <div className="space-y-4 px-4 pt-4 pb-6 md:mx-auto md:max-w-2xl">
        <TopProjectsCard projects={leaderboard} />
        <LeaderboardTable projects={leaderboard} />
        <ProjectComparisonChart projects={leaderboard} />

        {recommended.length > 0 ? (
          <section className="rounded-lg border border-border bg-surface p-4">
            <h2 className="text-sm font-semibold text-primary">
              Recomendados vs resto
            </h2>
            <p className="mt-2 text-sm text-secondary">
              {recommended.length} recomendado
              {recommended.length === 1 ? '' : 's'} con promedio{' '}
              {(
                recommended.reduce((sum, entry) => sum + entry.avgScore, 0) /
                recommended.length
              ).toFixed(1)}
              /5 frente a{' '}
              {notRecommended.length > 0
                ? (
                    notRecommended.reduce((sum, entry) => sum + entry.avgScore, 0) /
                    notRecommended.length
                  ).toFixed(1)
                : '—'}
              /5 del resto.
            </p>
          </section>
        ) : null}

        <ScoreBreakdown criteria={criterionAggregates} />
      </div>
    </MobileShell>
  )
}
