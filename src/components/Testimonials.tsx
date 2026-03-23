import React from 'react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Michael R.',
      title: 'Retreat Investor, Yeppoon QLD',
      quote: 'I\'ve owned properties across Australia for 20 years. Nothing commands the kind of attention — or the Airbnb rates — that our Forged by Fire home does. Guests ask about the timber before they even see the inside.',
      initial: 'M',
    },
    {
      name: 'Sarah & Tom K.',
      title: 'Private Homeowners, Capricorn Coast',
      quote: 'The team understood what we wanted before we could articulate it. The Shou Sugi Ban exterior is genuinely unlike anything else. It belongs here — and nowhere else.',
      initial: 'S',
    },
    {
      name: 'Priya N.',
      title: 'Eco-Luxury Retreat Owner',
      quote: 'We were nervous about modular builds. Forged by Fire changed everything we thought we knew. The craftsmanship, the material quality, the process — it felt like commissioning architecture, not buying a product.',
      initial: 'P',
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">Client Voices</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              What our <span className="fire-text italic">clients</span> say
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
              From Australian homeowners to our most acclaimed eco-retreat operators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`reveal reveal-delay-${idx + 1} flex flex-col group p-8 rounded-2xl bg-charcoal border border-white/5 hover:border-primary/20 transition-all duration-700 hover:shadow-fire`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-serif text-xl font-bold text-primary group-hover:bg-primary group-hover:text-background transition-all duration-500">
                  {t.initial}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">{t.name}</h3>
                  <p className="text-xs font-sans text-foreground/30 uppercase tracking-widest group-hover:text-foreground/50 transition-colors font-bold">{t.title}</p>
                </div>
              </div>
              <blockquote className="text-lg md:text-xl text-foreground/60 italic font-serif leading-relaxed mb-6 group-hover:text-foreground/90 transition-colors">
                "{t.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
