export type EvaluationRating = 'strong' | 'medium' | 'weak'

export interface ChecklistState {
  checked: Record<string, boolean>
  ratings: Record<string, EvaluationRating>
  notes: Record<string, string>
  lastUpdated: string
}

export const CHECKLIST_STORAGE_KEY = 'workshop-matrix-checklist'

/** 7 proyectos × (17 checkboxes + 10 evaluaciones) */
export const DELIVERABLES_PER_PROJECT = 17
export const EVALUATION_PER_PROJECT = 10
export const ITEMS_PER_PROJECT = DELIVERABLES_PER_PROJECT + EVALUATION_PER_PROJECT
export const TOTAL_CRITERIA_COUNT = 7 * ITEMS_PER_PROJECT

export function makeCheckKey(projectId: string, criterionId: string): string {
  return `${projectId}:${criterionId}`
}

export function createDefaultChecklistState(): ChecklistState {
  return {
    checked: {},
    ratings: {},
    notes: {},
    lastUpdated: new Date().toISOString(),
  }
}
