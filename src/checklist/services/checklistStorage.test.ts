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
    expect(loadChecklistState()).toEqual(createDefaultChecklistState())
  })

  it('devuelve estado por defecto cuando el JSON es inválido', () => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, '{no-json')

    expect(loadChecklistState()).toEqual(createDefaultChecklistState())
  })

  it('normaliza datos parcialmente inválidos al cargar', () => {
    localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify({
        checked: { 'calorias:crud': true, 'bad:key': 'yes' },
        notes: { 'calorias:crud': 'ok', 'bad:key': 1 },
        lastUpdated: '2026-07-10T10:00:00.000Z',
      }),
    )

    expect(loadChecklistState()).toEqual({
      checked: { 'calorias:crud': true },
      notes: { 'calorias:crud': 'ok' },
      lastUpdated: '2026-07-10T10:00:00.000Z',
    })
  })

  it('guarda y recarga el estado completo', () => {
    const state = {
      checked: { [makeCheckKey('cuentas', 'llm-central')]: true },
      notes: { [makeCheckKey('cuentas', 'llm-central')]: 'Muy fuerte' },
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
    const key = makeCheckKey('estudio', 'responsive')

    const first = toggleChecked(base, 'estudio', 'responsive')
    expect(first.checked[key]).toBe(true)

    const second = toggleChecked(first, 'estudio', 'responsive')
    expect(second.checked[key]).toBe(false)
  })

  it('setNote persiste texto por criterio', () => {
    const base = createDefaultChecklistState()
    const key = makeCheckKey('viajes', 'api-externa')

    const next = setNote(base, 'viajes', 'api-externa', 'Falta integración real')

    expect(next.notes[key]).toBe('Falta integración real')
    expect(next.checked).toEqual(base.checked)
  })
})
