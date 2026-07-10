import type { WorkshopCriterionDefinition } from '../types/project.types'

export const WORKSHOP_CRITERIA_GLOBAL: WorkshopCriterionDefinition[] = [
  { id: 'problema-publico', label: 'Problema público claro' },
  { id: 'alcance-mvp', label: 'Alcance MVP acotado' },
  { id: 'arquitectura', label: 'Arquitectura definida' },
  { id: 'full-stack', label: 'Cobertura full-stack' },
  { id: 'crud', label: 'Operaciones CRUD' },
  { id: 'api-externa', label: 'Integración API externa' },
  { id: 'llm-central', label: 'LLM como pieza central' },
  { id: 'seguridad', label: 'Seguridad y permisos' },
  { id: 'responsive', label: 'Diseño responsive' },
  { id: 'ia-proceso', label: 'IA en el proceso' },
  { id: 'documentacion-forge', label: 'Documentación Forge' },
]

export const WORKSHOP_CRITERION_IDS = WORKSHOP_CRITERIA_GLOBAL.map(
  (criterion) => criterion.id,
)
