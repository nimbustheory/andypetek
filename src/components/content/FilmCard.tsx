import { motion } from 'framer-motion'
import { FilmWithMeta } from '@/lib/tmdb'
import { formatDate } from '@/lib/utils'

interface FilmCardProps {
  film: FilmWithMeta
  index?: number
  showDate?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: (film: FilmWithMeta) => void
}

const sizeClasses = {
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-40',
}

export default function FilmCard({ film, index = 0, showDate = true, size = 'md', onClick }: FilmCardProps) {
  const handleClick = () => {
    if (onClick) onClick(film)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 1) }}
      className="group cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() } }}
    >
      <div className={`${sizeClasses[size]} flex-shrink-0`}>
        {/* Poster */}
        <div className="aspect-[2/3] rounded-lg overflow-hidden bg-surface-raised mb-2 relative">
          {film.posterUrl ? (
            <img
              src={film.posterUrl}
              alt={`${film.title} poster`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-overlay">
              <span className="text-text-subtle text-xs text-center px-2">{film.title}</span>
            </div>
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <div>
              <p className="text-white text-sm font-body font-semibold line-clamp-2">
                {film.title}
              </p>
              {film.director && (
                <p className="text-white/70 text-xs font-body mt-1">
                  {film.director}
                </p>
              )}
            </div>
          </div>

          {/* Click indicator */}
          <div className="absolute inset-0 border-2 border-accent-warm/0 group-hover:border-accent-warm/50 rounded-lg transition-colors pointer-events-none" />
        </div>

        {/* Info below poster */}
        <div className="space-y-0.5">
          <p className="font-body text-caption text-text line-clamp-1 group-hover:text-accent-warm transition-colors">
            {film.title}
          </p>
          <p className="font-mono text-tag text-text-subtle">
            {film.year}
            {showDate && film.watchedDate && (
              <span className="text-text-subtle"> · {formatDate(film.watchedDate, 'MMM d')}</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
