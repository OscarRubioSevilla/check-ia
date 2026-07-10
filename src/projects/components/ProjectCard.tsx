import type { EvaluationRating } from '../../checklist/types/checklist.types'
import type { Rating, WorkshopProject } from '../types/project.types'
import {
  WORKSHOP_CRITERION_SECTION_LABELS,
  WORKSHOP_DELIVERABLE_SECTION_ORDER,
} from '../data/workshopCriteria.global'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: WorkshopProject
  expanded: boolean
  checkedByCriterion: Record<string, boolean>
  ratingsByCriterion: Record<string, EvaluationRating>
  checkedCount: number
  totalCount: number
  onToggle: () => void
  onCriterionChange: (criterionId: string, checked: boolean) => void
  onRatingChange: (criterionId: string, rating: EvaluationRating) => void
}

const EVALUATION_RATING_OPTIONS: {
  value: EvaluationRating
  label: string
  className: string
}[] = [
  { value: 'strong', label: 'Fuerte', className: styles.ratingStrong },
  { value: 'medium', label: 'Medio', className: styles.ratingMedium },
  { value: 'weak', label: 'Débil', className: styles.ratingWeak },
]

function badgeClassName(rating: Rating): string {
  const map: Record<Rating, string> = {
    green: styles.badgeGreen,
    yellow: styles.badgeYellow,
    red: styles.badgeRed,
  }
  return `${styles.badge} ${map[rating]}`
}

function countRatings(project: WorkshopProject): Record<Rating, number> {
  return project.criteria.reduce(
    (counts, criterion) => {
      counts[criterion.baselineRating] += 1
      return counts
    },
    { green: 0, yellow: 0, red: 0 } as Record<Rating, number>,
  )
}

export function ProjectCard({
  project,
  expanded,
  checkedByCriterion,
  ratingsByCriterion,
  checkedCount,
  totalCount,
  onToggle,
  onCriterionChange,
  onRatingChange,
}: ProjectCardProps) {
  const ratingCounts = countRatings(project)
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100)

  const deliverableCriteria = project.criteria.filter(
    (criterion) => criterion.section !== 'evaluacion-externa',
  )

  const evaluationCriteria = project.criteria.filter(
    (criterion) => criterion.section === 'evaluacion-externa',
  )

  return (
    <article id={`project-card-${project.id}`} className={styles.card}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={expanded}
        onClick={onToggle}
      >
        <span className={styles.emoji} aria-hidden="true">
          {project.emoji}
        </span>
        <span className={styles.headerText}>
          <h3 className={styles.title}>{project.name}</h3>
          <p className={styles.verdict}>{project.verdict}</p>
          {project.recommended ? (
            <span className={styles.recommended}>Recomendado</span>
          ) : null}
        </span>
        <span className={styles.badges} aria-label="Semáforo de criterios">
          <span className={badgeClassName('green')}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {ratingCounts.green}
          </span>
          <span className={badgeClassName('yellow')}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {ratingCounts.yellow}
          </span>
          <span className={badgeClassName('red')}>
            <span className={styles.badgeDot} aria-hidden="true" />
            {ratingCounts.red}
          </span>
        </span>
        <span
          className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      <div className={styles.progressSection}>
        <div className={styles.progressMeta}>
          <span>Progreso del checklist</span>
          <span>
            {checkedCount}/{totalCount}
          </span>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalCount}
          aria-valuenow={checkedCount}
          aria-label={`Progreso de ${project.name}`}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {expanded ? (
        <div className={styles.body}>
          <div className={styles.block}>
            <h4 className={styles.blockTitle}>Entregables</h4>
            {WORKSHOP_DELIVERABLE_SECTION_ORDER.map((section) => {
              const sectionCriteria = deliverableCriteria.filter(
                (criterion) => criterion.section === section,
              )

              if (sectionCriteria.length === 0) {
                return null
              }

              return (
                <div key={section} className={styles.section}>
                  <h5 className={styles.sectionTitle}>
                    {WORKSHOP_CRITERION_SECTION_LABELS[section]}
                  </h5>
                  {sectionCriteria.map((criterion) => {
                    const checkboxId = `${project.id}-${criterion.id}`

                    return (
                      <div key={criterion.id} className={styles.criterion}>
                        <input
                          id={checkboxId}
                          type="checkbox"
                          className={styles.checkbox}
                          checked={checkedByCriterion[criterion.id] === true}
                          onChange={(event) =>
                            onCriterionChange(
                              criterion.id,
                              event.target.checked,
                            )
                          }
                        />
                        <label
                          htmlFor={checkboxId}
                          className={styles.criterionLabel}
                        >
                          <span className={styles.criterionName}>
                            {criterion.label}
                          </span>
                        </label>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>

          <div className={styles.block}>
            <h4 className={styles.blockTitle}>Evaluación externa</h4>
            {evaluationCriteria.map((criterion) => {
              const selectedRating = ratingsByCriterion[criterion.id]
              const groupName = `${project.id}-${criterion.id}-rating`

              return (
                <div key={criterion.id} className={styles.evaluationRow}>
                  <p className={styles.evaluationLabel}>{criterion.label}</p>
                  <div
                    className={styles.ratingGroup}
                    role="radiogroup"
                    aria-label={`Evaluación: ${criterion.label}`}
                  >
                    {EVALUATION_RATING_OPTIONS.map((option) => {
                      const isSelected = selectedRating === option.value

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          name={groupName}
                          className={`${styles.ratingOption} ${option.className} ${
                            isSelected ? styles.ratingOptionSelected : ''
                          }`}
                          onClick={() =>
                            onRatingChange(criterion.id, option.value)
                          }
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}
    </article>
  )
}
