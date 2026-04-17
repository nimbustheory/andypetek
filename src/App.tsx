import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout/Layout'
import ScrollToTop from '@/components/ui/ScrollToTop'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Writing from '@/pages/Writing'
import Books from '@/pages/Books'
import Watching from '@/pages/Watching'
import Reading from '@/pages/Reading'
import RoughCut from '@/pages/RoughCut'
import Guides from '@/pages/Guides'
import Guide from '@/pages/Guide'
import Media from '@/pages/Media'
import Post from '@/pages/Post'
import Admin from '@/pages/Admin'
import TheReckoning from '@/pages/TheReckoning'
import NotFound from '@/pages/NotFound'

// Lazy load Travel page (mapbox-gl is ~1.7MB)
const Travel = lazy(() => import('@/pages/Travel'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/:slug" element={<Post />} />
            <Route path="/the-reckoning" element={<TheReckoning />} />
            <Route path="/books" element={<Books />} />
            <Route path="/watching" element={<Watching />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/rough-cut" element={<RoughCut />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<Guide />} />
            <Route path="/travel" element={<Suspense fallback={<div className="pt-32 text-center text-text-muted">Loading map...</div>}><Travel /></Suspense>} />
            <Route path="/media" element={<Media />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
