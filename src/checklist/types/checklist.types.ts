export type EvaluationRating = 'strong' | 'medium' | 'weak'

export type CriterionScore = 1 | 2 | 3 | 4 | 5

export interface ChecklistState {
  checked: Record<string, boolean>
  ratings: Record<string, EvaluationRating>
  scores: Record<string, CriterionScore>
  notes: Record<string, string>
  lastUpdated: string
}

export const CHECKLIST_STORAGE_KEY = 'workshop-matrix-checklist'

/** 7 proyectos × (17 checkboxes + 10 evaluaciones) */
export const DELIVERABLES_PER_PROJECT = 17
export const EVALUATION_PER_PROJECT = 10
export const ITEMS_PER_PROJECT = DELIVERABLES_PER_PROJECT + EVALUATION_PER_PROJECT
export const TOTAL_CRITERIA_COUNT = 7 * ITEMS_PER_PROJECT
export const MAX_SCORE_PER_CRITERION = 5
export const MAX_POSSIBLE_SCORE_PER_PROJECT =
  ITEMS_PER_PROJECT * MAX_SCORE_PER_CRITERION

export const RATING_TO_SCORE: Record<EvaluationRating, CriterionScore> = {
  strong: 5,
  medium: 3,
  weak: 1,
}

export function makeCheckKey(projectId: string, criterionId: string): string {
  return `${projectId}:${criterionId}`
}

export function createDefaultChecklistState(): ChecklistState {
  return {
    checked: {},
    ratings: {},
    scores: {},
    notes: {},
    lastUpdated: new Date().toISOString(),
  }
}

export function isValidScore(value: number): value is CriterionScore {
  return Number.isInteger(value) && value >= 1 && value <= 5
}
