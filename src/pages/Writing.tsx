import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import PageTransition from '@/components/ui/PageTransition'
import { allPosts } from '@/content/posts'

// Section and category definitions
const sections = {
  all: { label: 'All', description: 'Everything in one place' },
  daydreamer: { label: 'The Daydreamer', description: 'Creative, personal, exploratory' },
  business: { label: 'The Business', description: 'Substantial, professional, promotional' },
}

const categories = {
  daydreamer: [
    { id: 'creativity', label: 'Creativity' },
    { id: 'musings', label: 'Musings' },
    { id: 'film', label: 'Film' },
    { id: 'books', label: 'Books & Reading' },
  ],
  business: [
    { id: 'building-things', label: 'Building Things' },
    { id: 'creative-business', label: 'Creative Business' },
    { id: 'community-tech', label: 'Community & Tech' },
    { id: 'beverage-world', label: 'Beverage World' },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function Writing() {
  const [activeSection, setActiveSection] = useState<'all' | 'daydreamer' | 'business'>('all')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filter posts based on active section and category
  const filteredPosts = allPosts.filter((post) => {
    if (activeSection !== 'all' && post.section !== activeSection) return false
    if (activeCategory && post.category !== activeCategory) return false
    return true
  })

  // Get available categories based on active section
  const availableCategories = activeSection === 'all'
    ? [...categories.daydreamer, ...categories.business]
    : categories[activeSection as 'daydreamer' | 'business']

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
              Writing
            </p>
            <h1 className="font-display text-display-lg mb-4">
              Ideas, stories, and lessons learned
            </h1>
            <p className="font-body text-body text-text-muted max-w-2xl">
              From business frameworks to film reviews, beer can design to travel notes. 
              The full range of what I think about.
            </p>
          </motion.div>

          {/* Section Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {Object.entries(sections).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSection(key as 'all' | 'daydreamer' | 'business')
                    setActiveCategory(null)
                  }}
                  className={cn(
                    'px-4 py-2 font-body text-body-sm rounded-lg transition-all',
                    activeSection === key
                      ? 'bg-gradient-daydreamer text-white'
                      : 'bg-surface-raised text-text-muted hover:text-text hover:bg-surface-overlay'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  'px-3 py-1.5 font-mono text-tag uppercase tracking-wider rounded-full transition-all',
                  activeCategory === null
                    ? 'bg-surface-overlay text-text'
                    : 'bg-transparent text-text-muted hover:text-text border border-surface-subtle'
                )}
              >
                All
              </button>
              {availableCategories.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={cn(
                    'px-3 py-1.5 font-mono text-tag uppercase tracking-wider rounded-full transition-all',
                    activeCategory === id
                      ? 'bg-surface-overlay text-text'
                      : 'bg-transparent text-text-muted hover:text-text border border-surface-subtle'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${activeCategory}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  <Link to={`/writing/${post.slug}`} className="block card-hover">
                    <div className="aspect-[16/10] bg-surface-raised rounded-lg mb-4 overflow-hidden">
                      {/* Placeholder for hero image */}
                      <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-tag uppercase tracking-wider text-accent-warm">
                        {availableCategories.find(c => c.id === post.category)?.label || post.category}
                      </span>
                      <span className="text-text-subtle">·</span>
                      <span className="font-mono text-tag text-text-subtle">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-display-sm text-text group-hover:text-gradient transition-all mb-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-body-sm text-text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="font-body text-body text-text-muted">
                No posts in this category yet. Check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
