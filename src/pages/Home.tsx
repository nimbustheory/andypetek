import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Plane, ExternalLink } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import PhoneMockupCarousel from '@/components/ui/PhoneMockupCarousel'
import { useCurrentFilm } from '@/lib/useFilms'
import { useCurrentBook } from '@/lib/useBooks'
import SubscribeForm from '@/components/content/SubscribeForm'
import currentlyData from '@/content/currently.json'
import { featuredPosts } from '@/content/posts'

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

export default function Home() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center pt-20">
        <div className="max-w-wide mx-auto px-content w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-6"
            >
              Entrepreneur · Designer · Builder
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-display-xl mb-8"
            >
              I build things for{' '}
              <span className="text-gradient">communities</span>{' '}
              I care about.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-body-lg text-text-muted max-w-2xl mb-12"
            >
              Fifteen years of starting businesses, developing products, and chasing rainbows. 
              Now I make software and apps. I also write about what I've learned.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/writing"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
              >
                Latest Happenings
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-surface-subtle text-text font-body font-semibold rounded-lg hover:bg-surface-raised transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Currently Section */}
      <section className="py-section border-t border-surface-subtle">
        <div className="max-w-wide mx-auto px-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-mono text-tag uppercase tracking-widest text-text-muted mb-8">
              Currently
            </h2>
            <CurrentlySection />
          </motion.div>
        </div>
      </section>

      {/* Latest Creation - App Showcase */}
      <section className="py-section border-t border-surface-subtle">
        <div className="max-w-wide mx-auto px-content">
          <LatestAppSection />
        </div>
      </section>

      {/* Featured Writing */}
      <section className="py-section border-t border-surface-subtle">
        <div className="max-w-wide mx-auto px-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-mono text-tag uppercase tracking-widest text-text-muted mb-2">
                Featured
              </h2>
              <p className="font-display text-display-md">Recent Writing</p>
            </div>
            <Link
              to="/writing"
              className="group hidden sm:flex items-center gap-2 text-text-muted hover:text-text transition-colors font-body"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/writing/${post.slug}`} className="block card-hover">
                  <div className="aspect-[16/10] bg-surface-raised rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
                  </div>
                  <p className="font-mono text-tag uppercase tracking-wider text-accent-warm mb-2">
                    {post.category}
                  </p>
                  <h3 className="font-display text-display-sm text-text group-hover:text-gradient transition-all mb-2">
                    {post.title}
                  </h3>
                  <p className="font-body text-body-sm text-text-muted line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>

          <Link
            to="/writing"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 text-text-muted hover:text-text transition-colors font-body"
          >
            View all writing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-section border-t border-surface-subtle">
        <div className="max-w-2xl mx-auto px-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SubscribeForm />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section border-t border-surface-subtle">
        <div className="max-w-wide mx-auto px-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-display-md mb-6">
              Looking for a guest or collaborator?
            </h2>
            <p className="font-body text-body text-text-muted mb-8">
              I talk about entrepreneurship, the beverage industry, building tech for communities, 
              and the weird journey of doing your own thing for 15 years.
            </p>
            <Link
              to="/media"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
            >
              View Media Kit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

// Currently section with photos - 3x2 grid layout
function CurrentlySection() {
  const { film: currentFilm, loading: filmLoading, stats: filmStats } = useCurrentFilm()
  const { book: currentBook, loading: bookLoading, stats: bookStats, affiliateShop } = useCurrentBook()

  return (
    <div className="space-y-8">
      {/* Top row: Building, Projects, Design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Building */}
        <CurrentlyCard
          label="Building"
          title={currentlyData.building.title}
          description={currentlyData.building.description}
          image={currentlyData.building.image}
          link={currentlyData.building.link}
          accent
        />

        {/* Projects */}
        <CurrentlyCard
          label="Projects"
          title={currentlyData.projects.title}
          description={currentlyData.projects.description}
          image={currentlyData.projects.image}
          link={currentlyData.projects.link}
        />

        {/* Design */}
        <CurrentlyCard
          label="Design"
          title={currentlyData.design.title}
          description={currentlyData.design.description}
          image={currentlyData.design.image}
          link={currentlyData.design.link}
        />
      </div>

      {/* Bottom row: Watching, Reading, Working From */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Watching */}
        <CurrentlyCard
          label="Watching"
          title={currentFilm?.title || '2026 diary starting soon'}
          description={currentFilm ? `Film #${filmStats.watched} of ${filmStats.goal}` : `Goal: ${filmStats.goal} films`}
          image={currentFilm?.posterUrl || '/images/currently/watching.jpg'}
          link="/watching"
          loading={filmLoading}
        />

        {/* Reading - auto-populated from books log */}
        <CurrentlyCard
          label="Reading"
          title={currentBook?.title || '2026 reading starts soon'}
          description={currentBook?.authors?.[0] || `Goal: ${bookStats.goal} books`}
          image={currentBook?.coverUrl || '/images/currently/reading.jpg'}
          link="/reading"
          externalLink={currentBook?.bookshopUrl || affiliateShop}
          loading={bookLoading}
        />

        {/* Working From */}
        <CurrentlyCardLocation
          city={currentlyData.location.city}
          status={currentlyData.location.status}
          image={currentlyData.location.image}
          upcoming={currentlyData.location.upcoming}
        />
      </div>
    </div>
  )
}

// Unified card component for Currently section with image
function CurrentlyCard({ 
  label, 
  title, 
  description, 
  image,
  link,
  externalLink,
  accent = false,
  loading = false
}: { 
  label: string
  title: string
  description: string
  image?: string | null
  link?: string | null
  externalLink?: string | null
  accent?: boolean
  loading?: boolean
}) {
  const content = (
    <div className="relative h-full rounded-xl overflow-hidden bg-surface-raised group">
      {/* Background Image */}
      <div className="absolute inset-0">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full p-5 flex flex-col justify-end">
        <p className={`font-mono text-tag uppercase tracking-widest mb-2 ${accent ? 'text-accent-warm' : 'text-text-subtle'}`}>
          {label}
        </p>
        {loading ? (
          <div className="h-6 w-32 bg-surface-overlay rounded animate-pulse mb-1" />
        ) : (
          <p className="font-display text-display-sm text-text line-clamp-2 group-hover:text-gradient transition-all">
            {title}
          </p>
        )}
        <p className="font-body text-body-sm text-text-muted line-clamp-1 mt-1">
          {description}
        </p>
      </div>
    </div>
  )

  const cardClass = "aspect-[4/3]"

  // External link (opens in new tab)
  if (externalLink) {
    return (
      <a 
        href={externalLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={cardClass}
      >
        {content}
      </a>
    )
  }

  // Internal link (react-router)
  if (link) {
    return (
      <Link to={link} className={cardClass}>
        {content}
      </Link>
    )
  }

  return <div className={cardClass}>{content}</div>
}

// Special location card with upcoming travel
function CurrentlyCardLocation({ 
  city, 
  status, 
  image,
  upcoming 
}: { 
  city: string
  status: string
  image?: string
  upcoming?: { city: string; dates: string }[]
}) {
  return (
    <div className="aspect-[4/3]">
      <div className="relative h-full rounded-xl overflow-hidden bg-surface-raised group">
        {/* Background Image */}
        <div className="absolute inset-0">
          {image ? (
            <img
              src={image}
              alt={city}
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full p-5 flex flex-col justify-end">
          <p className="font-mono text-tag uppercase tracking-widest text-text-subtle mb-2">
            Working From
          </p>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-accent-warm flex-shrink-0" />
            <p className="font-display text-display-sm text-text line-clamp-1">
              {city}
            </p>
          </div>
          <p className="font-body text-body-sm text-text-muted">
            {status}
          </p>
          
          {/* Upcoming */}
          {upcoming && upcoming.length > 0 && upcoming[0].city && (
            <div className="mt-2 pt-2 border-t border-surface-subtle/50">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-subtle mb-1 flex items-center gap-1">
                <Plane className="w-2.5 h-2.5" />
                Next
              </p>
              <p className="font-body text-caption text-text-muted line-clamp-2">
                <span className="text-text">{upcoming[0].city}</span>
                {upcoming[0].dates && ` · ${upcoming[0].dates}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Latest App showcase section
function LatestAppSection() {
  const app = currentlyData.latestApp

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2 className="font-display text-display-md text-center mb-4">
        Latest <span className="text-gradient">Creation</span>
      </h2>
      <p className="font-body text-body text-text-muted text-center max-w-xl mx-auto mb-8">
        {app.tagline}
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Phone Carousel */}
        <div className="flex-shrink-0">
          <PhoneMockupCarousel 
            screenshots={app.screenshots}
            autoPlayInterval={6000}
          />
        </div>

        {/* App Info */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="font-display text-display-sm mb-4">{app.name}</h3>
          <p className="font-body text-body text-text-muted mb-6 max-w-md">
            {app.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href={app.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
            >
              Download on App Store
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              to="/watching"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-surface-subtle text-text font-body font-semibold rounded-lg hover:bg-surface-raised transition-colors"
            >
              See My Film Diary
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Features highlight */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="font-mono text-tag uppercase tracking-wider text-accent-warm mb-1">Discover</p>
              <p className="font-body text-body-sm text-text-muted">Browse by mood, decade, or collection</p>
            </div>
            <div>
              <p className="font-mono text-tag uppercase tracking-wider text-accent-warm mb-1">Stream</p>
              <p className="font-body text-body-sm text-text-muted">See where films are available</p>
            </div>
            <div>
              <p className="font-mono text-tag uppercase tracking-wider text-accent-warm mb-1">Track</p>
              <p className="font-body text-body-sm text-text-muted">Build your watchlist and diary</p>
            </div>
            <div>
              <p className="font-mono text-tag uppercase tracking-wider text-accent-warm mb-1">No Ads</p>
              <p className="font-body text-body-sm text-text-muted">Just you and the movies</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
