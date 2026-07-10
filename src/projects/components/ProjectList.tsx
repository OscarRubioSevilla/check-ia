import type { ChecklistState, WorkshopProject } from '../types/project.types'
import { useProjectProgress } from '../hooks/useProjectProgress'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectList.module.css'

interface ProjectListProps {
  projects: WorkshopProject[]
  checklistState: ChecklistState
  expandedId: string | null
  onToggle: (projectId: string) => void
  onCriterionChange: (
    projectId: string,
    criterionId: string,
    checked: boolean,
  ) => void
}

export function ProjectList({
  projects,
  checklistState,
  expandedId,
  onToggle,
  onCriterionChange,
}: ProjectListProps) {
  const progressMap = useProjectProgress(projects, checklistState)

  return (
    <section className={styles.list} aria-label="Proyectos del taller">
      {projects.map((project) => {
        const progress = progressMap[project.id] ?? {
          checked: 0,
          total: project.criteria.length,
        }

        return (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedId === project.id}
            checkedByCriterion={checklistState[project.id] ?? {}}
            checkedCount={progress.checked}
            totalCount={progress.total}
            onToggle={() => onToggle(project.id)}
            onCriterionChange={(criterionId, checked) =>
              onCriterionChange(project.id, criterionId, checked)
            }
          />
        )
      })}
    </section>
  )
}
