import { format, parseISO } from 'date-fns'

/**
 * Format a date string for display
 */
export function formatDate(dateString: string, formatStr: string = 'MMMM d, yyyy'): string {
  try {
    const date = parseISO(dateString)
    if (isNaN(date.getTime())) return dateString
    return format(date, formatStr)
  } catch {
    return dateString
  }
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate text to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '...'
}

/**
 * Join class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
