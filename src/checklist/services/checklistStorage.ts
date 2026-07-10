import {
  CHECKLIST_STORAGE_KEY,
  createDefaultChecklistState,
  isValidScore,
  makeCheckKey,
  type ChecklistState,
  type CriterionScore,
  type EvaluationRating,
} from '../types/checklist.types'

const VALID_RATINGS = new Set<EvaluationRating>(['strong', 'medium', 'weak'])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isChecklistState(value: unknown): value is ChecklistState {
  if (!isRecord(value)) {
    return false
  }

  return (
    isRecord(value.checked) &&
    isRecord(value.notes) &&
    typeof value.lastUpdated === 'string' &&
    (value.ratings === undefined || isRecord(value.ratings)) &&
    (value.scores === undefined || isRecord(value.scores))
  )
}

function sanitizeBooleanRecord(
  value: Record<string, unknown>,
): Record<string, boolean> {
  const result: Record<string, boolean> = {}

  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === 'boolean') {
      result[key] = entry
    }
  }

  return result
}

function sanitizeStringRecord(
  value: Record<string, unknown>,
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === 'string') {
      result[key] = entry
    }
  }

  return result
}

function sanitizeRatingRecord(
  value: Record<string, unknown> | undefined,
): Record<string, EvaluationRating> {
  const result: Record<string, EvaluationRating> = {}

  if (!value) {
    return result
  }

  for (const [key, entry] of Object.entries(value)) {
    if (
      typeof entry === 'string' &&
      VALID_RATINGS.has(entry as EvaluationRating)
    ) {
      result[key] = entry as EvaluationRating
    }
  }

  return result
}

function sanitizeScoreRecord(
  value: Record<string, unknown> | undefined,
): Record<string, CriterionScore> {
  const result: Record<string, CriterionScore> = {}

  if (!value) {
    return result
  }

  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === 'number' && isValidScore(entry)) {
      result[key] = entry
    }
  }

  return result
}

function normalizeChecklistState(value: unknown): ChecklistState {
  if (!isChecklistState(value)) {
    return createDefaultChecklistState()
  }

  return {
    checked: sanitizeBooleanRecord(value.checked),
    ratings: sanitizeRatingRecord(value.ratings),
    scores: sanitizeScoreRecord(value.scores),
    notes: sanitizeStringRecord(value.notes),
    lastUpdated: value.lastUpdated,
  }
}

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function loadChecklistState(): ChecklistState {
  if (!canUseLocalStorage()) {
    return createDefaultChecklistState()
  }

  try {
    const raw = window.localStorage.getItem(CHECKLIST_STORAGE_KEY)

    if (raw === null || raw.trim() === '') {
      return createDefaultChecklistState()
    }

    const parsed: unknown = JSON.parse(raw)
    return normalizeChecklistState(parsed)
  } catch {
    return createDefaultChecklistState()
  }
}

export function saveChecklistState(state: ChecklistState): void {
  if (!canUseLocalStorage()) {
    return
  }

  try {
    const payload: ChecklistState = {
      checked: state.checked,
      ratings: state.ratings,
      scores: state.scores,
      notes: state.notes,
      lastUpdated: state.lastUpdated,
    }

    window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // QuotaExceededError u otros fallos de almacenamiento: no interrumpir la UI.
  }
}

export function toggleChecked(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
): ChecklistState {
  const key = makeCheckKey(projectId, criterionId)

  return {
    checked: {
      ...state.checked,
      [key]: !state.checked[key],
    },
    ratings: { ...state.ratings },
    scores: { ...state.scores },
    notes: { ...state.notes },
    lastUpdated: new Date().toISOString(),
  }
}

export function setRating(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
  rating: EvaluationRating,
): ChecklistState {
  const key = makeCheckKey(projectId, criterionId)

  return {
    checked: { ...state.checked },
    ratings: {
      ...state.ratings,
      [key]: rating,
    },
    scores: { ...state.scores },
    notes: { ...state.notes },
    lastUpdated: new Date().toISOString(),
  }
}

export function setScore(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
  score: CriterionScore | undefined,
): ChecklistState {
  const key = makeCheckKey(projectId, criterionId)
  const nextScores = { ...state.scores }

  if (score === undefined) {
    delete nextScores[key]
  } else {
    nextScores[key] = score
  }

  return {
    checked: { ...state.checked },
    ratings: { ...state.ratings },
    scores: nextScores,
    notes: { ...state.notes },
    lastUpdated: new Date().toISOString(),
  }
}

export function setNote(
  state: ChecklistState,
  projectId: string,
  criterionId: string,
  note: string,
): ChecklistState {
  const key = makeCheckKey(projectId, criterionId)

  return {
    checked: { ...state.checked },
    ratings: { ...state.ratings },
    scores: { ...state.scores },
    notes: {
      ...state.notes,
      [key]: note,
    },
    lastUpdated: new Date().toISOString(),
  }
}
