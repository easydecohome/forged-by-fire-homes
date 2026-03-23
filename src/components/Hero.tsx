import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85&auto=format"
          alt="Dramatic Australian mountain landscape"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, hsl(17 14% 6% / 0.97) 0%, hsl(17 14% 6% / 0.80) 55%, hsl(17 14% 6% / 0.45) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, hsl(17 14% 6%) 0%, transparent 55%)',
          }}
        />
        {/* Fire ember glow at base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, hsl(21 91% 41% / 0.08), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="w-6 h-px bg-accent" />
            <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase">
              Australian Tiny Home Builders
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.25s' }}
          >
            Born of fire.
            <br />
            <span className="fire-text">Built to last</span>
            <br />
            a lifetime.
          </h1>

          {/* Sub */}
          <p
            className={`text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            We craft architectural tiny homes clad in authentic fire-charred timber — the ancient
            Japanese art of Shou Sugi Ban. Bespoke commissions, delivered anywhere in Australia.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.55s' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))' }}
            >
              Commission Your Home
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#models"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-foreground border border-border/60 rounded-sm transition-all duration-200 hover:border-accent/50 hover:text-accent"
            >
              View Our Homes
            </a>
          </div>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap gap-x-6 gap-y-3 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '0.7s' }}
          >
            {[
              { icon: '🔥', label: '100% Authentic Shou Sugi Ban' },
              { icon: '🇦🇺', label: 'Australian Owned & Built' },
              { icon: '⭐', label: '10-Year Structural Warranty' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-base">{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hidden sm:flex">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  )
}
