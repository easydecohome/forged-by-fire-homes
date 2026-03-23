import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'A free 30-minute conversation about your land, lifestyle, and vision. No pressure, no obligations. We want to understand your dream before we talk solutions.',
  },
  {
    number: '02',
    title: 'Site Assessment',
    description:
      'Our team visits your property to assess orientation, access, services, and landscape character. We map every element before a single plan is drawn.',
  },
  {
    number: '03',
    title: 'Bespoke Design',
    description:
      'No templates. No compromises. Your home is drafted from first principles — with Shou Sugi Ban cladding customised in texture, depth, and finish to match your vision.',
  },
  {
    number: '04',
    title: 'Precision Build',
    description:
      'Each home is built in our controlled workshop with aircraft-grade precision. Every joint, every surface, every detail reviewed before it leaves our hands.',
  },
  {
    number: '05',
    title: 'Delivery & Install',
    description:
      'We deliver and install across all of Australia with a dedicated project manager by your side from day one through to handover day.',
  },
  {
    number: '06',
    title: 'Concierge Aftercare',
    description:
      "Our relationship doesn't end at handover. We offer a 10-year structural warranty, plus ongoing maintenance concierge for every home in our family.",
  },
]

export default function Process() {
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
    <section id="process" ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 reveal">
          <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2 mb-4">
            <span className="w-5 h-px bg-accent" /> Our Process
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            From vision to sanctuary —
            <br />
            every step considered
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            We are Australia's only specialist in luxury Shou Sugi Ban modular architecture. Our
            process is unhurried, personal, and built entirely around your outcome.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30 rounded-sm overflow-hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-background p-8 lg:p-10 group hover:bg-card transition-all duration-300`}
            >
              <div className="text-5xl font-serif font-bold fire-text mb-5 opacity-50 leading-none">
                {step.number}
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Timeline connector (decorative) */}
        <div className="mt-6 flex items-center justify-center gap-2 mb-12 reveal">
          {steps.map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: `hsl(21 91% ${41 + i * 4}%)` }}
              />
              {i < steps.length - 1 && (
                <div className="w-8 lg:w-12 h-px bg-border/60" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center reveal">
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm leading-relaxed">
            Ready to begin your journey? The first step is just a conversation — completely free,
            completely without obligation.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))' }}
          >
            Book a Free Discovery Call
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
        </div>
      </div>
    </section>
  )
}
