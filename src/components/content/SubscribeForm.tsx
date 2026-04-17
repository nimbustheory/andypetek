import { useState } from 'react'
import { Mail, Check, Loader2, AlertCircle } from 'lucide-react'

interface SubscribeFormProps {
  variant?: 'full' | 'compact'
  className?: string
}

/**
 * Newsletter subscription form with category preferences
 * 
 * Integrates with Buttondown API
 * Set VITE_BUTTONDOWN_API_KEY in environment variables
 * 
 * Categories are stored as tags in Buttondown
 */
export default function SubscribeForm({ variant = 'full', className = '' }: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [categories, setCategories] = useState({
    business: true,
    film: true,
    digest: true,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const toggleCategory = (key: keyof typeof categories) => {
    setCategories(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    // Collect selected tags
    const tags: string[] = []
    if (categories.business) tags.push('business')
    if (categories.film) tags.push('film')
    if (categories.digest) tags.push('digest')

    try {
      // Use serverless proxy to keep API key secure
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tags }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
        // Auto-reset success state after 5 seconds
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Subscription failed')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  if (variant === 'compact') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            className="flex-1 px-4 py-2 bg-surface border border-surface-subtle rounded-lg font-body text-body-sm text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-gradient-daydreamer text-white font-body font-semibold text-body-sm rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-green-400 text-body-sm mt-2">You're subscribed!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-body-sm mt-2">{errorMessage}</p>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-surface-raised rounded-xl p-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-daydreamer flex items-center justify-center">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display text-body-lg">Stay in the Loop</h3>
          <p className="font-body text-body-sm text-text-muted">
            Pick what you're interested in
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Category Toggles */}
        <div className="space-y-3 mb-6">
          <CategoryToggle
            label="Business & Industry"
            description="Entrepreneurship, beverage, apps, Nimbus Labs"
            checked={categories.business}
            onChange={() => toggleCategory('business')}
          />
          <CategoryToggle
            label="Film & Culture"
            description="Reviews, top 10s, watching log, Cinéphile"
            checked={categories.film}
            onChange={() => toggleCategory('film')}
          />
          <CategoryToggle
            label="Weekly Digest (Fridays)"
            description="Everything from the week in one email"
            checked={categories.digest}
            onChange={() => toggleCategory('digest')}
          />
        </div>

        {/* Email Input */}
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            className="flex-1 px-4 py-3 bg-surface border border-surface-subtle rounded-lg font-body text-body text-text placeholder:text-text-subtle focus:outline-none focus:border-accent-warm transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading' || (!categories.business && !categories.film && !categories.digest)}
            className="px-6 py-3 bg-gradient-daydreamer text-white font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-warm/20 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {status === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check className="w-5 h-5" />
                Subscribed!
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status === 'error' && (
          <p className="flex items-center gap-2 text-red-400 text-body-sm mt-3">
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </p>
        )}
        {status === 'success' && (
          <p className="text-green-400 text-body-sm mt-3">
            🎉 You're in! Check your email to confirm.
          </p>
        )}
      </form>

      <p className="font-body text-caption text-text-subtle mt-4">
        No spam, unsubscribe anytime. Just good stuff from Andy.
      </p>
    </div>
  )
}

function CategoryToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 rounded border-2 transition-colors flex items-center justify-center ${
            checked
              ? 'bg-accent-warm border-accent-warm'
              : 'border-surface-subtle group-hover:border-text-subtle'
          }`}
        >
          {checked && <Check className="w-3 h-3 text-white" />}
        </div>
      </div>
      <div>
        <p className="font-body text-body text-text group-hover:text-accent-warm transition-colors">
          {label}
        </p>
        <p className="font-body text-caption text-text-muted">
          {description}
        </p>
      </div>
    </label>
  )
}
