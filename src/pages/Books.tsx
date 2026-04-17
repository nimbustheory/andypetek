import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

// Book data - will eventually come from MDX
const books = [
  {
    slug: 'the-daydreamer-method',
    title: 'The Daydreamer Method',
    subtitle: 'A Framework for Building Businesses That Fit Your Life',
    status: 'Coming 2026',
    description: `The methodology behind fifteen years of building businesses across industries. 
      Three pillars—Innovate, Replicate, Dominate—applied across three strategies: Offering, 
      Consumer, and Delivery. Not another hustle manual, but a practical framework for 
      entrepreneurs who want to build something real without losing themselves in the process.`,
    cover: '/images/books/daydreamer-method-cover.jpg',
  },
  {
    slug: 'business-quest',
    title: 'Business Quest',
    subtitle: "Your Hero's Journey from Idea to Empire",
    status: 'Coming 2026',
    description: `Entrepreneurship reimagined as a hero's journey. From the call to adventure 
      through the dark nights and eventual transformation. A narrative approach to business 
      education that treats founders as protagonists in their own stories—because that's 
      exactly what they are.`,
    cover: '/images/books/business-quest-cover.jpg',
  },
  {
    slug: 'creative-revolution',
    title: 'The Creative Revolution',
    subtitle: '25 Years of Beverage Design Evolution',
    status: 'Coming 2026',
    description: `An insider's look at how craft beverage branding transformed from an afterthought 
      to an art form. Part industry history, part design manual, part love letter to the 
      weirdos who believed that what's on the outside of the can matters as much as what's inside.`,
    cover: '/images/books/creative-revolution-cover.jpg',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function Books() {
  return (
    <PageTransition>
      <div className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-content mb-16"
          >
            <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
              Books
            </p>
            <h1 className="font-display text-display-lg mb-4">
              Fifteen years of lessons, finally written down
            </h1>
            <p className="font-body text-body text-text-muted">
              I've been writing these books in various forms for years. Business frameworks, 
              industry insights, and the stories behind them. They're finally ready to see the light.
            </p>
          </motion.div>

          {/* Featured: The Reckoning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-24"
          >
            <Link
              to="/the-reckoning"
              className="group block bg-surface-raised rounded-lg overflow-hidden border border-surface-subtle hover:border-accent-warm/30 transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div>
                  <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
                    Available Now -- Free Ebook
                  </p>
                  <h2 className="font-display text-display-md mb-2">
                    The Reckoning
                  </h2>
                  <p className="font-display text-display-sm text-text-muted mb-6">
                    American Wine at the Crossroads
                  </p>
                  <p className="font-body text-body text-text-muted mb-8">
                    A comprehensive examination of the forces reshaping the wine industry --
                    from the demographic cliff to climate risk, from the death of the collector
                    to the wineries finding ways to survive. 24 chapters, 62 pages, free to download.
                  </p>
                  <span className="inline-flex items-center gap-2 font-body font-semibold text-accent-warm group-hover:gap-3 transition-all">
                    Read more
                    <ArrowRight size={18} />
                  </span>
                </div>
                <div className="aspect-[3/4] bg-gradient-to-br from-surface-overlay via-surface to-surface-raised rounded-lg flex items-center justify-center p-12">
                  <div className="text-center">
                    <p className="font-display text-display-md text-text mb-2">
                      The Reckoning
                    </p>
                    <p className="font-body text-body-sm text-text-muted">
                      American Wine at the Crossroads
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Upcoming Books */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-16"
          >
            <p className="font-mono text-tag uppercase tracking-widest text-text-subtle mb-4">
              Coming Soon
            </p>
          </motion.div>

          {/* Books List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-24"
          >
            {books.map((book, index) => (
              <motion.article
                key={book.slug}
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Cover Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="aspect-[3/4] bg-surface-raised rounded-lg overflow-hidden glow">
                    {/* Placeholder cover - gradient with title */}
                    <div className="w-full h-full bg-gradient-to-br from-surface-raised via-surface-overlay to-surface flex items-center justify-center p-12">
                      <div className="text-center">
                        <p className="font-display text-display-md text-text mb-2">
                          {book.title}
                        </p>
                        <p className="font-body text-body-sm text-text-muted">
                          {book.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
                    {book.status}
                  </p>
                  <h2 className="font-display text-display-md mb-2">
                    {book.title}
                  </h2>
                  <p className="font-display text-display-sm text-text-muted mb-6">
                    {book.subtitle}
                  </p>
                  <p className="font-body text-body text-text-muted mb-8 whitespace-pre-line">
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      disabled
                      className="px-6 py-3 bg-surface-raised text-text-muted font-body font-semibold rounded-lg cursor-not-allowed"
                    >
                      Notify Me When Available
                    </button>
                    {/* Future: purchase links, excerpt links, etc. */}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24 p-8 md:p-12 bg-surface-raised rounded-lg text-center"
          >
            <h3 className="font-display text-display-sm mb-4">
              Want to know when they're out?
            </h3>
            <p className="font-body text-body text-text-muted mb-6 max-w-lg mx-auto">
              I'll send exactly one email per book launch. No spam, no newsletters, 
              just a heads up when you can actually read the thing.
            </p>
            <p className="font-mono text-tag text-text-subtle">
              Email signup coming soon
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
