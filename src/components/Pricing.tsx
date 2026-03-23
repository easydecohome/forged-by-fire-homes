import { useEffect, useRef } from 'react'

const plans = [
  {
    name: 'The Ember',
    price: '$165,000',
    tagline: 'A singular architectural sanctuary',
    description:
      'For solo living, creative studios, or high-yield short stays. Compact in footprint, limitless in character.',
    features: [
      '38–55 sqm floor plan',
      '1 bedroom with ensuite',
      'Full kitchen — premium appliances',
      'Authentic Shou Sugi Ban cladding',
      'Off-grid solar & water ready',
      'Delivered & installed across Australia',
      '5-year structural warranty',
    ],
    highlight: false,
    cta: 'Commission The Ember',
  },
  {
    name: 'The Sovereign',
    price: '$280,000',
    tagline: 'The highest expression of the craft',
    description:
      "Our flagship commission — the fullest expression of Shou Sugi Ban luxury modular architecture.",
    features: [
      '65–90 sqm floor plan',
      '2 bedrooms + study/retreat',
      'Chef kitchen with stone benchtops',
      'Solar+ with battery storage',
      'Premium interior finish package',
      'Landscaping consultation',
      '10-year structural warranty',
      'Priority project management',
    ],
    highlight: true,
    cta: 'Commission The Sovereign',
  },
  {
    name: 'The Refuge',
    price: '$220,000',
    tagline: 'Engineered for premium ROI',
    description:
      'Crafted for eco-luxury retreat owners and Airbnb investors seeking architectural distinction and maximum returns.',
    features: [
      '50–70 sqm floor plan',
      '1–2 bedrooms configurable',
      'Biophilic living & dining space',
      'Net-zero energy package',
      'Shou Sugi Ban feature walls (interior)',
      'Delivered across Australia',
      '10-year structural warranty',
    ],
    highlight: false,
    cta: 'Commission The Refuge',
  },
]

export default function Pricing() {
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
    <section id="pricing" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            Transparent Pricing
            <span className="w-8 h-px bg-accent" />
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            Your sanctuary,
            <br />
            fully costed
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            All-inclusive pricing: design, Shou Sugi Ban cladding, fabrication, delivery and
            installation across Australia. No hidden costs. No surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal reveal-delay-${i + 1} relative rounded-sm border flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? 'border-accent/50 bg-card'
                  : 'border-border/50 bg-card/60'
              }`}
              style={
                plan.highlight
                  ? { boxShadow: '0 0 50px hsl(38 92% 50% / 0.1), 0 8px 32px hsl(17 14% 4% / 0.5)' }
                  : { boxShadow: '0 4px 24px hsl(17 14% 4% / 0.4)' }
              }
            >
              {/* "Most Commissioned" badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white rounded-sm whitespace-nowrap"
                    style={{
                      background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(38 92% 50%))',
                    }}
                  >
                    Most Commissioned
                  </div>
                </div>
              )}

              <div className={`p-7 lg:p-8 flex flex-col h-full ${plan.highlight ? 'pt-10' : ''}`}>
                {/* Plan header */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-xs tracking-wide mb-5">{plan.tagline}</p>

                  <div className="mb-1">
                    <span className="text-4xl font-serif font-bold fire-text">{plan.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">
                    incl. design, fabrication, delivery & install
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/50 mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-accent mt-0.5 text-xs flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`block w-full text-center py-3.5 text-sm font-semibold rounded-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'text-white hover:brightness-110 hover:scale-[1.01]'
                      : 'border border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary'
                  }`}
                  style={
                    plan.highlight
                      ? { background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))' }
                      : {}
                  }
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8 reveal">
          All pricing is indicative and subject to site assessment. Finance options available.
          Prices include GST.
        </p>
      </div>
    </section>
  )
}
