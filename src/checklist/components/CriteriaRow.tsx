import { useId, useState } from 'react'
import type { Rating } from '../../projects/types/project.types'
import { cn } from '../../shared/lib/cn'
import { useChecklistStore } from '../hooks/useChecklistStore'

const RATING_DOT_CLASS: Record<Rating, string> = {
  green: 'bg-success',
  yellow: 'bg-warning',
  red: 'bg-error',
}

export interface CriteriaRowProps {
  projectId: string
  criterionId: string
  label: string
  baselineRating: Rating
  hint?: string
}

export function CriteriaRow({
  projectId,
  criterionId,
  label,
  baselineRating,
  hint,
}: CriteriaRowProps) {
  const noteFieldId = useId()
  const [noteExpanded, setNoteExpanded] = useState(false)

  const isChecked = useChecklistStore((state) =>
    state.isChecked(projectId, criterionId),
  )
  const note = useChecklistStore((state) =>
    state.getNote(projectId, criterionId),
  )
  const toggleCriterion = useChecklistStore((state) => state.toggleCriterion)
  const setNote = useChecklistStore((state) => state.setNote)

  const hasNote = note.trim().length > 0

  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <div className="flex min-h-12 items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'mt-1.5 size-2 shrink-0 rounded-full',
            RATING_DOT_CLASS[baselineRating],
          )}
          title={`Evaluación base: ${baselineRating}`}
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug text-primary">{label}</p>
          {hint ? (
            <p className="mt-1 line-clamp-2 text-xs text-secondary">{hint}</p>
          ) : null}
        </div>

        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleCriterion(projectId, criterionId)}
          aria-label={`Marcar criterio: ${label}`}
          className="mt-1 size-5 shrink-0 touch-manipulation accent-accent-bg"
        />
      </div>

      <div className="mt-2 pl-5">
        <button
          type="button"
          onClick={() => setNoteExpanded((expanded) => !expanded)}
          aria-expanded={noteExpanded}
          aria-controls={noteFieldId}
          className="min-h-10 touch-manipulation text-xs text-secondary underline-offset-2 hover:text-primary hover:underline"
        >
          {noteExpanded
            ? 'Ocultar nota'
            : hasNote
              ? 'Ver nota'
              : 'Agregar nota'}
        </button>

        {noteExpanded ? (
          <textarea
            id={noteFieldId}
            value={note}
            onChange={(event) =>
              setNote(projectId, criterionId, event.target.value)
            }
            rows={3}
            placeholder="Notas de evaluación…"
            className="mt-2 w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary placeholder:text-disabled focus:border-border-strong focus:outline-none focus:ring-1 focus:ring-accent-bg"
          />
        ) : null}
      </div>
    </div>
  )
}
