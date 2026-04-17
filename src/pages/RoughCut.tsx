import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Headphones, Rss, ArrowRight } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import SubscribeForm from '@/components/content/SubscribeForm'

// This will eventually be populated from articles that have roughCutId or roughCutUrl
// For now, showing the concept with placeholder data
const episodes = [
  {
    slug: 'the-great-spill',
    title: 'The Great Spill',
    description: 'How changing consumer habits are reshaping the beer industry — with personal stories from the trenches.',
    duration: '18 min',
    hasAudio: false, // Will be true once audio is added
  },
  {
    slug: 'business-quest',
    title: 'Business Quest',
    description: 'Why I finally decided to publish my book on entrepreneurship through the hero\'s journey lens.',
    duration: '12 min',
    hasAudio: false,
  },
  {
    slug: 'top-10-movies-2025',
    title: 'My Top 10 Movies of 2025',
    description: 'Going deeper on the films that moved me this year, with stories from the theater.',
    duration: '25 min',
    hasAudio: false,
  },
]

export default function RoughCut() {
  const availableEpisodes = episodes.filter(ep => ep.hasAudio)
  const upcomingEpisodes = episodes.filter(ep => !ep.hasAudio)

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
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-daydreamer flex items-center justify-center">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-mono text-tag uppercase tracking-widest text-accent-warm">
                  Site Exclusive
                </p>
                <h1 className="font-display text-display-lg">
                  The Daydreamer Rough Cut
                </h1>
              </div>
            </div>
            
            <p className="font-body text-body-lg text-text-muted max-w-2xl mb-6">
              Audio companions to my written work. Casual, unscripted expansions where I go deeper 
              on topics, share behind-the-scenes context, and add insights that didn't make it to the page.
            </p>

            <p className="font-body text-body text-text-muted max-w-2xl mb-8">
              These aren't available on Spotify or Apple Podcasts — they're exclusive to this site. 
              Think of it as sitting down for coffee and hearing me riff on something I've been thinking about.
            </p>

            {/* RSS Feed Link - for those who want it in their podcast app */}
            <a
              href="/feeds/rough-cut.xml"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-raised rounded-lg text-text-muted hover:text-text transition-colors font-body text-body-sm"
            >
              <Rss className="w-4 h-4" />
              Private RSS Feed
              <span className="text-text-subtle">(for your podcast app)</span>
            </a>
          </motion.div>

          {/* Available Episodes */}
          {availableEpisodes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="font-display text-display-sm mb-6">Episodes</h2>
              <div className="space-y-4">
                {availableEpisodes.map((episode) => (
                  <EpisodeCard key={episode.slug} episode={episode} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Coming Soon / No Episodes Yet */}
          {availableEpisodes.length === 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <div className="bg-surface-raised rounded-xl p-8 text-center">
                <Headphones className="w-12 h-12 text-text-subtle mx-auto mb-4" />
                <h2 className="font-display text-display-sm mb-2">Coming Soon</h2>
                <p className="font-body text-body text-text-muted max-w-md mx-auto">
                  I'm recording the first batch of Rough Cut episodes now. 
                  Subscribe below to get notified when they drop.
                </p>
              </div>
            </motion.section>
          )}

          {/* Upcoming / Planned Episodes */}
          {upcomingEpisodes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="font-display text-body-lg text-text-muted mb-4">
                In Production
              </h2>
              <div className="space-y-3">
                {upcomingEpisodes.map((episode) => (
                  <div
                    key={episode.slug}
                    className="flex items-center justify-between p-4 bg-surface-raised/50 rounded-lg opacity-60"
                  >
                    <div>
                      <p className="font-body text-body text-text">{episode.title}</p>
                      <p className="font-body text-caption text-text-muted">
                        {episode.description}
                      </p>
                    </div>
                    <span className="font-mono text-tag text-text-subtle">
                      Coming soon
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Subscribe */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SubscribeForm />
          </motion.section>
        </div>
      </div>
    </PageTransition>
  )
}

function EpisodeCard({ episode }: { episode: typeof episodes[0] }) {
  return (
    <Link
      to={`/writing/${episode.slug}`}
      className="flex items-center gap-4 p-4 bg-surface-raised rounded-xl hover:bg-surface-overlay transition-colors group"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-daydreamer flex items-center justify-center flex-shrink-0">
        <Headphones className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display text-body-lg text-text group-hover:text-gradient transition-colors">
          {episode.title}
        </p>
        <p className="font-body text-body-sm text-text-muted line-clamp-1">
          {episode.description}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="font-mono text-tag text-text-subtle">
          {episode.duration}
        </span>
        <ArrowRight className="w-4 h-4 text-text-subtle group-hover:text-accent-warm group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  )
}
