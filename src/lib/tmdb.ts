// TMDB API utilities
// API key is stored in environment variables

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

if (!TMDB_API_KEY) {
  console.warn('TMDB API key not configured. Set VITE_TMDB_API_KEY in environment variables.')
}

export interface TMDBFilm {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  overview: string
  vote_average: number
  runtime?: number
  tagline?: string
  budget?: number
  revenue?: number
  genres?: { id: number; name: string }[]
  credits?: {
    crew: { job: string; name: string; profile_path: string | null }[]
    cast: { name: string; character: string; profile_path: string | null; order: number }[]
  }
  videos?: {
    results: { key: string; site: string; type: string; name: string }[]
  }
  'watch/providers'?: {
    results: {
      US?: {
        flatrate?: { provider_name: string; logo_path: string }[]
        rent?: { provider_name: string; logo_path: string }[]
        buy?: { provider_name: string; logo_path: string }[]
        link?: string
      }
    }
  }
}

export interface FilmWithMeta {
  tmdbId: number
  title: string
  year: string
  posterUrl: string | null
  backdropUrl: string | null
  director: string | null
  watchedDate: string
  overview: string
}

export interface FilmFullDetails extends FilmWithMeta {
  tagline: string | null
  runtime: number | null
  genres: string[]
  cast: { name: string; character: string; photo: string | null }[]
  crew: { name: string; job: string; photo: string | null }[]
  trailerKey: string | null
  streaming: { name: string; logo: string }[]
  rent: { name: string; logo: string }[]
  buy: { name: string; logo: string }[]
  watchLink: string | null
  voteAverage: number
  budget: number | null
  revenue: number | null
}

/**
 * Search for a film by title and return the best match
 */
export async function searchFilm(title: string, year?: string): Promise<TMDBFilm | null> {
  if (!TMDB_API_KEY) return null
  try {
    let url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&include_adult=false`
    if (year) {
      url += `&year=${year}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`TMDB search failed: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      return data.results[0]
    }
    return null
  } catch (error) {
    console.error('Error searching TMDB:', error)
    return null
  }
}

/**
 * Get detailed film info by TMDB ID (basic info)
 */
export async function getFilmDetails(tmdbId: number): Promise<TMDBFilm | null> {
  if (!TMDB_API_KEY) return null
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits`
    )
    if (!response.ok) {
      throw new Error(`TMDB search failed: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching film details:', error)
    return null
  }
}

/**
 * Get full film details including streaming, trailers, and extended credits
 */
export async function getFilmFullDetails(tmdbId: number): Promise<TMDBFilm | null> {
  if (!TMDB_API_KEY) return null
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,watch/providers`
    )
    if (!response.ok) {
      throw new Error(`TMDB search failed: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching full film details:', error)
    return null
  }
}

/**
 * Get poster URL at specified size
 * Sizes: w92, w154, w185, w342, w500, w780, original
 */
export function getPosterUrl(posterPath: string | null, size: string = 'w500'): string | null {
  if (!posterPath) return null
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`
}

/**
 * Get backdrop URL at specified size
 * Sizes: w300, w780, w1280, original
 */
export function getBackdropUrl(backdropPath: string | null, size: string = 'w1280'): string | null {
  if (!backdropPath) return null
  return `${TMDB_IMAGE_BASE}/${size}${backdropPath}`
}

/**
 * Get profile photo URL
 */
export function getProfileUrl(profilePath: string | null, size: string = 'w185'): string | null {
  if (!profilePath) return null
  return `${TMDB_IMAGE_BASE}/${size}${profilePath}`
}

/**
 * Get logo URL for streaming providers
 */
export function getLogoUrl(logoPath: string | null, size: string = 'w92'): string | null {
  if (!logoPath) return null
  return `${TMDB_IMAGE_BASE}/${size}${logoPath}`
}

/**
 * Extract director from credits
 */
export function getDirector(film: TMDBFilm): string | null {
  if (!film.credits?.crew) return null
  const director = film.credits.crew.find(person => person.job === 'Director')
  return director?.name || null
}

/**
 * Get year from release date
 */
export function getYear(releaseDate: string): string {
  return releaseDate ? releaseDate.split('-')[0] : ''
}

/**
 * Get YouTube trailer key
 */
export function getTrailerKey(film: TMDBFilm): string | null {
  if (!film.videos?.results) return null
  const trailer = film.videos.results.find(
    v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  )
  return trailer?.key || null
}

/**
 * Process a film entry from the JSON log and enrich with TMDB data (basic)
 */
export async function enrichFilmEntry(entry: { title: string; date: string }): Promise<FilmWithMeta | null> {
  const searchResult = await searchFilm(entry.title)
  if (!searchResult) {
    console.warn(`Could not find film: ${entry.title}`)
    return null
  }

  const details = await getFilmDetails(searchResult.id)
  if (!details) {
    return null
  }

  return {
    tmdbId: details.id,
    title: details.title,
    year: getYear(details.release_date),
    posterUrl: getPosterUrl(details.poster_path),
    backdropUrl: getBackdropUrl(details.backdrop_path),
    director: getDirector(details),
    watchedDate: entry.date,
    overview: details.overview,
  }
}

/**
 * Get full enriched film details for modal/detail page
 */
export async function getEnrichedFilmDetails(tmdbId: number, watchedDate?: string): Promise<FilmFullDetails | null> {
  const details = await getFilmFullDetails(tmdbId)
  if (!details) return null

  const usProviders = details['watch/providers']?.results?.US

  return {
    tmdbId: details.id,
    title: details.title,
    year: getYear(details.release_date),
    posterUrl: getPosterUrl(details.poster_path),
    backdropUrl: getBackdropUrl(details.backdrop_path),
    director: getDirector(details),
    watchedDate: watchedDate || '',
    overview: details.overview,
    tagline: details.tagline || null,
    runtime: details.runtime || null,
    genres: details.genres?.map(g => g.name) || [],
    voteAverage: details.vote_average,
    budget: details.budget || null,
    revenue: details.revenue || null,
    cast: details.credits?.cast
      ?.sort((a, b) => a.order - b.order)
      .slice(0, 10)
      .map(c => ({
        name: c.name,
        character: c.character,
        photo: getProfileUrl(c.profile_path),
      })) || [],
    crew: details.credits?.crew
      ?.filter(c => ['Director', 'Writer', 'Screenplay', 'Director of Photography', 'Composer'].includes(c.job))
      .map(c => ({
        name: c.name,
        job: c.job,
        photo: getProfileUrl(c.profile_path),
      })) || [],
    trailerKey: getTrailerKey(details),
    streaming: usProviders?.flatrate?.map(p => ({
      name: p.provider_name,
      logo: getLogoUrl(p.logo_path) || '',
    })) || [],
    rent: usProviders?.rent?.slice(0, 4).map(p => ({
      name: p.provider_name,
      logo: getLogoUrl(p.logo_path) || '',
    })) || [],
    buy: usProviders?.buy?.slice(0, 4).map(p => ({
      name: p.provider_name,
      logo: getLogoUrl(p.logo_path) || '',
    })) || [],
    watchLink: usProviders?.link || null,
  }
}

/**
 * Search and get full details in one call (for modal from title)
 */
export async function searchAndGetFullDetails(title: string, watchedDate?: string): Promise<FilmFullDetails | null> {
  const searchResult = await searchFilm(title)
  if (!searchResult) return null
  return getEnrichedFilmDetails(searchResult.id, watchedDate)
}
