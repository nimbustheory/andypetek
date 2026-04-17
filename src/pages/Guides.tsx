import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

// Import guide metadata
import podcastGuide from '@/content/guides/starting-a-podcast/guide.json'

const guides = [
  {
    ...podcastGuide,
    icon: '🎙️',
    color: 'from-purple-500 to-pink-500',
  },
  // Add more guides here as they're created
]

export default function Guides() {
  return (
    <PageTransition>
      <div className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
              Free Resources
            </p>
            <h1 className="font-display text-display-lg mb-6">
              Guides
            </h1>
            <p className="font-body text-body-lg text-text-muted max-w-2xl">
              Comprehensive, no-fluff guides on topics I know well. 
              Free to read, easy to follow, built from real experience.
            </p>
          </motion.div>

          {/* Guide Cards */}
          <div className="grid gap-8">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/guides/${guide.slug}`}
                  className="block group"
                >
                  <div className="bg-surface-raised rounded-xl p-8 hover:bg-surface-overlay transition-colors">
                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                        {guide.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="font-display text-display-sm group-hover:text-gradient transition-all">
                            {guide.title}
                          </h2>
                        </div>
                        
                        <p className="font-body text-body text-text-muted mb-4">
                          {guide.description}
                        </p>

                        <div className="flex items-center gap-6 text-text-subtle font-mono text-caption">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4" />
                            {guide.chapters.length} chapters
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {guide.estimatedTime}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-6 h-6 text-text-subtle group-hover:text-accent-warm group-hover:translate-x-2 transition-all flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="font-body text-body text-text-muted">
              More guides coming soon. Topics in the works: craft business building, 
              beverage industry essentials, and the entrepreneurial journey.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
