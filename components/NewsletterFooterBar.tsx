'use client'

import { useState, useEffect } from 'react'

const DISMISSED_KEY = 'menopause_footer_dismissed'

export default function NewsletterFooterBar() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid flash
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISSED_KEY) === 'true'
    if (!isDismissed) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setDismissed(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, 'true')
    setDismissed(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (dismissed) return null

  return (
    <div
      role="complementary"
      aria-label="Newsletter signup"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(92,45,110,0.08)]"
    >
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        {/* Dismiss */}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2 right-3 text-gray-300 hover:text-gray-500 text-lg leading-none transition-colors"
        >
          ×
        </button>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p className="font-serif font-semibold text-brand-plum text-sm sm:text-base leading-tight">
            The weekly menopause guide
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Real talk about HRT, finding care, and what actually works.
          </p>
        </div>

        {/* Form or success */}
        {status === 'success' ? (
          <p className="text-brand-sage font-semibold text-sm shrink-0">
            You&apos;re in! First email coming soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              disabled={status === 'loading'}
              className="flex-1 sm:w-52 rounded-full border border-gray-200 bg-brand-cream px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-plum/10 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 rounded-full bg-brand-plum px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-plum-dark focus:outline-none focus:ring-2 focus:ring-brand-plum focus:ring-offset-2 disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Subscribe free'}
            </button>
            {status === 'error' && (
              <span className="text-brand-rose text-xs ml-1">Something went wrong. Try again.</span>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
