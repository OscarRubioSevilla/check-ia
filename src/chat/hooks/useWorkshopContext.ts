import { useMemo } from 'react'
import { WORKSHOP_PROJECTS } from '../../projects/data/workshopProjects.seed'
import { WORKSHOP_CRITERIA_GLOBAL } from '../../projects/data/workshopCriteria.global'
import {
  computeAllProjectScores,
  getEffectiveScore,
} from '../../checklist/services/scoring'
import { useChecklistStore } from '../../checklist/hooks/useChecklistStore'

const SYSTEM_PROMPT_BASE = `Eres un asistente de evaluación para un taller de desarrollo con 7 proyectos y 27 criterios por proyecto (17 entregables + 10 evaluación externa).

Responde siempre en español, de forma clara y concisa. Usa los datos de puntuación actuales del usuario para dar recomendaciones concretas. Formatea respuestas con markdown: **negritas** para énfasis y listas con guiones, cada ítem en su propia línea.

Puedes responder preguntas como:
- ¿Cuál proyecto va mejor?
- Resume la evaluación de un proyecto específico
- ¿Qué criterios faltan en un proyecto?
- Sugerencias de mejora según puntuaciones

Escala de puntuación: 1 (muy débil) a 5 (excelente). Evaluación externa mapea Fuerte=5, Medio=3, Débil=1 salvo override manual.`

export function useWorkshopContext(): string {
  const checked = useChecklistStore((state) => state.checked)
  const ratings = useChecklistStore((state) => state.ratings)
  const scores = useChecklistStore((state) => state.scores)
  const notes = useChecklistStore((state) => state.notes)

  return useMemo(() => {
    const state = { checked, ratings, scores, notes, lastUpdated: '' }
    const summaries = computeAllProjectScores(state)

    const projectBlocks = WORKSHOP_PROJECTS.map((project) => {
      const summary = summaries.find((entry) => entry.projectId === project.id)
      const criterionLines = WORKSHOP_CRITERIA_GLOBAL.map((criterion) => {
        const isExternal = criterion.section === 'evaluacion-externa'
        const effective = getEffectiveScore(
          scores,
          ratings,
          project.id,
          criterion.id,
          isExternal,
        )
        const rating = ratings[`${project.id}:${criterion.id}`]
        const isChecked = checked[`${project.id}:${criterion.id}`]
        const note = notes[`${project.id}:${criterion.id}`]

        const parts: string[] = []
        if (isChecked) parts.push('entregable marcado')
        if (rating) parts.push(`rating=${rating}`)
        if (effective !== undefined) parts.push(`score=${effective}`)
        if (note) parts.push(`nota="${note}"`)

        const status = parts.length > 0 ? parts.join(', ') : 'sin evaluar'

        return `  - ${criterion.label}: ${status}`
      }).join('\n')

      return `### ${project.name} (${project.id})
Recomendado: ${project.recommended ? 'sí' : 'no'}
Veredicto: ${project.verdict}
Progreso: ${summary?.completionPercent ?? 0}% (${summary?.completedCount ?? 0}/27)
Puntuación: total ${summary?.totalScore ?? 0}/${summary?.maxPossible ?? 135}, promedio ${summary?.avgScore ?? 0}/5
Criterios:
${criterionLines}`
    }).join('\n\n')

    return `${SYSTEM_PROMPT_BASE}

## Datos actuales del taller

${projectBlocks}`
  }, [checked, ratings, scores, notes])
}
