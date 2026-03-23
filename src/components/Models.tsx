import { useEffect, useRef } from 'react'

const models = [
  {
    name: 'The Ember',
    tagline: 'For the solitary visionary',
    description:
      'A singular architectural statement. Compact in footprint, boundless in character. Perfect for remote escapes, creative studios, or high-yield short-stay investments.',
    price: 'From $165,000',
    sqm: '38–55 sqm',
    features: [
      '1 Bedroom + Ensuite',
      'Premium kitchen & appliances',
      'Authentic Shou Sugi Ban cladding',
      'Off-grid solar & water ready',
      'Delivered across Australia',
    ],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    badge: null,
  },
  {
    name: 'The Sovereign',
    tagline: 'The flagship sanctuary',
    description:
      'Our most expansive dwelling. Where ancient Japanese craftsmanship meets contemporary Australian luxury living. Designed for those who refuse to compromise.',
    price: 'From $280,000',
    sqm: '65–90 sqm',
    features: [
      '2 Bedrooms + Study/Retreat',
      'Chef kitchen with stone benchtops',
      'Solar+ with battery storage',
      'Premium interior finish package',
      'Landscaping consultation included',
    ],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    badge: 'Most Popular',
  },
  {
    name: 'The Refuge',
    tagline: 'Retreat. Restore. Return.',
    description:
      'Designed for eco-luxury retreat owners and savvy Airbnb investors. Guests ask about the timber before they even see inside. Commands premium nightly rates.',
    price: 'From $220,000',
    sqm: '50–70 sqm',
    features: [
      '1–2 Bedrooms configurable',
      'Biophilic living & dining',
      'Net-zero energy package',
      'Shou Sugi Ban feature walls (interior)',
      '10-year structural warranty',
    ],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    badge: 'Best ROI',
  },
]

export default function Models() {
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
    <section id="models" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-accent" /> Our Collection
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Architectural homes
            <br />
            forged in fire
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Each Forged by Fire home is a bespoke commission — built to your land, your vision, and
            your life. No templates. No off-the-shelf solutions. Every surface tells a story only
            fire can write.
          </p>
        </div>

        {/* Models grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {models.map((model, i) => (
            <div
              key={model.name}
              className={`reveal reveal-delay-${i + 1} group relative flex flex-col bg-card border border-border rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg`}
              style={{ boxShadow: '0 4px 24px hsl(17 14% 4% / 0.5)' }}
            >
              {/* Badge */}
              {model.badge && (
                <div
                  className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold tracking-wide text-white rounded-sm"
                  style={{
                    background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(38 92% 50%))',
                  }}
                >
                  {model.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs text-muted-foreground italic">{model.tagline}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-2xl font-bold">{model.name}</h3>
                  <span className="text-xs text-muted-foreground mt-1 flex-shrink-0 ml-2">
                    {model.sqm}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {model.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 text-xs flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="border-t border-border/50 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-serif font-bold fire-text">{model.price}</span>
                    <span className="text-xs text-muted-foreground">incl. delivery & install</span>
                  </div>
                  <a
                    href="#contact"
                    className="block w-full text-center py-3 text-sm font-medium border border-primary/50 text-primary rounded-sm transition-all duration-200 hover:bg-primary hover:text-white hover:border-primary"
                  >
                    Commission This Home →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom commission CTA */}
        <div className="mt-12 text-center reveal">
          <p className="text-muted-foreground mb-3 text-sm">Need something completely unique?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors font-medium text-sm"
          >
            Ask about fully custom commissions →
          </a>
        </div>
      </div>
    </section>
  )
}
