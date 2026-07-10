import { TOTAL_CRITERIA_COUNT } from '../types/checklist.types'
import { useChecklistStore } from '../hooks/useChecklistStore'

export function ProgressHeader() {
  const checked = useChecklistStore((state) => state.checked)
  const getProgress = useChecklistStore((state) => state.getProgress)

  const checkedCount = Object.values(checked).filter(Boolean).length
  const percent = getProgress()

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-base font-bold text-matrix-primary">
          Evaluación Workshop
        </h1>
        <p className="shrink-0 font-mono text-sm text-matrix-muted">
          {checkedCount}/{TOTAL_CRITERIA_COUNT} criterios
        </p>
      </div>

      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-matrix-panel"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso global del checklist"
      >
        <div
          className="h-full rounded-full bg-matrix-primary transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-2 text-right font-mono text-xs text-matrix-dim">
        {percent}% completado
      </p>
    </>
  )
}
