import { create } from 'zustand'
import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import {
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_EVALUATION_CRITERION_IDS,
} from '../../projects/data/workshopCriteria.global'
import {
  loadChecklistState,
  saveChecklistState,
  setNote as applyNote,
  setRating as applyRating,
  toggleChecked,
} from '../services/checklistStorage'
import {
  ITEMS_PER_PROJECT,
  makeCheckKey,
  TOTAL_CRITERIA_COUNT,
  type ChecklistState,
  type EvaluationRating,
} from '../types/checklist.types'

export interface ProjectProgress {
  checked: number
  total: number
  percent: number
}

interface ChecklistStore extends ChecklistState {
  toggleCriterion: (projectId: string, criterionId: string) => void
  setRating: (
    projectId: string,
    criterionId: string,
    rating: EvaluationRating,
  ) => void
  setNote: (projectId: string, criterionId: string, note: string) => void
  getProgress: () => number
  getCompletedCount: () => number
  getProjectProgress: (projectId: string) => ProjectProgress
  isChecked: (projectId: string, criterionId: string) => boolean
  getRating: (
    projectId: string,
    criterionId: string,
  ) => EvaluationRating | undefined
  getNote: (projectId: string, criterionId: string) => string
}

function countCompleted(state: ChecklistState): number {
  let count = 0

  for (const project of WORKSHOP_PROJECTS) {
    for (const criterionId of WORKSHOP_DELIVERABLE_CRITERION_IDS) {
      if (state.checked[makeCheckKey(project.id, criterionId)]) {
        count += 1
      }
    }

    for (const criterionId of WORKSHOP_EVALUATION_CRITERION_IDS) {
      if (state.ratings[makeCheckKey(project.id, criterionId)]) {
        count += 1
      }
    }
  }

  return count
}

function persist(state: ChecklistState): void {
  saveChecklistState(state)
}

const initialState = loadChecklistState()

export const useChecklistStore = create<ChecklistStore>((set, get) => ({
  checked: initialState.checked,
  ratings: initialState.ratings,
  notes: initialState.notes,
  lastUpdated: initialState.lastUpdated,

  toggleCriterion: (projectId, criterionId) => {
    set((current) => {
      const next = toggleChecked(
        {
          checked: current.checked,
          ratings: current.ratings,
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

  setRating: (projectId, criterionId, rating) => {
    set((current) => {
      const next = applyRating(
        {
          checked: current.checked,
          ratings: current.ratings,
          notes: current.notes,
          lastUpdated: current.lastUpdated,
        },
        projectId,
        criterionId,
        rating,
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
          ratings: current.ratings,
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

  getCompletedCount: () => countCompleted(get()),

  getProgress: () => {
    const completed = countCompleted(get())
    return Math.round((completed / TOTAL_CRITERIA_COUNT) * 100)
  },

  getProjectProgress: (projectId) => {
    const { checked, ratings } = get()

    const deliverablesDone = WORKSHOP_DELIVERABLE_CRITERION_IDS.filter(
      (criterionId) =>
        Boolean(checked[makeCheckKey(projectId, criterionId)]),
    ).length

    const evaluationsDone = WORKSHOP_EVALUATION_CRITERION_IDS.filter(
      (criterionId) =>
        Boolean(ratings[makeCheckKey(projectId, criterionId)]),
    ).length

    const completed = deliverablesDone + evaluationsDone

    return {
      checked: completed,
      total: ITEMS_PER_PROJECT,
      percent:
        ITEMS_PER_PROJECT > 0
          ? Math.round((completed / ITEMS_PER_PROJECT) * 100)
          : 0,
    }
  },

  isChecked: (projectId, criterionId) =>
    Boolean(get().checked[makeCheckKey(projectId, criterionId)]),

  getRating: (projectId, criterionId) =>
    get().ratings[makeCheckKey(projectId, criterionId)],

  getNote: (projectId, criterionId) =>
    get().notes[makeCheckKey(projectId, criterionId)] ?? '',
}))
