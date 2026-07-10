import { Star } from 'lucide-react'
import { cn } from '../lib/cn'
import type { CriterionScore } from '../../checklist/types/checklist.types'

export interface ScoreInputProps {
  value: CriterionScore | undefined
  onChange: (score: CriterionScore | undefined) => void
  label?: string
  className?: string
}

const SCORES: CriterionScore[] = [1, 2, 3, 4, 5]

export function ScoreInput({ value, onChange, label, className }: ScoreInputProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="group"
      aria-label={label ?? 'Puntuación 1 a 5'}
    >
      {SCORES.map((score) => {
        const filled = value !== undefined && score <= value

        return (
          <button
            key={score}
            type="button"
            aria-label={`${score} de 5`}
            aria-pressed={value === score}
            className={cn(
              'flex size-8 touch-manipulation items-center justify-center rounded-md transition-colors',
              filled
                ? 'text-accent-bg'
                : 'text-disabled hover:text-secondary',
            )}
            onClick={() => onChange(value === score ? undefined : score)}
          >
            <Star
              className="size-4"
              fill={filled ? 'currentColor' : 'none'}
              strokeWidth={1.75}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}
