import { useMemo, useState } from 'react'
import { MobileShell } from '../../app/MobileShell'
import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import { ProjectList } from '../../projects/components/ProjectList'
import { RecommendationPanel } from '../../projects/components/RecommendationPanel'
import type { ChecklistState as ProjectChecklistState } from '../../projects/types/project.types'
import type { CriterionScore, EvaluationRating } from '../types/checklist.types'
import { useChecklistStore } from '../hooks/useChecklistStore'
import { ProgressHeader } from './ProgressHeader'

function toProjectChecklistState(
  checked: Record<string, boolean>,
): ProjectChecklistState {
  const result: ProjectChecklistState = {}

  for (const [key, value] of Object.entries(checked)) {
    const separatorIndex = key.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const projectId = key.slice(0, separatorIndex)
    const criterionId = key.slice(separatorIndex + 1)

    if (!result[projectId]) {
      result[projectId] = {}
    }

    result[projectId][criterionId] = value
  }

  return result
}

function toNestedState<T extends string | number>(
  flat: Record<string, T>,
): Record<string, Record<string, T>> {
  const result: Record<string, Record<string, T>> = {}

  for (const [key, value] of Object.entries(flat)) {
    const separatorIndex = key.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const projectId = key.slice(0, separatorIndex)
    const criterionId = key.slice(separatorIndex + 1)

    if (!result[projectId]) {
      result[projectId] = {}
    }

    result[projectId][criterionId] = value
  }

  return result
}

export function ChecklistPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [recommendationsExpanded, setRecommendationsExpanded] = useState(false)

  const checked = useChecklistStore((state) => state.checked)
  const ratings = useChecklistStore((state) => state.ratings)
  const scores = useChecklistStore((state) => state.scores)
  const toggleCriterion = useChecklistStore((state) => state.toggleCriterion)
  const setRating = useChecklistStore((state) => state.setRating)
  const setScore = useChecklistStore((state) => state.setScore)

  const projectChecklistState = useMemo(
    () => toProjectChecklistState(checked),
    [checked],
  )

  const projectRatingsState = useMemo(
    () => toNestedState(ratings),
    [ratings],
  )

  const projectScoresState = useMemo(
    () => toNestedState(scores) as Record<string, Record<string, CriterionScore>>,
    [scores],
  )

  const handleProjectToggle = (projectId: string) => {
    setExpandedId((current) => {
      const next = current === projectId ? null : projectId
      if (next) {
        requestAnimationFrame(() => {
          document
            .getElementById(`project-card-${next}`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        })
      }
      return next
    })
  }

  const handleCriterionChange = (
    projectId: string,
    criterionId: string,
    nextChecked: boolean,
  ) => {
    const currentChecked = useChecklistStore
      .getState()
      .isChecked(projectId, criterionId)

    if (currentChecked !== nextChecked) {
      toggleCriterion(projectId, criterionId)
    }
  }

  const handleRatingChange = (
    projectId: string,
    criterionId: string,
    rating: EvaluationRating,
  ) => {
    setRating(projectId, criterionId, rating)
  }

  const handleScoreChange = (
    projectId: string,
    criterionId: string,
    score: CriterionScore | undefined,
  ) => {
    setScore(projectId, criterionId, score)
  }

  return (
    <MobileShell
      header={<ProgressHeader />}
      bottomPanel={
        <RecommendationPanel
          projects={WORKSHOP_PROJECTS}
          expanded={recommendationsExpanded}
          onToggle={() => setRecommendationsExpanded((current) => !current)}
        />
      }
      bottomPanelOffset="var(--bottom-nav-height, 0px)"
    >
      <div className="px-4 pt-4 md:mx-auto md:max-w-2xl">
        <ProjectList
          projects={WORKSHOP_PROJECTS}
          checklistState={projectChecklistState}
          ratingsState={projectRatingsState}
          scoresState={projectScoresState}
          expandedId={expandedId}
          onToggle={handleProjectToggle}
          onCriterionChange={handleCriterionChange}
          onRatingChange={handleRatingChange}
          onScoreChange={handleScoreChange}
        />
      </div>
    </MobileShell>
  )
}
