import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Clock, Star, ExternalLink } from 'lucide-react'
import { FilmFullDetails, getEnrichedFilmDetails, searchAndGetFullDetails } from '@/lib/tmdb'
import { formatDate } from '@/lib/utils'

interface FilmModalProps {
  isOpen: boolean
  onClose: () => void
  tmdbId?: number
  title?: string
  watchedDate?: string
}

export default function FilmModal({ isOpen, onClose, tmdbId, title, watchedDate }: FilmModalProps) {
  const [film, setFilm] = useState<FilmFullDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFilm(null)
      setShowTrailer(false)
      return
    }

    async function loadFilm() {
      setLoading(true)
      try {
        let details: FilmFullDetails | null = null
        if (tmdbId) {
          details = await getEnrichedFilmDetails(tmdbId, watchedDate)
        } else if (title) {
          details = await searchAndGetFullDetails(title, watchedDate)
        }
        setFilm(details)
      } catch (error) {
        console.error('Error loading film:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFilm()
  }, [isOpen, tmdbId, title, watchedDate])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-xl bg-surface border border-surface-subtle shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={film?.title || 'Film details'}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-12 h-12 border-2 border-accent-warm border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-text-muted font-body">Loading film details...</p>
                </div>
              </div>
            ) : film ? (
              <div className="h-full overflow-y-auto">
                {/* Backdrop Header */}
                <div className="relative h-64 md:h-80 lg:h-96">
                  {film.backdropUrl ? (
                    <img
                      src={film.backdropUrl}
                      alt={film.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
                  
                  {/* Trailer button */}
                  {film.trailerKey && !showTrailer && (
                    <button
                      onClick={() => setShowTrailer(true)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-accent-warm/90 hover:bg-accent-warm rounded-full transition-colors group"
                    >
                      <Play className="w-8 h-8 text-white fill-white group-hover:scale-110 transition-transform" />
                    </button>
                  )}

                  {/* Embedded Trailer */}
                  {showTrailer && film.trailerKey && (
                    <div className="absolute inset-0 bg-black">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${film.trailerKey}?autoplay=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`${film.title} trailer`}
                      />
                      <button
                        onClick={() => setShowTrailer(false)}
                        className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        aria-label="Close trailer"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 md:px-8 lg:px-12 pb-8 -mt-24 relative z-10">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Poster */}
                    <div className="w-32 md:w-48 flex-shrink-0">
                      {film.posterUrl ? (
                        <img
                          src={film.posterUrl}
                          alt={film.title}
                          className="w-full rounded-lg shadow-xl"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-surface-raised rounded-lg" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h2 className="font-display text-display-md text-text mb-2">
                        {film.title}
                      </h2>
                      
                      {film.tagline && (
                        <p className="font-body text-body italic text-text-muted mb-4">
                          "{film.tagline}"
                        </p>
                      )}

                      {/* Meta row */}
                      <div className="flex flex-wrap items-center gap-4 text-text-muted font-mono text-caption mb-4">
                        <span>{film.year}</span>
                        {film.runtime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {Math.floor(film.runtime / 60)}h {film.runtime % 60}m
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-accent-warm text-accent-warm" />
                          {film.voteAverage.toFixed(1)}
                        </span>
                        {film.watchedDate && (
                          <span className="text-accent-warm">
                            Watched {formatDate(film.watchedDate, 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>

                      {/* Genres */}
                      {film.genres.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {film.genres.map(genre => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-surface-raised rounded-full font-mono text-tag text-text-muted"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Overview */}
                      <p className="font-body text-body text-text-muted mb-6">
                        {film.overview}
                      </p>

                      {/* Director */}
                      {film.director && (
                        <p className="font-body text-body-sm text-text mb-6">
                          <span className="text-text-muted">Directed by</span>{' '}
                          <span className="text-text font-semibold">{film.director}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Where to Watch */}
                  {(film.streaming.length > 0 || film.rent.length > 0 || film.buy.length > 0) && (
                    <div className="mt-8 pt-8 border-t border-surface-subtle">
                      <h3 className="font-display text-body-lg text-text mb-4">Where to Watch</h3>
                      
                      <div className="space-y-4">
                        {film.streaming.length > 0 && (
                          <div>
                            <p className="font-mono text-tag text-text-subtle uppercase tracking-wider mb-2">
                              Streaming
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {film.streaming.map(provider => (
                                <div
                                  key={provider.name}
                                  className="flex items-center gap-2 px-3 py-2 bg-surface-raised rounded-lg"
                                >
                                  {provider.logo && (
                                    <img src={provider.logo} alt={provider.name} className="w-6 h-6 rounded" />
                                  )}
                                  <span className="font-body text-body-sm text-text">{provider.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {film.rent.length > 0 && (
                          <div>
                            <p className="font-mono text-tag text-text-subtle uppercase tracking-wider mb-2">
                              Rent
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {film.rent.map(provider => (
                                <div
                                  key={provider.name}
                                  className="flex items-center gap-2 px-3 py-2 bg-surface-raised rounded-lg"
                                >
                                  {provider.logo && (
                                    <img src={provider.logo} alt={provider.name} className="w-6 h-6 rounded" />
                                  )}
                                  <span className="font-body text-body-sm text-text">{provider.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {film.watchLink && (
                          <a
                            href={film.watchLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-glow transition-colors font-body text-body-sm mt-2"
                          >
                            View all options on JustWatch
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cast */}
                  {film.cast.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-surface-subtle">
                      <h3 className="font-display text-body-lg text-text mb-4">Cast</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {film.cast.map(person => (
                          <div key={`${person.name}-${person.character}`} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-surface-raised">
                              {person.photo ? (
                                <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-subtle text-xl">
                                  {person.name.charAt(0)}
                                </div>
                              )}
                            </div>
                            <p className="font-body text-body-sm text-text line-clamp-1">{person.name}</p>
                            <p className="font-body text-caption text-text-muted line-clamp-1">{person.character}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Crew */}
                  {film.crew.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-surface-subtle">
                      <h3 className="font-display text-body-lg text-text mb-4">Crew</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {film.crew.map(person => (
                          <div key={`${person.name}-${person.job}`}>
                            <p className="font-mono text-tag text-text-subtle uppercase tracking-wider">
                              {person.job}
                            </p>
                            <p className="font-body text-body-sm text-text">{person.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cinephile CTA */}
                  <div className="mt-8 pt-8 border-t border-surface-subtle">
                    <div className="p-6 bg-surface-raised rounded-lg flex flex-col md:flex-row items-center gap-4">
                      <div className="flex-1 text-center md:text-left">
                        <p className="font-display text-body-lg text-text mb-1">
                          Track your film journey
                        </p>
                        <p className="font-body text-body-sm text-text-muted">
                          Cinéphile helps you discover films and build your personal movie diary.
                        </p>
                      </div>
                      <a
                        href="https://apps.apple.com/app/cinephile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg text-body-sm hover:shadow-lg transition-shadow"
                      >
                        Get Cinéphile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-text-muted font-body">Film not found</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
