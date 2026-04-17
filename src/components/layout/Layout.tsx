import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isGuidePage = /^\/guides\//.test(location.pathname)

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-surface via-surface to-surface-raised opacity-50 pointer-events-none" />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        {!isGuidePage && <Footer />}
      </div>
    </div>
  )
}
