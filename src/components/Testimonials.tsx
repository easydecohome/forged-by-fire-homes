import { useEffect, useRef } from 'react'

const testimonials = [
  {
    quote:
      "I've owned properties across Australia for 20 years. Nothing commands the kind of attention — or the Airbnb nightly rates — that our Forged by Fire home does. Guests ask about the timber before they even see inside.",
    name: 'Michael R.',
    role: 'Retreat Investor',
    location: 'Byron Bay, NSW',
    rating: 5,
  },
  {
    quote:
      "The team understood what we wanted before we could articulate it. The Shou Sugi Ban exterior is genuinely unlike anything else we've seen in Australia. It belongs in our landscape — and nowhere else.",
    name: 'Sarah & Tom K.',
    role: 'Private Homeowners',
    location: 'Daylesford, VIC',
    rating: 5,
  },
  {
    quote:
      "We were nervous about modular builds after bad experiences elsewhere. Forged by Fire changed everything. The craftsmanship, the material quality, the personal service — it felt like commissioning fine architecture, not buying a product.",
    name: 'Priya N.',
    role: 'Eco-Retreat Owner',
    location: 'Noosa Hinterland, QLD',
    rating: 5,
  },
  {
    quote:
      'Our property value increased significantly after the install. The aesthetic is timeless. Neighbours stop to photograph it. Our Airbnb is booked 11 months of the year at premium rates we never dreamed possible.',
    name: 'James & Claire M.',
    role: 'Investment Property Owners',
    location: 'Mornington Peninsula, VIC',
    rating: 5,
  },
  {
    quote:
      "From first call to handover was 9 months — faster than any builder we'd worked with. The project manager was exceptional. They treated our home like it was their own.",
    name: 'David L.',
    role: 'Architect & Homeowner',
    location: 'Margaret River, WA',
    rating: 5,
  },
  {
    quote:
      "The charred timber patina after two years is even more beautiful than when it was installed. The silver tones emerging through the grain are extraordinary. I'd commission another tomorrow.",
    name: 'Anna S.',
    role: 'Creative Director',
    location: 'Hunter Valley, NSW',
    rating: 5,
  },
]

export default function Testimonials() {
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
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-card relative overflow-hidden"
    >
      {/* Subtle fire glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(38 92% 50% / 0.04), transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            Client Voices
            <span className="w-8 h-px bg-accent" />
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
            What our clients say
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From first-time tiny home owners to Australia's most acclaimed eco-retreat operators.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${(i % 3) + 1} p-6 border border-border/50 rounded-sm hover:border-accent/20 transition-all duration-300 group flex flex-col bg-background/40 hover:bg-background/60`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-accent text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1 mb-5 italic">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border/40 pt-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{
                      background:
                        'linear-gradient(135deg, hsl(21 91% 41% / 0.6), hsl(38 92% 50% / 0.5))',
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* States served */}
        <div className="mt-16 border-t border-border/40 pt-10 text-center reveal">
          <p className="text-sm text-muted-foreground mb-5">Proudly building across all of Australia</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground/50 tracking-widest uppercase">
            {[
              'New South Wales',
              'Victoria',
              'Queensland',
              'Western Australia',
              'South Australia',
              'Tasmania',
              'ACT',
              'Northern Territory',
            ].map((s) => (
              <span key={s} className="flex items-center gap-2">
                {s}
                <span className="w-1 h-1 rounded-full bg-border/60 last:hidden" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
