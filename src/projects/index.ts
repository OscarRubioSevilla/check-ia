export type {
  ChecklistState,
  ProjectChecklistState,
  ProjectProgress,
  ProjectProgressMap,
  Rating,
  WorkshopCriterion,
  WorkshopCriterionDefinition,
  WorkshopProject,
} from './types/project.types'

export {
  WORKSHOP_CRITERIA_GLOBAL,
  WORKSHOP_CRITERION_IDS,
} from './data/workshopCriteria.global'
export { WORKSHOP_PROJECTS } from './data/workshopProjects.seed'

export { ProjectCard } from './components/ProjectCard'
export { ProjectList } from './components/ProjectList'
export { RecommendationPanel } from './components/RecommendationPanel'

export { useProjectProgress } from './hooks/useProjectProgress'
