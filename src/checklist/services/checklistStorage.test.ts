import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  CHECKLIST_STORAGE_KEY,
  createDefaultChecklistState,
  makeCheckKey,
} from '../types/checklist.types'
import {
  loadChecklistState,
  saveChecklistState,
  setNote,
  setRating,
  setScore,
  toggleChecked,
} from './checklistStorage'

class LocalStorageMock {
  private store = new Map<string, string>()

  get length(): number {
    return this.store.size
  }

  clear(): void {
    this.store.clear()
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
}

describe('checklistStorage', () => {
  beforeEach(() => {
    const mock = new LocalStorageMock()
    Object.defineProperty(globalThis, 'localStorage', {
      value: mock,
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('devuelve estado por defecto cuando localStorage está vacío', () => {
    const state = loadChecklistState()

    expect(state.checked).toEqual({})
    expect(state.ratings).toEqual({})
    expect(state.scores).toEqual({})
    expect(state.notes).toEqual({})
    expect(state.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('devuelve estado por defecto cuando el JSON es inválido', () => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, '{no-json')

    expect(loadChecklistState()).toEqual(createDefaultChecklistState())
  })

  it('normaliza datos parcialmente inválidos al cargar', () => {
    localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify({
        checked: { 'calorias:crud-entidad': true, 'bad:key': 'yes' },
        ratings: {
          'calorias:capacidad-analisis': 'strong',
          'bad:key': 'invalid',
        },
        scores: {
          'calorias:crud-entidad': 4,
          'bad:key': 9,
        },
        notes: { 'calorias:crud-entidad': 'ok', 'bad:key': 1 },
        lastUpdated: '2026-07-10T10:00:00.000Z',
      }),
    )

    expect(loadChecklistState()).toEqual({
      checked: { 'calorias:crud-entidad': true },
      ratings: { 'calorias:capacidad-analisis': 'strong' },
      scores: { 'calorias:crud-entidad': 4 },
      notes: { 'calorias:crud-entidad': 'ok' },
      lastUpdated: '2026-07-10T10:00:00.000Z',
    })
  })

  it('migra estados antiguos sin ratings ni scores', () => {
    localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify({
        checked: { 'viajes:responsive': true },
        notes: {},
        lastUpdated: '2026-07-10T09:00:00.000Z',
      }),
    )

    expect(loadChecklistState()).toEqual({
      checked: { 'viajes:responsive': true },
      ratings: {},
      scores: {},
      notes: {},
      lastUpdated: '2026-07-10T09:00:00.000Z',
    })
  })

  it('guarda y recarga el estado completo', () => {
    const state = {
      checked: { [makeCheckKey('cuentas-compartidas', 'llm-funcional')]: true },
      ratings: {
        [makeCheckKey('cuentas-compartidas', 'capacidad-analisis')]: 'medium' as const,
      },
      scores: {
        [makeCheckKey('cuentas-compartidas', 'llm-funcional')]: 5 as const,
      },
      notes: { [makeCheckKey('cuentas-compartidas', 'llm-funcional')]: 'Muy fuerte' },
      lastUpdated: '2026-07-10T11:00:00.000Z',
    }

    saveChecklistState(state)

    expect(loadChecklistState()).toEqual(state)
    expect(localStorage.getItem(CHECKLIST_STORAGE_KEY)).toBe(
      JSON.stringify(state),
    )
  })

  it('toggleChecked alterna el valor del criterio', () => {
    const base = createDefaultChecklistState()
    const key = makeCheckKey('app-estudio', 'responsive')

    const first = toggleChecked(base, 'app-estudio', 'responsive')
    expect(first.checked[key]).toBe(true)

    const second = toggleChecked(first, 'app-estudio', 'responsive')
    expect(second.checked[key]).toBe(false)
  })

  it('setRating persiste evaluación externa por criterio', () => {
    const base = createDefaultChecklistState()
    const key = makeCheckKey('viajes', 'capacidad-analisis')

    const next = setRating(base, 'viajes', 'capacidad-analisis', 'weak')

    expect(next.ratings[key]).toBe('weak')
    expect(next.checked).toEqual(base.checked)
    expect(next.scores).toEqual(base.scores)
  })

  it('setScore persiste puntuación numérica por criterio', () => {
    const base = createDefaultChecklistState()
    const key = makeCheckKey('calorias', 'frontend-funcional')

    const next = setScore(base, 'calorias', 'frontend-funcional', 4)

    expect(next.scores[key]).toBe(4)

    const cleared = setScore(next, 'calorias', 'frontend-funcional', undefined)
    expect(cleared.scores[key]).toBeUndefined()
  })

  it('setNote persiste texto por criterio', () => {
    const base = createDefaultChecklistState()
    const key = makeCheckKey('viajes', 'api-externa')

    const next = setNote(base, 'viajes', 'api-externa', 'Falta integración real')

    expect(next.notes[key]).toBe('Falta integración real')
    expect(next.checked).toEqual(base.checked)
    expect(next.ratings).toEqual(base.ratings)
    expect(next.scores).toEqual(base.scores)
  })
})
