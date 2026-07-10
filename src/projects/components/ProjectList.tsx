import type { EvaluationRating } from '../../checklist/types/checklist.types'
import { ITEMS_PER_PROJECT } from '../../checklist/types/checklist.types'
import type { ChecklistState, WorkshopProject } from '../types/project.types'
import { useProjectProgress } from '../hooks/useProjectProgress'
import { ProjectCard } from './ProjectCard'
import styles from './ProjectList.module.css'

interface ProjectListProps {
  projects: WorkshopProject[]
  checklistState: ChecklistState
  ratingsState: Record<string, Record<string, EvaluationRating>>
  expandedId: string | null
  onToggle: (projectId: string) => void
  onCriterionChange: (
    projectId: string,
    criterionId: string,
    checked: boolean,
  ) => void
  onRatingChange: (
    projectId: string,
    criterionId: string,
    rating: EvaluationRating,
  ) => void
}

export function ProjectList({
  projects,
  checklistState,
  ratingsState,
  expandedId,
  onToggle,
  onCriterionChange,
  onRatingChange,
}: ProjectListProps) {
  const progressMap = useProjectProgress(
    projects,
    checklistState,
    ratingsState,
  )

  return (
    <section className={styles.list} aria-label="Proyectos del taller">
      {projects.map((project) => {
        const progress = progressMap[project.id] ?? {
          checked: 0,
          total: ITEMS_PER_PROJECT,
        }

        return (
          <ProjectCard
            key={project.id}
            project={project}
            expanded={expandedId === project.id}
            checkedByCriterion={checklistState[project.id] ?? {}}
            ratingsByCriterion={ratingsState[project.id] ?? {}}
            checkedCount={progress.checked}
            totalCount={progress.total}
            onToggle={() => onToggle(project.id)}
            onCriterionChange={(criterionId, checked) =>
              onCriterionChange(project.id, criterionId, checked)
            }
            onRatingChange={(criterionId, rating) =>
              onRatingChange(project.id, criterionId, rating)
            }
          />
        )
      })}
    </section>
  )
}
