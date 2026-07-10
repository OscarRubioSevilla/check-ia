export type {
  ChecklistState,
  ProjectChecklistState,
  ProjectProgress,
  ProjectProgressMap,
  Rating,
  WorkshopCriterion,
  WorkshopCriterionDefinition,
  WorkshopCriterionSection,
  WorkshopProject,
} from './types/project.types'

export {
  WORKSHOP_CRITERIA_GLOBAL,
  WORKSHOP_CRITERION_IDS,
  WORKSHOP_DELIVERABLE_CRITERION_IDS,
  WORKSHOP_DELIVERABLE_SECTION_ORDER,
  WORKSHOP_EVALUATION_CRITERION_IDS,
  WORKSHOP_CRITERION_SECTION_LABELS,
  WORKSHOP_CRITERION_SECTION_ORDER,
} from './data/workshopCriteria.global'
export { WORKSHOP_PROJECTS } from './data/workshopProjects.seed'

export { ProjectCard } from './components/ProjectCard'
export { ProjectList } from './components/ProjectList'
export { RecommendationPanel } from './components/RecommendationPanel'

export { useProjectProgress } from './hooks/useProjectProgress'
