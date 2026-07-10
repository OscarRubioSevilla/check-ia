import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import {
  WORKSHOP_CRITERIA_GLOBAL,
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_EVALUATION_CRITERION_IDS,
} from '../../projects/data/workshopCriteria.global'
import type { WorkshopProject } from '../../projects/types/project.types'
import {
  ITEMS_PER_PROJECT,
  MAX_POSSIBLE_SCORE_PER_PROJECT,
  RATING_TO_SCORE,
  makeCheckKey,
  type ChecklistState,
  type CriterionScore,
  type EvaluationRating,
} from '../types/checklist.types'

export interface ProjectScoreSummary {
  projectId: string
  projectName: string
  recommended: boolean
  greenCount: number
  totalScore: number
  avgScore: number
  scoredCount: number
  maxPossible: number
  completionPercent: number
  completedCount: number
  totalCriteria: number
}

export interface CriterionScoreAggregate {
  criterionId: string
  label: string
  section: string
  avgScore: number
  scoredProjects: number
  totalProjects: number
}

function isDeliverableComplete(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
): boolean {
  const key = makeCheckKey(projectId, criterionId)
  return Boolean(state.checked[key]) || state.scores[key] !== undefined
}

function isEvaluationComplete(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
): boolean {
  const key = makeCheckKey(projectId, criterionId)
  return state.ratings[key] !== undefined || state.scores[key] !== undefined
}

export function getEffectiveScore(
  scores: Record<string, CriterionScore>,
  ratings: Record<string, EvaluationRating>,
  projectId: string,
  criterionId: string,
  isExternal: boolean,
): CriterionScore | undefined {
  const key = makeCheckKey(projectId, criterionId)
  const manual = scores[key]

  if (manual !== undefined) {
    return manual
  }

  if (isExternal) {
    const rating = ratings[key]
    if (rating !== undefined) {
      return RATING_TO_SCORE[rating]
    }
  }

  return undefined
}

export function countProjectCompleted(state: ChecklistState, projectId: string): number {
  let count = 0

  for (const criterionId of WORKSHOP_DELIVERABLE_CRITERION_IDS) {
    if (isDeliverableComplete(state, projectId, criterionId)) {
      count += 1
    }
  }

  for (const criterionId of WORKSHOP_EVALUATION_CRITERION_IDS) {
    if (isEvaluationComplete(state, projectId, criterionId)) {
      count += 1
    }
  }

  return count
}

export function computeProjectScoreSummary(
  project: WorkshopProject,
  state: ChecklistState,
): ProjectScoreSummary {
  let totalScore = 0
  let scoredCount = 0

  for (const criterion of project.criteria) {
    const isExternal = criterion.section === 'evaluacion-externa'
    const effective = getEffectiveScore(
      state.scores,
      state.ratings,
      project.id,
      criterion.id,
      isExternal,
    )

    if (effective !== undefined) {
      totalScore += effective
      scoredCount += 1
    }
  }

  const completedCount = countProjectCompleted(state, project.id)
  const greenCount = project.criteria.filter(
    (criterion) => criterion.baselineRating === 'green',
  ).length

  return {
    projectId: project.id,
    projectName: project.name,
    recommended: project.recommended,
    greenCount,
    totalScore,
    avgScore: scoredCount > 0 ? Math.round((totalScore / scoredCount) * 10) / 10 : 0,
    scoredCount,
    maxPossible: MAX_POSSIBLE_SCORE_PER_PROJECT,
    completionPercent:
      ITEMS_PER_PROJECT > 0
        ? Math.round((completedCount / ITEMS_PER_PROJECT) * 100)
        : 0,
    completedCount,
    totalCriteria: ITEMS_PER_PROJECT,
  }
}

export function computeAllProjectScores(
  state: ChecklistState,
  projects: WorkshopProject[] = WORKSHOP_PROJECTS,
): ProjectScoreSummary[] {
  return projects.map((project) => computeProjectScoreSummary(project, state))
}

export function rankProjectsByScore(
  summaries: ProjectScoreSummary[],
): ProjectScoreSummary[] {
  return [...summaries].sort((left, right) => {
    if (right.avgScore !== left.avgScore) {
      return right.avgScore - left.avgScore
    }
    if (right.totalScore !== left.totalScore) {
      return right.totalScore - left.totalScore
    }
    return right.completionPercent - left.completionPercent
  })
}

export function computeCriterionAggregates(
  state: ChecklistState,
  projects: WorkshopProject[] = WORKSHOP_PROJECTS,
): CriterionScoreAggregate[] {
  return WORKSHOP_CRITERIA_GLOBAL.map((criterion) => {
    const isExternal = criterion.section === 'evaluacion-externa'
    let sum = 0
    let scoredProjects = 0

    for (const project of projects) {
      const effective = getEffectiveScore(
        state.scores,
        state.ratings,
        project.id,
        criterion.id,
        isExternal,
      )

      if (effective !== undefined) {
        sum += effective
        scoredProjects += 1
      }
    }

    return {
      criterionId: criterion.id,
      label: criterion.label,
      section: criterion.section,
      avgScore:
        scoredProjects > 0
          ? Math.round((sum / scoredProjects) * 10) / 10
          : 0,
      scoredProjects,
      totalProjects: projects.length,
    }
  })
}
