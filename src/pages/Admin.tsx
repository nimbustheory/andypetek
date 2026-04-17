import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Film, Book, LayoutGrid, Lock, AlertCircle } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import { isGitHubConfigured } from '@/lib/github'
import AdminFilms from '@/components/admin/AdminFilms'
import AdminBooks from '@/components/admin/AdminBooks'
import AdminCurrently from '@/components/admin/AdminCurrently'

type Tab = 'films' | 'books' | 'currently'

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>('films')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  // Authenticate via serverless function (password never in client bundle)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // In production, use serverless function. In dev, fall back to env var.
      if (import.meta.env.PROD) {
        const response = await fetch('/api/admin-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        })

        if (response.ok) {
          setIsAuthenticated(true)
          try { sessionStorage.setItem('admin_auth', 'true') } catch {}
        } else {
          setError('Incorrect password')
        }
      } else {
        // Dev fallback
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'daydreamer'
        if (password === adminPassword) {
          setIsAuthenticated(true)
          try { sessionStorage.setItem('admin_auth', 'true') } catch {}
        } else {
          setError('Incorrect password')
        }
      }
    } catch {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Check session on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem('admin_auth') === 'true') {
        setIsAuthenticated(true)
      }
    } catch {
      // sessionStorage may be unavailable in private browsing
    }
  }, [])

  const tabs = [
    { id: 'films' as Tab, label: 'Films', icon: Film },
    { id: 'books' as Tab, label: 'Books', icon: Book },
    { id: 'currently' as Tab, label: 'Currently', icon: LayoutGrid },
  ]

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="pt-32 pb-section min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <div className="bg-surface-raised rounded-xl p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-surface-overlay rounded-full mb-6 mx-auto">
                <Lock className="w-6 h-6 text-accent-warm" />
              </div>
              <h1 className="font-display text-display-sm text-center mb-6">Admin Access</h1>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Admin password"
                    className="w-full px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-body-sm font-body flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Enter'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  if (!isGitHubConfigured()) {
    return (
      <PageTransition>
        <div className="pt-32 pb-section">
          <div className="max-w-2xl mx-auto px-content">
            <div className="bg-surface-raised rounded-xl p-8 text-center">
              <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h1 className="font-display text-display-sm mb-4">GitHub Not Configured</h1>
              <p className="font-body text-body text-text-muted mb-6">
                To use the admin panel, you need to set up GitHub integration in your Vercel environment variables:
              </p>
              <div className="bg-surface rounded-lg p-4 text-left font-mono text-body-sm">
                <p className="text-text-muted"># Your GitHub personal access token</p>
                <p className="text-text">VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxx</p>
                <p className="text-text-muted mt-2"># Your repo in format owner/repo</p>
                <p className="text-text">VITE_GITHUB_REPO=andypetek/andypetek</p>
                <p className="text-text-muted mt-2"># Admin password</p>
                <p className="text-text">VITE_ADMIN_PASSWORD=your_secure_password</p>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-section">
        <div className="max-w-4xl mx-auto px-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-display-lg mb-2">Admin</h1>
            <p className="font-body text-body text-text-muted">
              Manage your site content. Changes commit directly to GitHub and deploy automatically.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-surface-subtle">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-body text-body-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-text'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="admin-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-daydreamer"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'films' && <AdminFilms />}
            {activeTab === 'books' && <AdminBooks />}
            {activeTab === 'currently' && <AdminCurrently />}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
