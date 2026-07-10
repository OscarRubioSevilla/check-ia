import { describe, expect, it } from 'vitest'
import {
  ITEMS_PER_PROJECT,
  TOTAL_CRITERIA_COUNT,
} from '../../checklist/types/checklist.types'
import {
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_EVALUATION_CRITERION_IDS,
  WORKSHOP_CRITERIA_GLOBAL,
} from './workshopCriteria.global'
import { WORKSHOP_PROJECTS } from './workshopProjects.seed'

const EXPECTED_PROJECT_IDS = [
  'inventario-qr',
  'cuentas-compartidas',
  'juego-naves',
  'app-estudio',
  'calorias',
  'viajes',
  'meta-concreta',
]

describe('workshopProjects.seed', () => {
  it('incluye los 7 proyectos del taller', () => {
    expect(WORKSHOP_PROJECTS).toHaveLength(7)
    expect(WORKSHOP_PROJECTS.map((project) => project.id)).toEqual(
      EXPECTED_PROJECT_IDS,
    )
  })

  it('asigna los 27 criterios a cada proyecto', () => {
    for (const project of WORKSHOP_PROJECTS) {
      expect(project.criteria).toHaveLength(27)
      expect(project.criteria.map((criterion) => criterion.id)).toEqual(
        WORKSHOP_CRITERIA_GLOBAL.map((criterion) => criterion.id),
      )
    }
  })

  it('define hint y semáforo base para cada criterio de cada proyecto', () => {
    for (const project of WORKSHOP_PROJECTS) {
      for (const criterion of project.criteria) {
        expect(criterion.hint.length).toBeGreaterThan(0)
        expect(['green', 'yellow', 'red']).toContain(criterion.baselineRating)
      }
    }
  })

  it('totaliza 189 ítems (7 × 17 entregables + 7 × 10 evaluaciones)', () => {
    const total = WORKSHOP_PROJECTS.reduce(
      (sum, project) => sum + project.criteria.length,
      0,
    )

    expect(total).toBe(189)
    expect(TOTAL_CRITERIA_COUNT).toBe(189)
    expect(ITEMS_PER_PROJECT).toBe(27)
    expect(WORKSHOP_DELIVERABLE_CRITERION_IDS).toHaveLength(17)
    expect(WORKSHOP_EVALUATION_CRITERION_IDS).toHaveLength(10)
  })
})
