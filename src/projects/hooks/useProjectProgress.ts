import { useMemo } from 'react'
import type { EvaluationRating } from '../../checklist/types/checklist.types'
import { ITEMS_PER_PROJECT } from '../../checklist/types/checklist.types'
import {
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_EVALUATION_CRITERION_IDS,
} from '../data/workshopCriteria.global'
import type {
  ChecklistState,
  ProjectProgressMap,
  WorkshopProject,
} from '../types/project.types'

export function useProjectProgress(
  projects: WorkshopProject[],
  checklistState: ChecklistState,
  ratingsState: Record<string, Record<string, EvaluationRating>>,
): ProjectProgressMap {
  return useMemo(() => {
    const progress: ProjectProgressMap = {}

    for (const project of projects) {
      const projectChecks = checklistState[project.id] ?? {}
      const projectRatings = ratingsState[project.id] ?? {}

      const deliverablesDone = WORKSHOP_DELIVERABLE_CRITERION_IDS.filter(
        (criterionId) => projectChecks[criterionId] === true,
      ).length

      const evaluationsDone = WORKSHOP_EVALUATION_CRITERION_IDS.filter(
        (criterionId) => projectRatings[criterionId] !== undefined,
      ).length

      progress[project.id] = {
        checked: deliverablesDone + evaluationsDone,
        total: ITEMS_PER_PROJECT,
      }
    }

    return progress
  }, [projects, checklistState, ratingsState])
}
