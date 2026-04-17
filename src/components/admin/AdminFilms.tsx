import { useState, useEffect } from 'react'
import { Search, Plus, Check, Loader2, Trash2, Film } from 'lucide-react'
import { searchFilm, getPosterUrl, getYear, TMDBFilm } from '@/lib/tmdb'
import { getJsonFile, updateJsonFile } from '@/lib/github'

interface FilmEntry {
  title: string
  date: string
}

interface FilmsData {
  year: number
  goal: number
  films: FilmEntry[]
  lists: Record<string, unknown>
}

const FILMS_PATH = 'src/content/films-2026.json'

export default function AdminFilms() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<TMDBFilm | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [films, setFilms] = useState<FilmEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [watchDate, setWatchDate] = useState(new Date().toISOString().split('T')[0])

  // Load current films on mount
  useEffect(() => {
    loadFilms()
  }, [])

  const loadFilms = async () => {
    try {
      setIsLoading(true)
      const { data } = await getJsonFile<FilmsData>(FILMS_PATH)
      setFilms(data.films || [])
    } catch (error) {
      console.error('Failed to load films:', error)
      setMessage({ type: 'error', text: 'Failed to load films from GitHub' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    setSearchResults(null)
    
    try {
      const result = await searchFilm(searchQuery)
      setSearchResults(result)
      if (!result) {
        setMessage({ type: 'error', text: 'No film found with that title' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Search failed' })
    } finally {
      setIsSearching(false)
    }
  }

  const handleAddFilm = async () => {
    if (!searchResults) return

    const newFilm: FilmEntry = {
      title: searchResults.title,
      date: watchDate,
    }

    // Check if already exists
    const exists = films.some(
      f => f.title.toLowerCase() === newFilm.title.toLowerCase() && f.date === newFilm.date
    )
    if (exists) {
      setMessage({ type: 'error', text: 'This film is already in your diary for this date' })
      return
    }

    setIsSaving(true)
    
    try {
      // Get fresh data to avoid conflicts
      const { data, sha: freshSha } = await getJsonFile<FilmsData>(FILMS_PATH)
      
      const updatedFilms = [newFilm, ...(data.films || [])]
      const updatedData: FilmsData = {
        ...data,
        films: updatedFilms,
      }

      await updateJsonFile(
        FILMS_PATH,
        updatedData,
        `Add film: ${newFilm.title}`,
        freshSha
      )

      setFilms(updatedFilms)
      setSearchResults(null)
      setSearchQuery('')
      setMessage({ type: 'success', text: `Added "${newFilm.title}" to your film diary` })
      
      // Reload to get new SHA
      loadFilms()
    } catch (error) {
      console.error('Failed to save:', error)
      setMessage({ type: 'error', text: 'Failed to save to GitHub' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveFilm = async (index: number) => {
    const filmToRemove = films[index]
    if (!confirm(`Remove "${filmToRemove.title}" from your diary?`)) return

    setIsSaving(true)
    
    try {
      const { data, sha: freshSha } = await getJsonFile<FilmsData>(FILMS_PATH)
      
      const updatedFilms = (data.films || []).filter(
        f => !(f.title === filmToRemove.title && f.date === filmToRemove.date)
      )

      const updatedData: FilmsData = {
        ...data,
        films: updatedFilms,
      }

      await updateJsonFile(
        FILMS_PATH,
        updatedData,
        `Remove film: ${filmToRemove.title}`,
        freshSha
      )

      setFilms(updatedFilms)
      setMessage({ type: 'success', text: `Removed "${filmToRemove.title}"` })
      loadFilms()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to remove film' })
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

      {/* Add Film Form */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h2 className="font-display text-body-lg mb-4 flex items-center gap-2">
          <Film className="w-5 h-5 text-accent-warm" />
          Add Film
        </h2>

        <div className="space-y-4">
          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a film..."
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
              {searchResults.poster_path && (
                <img
                  src={getPosterUrl(searchResults.poster_path, 'w154') || ''}
                  alt={searchResults.title}
                  className="w-20 h-auto rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-display text-body-lg text-text">{searchResults.title}</h3>
                <p className="font-mono text-tag text-text-muted">
                  {getYear(searchResults.release_date)}
                </p>
                <p className="font-body text-body-sm text-text-muted mt-2 line-clamp-2">
                  {searchResults.overview}
                </p>
              </div>
            </div>
          )}

          {/* Date & Add Button */}
          {searchResults && (
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block font-body text-body-sm text-text-muted mb-1">
                  Watch Date
                </label>
                <input
                  type="date"
                  value={watchDate}
                  onChange={(e) => setWatchDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text focus:outline-none focus:border-accent-warm transition-colors"
                />
              </div>
              <button
                onClick={handleAddFilm}
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
                Add to Diary
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Films */}
      <div className="bg-surface-raised rounded-xl p-6">
        <h2 className="font-display text-body-lg mb-4">
          Recent Films ({films.length})
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-text-muted" />
          </div>
        ) : films.length === 0 ? (
          <p className="text-text-muted font-body text-body-sm py-4">
            No films in your diary yet.
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {films.slice(0, 20).map((film, index) => (
              <div
                key={`${film.title}-${film.date}`}
                className="flex items-center justify-between p-3 bg-surface rounded-lg group"
              >
                <div>
                  <p className="font-body text-body text-text">{film.title}</p>
                  <p className="font-mono text-tag text-text-muted">{film.date}</p>
                </div>
                <button
                  onClick={() => handleRemoveFilm(index)}
                  className="p-2 text-text-subtle hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove film"
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
