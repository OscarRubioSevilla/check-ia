import { create } from 'zustand'
import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import {
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_EVALUATION_CRITERION_IDS,
} from '../../projects/data/workshopCriteria.global'
import {
  computeAllProjectScores,
  computeProjectScoreSummary,
  rankProjectsByScore,
  type ProjectScoreSummary,
} from '../services/scoring'
import {
  loadChecklistState,
  saveChecklistState,
  setNote as applyNote,
  setRating as applyRating,
  setScore as applyScore,
  toggleChecked,
} from '../services/checklistStorage'
import {
  ITEMS_PER_PROJECT,
  makeCheckKey,
  TOTAL_CRITERIA_COUNT,
  type ChecklistState,
  type CriterionScore,
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
  setScore: (
    projectId: string,
    criterionId: string,
    score: CriterionScore | undefined,
  ) => void
  setNote: (projectId: string, criterionId: string, note: string) => void
  getProgress: () => number
  getCompletedCount: () => number
  getProjectProgress: (projectId: string) => ProjectProgress
  getProjectScoreSummary: (projectId: string) => ProjectScoreSummary
  getLeaderboard: () => ProjectScoreSummary[]
  isChecked: (projectId: string, criterionId: string) => boolean
  getRating: (
    projectId: string,
    criterionId: string,
  ) => EvaluationRating | undefined
  getScore: (
    projectId: string,
    criterionId: string,
  ) => CriterionScore | undefined
  getNote: (projectId: string, criterionId: string) => string
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

function countCompleted(state: ChecklistState): number {
  let count = 0

  for (const project of WORKSHOP_PROJECTS) {
    for (const criterionId of WORKSHOP_DELIVERABLE_CRITERION_IDS) {
      if (isDeliverableComplete(state, project.id, criterionId)) {
        count += 1
      }
    }

    for (const criterionId of WORKSHOP_EVALUATION_CRITERION_IDS) {
      if (isEvaluationComplete(state, project.id, criterionId)) {
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
  scores: initialState.scores,
  notes: initialState.notes,
  lastUpdated: initialState.lastUpdated,

  toggleCriterion: (projectId, criterionId) => {
    set((current) => {
      const next = toggleChecked(
        {
          checked: current.checked,
          ratings: current.ratings,
          scores: current.scores,
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
          scores: current.scores,
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

  setScore: (projectId, criterionId, score) => {
    set((current) => {
      const next = applyScore(
        {
          checked: current.checked,
          ratings: current.ratings,
          scores: current.scores,
          notes: current.notes,
          lastUpdated: current.lastUpdated,
        },
        projectId,
        criterionId,
        score,
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
          scores: current.scores,
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
    const state = get()

    const deliverablesDone = WORKSHOP_DELIVERABLE_CRITERION_IDS.filter(
      (criterionId) => isDeliverableComplete(state, projectId, criterionId),
    ).length

    const evaluationsDone = WORKSHOP_EVALUATION_CRITERION_IDS.filter(
      (criterionId) => isEvaluationComplete(state, projectId, criterionId),
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

  getProjectScoreSummary: (projectId) => {
    const project = WORKSHOP_PROJECTS.find((entry) => entry.id === projectId)

    if (!project) {
      return {
        projectId,
        projectName: projectId,
        recommended: false,
        greenCount: 0,
        totalScore: 0,
        avgScore: 0,
        scoredCount: 0,
        maxPossible: ITEMS_PER_PROJECT * 5,
        completionPercent: 0,
        completedCount: 0,
        totalCriteria: ITEMS_PER_PROJECT,
      }
    }

    return computeProjectScoreSummary(project, get())
  },

  getLeaderboard: () => {
    const summaries = computeAllProjectScores(get())
    return rankProjectsByScore(summaries)
  },

  isChecked: (projectId, criterionId) =>
    Boolean(get().checked[makeCheckKey(projectId, criterionId)]),

  getRating: (projectId, criterionId) =>
    get().ratings[makeCheckKey(projectId, criterionId)],

  getScore: (projectId, criterionId) =>
    get().scores[makeCheckKey(projectId, criterionId)],

  getNote: (projectId, criterionId) =>
    get().notes[makeCheckKey(projectId, criterionId)] ?? '',
}))
