import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface AppCarouselProps {
  images: string[]
  appName: string
}

export default function AppCarousel({ images, appName }: AppCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Show 4 phones at a time on desktop, fewer on mobile
  const visibleCount = 4
  
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < images.length - visibleCount

  const goBack = () => {
    if (canGoBack) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const goForward = () => {
    if (canGoForward) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, images.length - visibleCount))
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={goBack}
        disabled={!canGoBack}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 rounded-full border border-surface-subtle flex items-center justify-center transition-all ${
          canGoBack 
            ? 'bg-surface-raised hover:bg-surface-overlay text-text hover:border-accent-warm' 
            : 'bg-surface/50 text-text-subtle cursor-not-allowed'
        }`}
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goForward}
        disabled={!canGoForward}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 rounded-full border border-surface-subtle flex items-center justify-center transition-all ${
          canGoForward 
            ? 'bg-surface-raised hover:bg-surface-overlay text-text hover:border-accent-warm' 
            : 'bg-surface/50 text-text-subtle cursor-not-allowed'
        }`}
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Phone Carousel */}
      <div className="overflow-hidden px-4">
        <motion.div 
          className="flex gap-4 md:gap-6"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-18px)]"
            >
              <PhoneMockup src={src} alt={`${appName} screenshot ${index + 1}`} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot Indicators */}
      {images.length > visibleCount && (
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.max(1, images.length - visibleCount + 1) }).map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-accent-warm' 
                : 'w-2 bg-surface-overlay hover:bg-surface-subtle'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      )}
    </div>
  )
}

// iPhone-style phone mockup
function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="relative bg-[#1a1a1a] rounded-[2.5rem] p-2 shadow-2xl">
        {/* Dynamic Island / Notch area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-black">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        
        {/* Side buttons - subtle details */}
        <div className="absolute -right-[2px] top-24 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -right-[2px] top-36 w-[3px] h-12 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[2px] top-32 w-[3px] h-16 bg-[#2a2a2a] rounded-r-sm" />
      </div>
    </div>
  )
}
