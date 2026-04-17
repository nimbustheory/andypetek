import { useState, useEffect } from 'react'
import { Search, Plus, Check, Loader2, Trash2, BookOpen, ExternalLink } from 'lucide-react'
import { searchBook, getCoverUrl, getYear, getISBN13, GoogleBook } from '@/lib/googleBooks'
import { getJsonFile, updateJsonFile } from '@/lib/github'

interface BookEntry {
  title: string
  author?: string
  date: string
  bookshopUrl?: string
}

interface BooksData {
  year: number
  goal: number
  affiliateShop: string
  books: BookEntry[]
  lists: Record<string, unknown>
}

const BOOKS_PATH = 'src/content/books-2026.json'

export default function AdminBooks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<GoogleBook | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [books, setBooks] = useState<BookEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [readDate, setReadDate] = useState(new Date().toISOString().split('T')[0])
  const [bookshopUrl, setBookshopUrl] = useState('')

  // Load current books on mount
  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setIsLoading(true)
      const { data } = await getJsonFile<BooksData>(BOOKS_PATH)
      setBooks(data.books || [])
    } catch (error) {
      console.error('Failed to load books:', error)
      setMessage({ type: 'error', text: 'Failed to load books from GitHub' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchResults(null)
    
    try {
      const result = await searchBook(searchQuery)
      setSearchResults(result)
      if (!result) {
        setMessage({ type: 'error', text: 'No book found with that title' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Search failed' })
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddBook = async () => {
    if (!searchResults) return

    const newBook: BookEntry = {
      title: searchResults.volumeInfo.title,
      author: searchResults.volumeInfo.authors?.[0],
      date: readDate,
      bookshopUrl: bookshopUrl || undefined,
    }

    // Check if already exists
    const exists = books.some(
      b => b.title.toLowerCase() === newBook.title.toLowerCase() && b.date === newBook.date
    )
    if (exists) {
      setMessage({ type: 'error', text: 'This book is already in your reading log for this date' })
      return
    }

    setIsSaving(true)
    
    try {
      // Get fresh data to avoid conflicts
      const { data, sha: freshSha } = await getJsonFile<BooksData>(BOOKS_PATH)
      
      const updatedBooks = [newBook, ...(data.books || [])]
      const updatedData: BooksData = {
        ...data,
        books: updatedBooks,
      }

      await updateJsonFile(
        BOOKS_PATH,
        updatedData,
        `Add book: ${newBook.title}`,
        freshSha
      )

      setBooks(updatedBooks)
      setSearchResults(null)
      setSearchQuery('')
      setBookshopUrl('')
      setMessage({ type: 'success', text: `Added "${newBook.title}" to your reading log` })
      
      // Reload to get new SHA
      loadBooks()
    } catch (error) {
      console.error('Failed to save:', error)
      setMessage({ type: 'error', text: 'Failed to save to GitHub' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveBook = async (index: number) => {
    const bookToRemove = books[index]
    if (!confirm(`Remove "${bookToRemove.title}" from your reading log?`)) return

    setIsSaving(true)
    
    try {
      const { data, sha: freshSha } = await getJsonFile<BooksData>(BOOKS_PATH)
      
      const updatedBooks = (data.books || []).filter(
        b => !(b.title === bookToRemove.title && b.date === bookToRemove.date)
      )

      const updatedData: BooksData = {
        ...data,
        books: updatedBooks,
      }

      await updateJsonFile(
        BOOKS_PATH,
        updatedData,
        `Remove book: ${bookToRemove.title}`,
        freshSha
      )

      setBooks(updatedBooks)
      setMessage({ type: 'success', text: `Removed "${bookToRemove.title}"` })
      loadBooks()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove book' })
    } finally {
      setIsSaving(false)
    }
  }

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="space-y-8">
      {/* Message Toast */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {message.type === 'success' ? <Check className="w-5 h-5" /> : null}
          <span className="font-body text-body-sm">{message.text}</span>
        </div>
      )}

      {/* Add Book Form */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h2 className="font-display text-body-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-warm" />
          Add Book
        </h2>

        <div className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a book..."
              className="flex-1 px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-4 py-3 bg-surface-overlay rounded-lg text-text hover:bg-surface-subtle transition-colors disabled:opacity-50"
            >
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Search Result */}
          {searchResults && (
            <div className="flex gap-4 p-4 bg-surface rounded-lg">
              {getCoverUrl(searchResults) && (
                <img
                  src={getCoverUrl(searchResults) || ''}
                  alt={searchResults.volumeInfo.title}
                  className="w-16 h-auto rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-display text-body-lg text-text">
                  {searchResults.volumeInfo.title}
                </h3>
                <p className="font-body text-body-sm text-text-muted">
                  {searchResults.volumeInfo.authors?.join(', ')}
                </p>
                <p className="font-mono text-tag text-text-subtle">
                  {getYear(searchResults.volumeInfo.publishedDate)}
                  {getISBN13(searchResults) && ` · ISBN: ${getISBN13(searchResults)}`}
                </p>
              </div>
            </div>
          )}

          {/* Date, Bookshop URL & Add Button */}
          {searchResults && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-body-sm text-text-muted mb-1">
                    Read Date
                  </label>
                  <input
                    type="date"
                    value={readDate}
                    onChange={(e) => setReadDate(e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-body text-body-sm text-text-muted mb-1">
                    Bookshop.org URL{' '}
                    <span className="text-text-subtle">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={bookshopUrl}
                    onChange={(e) => setBookshopUrl(e.target.value)}
                    placeholder="https://bookshop.org/p/..."
                    className="w-full px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <a
                  href="https://bookshop.org/shop/joyread-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-surface-overlay rounded-lg text-text-muted hover:text-text transition-colors flex items-center gap-2 font-body text-body-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Bookshop Dashboard
                </a>
                <button
                  onClick={handleAddBook}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50 flex items-center gap-2 ml-auto"
                >
                  {isSaving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                  Add to Reading Log
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Books */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h2 className="font-display text-body-lg mb-4">
          Recent Books ({books.length})
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
          </div>
        ) : books.length === 0 ? (
          <p className="text-text-muted font-body text-body-sm py-4">
            No books in your reading log yet.
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {books.slice(0, 20).map((book, index) => (
              <div
                key={`${book.title}-${book.date}`}
                className="flex items-center justify-between p-3 bg-surface rounded-lg group"
              >
                <div>
                  <p className="font-body text-body text-text">{book.title}</p>
                  <p className="font-mono text-tag text-text-muted">
                    {book.author} · {book.date}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveBook(index)}
                  className="p-2 text-text-subtle hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove book"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
