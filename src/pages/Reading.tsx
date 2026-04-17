import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import { useBooks } from '@/lib/useBooks'
import { BookWithMeta } from '@/lib/googleBooks'

export default function Reading() {
  const { books, loading, stats, affiliateShop } = useBooks()
  const [selectedBook, setSelectedBook] = useState<BookWithMeta | null>(null)

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
              {new Date().getFullYear()} Reading Log
            </p>
            <h1 className="font-display text-display-lg mb-6">
              My Year in Books
            </h1>
            <p className="font-body text-body text-text-muted max-w-2xl mb-8">
              Tracking what I'm reading in {new Date().getFullYear()}. Click any cover to learn more about the book
              and find it at your local bookshop.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-display-md text-text">{stats.read}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">Books Read</p>
              </div>
              <div className="w-px h-12 bg-surface-subtle" />
              <div>
                <p className="font-display text-display-md text-text">{stats.goal}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">Goal</p>
              </div>
              <div className="w-px h-12 bg-surface-subtle" />
              <div className="flex-1 max-w-xs">
                <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-daydreamer"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.percentComplete}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
                <p className="font-mono text-tag text-text-muted mt-1">{stats.percentComplete}% Complete</p>
              </div>
            </div>
          </motion.div>

          {/* Book Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            {stats.read === 0 && !loading ? (
              <div className="text-center py-16 bg-surface-raised rounded-lg">
                <p className="font-display text-display-sm text-text mb-2">
                  The reading journey begins soon
                </p>
                <p className="font-body text-body text-text-muted">
                  {`My ${new Date().getFullYear()} reading log starts in January. Check back then to see what I'm reading.`}
                </p>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i}>
                    <div className="aspect-[2/3] rounded-lg bg-surface-raised animate-pulse mb-2" />
                    <div className="h-4 bg-surface-raised rounded animate-pulse mb-1" />
                    <div className="h-3 bg-surface-raised rounded animate-pulse w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {books.map((book, index) => (
                  <BookCard 
                    key={`${book.googleBooksId}-${book.readDate}`} 
                    book={book} 
                    index={index}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            )}
          </motion.section>

          {/* Bookshop Promo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 bg-surface-raised rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-2">
                  Support Independent Bookstores
                </p>
                <h3 className="font-display text-display-sm mb-3">
                  Shop at Bookshop.org
                </h3>
                <p className="font-body text-body text-text-muted mb-4">
                  When you purchase through my affiliate link, you support independent bookstores 
                  across the country. Every book on this page links to Bookshop.org.
                </p>
                <a
                  href={affiliateShop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-warm/20"
                >
                  Browse My Bookshop
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Book Detail Modal - simplified for now */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book details"
          onClick={() => setSelectedBook(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setSelectedBook(null) }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex gap-4">
              {selectedBook.coverUrl && (
                <img 
                  src={selectedBook.coverUrl} 
                  alt={selectedBook.title}
                  className="w-24 h-auto rounded-lg flex-shrink-0"
                />
              )}
              <div>
                <h3 className="font-display text-display-sm text-text mb-1">{selectedBook.title}</h3>
                {selectedBook.subtitle && (
                  <p className="font-body text-body-sm text-text-muted mb-2">{selectedBook.subtitle}</p>
                )}
                <p className="font-body text-body-sm text-text-muted">
                  {selectedBook.authors.join(', ')} · {selectedBook.year}
                </p>
              </div>
            </div>
            {selectedBook.description && (
              <p className="font-body text-body-sm text-text-muted mt-4 line-clamp-6">
                {selectedBook.description}
              </p>
            )}
            <a
              href={selectedBook.bookshopUrl || affiliateShop}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg text-body-sm"
            >
              Buy at Bookshop.org
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      )}
    </PageTransition>
  )
}

function BookCard({ book, index, onClick }: { book: BookWithMeta; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[2/3] rounded-lg overflow-hidden bg-surface-raised mb-2 relative">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-overlay p-2">
            <span className="text-text-subtle text-xs text-center">{book.title}</span>
          </div>
        )}
        <div className="absolute inset-0 border-2 border-accent-warm/0 group-hover:border-accent-warm/50 rounded-lg transition-colors pointer-events-none" />
      </div>
      <p className="font-body text-caption text-text line-clamp-1 group-hover:text-accent-warm transition-colors">
        {book.title}
      </p>
      <p className="font-mono text-tag text-text-subtle line-clamp-1">
        {book.authors[0]}
      </p>
    </motion.div>
  )
}
