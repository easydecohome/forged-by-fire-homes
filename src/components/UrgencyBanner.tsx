import { useState } from 'react'

export default function UrgencyBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div
      className="relative z-40 py-2.5 px-4 text-center text-xs font-medium text-white flex items-center justify-center gap-3"
      style={{ background: 'linear-gradient(90deg, hsl(21 91% 35%), hsl(33 71% 27%), hsl(21 91% 35%))' }}
    >
      <span className="animate-pulse-fire">🔥</span>
      <span>
        Now accepting commissions for 2025 builds —{' '}
        <a href="#contact" className="underline underline-offset-2 font-semibold hover:text-amber-200 transition-colors">
          limited spots remaining
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 text-lg leading-none transition-opacity"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  )
}
