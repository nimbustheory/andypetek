import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Map, { Marker, Source, Layer, NavigationControl, MarkerEvent } from 'react-map-gl/mapbox'
import { MapPin, Navigation, Route, Calendar } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import { useTravel, Trip } from '@/lib/useTravel'
import { format } from 'date-fns'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

// Dark map style that matches the site aesthetic
const MAP_STYLE = 'mapbox://styles/mapbox/dark-v11'

export default function Travel() {
  const { trips, homeBase, stats } = useTravel()
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [hoveredTrip, setHoveredTrip] = useState<string | null>(null)

  // Generate route lines GeoJSON from homeBase to each destination
  const routeLines = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: trips.map((trip) => ({
      type: 'Feature' as const,
      properties: {
        id: trip.id,
        destination: trip.destination,
        isHighlighted: trip.id === selectedTrip?.id || trip.id === hoveredTrip,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: [
          homeBase.coordinates,
          trip.coordinates,
        ],
      },
    })),
  }), [trips, homeBase, selectedTrip, hoveredTrip])

  // Highlighted route for selected/hovered trip
  const highlightedLines = useMemo(() => ({
    type: 'FeatureCollection' as const,
    features: routeLines.features.filter(f => f.properties.isHighlighted),
  }), [routeLines])

  const handleTripClick = useCallback((trip: Trip) => {
    setSelectedTrip(prev => prev?.id === trip.id ? null : trip)
  }, [])

  if (!MAPBOX_TOKEN) {
    return (
      <PageTransition>
        <div className="pt-32 pb-section">
          <div className="max-w-content mx-auto px-content text-center">
            <h1 className="font-display text-display-lg mb-4">Travel Map</h1>
            <p className="font-body text-body text-text-muted">
              Map requires a Mapbox access token. Add <code className="text-accent-warm">VITE_MAPBOX_TOKEN</code> to your <code className="text-accent-warm">.env.local</code> file.
            </p>
          </div>
        </div>
      </PageTransition>
    )
  }

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
              {stats.year} Travel Log
            </p>
            <h1 className="font-display text-display-lg mb-6">
              On the Road
            </h1>
            <p className="font-body text-body text-text-muted max-w-2xl mb-8">
              I work on location — a lot. This is a live map of everywhere I've driven
              in {stats.year} for production work. Every line is a road trip from home base.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="font-display text-display-md text-text">{stats.totalTrips}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">Trips</p>
              </div>
              <div className="w-px h-12 bg-surface-subtle" />
              <div>
                <p className="font-display text-display-md text-text">{stats.totalMiles.toLocaleString()}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">Miles Driven</p>
              </div>
              <div className="w-px h-12 bg-surface-subtle" />
              <div>
                <p className="font-display text-display-md text-text">{stats.uniqueDestinations}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">Destinations</p>
              </div>
              <div className="w-px h-12 bg-surface-subtle" />
              <div>
                <p className="font-display text-display-md text-text">{stats.statesVisited.length}</p>
                <p className="font-mono text-tag text-text-muted uppercase tracking-wider">States</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="rounded-xl overflow-hidden border border-surface-subtle" style={{ height: '500px' }}>
              <Map
                initialViewState={{
                  longitude: homeBase.coordinates[0],
                  latitude: homeBase.coordinates[1],
                  zoom: 5.5,
                }}
                mapStyle={MAP_STYLE}
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
                attributionControl={false}
              >
                <NavigationControl position="top-right" />

                {/* Route lines (all) */}
                <Source id="routes" type="geojson" data={routeLines}>
                  <Layer
                    id="route-lines"
                    type="line"
                    paint={{
                      'line-color': '#666',
                      'line-width': 1.5,
                      'line-opacity': 0.4,
                      'line-dasharray': [4, 4],
                    }}
                  />
                </Source>

                {/* Highlighted route line */}
                <Source id="routes-highlight" type="geojson" data={highlightedLines}>
                  <Layer
                    id="route-lines-highlight"
                    type="line"
                    paint={{
                      'line-color': '#f59e0b',
                      'line-width': 2.5,
                      'line-opacity': 0.9,
                    }}
                  />
                </Source>

                {/* Home base marker */}
                <Marker
                  longitude={homeBase.coordinates[0]}
                  latitude={homeBase.coordinates[1]}
                  anchor="center"
                >
                  <div className="relative group">
                    <div className="w-4 h-4 bg-accent-warm rounded-full border-2 border-white shadow-lg" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {homeBase.label}
                    </div>
                  </div>
                </Marker>

                {/* Destination markers */}
                {trips.map((trip) => (
                  <Marker
                    key={trip.id}
                    longitude={trip.coordinates[0]}
                    latitude={trip.coordinates[1]}
                    anchor="center"
                    onClick={(e: MarkerEvent<MouseEvent>) => {
                      e.originalEvent.stopPropagation()
                      handleTripClick(trip)
                    }}
                  >
                    <div
                      className="cursor-pointer relative group"
                      onMouseEnter={() => setHoveredTrip(trip.id)}
                      onMouseLeave={() => setHoveredTrip(null)}
                    >
                      <div
                        className={`
                          w-3 h-3 rounded-full border-2 transition-all duration-200
                          ${trip.id === selectedTrip?.id
                            ? 'bg-accent-warm border-white scale-150 shadow-lg'
                            : trip.id === hoveredTrip
                              ? 'bg-accent-warm/80 border-white scale-125'
                              : 'bg-white/60 border-white/40'
                          }
                        `}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {trip.destination}
                      </div>
                    </div>
                  </Marker>
                ))}
              </Map>
            </div>
          </motion.section>

          {/* Trip List */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-display-sm mb-6">Trip Log</h2>
            <div className="space-y-3">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${trip.id === selectedTrip?.id
                      ? 'bg-surface-raised border-accent-warm/50'
                      : 'bg-surface-raised/50 border-surface-subtle hover:border-accent-warm/30 hover:bg-surface-raised'
                    }
                  `}
                  onClick={() => handleTripClick(trip)}
                  onMouseEnter={() => setHoveredTrip(trip.id)}
                  onMouseLeave={() => setHoveredTrip(null)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${trip.id === selectedTrip?.id ? 'bg-accent-warm/20 text-accent-warm' : 'bg-surface-subtle text-text-subtle'}
                      `}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-body-sm text-text font-medium truncate">
                          {trip.destination}
                        </p>
                        {trip.note && (
                          <p className="font-body text-caption text-text-muted truncate">
                            {trip.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      {trip.miles && (
                        <span className="flex items-center gap-1 font-mono text-tag text-text-subtle">
                          <Route className="w-3.5 h-3.5" />
                          {trip.miles} mi
                        </span>
                      )}
                      <span className="flex items-center gap-1 font-mono text-tag text-text-subtle">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(trip.date), 'MMM d')}
                      </span>
                    </div>
                  </div>

                  {/* Expanded detail when selected */}
                  {trip.id === selectedTrip?.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                      className="mt-3 pt-3 border-t border-surface-subtle"
                    >
                      <div className="flex items-center gap-4 text-text-muted font-body text-caption">
                        <span className="flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5" />
                          {homeBase.label} → {trip.destination}
                        </span>
                        {trip.miles && (
                          <span>{trip.miles} miles one way</span>
                        )}
                        <span>{format(new Date(trip.date), 'MMMM d, yyyy')}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* States Visited */}
          {stats.statesVisited.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 p-8 md:p-12 bg-surface-raised rounded-lg"
            >
              <p className="font-mono text-tag uppercase tracking-widest text-accent-warm mb-2">
                States Covered
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {stats.statesVisited.map((state) => (
                  <span
                    key={state}
                    className="px-3 py-1.5 bg-surface-subtle rounded-full font-mono text-tag text-text-muted"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
