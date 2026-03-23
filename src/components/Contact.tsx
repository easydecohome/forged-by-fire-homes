import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    message: '',
    timeline: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-muted/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200'

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-card relative overflow-hidden"
    >
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=60"
          alt=""
          className="w-full h-full object-cover opacity-8"
          style={{ opacity: 0.08 }}
        />
        <div className="absolute inset-0 bg-card/96" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div>
            <div className="reveal">
              <span className="text-accent text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-accent" /> Commission Your Home
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Begin your
                <br />
                sanctuary
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Every Forged by Fire home begins with a conversation. Tell us about your land, your
                vision, and what you want to feel when you arrive home. We handle everything from
                there — design, build, and delivery across Australia.
              </p>
            </div>

            {/* Contact info blocks */}
            <div className="space-y-3 reveal reveal-delay-2">
              {[
                {
                  icon: '📞',
                  label: 'Call Us',
                  value: '+61 2 8000 0000',
                  sub: 'Mon–Sat, 8am–6pm AEST',
                },
                {
                  icon: '✉️',
                  label: 'Email Us',
                  value: 'hello@forgedbyfire.com.au',
                  sub: 'We respond within 24 hours',
                },
                {
                  icon: '📍',
                  label: 'Our Workshop',
                  value: 'Serving all of Australia',
                  sub: 'Site visits available nationwide',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 border border-border/40 rounded-sm hover:border-border/70 transition-colors"
                >
                  <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs text-muted-foreground tracking-wider uppercase mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency / social proof */}
            <div
              className="mt-6 p-4 border border-accent/20 rounded-sm reveal reveal-delay-3"
              style={{ background: 'hsl(38 92% 50% / 0.05)' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl flex-shrink-0">⚡</span>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    Currently accepting commissions for Q3 2025
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    Our build calendar fills quickly. We recommend submitting your enquiry early to
                    secure your preferred timeline.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div
                className="border border-accent/30 rounded-sm p-10 text-center"
                style={{ background: 'hsl(17 12% 10% / 0.8)' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(38 92% 50%))',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M4 11l6 6 8-9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Enquiry Received</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thank you, {form.name.split(' ')[0] || 'there'}. We'll be in touch within 24
                  hours to discuss your vision.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-6 lg:p-8 border border-border/40 rounded-sm"
                style={{ background: 'hsl(17 12% 8% / 0.6)' }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="0400 000 000"
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com.au"
                    className={inputClass}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                    Which model interests you?
                  </label>
                  <select
                    className={inputClass}
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    style={{ appearance: 'auto' }}
                  >
                    <option value="">Select a model</option>
                    <option value="ember">The Ember — From $165K</option>
                    <option value="sovereign">The Sovereign — From $280K</option>
                    <option value="refuge">The Refuge — From $220K</option>
                    <option value="custom">Fully Custom Commission</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                    Ideal Timeline
                  </label>
                  <select
                    className={inputClass}
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    style={{ appearance: 'auto' }}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="6months">Within 6 months</option>
                    <option value="1year">Within 12 months</option>
                    <option value="planning">Still in planning phase</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground tracking-wider uppercase block mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your land, your lifestyle, and what you're hoping to create..."
                    className={`${inputClass} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm font-semibold text-white rounded-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))',
                  }}
                >
                  {loading ? 'Sending your enquiry...' : 'Send My Enquiry →'}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We respond within 24 hours. Your details are never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
