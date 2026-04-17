import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import { FilmGridFull } from '@/components/content/FilmGrid'
import FilmStats from '@/components/content/FilmStats'
import FilmModal from '@/components/content/FilmModal'
import { useFilms } from '@/lib/useFilms'
import { FilmWithMeta } from '@/lib/tmdb'

export default function Watching() {
  const { films, loading, stats } = useFilms()
  const [selectedFilm, setSelectedFilm] = useState<FilmWithMeta | null>(null)

  const handleFilmClick = (film: FilmWithMeta) => {
    setSelectedFilm(film)
  }

  const handleCloseModal = () => {
    setSelectedFilm(null)
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
              {new Date().getFullYear()} Film Log
            </p>
            <h1 className="font-display text-display-lg mb-6">
              My Year in Film
            </h1>
            <p className="font-body text-body text-text-muted max-w-2xl mb-8">
              I watch around 250 films a year. This is a live log of everything I've watched in {new Date().getFullYear()},
              pulled from my viewing diary. Click any poster for details, trailers, and where to stream.
            </p>

            {/* Stats */}
            <FilmStats 
              watched={stats.watched} 
              goal={stats.goal} 
              percentComplete={stats.percentComplete} 
            />
          </motion.div>

          {/* Film Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {stats.watched === 0 && !loading ? (
              <div className="text-center py-16 bg-surface-raised rounded-lg">
                <p className="font-display text-display-sm text-text mb-2">
                  The journey begins soon
                </p>
                <p className="font-body text-body text-text-muted">
                  {`My ${new Date().getFullYear()} film diary starts in January. Check back then to see what I'm watching.`}
                </p>
              </div>
            ) : (
              <FilmGridFull 
                films={films} 
                loading={loading} 
                showDates={true} 
                onFilmClick={handleFilmClick}
              />
            )}
          </motion.section>

          {/* Cinephile Promo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 bg-surface-raised rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-2">
                  Track Your Own Journey
                </p>
                <h3 className="font-display text-display-sm mb-3">
                  Cinéphile
                </h3>
                <p className="font-body text-body text-text-muted mb-4">
                  The app I built to track my film journey. Discover films by mood, decade, or collection. 
                  Build your watchlist. See where everything is streaming. No ads, no social pressure—just 
                  you and the movies you love.
                </p>
                <a
                  href="https://apps.apple.com/app/cinephile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
                >
                  Download on App Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {/* App mockup placeholder */}
              <div className="w-48 h-96 bg-surface-overlay rounded-3xl flex items-center justify-center flex-shrink-0 hidden md:flex">
                <span className="text-text-subtle font-mono text-caption">App Preview</span>
              </div>
            </div>
          </motion.div>

          {/* Link to Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="font-body text-body text-text-muted mb-4">
              Want my actual thoughts on what I'm watching?
            </p>
            <Link
              to="/writing?category=film"
              className="font-body text-accent-warm hover:text-accent-glow transition-colors"
            >
              Read my film reviews →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Film Modal */}
      <FilmModal
        isOpen={selectedFilm !== null}
        onClose={handleCloseModal}
        tmdbId={selectedFilm?.tmdbId}
        watchedDate={selectedFilm?.watchedDate}
      />
    </PageTransition>
  )
}
