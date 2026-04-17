import { useState, useEffect } from 'react'
import { enrichFilmEntry, FilmWithMeta } from './tmdb'
import filmsData from '@/content/films-2026.json'

interface FilmLogData {
  year: number
  goal: number
  films: { title: string; date: string }[]
  lists?: Record<string, {
    title: string
    description: string
    films: { title: string; rank?: number }[]
  }>
}

interface UseFilmsResult {
  films: FilmWithMeta[]
  loading: boolean
  error: string | null
  stats: {
    watched: number
    goal: number
    percentComplete: number
    year: number
  }
}

// Cache enriched films to avoid re-fetching on every render
const filmCache = new Map<string, FilmWithMeta>()

export function useFilms(limit?: number): UseFilmsResult {
  const [films, setFilms] = useState<FilmWithMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const data = filmsData as FilmLogData

  useEffect(() => {
    async function loadFilms() {
      // If no films, return early
      if (!data.films || data.films.length === 0) {
        setLoading(false)
        setFilms([])
        return
      }

      try {
        setLoading(true)
        
        // Sort by date descending (most recent first)
        const sortedEntries = [...data.films].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        
        // Limit if specified
        const entriesToLoad = limit ? sortedEntries.slice(0, limit) : sortedEntries
        
        // Enrich with TMDB data (using cache, with parallel batching)
        const BATCH_SIZE = 5
        const enrichedFilms: FilmWithMeta[] = []

        for (let i = 0; i < entriesToLoad.length; i += BATCH_SIZE) {
          if (i > 0) await new Promise(r => setTimeout(r, 200))
          const batch = entriesToLoad.slice(i, i + BATCH_SIZE)
          const results = await Promise.allSettled(
            batch.map(async (entry) => {
              const cacheKey = `${entry.title}-${entry.date}`
              if (filmCache.has(cacheKey)) {
                return filmCache.get(cacheKey)!
              }
              const enriched = await enrichFilmEntry(entry)
              if (enriched) {
                filmCache.set(cacheKey, enriched)
              }
              return enriched
            })
          )
          for (const result of results) {
            if (result.status === 'fulfilled' && result.value) {
              enrichedFilms.push(result.value)
            }
          }
        }
        
        setFilms(enrichedFilms)
        setError(null)
      } catch (err) {
        setError('Failed to load films')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadFilms()
  }, [limit, data.films])

  return {
    films,
    loading,
    error,
    stats: {
      watched: data.films?.length || 0,
      goal: data.goal,
      percentComplete: data.films?.length ? Math.round((data.films.length / data.goal) * 100) : 0,
      year: data.year,
    },
  }
}

/**
 * Get just the most recent film for the "Currently" section
 * Also returns stats from raw data (no extra API calls)
 */
export function useCurrentFilm(): {
  film: FilmWithMeta | null
  loading: boolean
  stats: { watched: number; goal: number; percentComplete: number; year: number }
} {
  const { films, loading, stats } = useFilms(1)
  return {
    film: films[0] || null,
    loading,
    stats,
  }
}

/**
 * Get a specific list of films
 */
export function useFilmList(listId: string): {
  list: { title: string; description: string; films: FilmWithMeta[] } | null
  loading: boolean
} {
  const [films, setFilms] = useState<FilmWithMeta[]>([])
  const [loading, setLoading] = useState(true)
  
  const data = filmsData as FilmLogData
  const listData = data.lists?.[listId]

  useEffect(() => {
    if (!listData?.films || listData.films.length === 0) {
      setLoading(false)
      return
    }

    async function loadList() {
      try {
        setLoading(true)
        const enrichedFilms: FilmWithMeta[] = []
        
        for (const entry of listData!.films) {
          const cacheKey = `list-${entry.title}`
          
          if (filmCache.has(cacheKey)) {
            enrichedFilms.push(filmCache.get(cacheKey)!)
          } else {
            const enriched = await enrichFilmEntry({ title: entry.title, date: '' })
            if (enriched) {
              filmCache.set(cacheKey, enriched)
              enrichedFilms.push(enriched)
            }
          }
        }
        
        setFilms(enrichedFilms)
      } catch (err) {
        console.error('Failed to load list:', err)
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
      films,
    },
    loading,
  }
}
