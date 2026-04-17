import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Clock, Check, Menu, X } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'

// Import guide data
import podcastGuide from '@/content/guides/starting-a-podcast/guide.json'

// Import chapter content
import introductionContent from '@/content/guides/starting-a-podcast/introduction.md?raw'
import findingConceptContent from '@/content/guides/starting-a-podcast/finding-your-concept.md?raw'
import planningContent from '@/content/guides/starting-a-podcast/planning-your-show.md?raw'
import equipmentContent from '@/content/guides/starting-a-podcast/equipment-and-software.md?raw'
import recordingContent from '@/content/guides/starting-a-podcast/recording.md?raw'
import editingContent from '@/content/guides/starting-a-podcast/editing-and-production.md?raw'
import brandingContent from '@/content/guides/starting-a-podcast/branding.md?raw'
import publishingContent from '@/content/guides/starting-a-podcast/publishing.md?raw'
import growingContent from '@/content/guides/starting-a-podcast/growing-your-audience.md?raw'
import monetizationContent from '@/content/guides/starting-a-podcast/monetization.md?raw'
import sustainingContent from '@/content/guides/starting-a-podcast/sustaining-long-term.md?raw'
import conclusionContent from '@/content/guides/starting-a-podcast/conclusion.md?raw'

const guides: Record<string, typeof podcastGuide> = {
  'starting-a-podcast': podcastGuide,
}

const chapterContent: Record<string, Record<string, string>> = {
  'starting-a-podcast': {
    'introduction': introductionContent,
    'finding-your-concept': findingConceptContent,
    'planning-your-show': planningContent,
    'equipment-and-software': equipmentContent,
    'recording': recordingContent,
    'editing-and-production': editingContent,
    'branding': brandingContent,
    'publishing': publishingContent,
    'growing-your-audience': growingContent,
    'monetization': monetizationContent,
    'sustaining-long-term': sustainingContent,
    'conclusion': conclusionContent,
  },
}

export default function Guide() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [completedChapters, setCompletedChapters] = useState<string[]>([])

  const guide = slug ? guides[slug] : null
  const currentChapter = searchParams.get('chapter') || guide?.chapters[0]?.slug || ''
  
  // Load completed chapters from localStorage
  useEffect(() => {
    if (slug) {
      try {
        const saved = localStorage.getItem(`guide-progress-${slug}`)
        if (saved) {
          setCompletedChapters(JSON.parse(saved))
        }
      } catch {
        // Ignore corrupted localStorage data
      }
    }
  }, [slug])

  // Save completed chapters
  const markComplete = (chapterSlug: string) => {
    if (!slug) return
    const newCompleted = completedChapters.includes(chapterSlug)
      ? completedChapters.filter(c => c !== chapterSlug)
      : [...completedChapters, chapterSlug]
    setCompletedChapters(newCompleted)
    try {
      localStorage.setItem(`guide-progress-${slug}`, JSON.stringify(newCompleted))
    } catch {
      // Ignore localStorage errors (private browsing, full storage)
    }
  }

  if (!guide || !slug) {
    return (
      <PageTransition>
        <div className="pt-32 pb-section">
          <div className="max-w-content mx-auto px-content text-center">
            <h1 className="font-display text-display-lg mb-4">Guide not found</h1>
            <Link to="/guides" className="text-accent-warm hover:text-accent-glow">
              ← Back to Guides
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  const currentIndex = guide.chapters.findIndex(c => c.slug === currentChapter)
  const prevChapter = currentIndex > 0 ? guide.chapters[currentIndex - 1] : null
  const nextChapter = currentIndex < guide.chapters.length - 1 ? guide.chapters[currentIndex + 1] : null
  const content = chapterContent[slug]?.[currentChapter] || ''
  const progress = Math.round((completedChapters.length / guide.chapters.length) * 100)

  const navigateToChapter = (chapterSlug: string) => {
    setSearchParams({ chapter: chapterSlug })
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-surface-subtle px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-text-muted hover:text-text transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span className="font-body text-body-sm">Chapters</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-24 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-daydreamer transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="font-mono text-caption text-text-subtle">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-full w-80 bg-surface border-r border-surface-subtle z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:top-16
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-full overflow-y-auto py-8 px-6">
            {/* Close button (mobile) */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-text-muted hover:text-text"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Guide Header */}
            <Link to="/guides" className="flex items-center gap-2 text-text-muted hover:text-text mb-6 font-body text-body-sm">
              <ArrowLeft className="w-4 h-4" />
              All Guides
            </Link>

            <h2 className="font-display text-body-lg mb-2">{guide.title}</h2>
            
            <div className="flex items-center gap-4 text-text-subtle font-mono text-caption mb-6">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {guide.chapters.length} chapters
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {guide.estimatedTime}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-caption text-text-muted">Progress</span>
                <span className="font-mono text-caption text-text-subtle">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-daydreamer transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Chapter List */}
            <nav className="space-y-1">
              {guide.chapters.map((chapter, index) => {
                const isActive = chapter.slug === currentChapter
                const isCompleted = completedChapters.includes(chapter.slug)
                
                return (
                  <button
                    key={chapter.slug}
                    onClick={() => navigateToChapter(chapter.slug)}
                    className={`
                      w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                      ${isActive ? 'bg-surface-raised text-text' : 'text-text-muted hover:bg-surface-raised/50 hover:text-text'}
                    `}
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-surface-subtle text-text-subtle'}
                    `}>
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-mono text-tag">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-body text-body-sm leading-tight">{chapter.title}</p>
                      <p className="font-body text-caption text-text-subtle">{chapter.subtitle}</p>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:ml-80 pt-32 lg:pt-24 pb-section">
          <div className="max-w-3xl mx-auto px-content">
            {/* Chapter Content */}
            <motion.article
              key={currentChapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="prose-custom"
            >
              <MarkdownRenderer content={content} />
            </motion.article>

            {/* Mark Complete Button */}
            <div className="mt-12 pt-8 border-t border-surface-subtle">
              <button
                onClick={() => markComplete(currentChapter)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${completedChapters.includes(currentChapter)
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-surface-raised text-text-muted hover:text-text'
                  }
                `}
              >
                <Check className="w-4 h-4" />
                {completedChapters.includes(currentChapter) ? 'Completed' : 'Mark as complete'}
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex items-center justify-between gap-4">
              {prevChapter ? (
                <button
                  onClick={() => navigateToChapter(prevChapter.slug)}
                  className="flex items-center gap-2 text-text-muted hover:text-text transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-body text-body-sm">{prevChapter.title}</span>
                </button>
              ) : (
                <div />
              )}
              
              {nextChapter ? (
                <button
                  onClick={() => navigateToChapter(nextChapter.slug)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-daydreamer text-white rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all"
                >
                  <span className="font-body text-body-sm font-semibold">Next: {nextChapter.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/guides"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-daydreamer text-white rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all"
                >
                  <span className="font-body text-body-sm font-semibold">Back to Guides</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </nav>
          </div>
        </main>
      </div>
    </PageTransition>
  )
}

// Simple markdown renderer
function MarkdownRenderer({ content }: { content: string }) {
  if (typeof content !== 'string') return null
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i}>{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>)
    }
    // List items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`list-${i}`}>
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      )
      continue
    }
    // Horizontal rule
    else if (line.startsWith('---')) {
      elements.push(<hr key={i} />)
    }
    // Empty line
    else if (line.trim() === '') {
      // Skip
    }
    // Paragraph
    else if (line.trim()) {
      // Collect paragraph lines
      let para = line
      i++
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('-') && !lines[i].startsWith('*') && !lines[i].startsWith('---')) {
        para += ' ' + lines[i]
        i++
      }
      elements.push(
        <p key={`p-${i}`} dangerouslySetInnerHTML={{ __html: formatInline(para) }} />
      )
      continue
    }

    i++
  }

  return <>{elements}</>
}

function formatInline(text: string): string {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Code
  text = text.replace(/`(.+?)`/g, '<code>$1</code>')
  // Links
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent-warm hover:text-accent-glow">$1</a>')
  
  return text
}
