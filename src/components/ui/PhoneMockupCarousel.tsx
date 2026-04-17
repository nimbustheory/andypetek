import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Screenshot {
  url: string
  alt: string
}

interface PhoneMockupCarouselProps {
  screenshots: Screenshot[]
  autoPlayInterval?: number
  showArrows?: boolean
}

export default function PhoneMockupCarousel({ 
  screenshots = [], 
  autoPlayInterval = 6000,
  showArrows = true 
}: PhoneMockupCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (screenshots.length <= 1) return
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    }, autoPlayInterval)
  }, [screenshots.length, autoPlayInterval])

  useEffect(() => {
    resetAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [resetAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
    resetAutoPlay()
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
    resetAutoPlay()
  }

  if (!screenshots || screenshots.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-center gap-4">
        {/* Previous Arrow */}
        {showArrows && screenshots.length > 1 && (
          <button
            onClick={goToPrevious}
            className="p-3 rounded-full border border-surface-subtle bg-surface-raised/50 text-text-muted hover:text-text hover:bg-surface-overlay transition-all"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Phone Mockup */}
        <div className="relative w-[280px] h-[560px] md:w-[300px] md:h-[600px] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[40px] p-3 shadow-2xl">
          {/* Phone frame inner glow */}
          <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
          
          {/* Screen */}
          <div className="relative w-full h-full bg-black rounded-[32px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={screenshots[currentIndex].url}
                alt={screenshots[currentIndex].alt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        </div>

        {/* Next Arrow */}
        {showArrows && screenshots.length > 1 && (
          <button
            onClick={goToNext}
            className="p-3 rounded-full border border-surface-subtle bg-surface-raised/50 text-text-muted hover:text-text hover:bg-surface-overlay transition-all"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dots */}
      {screenshots.length > 1 && (
        <div className="flex gap-3 mt-6">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-accent-warm scale-125'
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Multi-phone variant for showing multiple screens at once (like the screenshot)
export function PhoneCarouselMultiple({ 
  screenshots,
  title = "Latest Creation",
  accentWord = "Creation"
}: { 
  screenshots: Screenshot[]
  title?: string
  accentWord?: string
}) {
  const [currentSet, setCurrentSet] = useState(0)
  const phonesPerView = 4
  const totalSets = Math.ceil(screenshots.length / phonesPerView)

  useEffect(() => {
    if (totalSets <= 1) return
    
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % totalSets)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [totalSets])

  const currentScreenshots = screenshots.slice(
    currentSet * phonesPerView,
    (currentSet + 1) * phonesPerView
  )

  const goToPrevious = () => {
    setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets)
  }

  const goToNext = () => {
    setCurrentSet((prev) => (prev + 1) % totalSets)
  }

  // Split title to apply accent to specific word
  const titleParts = title.split(accentWord)

  return (
    <div className="relative py-12">
      {/* Title */}
      <h2 className="font-display text-display-md text-center mb-12">
        {titleParts[0]}
        <span className="text-gradient">{accentWord}</span>
        {titleParts[1] || ''}
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Previous Arrow */}
        {totalSets > 1 && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-20 p-3 rounded-full border border-surface-subtle bg-surface/80 backdrop-blur text-text-muted hover:text-text hover:bg-surface-overlay transition-all"
            aria-label="Previous set"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Phone Grid */}
        <div className="flex items-end justify-center gap-4 md:gap-6 overflow-hidden px-16">
          <AnimatePresence mode="wait">
            {currentScreenshots.map((screenshot, index) => (
              <motion.div
                key={`${currentSet}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex-shrink-0 ${
                  index === 1 || index === 2 ? 'scale-100' : 'scale-90 opacity-80'
                }`}
              >
                <div className="relative w-[160px] h-[320px] md:w-[200px] md:h-[400px] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[24px] md:rounded-[32px] p-2 shadow-xl">
                  <div className="absolute inset-0 rounded-[24px] md:rounded-[32px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]" />
                  <div className="relative w-full h-full bg-black rounded-[20px] md:rounded-[28px] overflow-hidden">
                    <img
                      src={screenshot.url}
                      alt={screenshot.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 md:h-5 bg-[#1a1a1a] rounded-b-xl z-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Next Arrow */}
        {totalSets > 1 && (
          <button
            onClick={goToNext}
            className="absolute right-4 z-20 p-3 rounded-full border border-surface-subtle bg-surface/80 backdrop-blur text-text-muted hover:text-text hover:bg-surface-overlay transition-all"
            aria-label="Next set"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Dots */}
      {totalSets > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalSets }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSet(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSet
                  ? 'w-8 bg-accent-warm'
                  : 'w-2.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to set ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
