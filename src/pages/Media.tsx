import { motion } from 'framer-motion'
import { Download, Mail, Linkedin, Instagram } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

const speakingTopics = [
  {
    title: 'The Solopreneur Reality',
    description: 'What it actually takes to run a one-person operation that delivers like an agency—and why the hustle narrative gets it wrong.',
  },
  {
    title: 'Building Tech for Communities',
    description: 'How arts organizations and nonprofits can use technology without losing their soul.',
  },
  {
    title: 'The Craft Beverage Industry',
    description: 'Insider perspectives on branding, loyalty, and what\'s next for craft beverages.',
  },
  {
    title: 'Creative Business Strategy',
    description: 'The Daydreamer Method—practical frameworks for entrepreneurs who think differently.',
  },
  {
    title: 'Design in the Age of AI',
    description: 'What happens to creative professionals when the tools change beneath them.',
  },
]

const bios = {
  short: `Andy Petek is a creative entrepreneur and founder of Nimbus Labs, building software for arts organizations and the beverage industry. He's spent 15 years starting businesses, designing beer cans, and writing about what he's learned.`,
  
  medium: `Andy Petek is a creative entrepreneur and founder of Nimbus Labs, where he builds apps and software for arts organizations, nonprofits, and the beverage industry. Over 15 years, he's founded a cidery, run a podcast network, designed hundreds of beer cans, and consulted with businesses across six continents. His work sits at the intersection of technology, design, and community—helping organizations build tools that match their values. He's currently writing several books on creative business strategy and the beverage industry.`,
  
  long: `Andy Petek is a creative entrepreneur, designer, and founder of Nimbus Labs—a technology company building apps and software for arts organizations, nonprofits, and the beverage industry. 

Over fifteen years, Andy has started and run businesses across beverage, media, design, and technology. He founded a cidery, built and sold a podcast network, ran a PR agency, and has consulted with hundreds of entrepreneurs across six continents. His design work—particularly in craft beverage packaging—has won recognition as some of the best in the industry.

Today, Andy focuses on bringing technology solutions to communities often underserved by traditional tech: small arts nonprofits, independent film festivals, community organizations, and craft beverage brands. His work is guided by the Daydreamer Method, a business framework he developed through years of trial, error, and occasional success.

Andy is currently writing several books, including "The Daydreamer Method" (creative business strategy), "Business Quest" (entrepreneurship as hero's journey), and "The Creative Revolution" (25 years of beverage design). He watches 250+ movies per year, lives in Seattle, and still designs the occasional beer can because some things are too good to give up.`,
}

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

export default function Media() {
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
              Media Kit
            </p>
            <h1 className="font-display text-display-lg mb-4">
              Book me for your podcast, event, or publication
            </h1>
            <p className="font-body text-body text-text-muted">
              I talk about entrepreneurship, the beverage industry, building tech for communities, 
              and the weird journey of doing your own thing for fifteen years.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Headshots */}
              <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2 variants={itemVariants} className="font-display text-display-sm mb-6">
                  Headshots
                </motion.h2>
                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-surface-raised rounded-lg overflow-hidden group relative">
                      {/* Placeholder for actual headshots */}
                      <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 bg-white/20 rounded-full">
                          <Download className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
                <motion.p variants={itemVariants} className="mt-4 font-mono text-caption text-text-subtle">
                  Click to download high-resolution versions
                </motion.p>
              </motion.section>

              {/* Speaking Topics */}
              <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 variants={itemVariants} className="font-display text-display-sm mb-6">
                  Speaking Topics
                </motion.h2>
                <motion.div variants={itemVariants} className="space-y-6">
                  {speakingTopics.map((topic) => (
                    <div key={topic.title} className="p-6 bg-surface-raised rounded-lg">
                      <h3 className="font-display text-body-lg text-text mb-2">
                        {topic.title}
                      </h3>
                      <p className="font-body text-body-sm text-text-muted">
                        {topic.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </motion.section>

              {/* Bios */}
              <motion.section
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 variants={itemVariants} className="font-display text-display-sm mb-6">
                  Bio Versions
                </motion.h2>
                
                <motion.div variants={itemVariants} className="space-y-8">
                  <div className="p-6 bg-surface-raised rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono text-tag uppercase tracking-wider text-text-muted">
                        Short Bio (50 words)
                      </h3>
                      <button className="text-text-subtle hover:text-text transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-body text-body-sm text-text">
                      {bios.short}
                    </p>
                  </div>

                  <div className="p-6 bg-surface-raised rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono text-tag uppercase tracking-wider text-text-muted">
                        Medium Bio (100 words)
                      </h3>
                      <button className="text-text-subtle hover:text-text transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-body text-body-sm text-text">
                      {bios.medium}
                    </p>
                  </div>

                  <div className="p-6 bg-surface-raised rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono text-tag uppercase tracking-wider text-text-muted">
                        Full Bio (200+ words)
                      </h3>
                      <button className="text-text-subtle hover:text-text transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-body text-body-sm text-text whitespace-pre-line">
                      {bios.long}
                    </p>
                  </div>
                </motion.div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 space-y-8"
              >
                {/* Contact Card */}
                <div className="p-6 bg-surface-raised rounded-lg">
                  <h3 className="font-display text-body-lg mb-4">Get in Touch</h3>
                  <p className="font-body text-body-sm text-text-muted mb-6">
                    For speaking inquiries, podcast interviews, or press requests.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="mailto:andy@andypetek.com"
                      className="flex items-center gap-3 text-text-muted hover:text-text transition-colors font-body text-body-sm"
                    >
                      <Mail className="w-5 h-5" />
                      andy@andypetek.com
                    </a>
                    <a
                      href="https://linkedin.com/in/andypetek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-muted hover:text-text transition-colors font-body text-body-sm"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/andy.the.daydreamer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text-muted hover:text-text transition-colors font-body text-body-sm"
                    >
                      <Instagram className="w-5 h-5" />
                      @andy.the.daydreamer
                    </a>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="p-6 bg-surface-raised rounded-lg">
                  <h3 className="font-display text-body-lg mb-4">Quick Facts</h3>
                  <ul className="space-y-3 font-body text-body-sm text-text-muted">
                    <li>📍 Based in Seattle, WA</li>
                    <li>🎬 250+ films watched per year</li>
                    <li>🍺 200+ beer cans designed</li>
                    <li>🌍 Consulted across 6 continents</li>
                    <li>📚 3 books in progress</li>
                    <li>💼 15 years in business</li>
                  </ul>
                </div>

                {/* Download All */}
                <button className="w-full px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Full Media Kit
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
