import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, ArrowLeft } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex items-center justify-center pt-20 pb-section">
        <div className="max-w-content mx-auto px-content text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Display */}
            <div className="mb-8">
              <span className="font-display text-[8rem] md:text-[12rem] leading-none text-gradient">
                404
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-display-md mb-4"
            >
              This page doesn't exist.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-body-lg text-text-muted mb-2"
            >
              Neither does work-life balance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-mono text-caption text-text-subtle mb-12"
            >
              But hey, at least one of these things can be fixed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
              <Link
                to="/writing"
                className="inline-flex items-center gap-2 px-6 py-3 border border-surface-subtle text-text font-body font-semibold rounded-lg hover:bg-surface-raised transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Read Something
              </Link>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onClick={() => navigate(-1)}
              className="mt-8 inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors font-body text-body-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Or go back where you came from
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
