import { motion } from 'framer-motion'

interface FilmStatsProps {
  watched: number
  goal: number
  percentComplete: number
}

export default function FilmStats({ watched, goal, percentComplete }: FilmStatsProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Count */}
      <div>
        <p className="font-display text-display-md text-gradient">
          {watched}
        </p>
        <p className="font-mono text-tag text-text-subtle uppercase tracking-wider">
          of {goal} films
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex-1 max-w-xs">
        <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-daydreamer rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentComplete}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <p className="font-mono text-tag text-text-subtle mt-1">
          {percentComplete}% of {new Date().getFullYear()} goal
        </p>
      </div>
    </div>
  )
}

// Compact version for sidebar/widgets
export function FilmStatsCompact({ watched, goal }: { watched: number; goal: number }) {
  const percent = goal > 0 ? Math.round((watched / goal) * 100) : 0
  
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-body-lg text-gradient">{watched}</span>
      <span className="text-text-subtle font-body text-body-sm">/ {goal} films</span>
      <div className="flex-1 h-1.5 bg-surface-raised rounded-full overflow-hidden max-w-24">
        <motion.div
          className="h-full bg-gradient-daydreamer rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
