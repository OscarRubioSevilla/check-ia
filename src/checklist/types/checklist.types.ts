export interface ChecklistState {
  checked: Record<string, boolean>
  notes: Record<string, string>
  lastUpdated: string
}

export const CHECKLIST_STORAGE_KEY = 'workshop-matrix-checklist'

/** 7 proyectos × 27 criterios */
export const TOTAL_CRITERIA_COUNT = 189

export function makeCheckKey(projectId: string, criterionId: string): string {
  return `${projectId}:${criterionId}`
}

export function createDefaultChecklistState(): ChecklistState {
  return {
    checked: {},
    notes: {},
    lastUpdated: new Date().toISOString(),
  }
}
