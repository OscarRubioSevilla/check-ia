import { describe, expect, it } from 'vitest'
import {
  WORKSHOP_CRITERIA_GLOBAL,
  WORKSHOP_CRITERION_IDS,
  WORKSHOP_CRITERION_SECTION_ORDER,
} from './workshopCriteria.global'

describe('workshopCriteria.global', () => {
  it('define 27 criterios oficiales del workshop', () => {
    expect(WORKSHOP_CRITERIA_GLOBAL).toHaveLength(27)
    expect(WORKSHOP_CRITERION_IDS).toHaveLength(27)
  })

  it('agrupa criterios en tres secciones oficiales', () => {
    const sectionCounts = WORKSHOP_CRITERION_SECTION_ORDER.map(
      (section) =>
        WORKSHOP_CRITERIA_GLOBAL.filter(
          (criterion) => criterion.section === section,
        ).length,
    )

    expect(sectionCounts).toEqual([14, 3, 10])
  })

  it('usa ids únicos para cada criterio', () => {
    const uniqueIds = new Set(WORKSHOP_CRITERION_IDS)
    expect(uniqueIds.size).toBe(27)
  })
})
