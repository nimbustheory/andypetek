import travelData from '@/content/travels-2026.json'

interface TripEntry {
  destination: string
  coordinates: [number, number]
  date: string
  note?: string
  miles?: number
}

interface TravelData {
  year: number
  homeBase: {
    label: string
    coordinates: [number, number]
  }
  trips: TripEntry[]
}

export interface Trip extends TripEntry {
  id: string
}

export interface TravelStats {
  totalTrips: number
  totalMiles: number
  uniqueDestinations: number
  statesVisited: string[]
  year: number
}

const data = travelData as TravelData

function getStateFromDestination(destination: string): string | null {
  const parts = destination.split(', ')
  return parts.length > 1 ? parts[parts.length - 1] : null
}

export function useTravel() {
  const trips: Trip[] = [...data.trips]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((trip, i) => ({
      ...trip,
      id: `trip-${i}-${trip.destination}`,
    }))

  const totalMiles = trips.reduce((sum, t) => sum + (t.miles || 0), 0)

  const uniqueDestinations = new Set(trips.map(t => t.destination)).size

  const statesVisited = [
    ...new Set(
      trips
        .map(t => getStateFromDestination(t.destination))
        .filter((s): s is string => s !== null)
    ),
  ]

  const stats: TravelStats = {
    totalTrips: trips.length,
    totalMiles,
    uniqueDestinations,
    statesVisited,
    year: data.year,
  }

  return {
    trips,
    homeBase: data.homeBase,
    stats,
  }
}
