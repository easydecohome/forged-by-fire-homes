import React from 'react';

export const Craft = () => {
  const philosophies = [
    {
      title: 'Born of Fire',
      description: 'Shou Sugi Ban — 焼き杉 — is a 300-year-old Japanese technique of slowly charring timber with controlled flame. The surface blackens, crystallises, and transforms into something entirely new: a skin of carbonised beauty.',
    },
    {
      title: 'Resilience as Aesthetic',
      description: 'The charring process creates a natural barrier against moisture, insects, UV degradation, and fire. In Queensland\'s heat, storms, and humidity, this is not just beautiful — it is engineered longevity without chemicals.',
    },
    {
      title: 'Ages Backwards',
      description: 'Where standard cladding fades and fails, Shou Sugi Ban matures. Silver highlights emerge over decades. The grain deepens. Time does not diminish it — it refines it. A home that becomes more distinguished with each passing year.',
    },
    {
      title: 'Sustainable by Nature',
      description: 'No toxic preservatives, no synthetic coatings. The preservation is the fire itself — a closed-loop process that extends the life of natural timber by 75 years or more. Luxury without compromise to the land.',
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1761470484741-badac5364858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1745894118353-88e64617e064?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1770625467606-d2cc74e3b583?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1723810742875-4e0c063f8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ];

  return (
    <section id="thematerial" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          <div className="reveal">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">焼き杉 · The Material Story</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              The art of preserving <br />
              wood through <span className="fire-text italic">fire</span>
            </h2>
            <div className="space-y-6 text-foreground/60 text-lg md:text-xl font-sans max-w-xl leading-relaxed">
              <p>
                In feudal Japan, craftsmen discovered that flame — the very thing timber fears most — is also its greatest protector. By charring the outer layer of cedar planks, they created a surface so dense and mineralised it repelled weather, pests, and decay for generations.
              </p>
              <p>
                At Cubic Homes, we forge every facade in fire — not as a design trend, but as an investment in longevity. Shou Sugi Ban is Queensland timber transformed: darker than night, harder than rain, more beautiful with every passing season. In Rockhampton's heat and Central Queensland's storms, your home becomes more resilient, not less. This is what heritage looks like.
              </p>
            </div>
            
            <div className="mt-12 p-8 border-l-2 border-primary bg-black/20 backdrop-blur-sm rounded-r-2xl max-w-xl reveal reveal-delay-2 group transition-all duration-500 hover:border-primary/50 hover:bg-black/30">
              <blockquote className="text-xl md:text-2xl font-serif italic text-foreground leading-snug transition-colors group-hover:text-primary transition-colors">
                "Fire does not destroy this timber. It preserves it — and in doing so, makes it more beautiful than it was before."
              </blockquote>
              <cite className="block mt-4 text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 font-sans not-italic transition-colors group-hover:text-foreground/50">
                The Cubic Homes Philosophy
              </cite>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:pt-24">
            {philosophies.map((item, idx) => (
              <div key={item.title} className={`reveal reveal-delay-${idx + 1}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-6 bg-primary"></div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed italic tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interior Gallery */}
        <div className="reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <span className="text-primary font-serif italic mb-2 block text-sm tracking-widest uppercase">Visual Proof</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Interior Finishes — Actual Builds</h2>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-12 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className={`reveal reveal-delay-${idx + 1} overflow-hidden rounded-2xl aspect-[4/5] group cursor-pointer border border-white/5 hover:border-primary/20 transition-all duration-700 hover:shadow-fire`}>
                <img
                  src={img}
                  alt={`Cubic Homes Interior ${idx + 1}`}
                  className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
