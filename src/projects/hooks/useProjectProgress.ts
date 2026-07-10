import { useMemo } from 'react'
import type {
  ChecklistState,
  ProjectProgressMap,
  WorkshopProject,
} from '../types/project.types'

export function useProjectProgress(
  projects: WorkshopProject[],
  checklistState: ChecklistState,
): ProjectProgressMap {
  return useMemo(() => {
    const progress: ProjectProgressMap = {}

    for (const project of projects) {
      const projectChecks = checklistState[project.id] ?? {}
      const checked = project.criteria.filter(
        (criterion) => projectChecks[criterion.id] === true,
      ).length

      progress[project.id] = {
        checked,
        total: project.criteria.length,
      }
    }

    return progress
  }, [projects, checklistState])
}
