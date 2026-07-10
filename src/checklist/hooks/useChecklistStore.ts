import { create } from 'zustand'
import { WORKSHOP_CRITERION_IDS } from '../../projects/data/workshopCriteria.global'
import {
  loadChecklistState,
  saveChecklistState,
  setNote as applyNote,
  toggleChecked,
} from '../services/checklistStorage'
import {
  makeCheckKey,
  TOTAL_CRITERIA_COUNT,
  type ChecklistState,
} from '../types/checklist.types'

export interface ProjectProgress {
  checked: number
  total: number
  percent: number
}

interface ChecklistStore extends ChecklistState {
  toggleCriterion: (projectId: string, criterionId: string) => void
  setNote: (projectId: string, criterionId: string, note: string) => void
  getProgress: () => number
  getProjectProgress: (projectId: string) => ProjectProgress
  isChecked: (projectId: string, criterionId: string) => boolean
  getNote: (projectId: string, criterionId: string) => string
}

function countChecked(checked: Record<string, boolean>): number {
  return Object.values(checked).filter(Boolean).length
}

function persist(state: ChecklistState): void {
  saveChecklistState(state)
}

const initialState = loadChecklistState()

export const useChecklistStore = create<ChecklistStore>((set, get) => ({
  checked: initialState.checked,
  notes: initialState.notes,
  lastUpdated: initialState.lastUpdated,

  toggleCriterion: (projectId, criterionId) => {
    set((current) => {
      const next = toggleChecked(
        {
          checked: current.checked,
          notes: current.notes,
          lastUpdated: current.lastUpdated,
        },
        projectId,
        criterionId,
      )

      persist(next)
      return next
    })
  },

  setNote: (projectId, criterionId, note) => {
    set((current) => {
      const next = applyNote(
        {
          checked: current.checked,
          notes: current.notes,
          lastUpdated: current.lastUpdated,
        },
        projectId,
        criterionId,
        note,
      )

      persist(next)
      return next
    })
  },

  getProgress: () => {
    const checkedCount = countChecked(get().checked)
    return Math.round((checkedCount / TOTAL_CRITERIA_COUNT) * 100)
  },

  getProjectProgress: (projectId) => {
    const { checked } = get()
    const total = WORKSHOP_CRITERION_IDS.length
    const checkedCount = WORKSHOP_CRITERION_IDS.filter((criterionId) =>
      Boolean(checked[makeCheckKey(projectId, criterionId)]),
    ).length

    return {
      checked: checkedCount,
      total,
      percent: total > 0 ? Math.round((checkedCount / total) * 100) : 0,
    }
  },

  isChecked: (projectId, criterionId) =>
    Boolean(get().checked[makeCheckKey(projectId, criterionId)]),

  getNote: (projectId, criterionId) =>
    get().notes[makeCheckKey(projectId, criterionId)] ?? '',
}))
