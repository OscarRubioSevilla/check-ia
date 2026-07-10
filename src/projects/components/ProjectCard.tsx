import type { Rating, WorkshopProject } from '../types/project.types'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: WorkshopProject
  expanded: boolean
  checkedByCriterion: Record<string, boolean>
  checkedCount: number
  totalCount: number
  onToggle: () => void
  onCriterionChange: (criterionId: string, checked: boolean) => void
}

const RATING_LABELS: Record<Rating, string> = {
  green: 'Verde',
  yellow: 'Amarillo',
  red: 'Rojo',
}

function badgeClassName(rating: Rating): string {
  const map: Record<Rating, string> = {
    green: styles.badgeGreen,
    yellow: styles.badgeYellow,
    red: styles.badgeRed,
  }
  return `${styles.badge} ${map[rating]}`
}

function dotClassName(rating: Rating): string {
  const map: Record<Rating, string> = {
    green: styles.dotGreen,
    yellow: styles.dotYellow,
    red: styles.dotRed,
  }
  return `${styles.ratingDot} ${map[rating]}`
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
  checkedCount,
  totalCount,
  onToggle,
  onCriterionChange,
}: ProjectCardProps) {
  const ratingCounts = countRatings(project)
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100)

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
          {project.criteria.map((criterion) => {
            const checkboxId = `${project.id}-${criterion.id}`

            return (
              <div key={criterion.id} className={styles.criterion}>
                <input
                  id={checkboxId}
                  type="checkbox"
                  className={styles.checkbox}
                  checked={checkedByCriterion[criterion.id] === true}
                  onChange={(event) =>
                    onCriterionChange(criterion.id, event.target.checked)
                  }
                />
                <label htmlFor={checkboxId} className={styles.criterionLabel}>
                  <span className={styles.criterionName}>
                    <span>{criterion.label}</span>
                    <span
                      className={dotClassName(criterion.baselineRating)}
                      aria-label={`Semáforo ${RATING_LABELS[criterion.baselineRating]}`}
                      title={RATING_LABELS[criterion.baselineRating]}
                    />
                  </span>
                  <p className={styles.hint}>{criterion.hint}</p>
                </label>
              </div>
            )
          })}
        </div>
      ) : null}
    </article>
  )
}
