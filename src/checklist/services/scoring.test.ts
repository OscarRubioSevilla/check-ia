import { describe, expect, it } from 'vitest'
import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import {
  computeProjectScoreSummary,
  getEffectiveScore,
  rankProjectsByScore,
} from './scoring'
import { createDefaultChecklistState, makeCheckKey } from '../types/checklist.types'

describe('scoring', () => {
  it('mapea ratings externos a puntuación cuando no hay override', () => {
    const scores = {}
    const ratings = { [makeCheckKey('calorias', 'capacidad-analisis')]: 'strong' as const }

    expect(
      getEffectiveScore(scores, ratings, 'calorias', 'capacidad-analisis', true),
    ).toBe(5)
  })

  it('prioriza puntuación manual sobre rating externo', () => {
    const scores = { [makeCheckKey('calorias', 'capacidad-analisis')]: 2 as const }
    const ratings = { [makeCheckKey('calorias', 'capacidad-analisis')]: 'strong' as const }

    expect(
      getEffectiveScore(scores, ratings, 'calorias', 'capacidad-analisis', true),
    ).toBe(2)
  })

  it('calcula resumen por proyecto con total y promedio', () => {
    const project = WORKSHOP_PROJECTS.find((entry) => entry.id === 'calorias')
    expect(project).toBeDefined()

    const state = {
      ...createDefaultChecklistState(),
      scores: {
        [makeCheckKey('calorias', 'frontend-funcional')]: 4 as const,
        [makeCheckKey('calorias', 'backend-api')]: 5 as const,
      },
      ratings: {
        [makeCheckKey('calorias', 'capacidad-analisis')]: 'medium' as const,
      },
      checked: {
        [makeCheckKey('calorias', 'responsive')]: true,
      },
    }

    const summary = computeProjectScoreSummary(project!, state)

    expect(summary.totalScore).toBe(12)
    expect(summary.avgScore).toBe(4)
    expect(summary.scoredCount).toBe(3)
    expect(summary.maxPossible).toBe(135)
    expect(summary.completionPercent).toBeGreaterThan(0)
  })

  it('ordena proyectos por promedio descendente', () => {
    const ranked = rankProjectsByScore([
      {
        projectId: 'a',
        projectName: 'A',
        recommended: false,
        greenCount: 0,
        totalScore: 10,
        avgScore: 2,
        scoredCount: 5,
        maxPossible: 135,
        completionPercent: 20,
        completedCount: 5,
        totalCriteria: 27,
      },
      {
        projectId: 'b',
        projectName: 'B',
        recommended: true,
        greenCount: 10,
        totalScore: 20,
        avgScore: 4,
        scoredCount: 5,
        maxPossible: 135,
        completionPercent: 40,
        completedCount: 10,
        totalCriteria: 27,
      },
    ])

    expect(ranked[0]?.projectId).toBe('b')
  })
})
