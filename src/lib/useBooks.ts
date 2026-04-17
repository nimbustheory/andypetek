import { useState, useEffect } from 'react'
import { enrichBookEntry, BookWithMeta } from './googleBooks'
import booksData from '@/content/books-2026.json'

interface BookLogData {
  year: number
  goal: number
  affiliateShop: string
  books: { title: string; author?: string; date: string; bookshopUrl?: string }[]
  lists?: Record<string, {
    title: string
    description: string
    books: { title: string; author?: string; bookshopUrl?: string }[]
  }>
}

interface UseBooksResult {
  books: BookWithMeta[]
  loading: boolean
  error: string | null
  stats: {
    read: number
    goal: number
    percentComplete: number
    year: number
  }
  affiliateShop: string
}

// Cache enriched books to avoid re-fetching
const bookCache = new Map<string, BookWithMeta>()

export function useBooks(limit?: number): UseBooksResult {
  const [books, setBooks] = useState<BookWithMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const data = booksData as BookLogData

  useEffect(() => {
    async function loadBooks() {
      // If no books, return early
      if (!data.books || data.books.length === 0) {
        setLoading(false)
        setBooks([])
        return
      }

      try {
        setLoading(true)
        
        // Sort by date descending (most recent first)
        const sortedEntries = [...data.books].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        
        // Limit if specified
        const entriesToLoad = limit ? sortedEntries.slice(0, limit) : sortedEntries
        
        // Enrich with Google Books data (sequential to avoid 429 rate limits)
        const enrichedBooks: BookWithMeta[] = []

        for (const entry of entriesToLoad) {
          const cacheKey = `${entry.title}-${entry.author || ''}-${entry.date}`
          if (bookCache.has(cacheKey)) {
            enrichedBooks.push(bookCache.get(cacheKey)!)
            continue
          }
          try {
            const enriched = await enrichBookEntry(entry)
            if (enriched) {
              bookCache.set(cacheKey, enriched)
              enrichedBooks.push(enriched)
            }
          } catch {
            console.warn(`Failed to enrich book: ${entry.title}`)
          }
        }
        
        setBooks(enrichedBooks)
        setError(null)
      } catch (err) {
        setError('Failed to load books')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadBooks()
  }, [limit, data.books])

  return {
    books,
    loading,
    error,
    stats: {
      read: data.books?.length || 0,
      goal: data.goal,
      percentComplete: data.books?.length ? Math.round((data.books.length / data.goal) * 100) : 0,
      year: data.year,
    },
    affiliateShop: data.affiliateShop,
  }
}

/**
 * Get just the most recent book for the "Currently Reading" section
 * Also returns stats and affiliateShop from raw data (no extra API calls)
 */
export function useCurrentBook(): {
  book: BookWithMeta | null
  loading: boolean
  stats: { read: number; goal: number; percentComplete: number; year: number }
  affiliateShop: string
} {
  const { books, loading, stats, affiliateShop } = useBooks(1)
  return {
    book: books[0] || null,
    loading,
    stats,
    affiliateShop,
  }
}

/**
 * Get a specific list of books
 */
export function useBookList(listId: string): {
  list: { title: string; description: string; books: BookWithMeta[] } | null
  loading: boolean
} {
  const [books, setBooks] = useState<BookWithMeta[]>([])
  const [loading, setLoading] = useState(true)
  
  const data = booksData as BookLogData
  const listData = data.lists?.[listId]

  useEffect(() => {
    if (!listData?.books || listData.books.length === 0) {
      setLoading(false)
      return
    }

    async function loadList() {
      try {
        setLoading(true)
        const enrichedBooks: BookWithMeta[] = []
        
        for (const entry of listData!.books) {
          const cacheKey = `list-${entry.title}-${entry.author || ''}`
          
          if (bookCache.has(cacheKey)) {
            enrichedBooks.push(bookCache.get(cacheKey)!)
          } else {
            const enriched = await enrichBookEntry({ 
              title: entry.title, 
              author: entry.author,
              date: '',
              bookshopUrl: entry.bookshopUrl
            })
            if (enriched) {
              bookCache.set(cacheKey, enriched)
              enrichedBooks.push(enriched)
            }
          }
        }
        
        setBooks(enrichedBooks)
      } catch (err) {
        console.error('Failed to load book list:', err)
      } finally {
        setLoading(false)
      }
    }

    loadList()
  }, [listId, listData])

  if (!listData) return { list: null, loading: false }

  return {
    list: {
      title: listData.title,
      description: listData.description,
      books,
    },
    loading,
  }
}
