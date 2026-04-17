import { motion } from 'framer-motion'
import FilmCard from './FilmCard'
import { FilmWithMeta } from '@/lib/tmdb'

interface FilmGridProps {
  films: FilmWithMeta[]
  loading?: boolean
  showDates?: boolean
  size?: 'sm' | 'md' | 'lg'
  onFilmClick?: (film: FilmWithMeta) => void
}

export default function FilmGrid({ films, loading = false, showDates = true, size = 'md', onFilmClick }: FilmGridProps) {
  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="w-32 flex-shrink-0">
            <div className="aspect-[2/3] rounded-lg bg-surface-raised animate-pulse mb-2" />
            <div className="h-4 bg-surface-raised rounded animate-pulse mb-1" />
            <div className="h-3 bg-surface-raised rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (films.length === 0) {
    return (
      <p className="text-text-muted font-body text-body-sm">
        No films logged yet.
      </p>
    )
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {films.map((film, index) => (
        <FilmCard
          key={`${film.tmdbId}-${film.watchedDate}`}
          film={film}
          index={index}
          showDate={showDates}
          size={size}
          onClick={onFilmClick}
        />
      ))}
    </div>
  )
}

// Horizontal scrollable row variant
export function FilmRow({ films, loading, showDates = true, onFilmClick }: FilmGridProps) {
  return (
    <div className="relative">
      {/* Gradient fade on right edge */}
      <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
      
      <FilmGrid films={films} loading={loading} showDates={showDates} size="md" onFilmClick={onFilmClick} />
    </div>
  )
}

// Full grid variant for pages
export function FilmGridFull({ films, loading = false, showDates = true, onFilmClick }: FilmGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[2/3] rounded-lg bg-surface-raised animate-pulse mb-2" />
            <div className="h-4 bg-surface-raised rounded animate-pulse mb-1" />
            <div className="h-3 bg-surface-raised rounded animate-pulse w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
        }
      }}
    >
      {films.map((film, index) => (
        <FilmCard
          key={`${film.tmdbId}-${film.watchedDate}`}
          film={film}
          index={index}
          showDate={showDates}
          size="md"
          onClick={onFilmClick}
        />
      ))}
    </motion.div>
  )
}
