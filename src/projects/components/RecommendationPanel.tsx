import { useMemo } from 'react'
import type { WorkshopProject } from '../types/project.types'
import styles from './RecommendationPanel.module.css'

interface RecommendationPanelProps {
  projects: WorkshopProject[]
  expanded: boolean
  onToggle: () => void
  maxItems?: number
}

function countGreens(project: WorkshopProject): number {
  return project.criteria.filter(
    (criterion) => criterion.baselineRating === 'green',
  ).length
}

export function RecommendationPanel({
  projects,
  expanded,
  onToggle,
  maxItems = 3,
}: RecommendationPanelProps) {
  const topProjects = useMemo(() => {
    return projects
      .filter((project) => project.recommended)
      .sort((left, right) => countGreens(right) - countGreens(left))
      .slice(0, maxItems)
  }, [projects, maxItems])

  return (
    <aside className={styles.panel} aria-label="Recomendaciones del taller">
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <span>
            <h2 className={styles.title}>Top {maxItems} recomendados</h2>
            <p className={styles.subtitle}>
              {topProjects.length} proyecto
              {topProjects.length === 1 ? '' : 's'} destacado
              {topProjects.length === 1 ? '' : 's'}
            </p>
          </span>
          <span
            className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
            aria-hidden="true"
          >
            ▲
          </span>
        </button>

        {expanded ? (
          <div className={styles.content}>
            {topProjects.length === 0 ? (
              <p className={styles.empty}>
                No hay proyectos recomendados en esta matriz.
              </p>
            ) : (
              topProjects.map((project, index) => (
                <div key={project.id} className={styles.item}>
                  <span className={styles.rank}>{index + 1}</span>
                  <span className={styles.emoji} aria-hidden="true">
                    {project.emoji}
                  </span>
                  <div className={styles.itemText}>
                    <p className={styles.itemName}>{project.name}</p>
                    <p className={styles.itemVerdict}>{project.verdict}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
    </aside>
  )
}
