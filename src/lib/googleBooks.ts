// Google Books API utilities
// API key is optional but recommended (1000 req/day vs very tight rate limits)

const GOOGLE_BOOKS_BASE = 'https://www.googleapis.com/books/v1/volumes'
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

function withKey(url: string): string {
  return GOOGLE_BOOKS_API_KEY ? `${url}&key=${GOOGLE_BOOKS_API_KEY}` : url
}

export interface GoogleBook {
  id: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: { type: string; identifier: string }[]
    pageCount?: number
    categories?: string[]
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
      small?: string
      medium?: string
      large?: string
    }
    averageRating?: number
    ratingsCount?: number
  }
}

export interface BookWithMeta {
  googleBooksId: string
  title: string
  subtitle: string | null
  authors: string[]
  year: string
  coverUrl: string | null
  coverUrlLarge: string | null
  description: string | null
  isbn10: string | null
  isbn13: string | null
  pageCount: number | null
  categories: string[]
  readDate: string
  bookshopUrl: string | null
}

// Bookshop.org affiliate shop base URL
const BOOKSHOP_AFFILIATE_BASE = 'https://bookshop.org/shop/joyread-club'

/**
 * Fetch with retry for 429 rate limiting
 */
async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url)
    if (response.status === 429 && attempt < maxRetries) {
      const delay = 2000 * (attempt + 1)
      await new Promise(resolve => setTimeout(resolve, delay))
      continue
    }
    return response
  }
  return fetch(url) // final attempt
}

/**
 * Search for a book by title and optionally author
 */
export async function searchBook(title: string, author?: string): Promise<GoogleBook | null> {
  try {
    let query = title
    if (author) {
      query += `+inauthor:${author}`
    }

    const response = await fetchWithRetry(
      withKey(`${GOOGLE_BOOKS_BASE}?q=${encodeURIComponent(query)}&maxResults=1`)
    )
    if (!response.ok) {
      throw new Error(`Google Books search failed: ${response.status}`)
    }
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items[0]
    }
    return null
  } catch (error) {
    console.error('Error searching Google Books:', error)
    return null
  }
}

/**
 * Search for a book by ISBN
 */
export async function searchBookByISBN(isbn: string): Promise<GoogleBook | null> {
  try {
    const response = await fetchWithRetry(
      withKey(`${GOOGLE_BOOKS_BASE}?q=isbn:${isbn}&maxResults=1`)
    )
    if (!response.ok) {
      throw new Error(`Google Books search failed: ${response.status}`)
    }
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      return data.items[0]
    }
    return null
  } catch (error) {
    console.error('Error searching Google Books by ISBN:', error)
    return null
  }
}

/**
 * Get book details by Google Books ID
 */
export async function getBookDetails(googleBooksId: string): Promise<GoogleBook | null> {
  try {
    const response = await fetchWithRetry(withKey(`${GOOGLE_BOOKS_BASE}/${googleBooksId}?`))
    if (!response.ok) {
      throw new Error(`Google Books details failed: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching book details:', error)
    return null
  }
}

/**
 * Get cover image URL at best available size
 * Google Books provides: smallThumbnail, thumbnail, small, medium, large
 */
export function getCoverUrl(book: GoogleBook, size: 'small' | 'medium' | 'large' = 'medium'): string | null {
  const imageLinks = book.volumeInfo.imageLinks
  if (!imageLinks) return null
  
  // Try to get requested size, fall back to smaller sizes
  if (size === 'large') {
    const url = imageLinks.large || imageLinks.medium || imageLinks.small || imageLinks.thumbnail || null
    return url?.replace('http://', 'https://') || null
  }
  if (size === 'medium') {
    const url = imageLinks.medium || imageLinks.small || imageLinks.thumbnail || null
    return url?.replace('http://', 'https://') || null
  }
  const url = imageLinks.thumbnail || imageLinks.smallThumbnail || null
  return url?.replace('http://', 'https://') || null
}

/**
 * Extract ISBN-13 from book data
 */
export function getISBN13(book: GoogleBook): string | null {
  const identifiers = book.volumeInfo.industryIdentifiers
  if (!identifiers) return null
  
  const isbn13 = identifiers.find(id => id.type === 'ISBN_13')
  return isbn13?.identifier || null
}

/**
 * Extract ISBN-10 from book data
 */
export function getISBN10(book: GoogleBook): string | null {
  const identifiers = book.volumeInfo.industryIdentifiers
  if (!identifiers) return null
  
  const isbn10 = identifiers.find(id => id.type === 'ISBN_10')
  return isbn10?.identifier || null
}

/**
 * Get year from published date
 */
export function getYear(publishedDate: string | undefined): string {
  if (!publishedDate) return ''
  return publishedDate.split('-')[0]
}

/**
 * Generate Bookshop.org affiliate link
 * Format: https://bookshop.org/a/[AFFILIATE_ID]/[ISBN13]
 * For now, links to the shop page - can be updated with direct ISBN links
 */
export function getBookshopUrl(_isbn13: string | null, affiliateUrl?: string): string {
  // If a direct affiliate URL is provided, use it
  if (affiliateUrl) return affiliateUrl
  
  // Otherwise link to the shop
  // TODO: If Andy gets a numeric affiliate ID, we can do direct ISBN links:
  // return `https://bookshop.org/a/${AFFILIATE_ID}/${isbn13}`
  return BOOKSHOP_AFFILIATE_BASE
}

/**
 * Process a book entry from the JSON log and enrich with Google Books data
 */
export async function enrichBookEntry(entry: { 
  title: string
  author?: string
  date: string
  bookshopUrl?: string 
}): Promise<BookWithMeta | null> {
  const searchResult = await searchBook(entry.title, entry.author)
  if (!searchResult) {
    console.warn(`Could not find book: ${entry.title}`)
    return null
  }

  const info = searchResult.volumeInfo
  const isbn13 = getISBN13(searchResult)
  const isbn10 = getISBN10(searchResult)

  return {
    googleBooksId: searchResult.id,
    title: info.title,
    subtitle: info.subtitle || null,
    authors: info.authors || [],
    year: getYear(info.publishedDate),
    coverUrl: getCoverUrl(searchResult, 'medium'),
    coverUrlLarge: getCoverUrl(searchResult, 'large'),
    description: info.description || null,
    isbn10,
    isbn13,
    pageCount: info.pageCount || null,
    categories: info.categories || [],
    readDate: entry.date,
    bookshopUrl: entry.bookshopUrl || getBookshopUrl(isbn13),
  }
}

/**
 * Search and enrich in one call
 */
export async function searchAndEnrichBook(
  title: string, 
  author?: string,
  readDate?: string,
  bookshopUrl?: string
): Promise<BookWithMeta | null> {
  return enrichBookEntry({ 
    title, 
    author, 
    date: readDate || '', 
    bookshopUrl 
  })
}
