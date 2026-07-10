export type Rating = 'green' | 'yellow' | 'red'

export interface WorkshopCriterionDefinition {
  id: string
  label: string
}

export interface WorkshopCriterion extends WorkshopCriterionDefinition {
  baselineRating: Rating
  hint: string
}

export interface WorkshopProject {
  id: string
  name: string
  emoji: string
  verdict: string
  criteria: WorkshopCriterion[]
  recommended: boolean
}

export type ProjectChecklistState = Record<string, boolean>

export type ChecklistState = Record<string, ProjectChecklistState>

export interface ProjectProgress {
  checked: number
  total: number
}

export type ProjectProgressMap = Record<string, ProjectProgress>
