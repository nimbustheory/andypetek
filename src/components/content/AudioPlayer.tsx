import { useState, useRef } from 'react'
import { Headphones, Play, Pause, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  // Option 1: Buzzsprout episode ID (uses iframe embed)
  buzzsproutEpisodeId?: string
  // Option 2: Direct audio URL (custom player)
  audioUrl?: string
  // Episode title
  episodeTitle?: string
}

/**
 * Audio player for "The Daydreamer Rough Cut" episodes
 * 
 * Two modes:
 * 1. Buzzsprout embed (iframe) - use buzzsproutEpisodeId
 * 2. Direct audio URL - use audioUrl for custom player
 * 
 * In frontmatter, add one of:
 *   roughCutId: "12345678"  (Buzzsprout episode ID)
 *   roughCutUrl: "https://www.buzzsprout.com/.../episode.mp3"
 */
export default function AudioPlayer({ buzzsproutEpisodeId, audioUrl, episodeTitle }: AudioPlayerProps) {
  const podcastId = import.meta.env.VITE_BUZZSPROUT_PODCAST_ID || '2300000' // Placeholder

  // If using Buzzsprout embed
  if (buzzsproutEpisodeId) {
    const embedUrl = `https://www.buzzsprout.com/${podcastId}/${buzzsproutEpisodeId}?client_source=small_player&iframe=true`

    return (
      <div className="bg-surface-raised rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-daydreamer flex items-center justify-center">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-mono text-tag uppercase tracking-widest text-accent-warm">
              The Daydreamer Rough Cut
            </p>
            <p className="font-body text-body-sm text-text-muted">
              {episodeTitle || 'Listen to this article'}
            </p>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden bg-surface">
          <iframe
            src={embedUrl}
            loading="lazy"
            width="100%"
            height="200"
            frameBorder="0"
            scrolling="no"
            title="The Daydreamer Rough Cut"
            className="w-full"
          />
        </div>
        
        <p className="font-body text-caption text-text-subtle mt-3">
          Audio companion with additional insights — exclusive to this site
        </p>
      </div>
    )
  }

  // If using direct audio URL, use custom player
  if (audioUrl) {
    return <CustomAudioPlayer audioUrl={audioUrl} episodeTitle={episodeTitle} />
  }

  return null
}

// Custom HTML5 audio player for direct URLs
function CustomAudioPlayer({ audioUrl, episodeTitle }: { audioUrl: string; episodeTitle?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setProgress(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const time = parseFloat(e.target.value)
    audioRef.current.currentTime = time
    setProgress(time)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-surface-raised rounded-xl p-6 mb-8">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-daydreamer flex items-center justify-center">
          <Headphones className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-mono text-tag uppercase tracking-widest text-accent-warm">
            The Daydreamer Rough Cut
          </p>
          <p className="font-body text-body-sm text-text-muted">
            {episodeTitle || 'Listen to this article'}
          </p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-daydreamer flex items-center justify-center hover:shadow-lg hover:shadow-accent-warm/20 transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            aria-label="Seek audio"
            className="w-full h-1 bg-surface-overlay rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-warm"
          />
          <div className="flex justify-between mt-1">
            <span className="font-mono text-tag text-text-subtle">
              {formatTime(progress)}
            </span>
            <span className="font-mono text-tag text-text-subtle">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <Volume2 className="w-5 h-5 text-text-subtle" />
      </div>
      
      <p className="font-body text-caption text-text-subtle mt-4">
        Audio companion with additional insights — exclusive to this site
      </p>
    </div>
  )
}
