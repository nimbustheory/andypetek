import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Headphones } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import AudioPlayer from '@/components/content/AudioPlayer'
import SubscribeForm from '@/components/content/SubscribeForm'

// Placeholder - will be replaced with actual MDX content fetching
const getPost = (slug: string) => {
  const posts: Record<string, {
    title: string
    subtitle?: string
    excerpt: string
    section: string
    category: string
    categoryLabel: string
    date: string // kept for sorting, not displayed
    readTime: string
    content: string
    // Audio options for Rough Cut
    roughCutId?: string // Buzzsprout episode ID
    roughCutUrl?: string // Direct audio URL
    roughCutTitle?: string // Custom title for audio
  }> = {
    'building-apps-for-jazz-clubs': {
      title: 'Building Apps for Jazz Clubs',
      subtitle: 'How Dimitriou\'s Jazz Alley is rethinking membership in the digital age',
      excerpt: 'A look inside the membership app I built for Seattle\'s legendary jazz venue.',
      section: 'business',
      category: 'community-tech',
      categoryLabel: 'Community & Tech',
      date: '2025-01-15',
      readTime: '8 min read',
      content: `
The project started with a simple question: how do you make a membership program feel as special as the live music experience itself?

Dimitriou's Jazz Alley has been a Seattle institution since 1979. They've hosted everyone from Dizzy Gillespie to Diana Krall. The venue is intimate, the food is good, and the music is world-class. But their membership program was stuck in the past—paper cards, manual tracking, and no real way to make members feel like insiders.

## The Challenge

Like a lot of arts organizations, Jazz Alley had been running on systems that worked "well enough" for decades. A FileMaker database here, some spreadsheets there, a website that could sell tickets but couldn't do much else.

The membership program had real value—priority seating, discounts, member-only events—but the experience of *being* a member felt administrative rather than special. You'd show up, hope your name was in the system, and maybe get a discount if everyone remembered.

## The Approach

We didn't start with technology. We started with the question: what should it *feel like* to be a member of Jazz Alley?

The answer had nothing to do with features and everything to do with identity. Members should feel like insiders. They should feel recognized. They should have access to things non-members don't even know exist.

From there, the features became obvious:

- **Digital membership card** that actually looks beautiful and works at the door
- **Member-only content**: artist interviews, behind-the-scenes, early access to tickets
- **Real-time benefits tracking** so you can see exactly what you've earned
- **Personal history** of every show you've attended as a member

## The Outcome

The app launched in late 2024. Early results are promising—membership signups are up, engagement is real, and most importantly, members actually *use* the thing.

But the real win isn't in the metrics. It's in the emails from members saying they finally feel like the VIPs the program always promised they'd be.

---

*This is the kind of work I do at Nimbus Labs. If your organization needs technology that actually fits how you work, let's talk.*
      `,
    },
    // Add more posts as needed
  }

  return posts[slug] || null
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : null

  if (!post) {
    return (
      <PageTransition>
        <div className="pt-32 pb-section">
          <div className="max-w-content mx-auto px-content text-center">
            <h1 className="font-display text-display-lg mb-4">Post not found</h1>
            <p className="font-body text-body text-text-muted mb-8">
              This post doesn't exist or has been moved.
            </p>
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-glow transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Writing
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const hasAudio = post.roughCutId || post.roughCutUrl

  return (
    <PageTransition>
      <article className="pt-32 pb-section">
        <div className="max-w-wide mx-auto px-content">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              to="/writing"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors font-body text-body-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Writing
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-content mb-12"
          >
            <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-4">
              {post.categoryLabel}
            </p>
            <h1 className="font-display text-display-lg mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="font-display text-display-sm text-text-muted mb-6">
                {post.subtitle}
              </p>
            )}
            <div className="flex items-center gap-4 text-text-subtle font-mono text-caption">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              {hasAudio && (
                <span className="flex items-center gap-1.5 text-accent-warm">
                  <Headphones className="w-4 h-4" />
                  Audio available
                </span>
              )}
            </div>
          </motion.header>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[21/9] bg-surface-raised rounded-lg mb-12 overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-surface-raised to-surface-overlay" />
          </motion.div>

          {/* Audio Player (if available) */}
          {hasAudio && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-content mx-auto"
            >
              <AudioPlayer
                buzzsproutEpisodeId={post.roughCutId}
                audioUrl={post.roughCutUrl}
                episodeTitle={post.roughCutTitle || `Listen to "${post.title}"`}
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-content mx-auto"
          >
            <div className="prose-custom">
              {/* Render markdown content - this will be replaced with actual MDX rendering */}
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index}>{paragraph.replace('## ', '')}</h2>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(p => p.startsWith('- '))
                  return (
                    <ul key={index}>
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} />
                }
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <p key={index} className="italic text-text-muted">
                      {paragraph.replace(/^\*|\*$/g, '')}
                    </p>
                  )
                }
                return <p key={index}>{paragraph}</p>
              })}
            </div>
          </motion.div>

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-content mx-auto mt-16"
          >
            <SubscribeForm />
          </motion.div>

          {/* Author / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-content mx-auto mt-12 pt-8 border-t border-surface-subtle"
          >
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-surface-raised flex-shrink-0" />
              <div>
                <p className="font-display text-body-lg mb-1">Andy Petek</p>
                <p className="font-body text-body-sm text-text-muted mb-4">
                  Creative entrepreneur building software for communities. 
                  Founder of Nimbus Labs.
                </p>
                <Link
                  to="/about"
                  className="font-body text-body-sm text-accent-warm hover:text-accent-glow transition-colors"
                >
                  More about Andy →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </PageTransition>
  )
}
