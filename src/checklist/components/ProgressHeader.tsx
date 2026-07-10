import { TOTAL_CRITERIA_COUNT } from '../types/checklist.types'
import { useChecklistStore } from '../hooks/useChecklistStore'

export function ProgressHeader() {
  const getCompletedCount = useChecklistStore((state) => state.getCompletedCount)
  const getProgress = useChecklistStore((state) => state.getProgress)

  const completedCount = getCompletedCount()
  const percent = getProgress()

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-base font-semibold text-primary">
          Evaluación Workshop
        </h1>
        <p className="shrink-0 text-sm text-secondary">
          {completedCount}/{TOTAL_CRITERIA_COUNT} criterios
        </p>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border-strong"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso global del checklist"
      >
        <div
          className="h-full rounded-full bg-accent-bg transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-right text-xs text-disabled">
        {percent}% completado
      </p>
    </>
  )
}
