import { motion } from 'framer-motion'
import { Download, BookOpen, Headphones } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const parts = [
  {
    number: 'Part One',
    title: 'The Demand Crisis',
    subtitle: "Who's drinking wine, who isn't, and why it matters",
    chapters: [
      'The Golden Age That Was',
      'The First Pivot',
      'The Demographic Cliff',
      'Why Younger Americans Drink Differently',
      'The Death of the Collector',
      'The Collapse of Critical Authority',
      'The Restaurant and Tasting Room Problem',
      'The Intimidation Factor',
      'Competing for Attention',
      'The COVID Bump and Its Lesson',
    ],
  },
  {
    number: 'Part Two',
    title: 'The Supply-Side Squeeze',
    subtitle: 'Climate, labor, economics, and the crisis of passing it on',
    chapters: [
      'Fire, Drought, and the New Geography of Risk',
      'The Grape Glut',
      'The Labor Question',
      'The Family Succession Crisis',
      'The Three-Tier Trap',
      'Tariffs and International Competition',
      "Consolidation's Iron Logic",
    ],
  },
  {
    number: 'Part Three',
    title: 'Adaptation and Uncertain Futures',
    subtitle: 'Strategies for survival, scenarios for 2035, and what success might look like',
    chapters: [
      'The Survivors',
      'Reaching Younger Consumers',
      'Product Innovation',
      'Technology as Lifeline',
      'The Shifting Geography of Wine',
      'Scenarios for 2035',
      'What Success Looks Like',
    ],
  },
]

export default function TheReckoning() {
  return (
    <PageTransition>
      <div className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero */}
            <motion.div variants={itemVariants} className="max-w-content mb-20">
              <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-6">
                Free Ebook
              </p>
              <h1 className="font-display text-display-xl mb-4">
                The Reckoning
              </h1>
              <p className="font-display text-display-sm text-text-muted mb-6">
                American Wine at the Crossroads
              </p>
              <p className="font-body text-body text-text-muted mb-2">
                By Andy Petek
              </p>
              <p className="font-body text-body-sm text-text-subtle">
                24 chapters across 3 parts &middot; 62 pages &middot; 2026
              </p>
            </motion.div>

            {/* Description + Download */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24"
            >
              <div className="lg:col-span-3 prose-custom">
                <p className="font-body text-body-lg text-text leading-relaxed mb-6">
                  The American wine industry built its modern identity on a generation that
                  collected, studied, and spent lavishly. That generation is aging out, and no
                  one is replacing them.
                </p>
                <p className="font-body text-body text-text-muted leading-relaxed mb-6">
                  <em>The Reckoning</em> is a comprehensive examination of the forces reshaping
                  American wine -- from the demographic cliff and the death of the collector,
                  to wildfire smoke taint and the grape glut, to the family wineries facing
                  succession crises they never planned for. It's the story of an industry
                  caught between the golden age it remembers and the uncertain future it
                  hasn't figured out yet.
                </p>
                <p className="font-body text-body text-text-muted leading-relaxed">
                  But it's also a story about adaptation. About the 40 percent of premium
                  wineries that are still growing. About new regions, new products, and new
                  ways of reaching consumers who think about alcohol differently than their
                  parents did. About what survival looks like when the old playbook stops
                  working.
                </p>
              </div>

              <div className="lg:col-span-2">
                <div className="sticky top-28 space-y-4">
                  {/* Download Card */}
                  <div className="bg-surface-raised rounded-lg p-8 border border-surface-subtle">
                    <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-6">
                      Download
                    </p>
                    <a
                      href="/the-reckoning.pdf"
                      download
                      className="flex items-center gap-3 w-full px-6 py-4 bg-gradient-daydreamer text-surface font-body font-semibold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Download size={20} />
                      Download PDF
                    </a>
                    <p className="font-body text-body-sm text-text-subtle mt-3">
                      Free -- no email required
                    </p>
                  </div>

                  {/* Coming Soon: Audio */}
                  <div className="bg-surface-raised rounded-lg p-8 border border-surface-subtle opacity-60">
                    <p className="font-mono text-tag uppercase tracking-widest text-text-subtle mb-4">
                      Coming Soon
                    </p>
                    <div className="flex items-center gap-3 text-text-muted font-body">
                      <Headphones size={20} />
                      Audio version
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="mb-24">
              <div className="h-px bg-surface-subtle" />
            </motion.div>

            {/* Table of Contents */}
            <motion.div variants={itemVariants} className="mb-24">
              <h2 className="font-display text-display-md mb-16">
                What's inside
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {parts.map((part) => (
                  <div key={part.number}>
                    <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-3">
                      {part.number}
                    </p>
                    <h3 className="font-display text-display-sm mb-2">
                      {part.title}
                    </h3>
                    <p className="font-body text-body-sm text-text-muted mb-6">
                      {part.subtitle}
                    </p>
                    <ol className="space-y-2">
                      {part.chapters.map((chapter, idx) => (
                        <li key={idx} className="flex gap-3 font-body text-body-sm text-text-muted">
                          <span className="font-mono text-tag text-text-subtle mt-1 shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {chapter}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pull Quote */}
            <motion.div
              variants={itemVariants}
              className="max-w-content mx-auto mb-24 text-center"
            >
              <BookOpen size={24} className="mx-auto text-accent-warm mb-6" />
              <blockquote className="font-display text-display-sm text-text leading-relaxed mb-6">
                "Wine has been produced for eight thousand years; it will continue to be
                produced. The question is what the production, distribution, and consumption
                of wine in America will look like."
              </blockquote>
              <p className="font-body text-body-sm text-text-subtle">
                From the conclusion
              </p>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              variants={itemVariants}
              className="bg-surface-raised rounded-lg p-8 md:p-12 text-center"
            >
              <h3 className="font-display text-display-sm mb-4">
                Read the full book
              </h3>
              <p className="font-body text-body text-text-muted mb-8 max-w-lg mx-auto">
                62 pages on the crisis, the adaptation, and the uncertain future of American wine.
                Free to download, share, and discuss.
              </p>
              <a
                href="/the-reckoning.pdf"
                download
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-daydreamer text-surface font-body font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download size={20} />
                Download PDF
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
