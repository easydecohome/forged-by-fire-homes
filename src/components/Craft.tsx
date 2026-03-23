import { useEffect, useRef } from 'react'

const qualities = [
  {
    title: 'Born of Fire',
    description:
      'Shou Sugi Ban — 焼き杉 — is a 300-year-old Japanese technique of slowly charring timber with controlled flame. The surface blackens, crystallises, and transforms into something entirely new: a skin of carbonised beauty.',
  },
  {
    title: 'Resilience as Aesthetic',
    description:
      "The charring creates a natural barrier against moisture, termites, UV degradation, and fire itself. In Australia's harsh climate — from tropical north to alpine south — this is not just beautiful. It is engineered longevity.",
  },
  {
    title: 'Ages Backwards',
    description:
      'Where standard cladding fades and fails, Shou Sugi Ban matures. Silver highlights emerge over decades. The grain deepens. Time does not diminish it — it refines it. A home that becomes more distinguished each year.',
  },
  {
    title: 'Sustainable by Nature',
    description:
      'No toxic preservatives. No synthetic coatings. The preservation is the fire itself — a closed-loop process that extends timber life by 75+ years. Premium quality without compromise to the land.',
  },
]

export default function Craft() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="craft" ref={sectionRef} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, hsl(38 92% 50%) 0px, hsl(38 92% 50%) 1px, transparent 1px, transparent 40px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header — two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left: Copy */}
          <div className="reveal">
            <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2 mb-4">
              <span className="w-5 h-px bg-accent" /> 焼き杉 · The Craft
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              The art of preserving
              <br />
              wood through fire
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              In feudal Japan, craftsmen discovered that flame — the very thing timber fears most —
              is also its greatest protector. By charring the outer layer, they created a surface so
              dense it repelled weather, pests, and decay for generations.
            </p>
            <blockquote className="border-l-2 border-accent pl-6 italic text-foreground/80 text-lg font-serif leading-relaxed">
              "Fire does not destroy this timber. It preserves it — and in doing so, makes it more
              beautiful than it was before."
              <footer className="mt-3 text-sm text-muted-foreground not-italic font-sans tracking-wide">
                — The Forged by Fire Philosophy
              </footer>
            </blockquote>
          </div>

          {/* Right: Main image */}
          <div className="reveal reveal-delay-2">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80"
                alt="Shou Sugi Ban fire-charred timber detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-sm p-4">
                  <div className="text-xs text-accent tracking-widest uppercase mb-1">
                    Authentic Process
                  </div>
                  <div className="text-sm text-foreground leading-snug">
                    Each plank is hand-charred, brushed and oiled on-site in our workshop before
                    installation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Qualities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {qualities.map((q, i) => (
            <div
              key={q.title}
              className={`reveal reveal-delay-${i + 1} p-6 border border-border/60 rounded-sm hover:border-accent/30 transition-all duration-300 group`}
            >
              <div
                className="w-8 h-8 rounded-sm flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background:
                    'linear-gradient(135deg, hsl(21 91% 41% / 0.3), hsl(38 92% 50% / 0.15))',
                  border: '1px solid hsl(38 92% 50% / 0.3)',
                }}
              >
                <span className="text-accent text-sm">✦</span>
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{q.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{q.description}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="reveal">
          <div className="text-center mb-8">
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              Interior Finishes — Actual Builds
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
              'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80',
              'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
              'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=600&q=80',
            ].map((src, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} relative aspect-square overflow-hidden rounded-sm group cursor-pointer`}
              >
                <img
                  src={src}
                  alt={`Interior finish ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
