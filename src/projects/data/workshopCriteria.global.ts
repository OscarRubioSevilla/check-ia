import type {
  WorkshopCriterionDefinition,
  WorkshopCriterionSection,
} from '../types/project.types'

export const WORKSHOP_CRITERION_SECTION_LABELS: Record<
  WorkshopCriterionSection,
  string
> = {
  'entregables-mvp': 'Entregables MVP',
  'requisitos-tecnicos-ia': 'Requisitos técnicos IA',
  'criterios-evaluacion': 'Criterios de evaluación',
}

export const WORKSHOP_CRITERION_SECTION_ORDER: WorkshopCriterionSection[] = [
  'entregables-mvp',
  'requisitos-tecnicos-ia',
  'criterios-evaluacion',
]

export const WORKSHOP_CRITERIA_GLOBAL: WorkshopCriterionDefinition[] = [
  {
    id: 'documentacion-forge',
    label: 'Documentación completa en The Forge',
    section: 'entregables-mvp',
  },
  {
    id: 'problema-objetivo',
    label: 'Definición del problema y objetivo',
    section: 'entregables-mvp',
  },
  {
    id: 'alcance-mvp',
    label: 'Alcance del MVP',
    section: 'entregables-mvp',
  },
  {
    id: 'arquitectura',
    label: 'Arquitectura de la solución',
    section: 'entregables-mvp',
  },
  {
    id: 'modelo-datos',
    label: 'Modelo de datos',
    section: 'entregables-mvp',
  },
  {
    id: 'frontend-funcional',
    label: 'Frontend funcional',
    section: 'entregables-mvp',
  },
  {
    id: 'backend-api',
    label: 'Backend con API propia',
    section: 'entregables-mvp',
  },
  {
    id: 'persistencia',
    label: 'Persistencia de datos',
    section: 'entregables-mvp',
  },
  {
    id: 'crud-entidad',
    label: 'CRUD entidad principal',
    section: 'entregables-mvp',
  },
  {
    id: 'validaciones',
    label: 'Validaciones frontend y backend',
    section: 'entregables-mvp',
  },
  {
    id: 'manejo-errores',
    label: 'Manejo de errores',
    section: 'entregables-mvp',
  },
  {
    id: 'seguridad',
    label: 'Medidas básicas de seguridad',
    section: 'entregables-mvp',
  },
  {
    id: 'responsive',
    label: 'Diseño responsive',
    section: 'entregables-mvp',
  },
  {
    id: 'control-versiones',
    label: 'Commits frecuentes y descriptivos',
    section: 'entregables-mvp',
  },
  {
    id: 'api-externa',
    label: 'API externa con valor real',
    section: 'requisitos-tecnicos-ia',
  },
  {
    id: 'llm-funcional',
    label: 'LLM para funcionalidad real',
    section: 'requisitos-tecnicos-ia',
  },
  {
    id: 'ia-en-proceso',
    label: 'IA en análisis, diseño, documentación y desarrollo',
    section: 'requisitos-tecnicos-ia',
  },
  {
    id: 'capacidad-analisis',
    label: 'Capacidad de análisis',
    section: 'criterios-evaluacion',
  },
  {
    id: 'calidad-documentacion',
    label: 'Calidad de la documentación',
    section: 'criterios-evaluacion',
  },
  {
    id: 'diseno-solucion',
    label: 'Diseño de la solución',
    section: 'criterios-evaluacion',
  },
  {
    id: 'calidad-codigo',
    label: 'Calidad del código',
    section: 'criterios-evaluacion',
  },
  {
    id: 'uso-ia-herramientas',
    label: 'Uso adecuado de herramientas IA',
    section: 'criterios-evaluacion',
  },
  {
    id: 'integracion-api',
    label: 'Integración APIs externas',
    section: 'criterios-evaluacion',
  },
  {
    id: 'integracion-llm',
    label: 'Integración del LLM',
    section: 'criterios-evaluacion',
  },
  {
    id: 'seguridad-buenas-practicas',
    label: 'Seguridad y buenas prácticas',
    section: 'criterios-evaluacion',
  },
  {
    id: 'creatividad-innovacion',
    label: 'Creatividad e innovación',
    section: 'criterios-evaluacion',
  },
  {
    id: 'presentacion-final',
    label: 'Presentación final',
    section: 'criterios-evaluacion',
  },
]

export const WORKSHOP_CRITERION_IDS = WORKSHOP_CRITERIA_GLOBAL.map(
  (criterion) => criterion.id,
)
