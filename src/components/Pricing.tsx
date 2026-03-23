import React from 'react';
import { Button } from './ui/button';

export const Pricing = () => {
  const models = [
    {
      name: 'The Ember',
      tagline: 'A singular architectural sanctuary for solo living, creative studios, or high-yield short stays.',
      price: '$185,000',
      features: [
        '38–55 sqm floor plan',
        '1 bedroom with ensuite',
        'Full kitchen — premium appliances',
        'Authentic Shou Sugi Ban cladding',
        'Off-grid solar & water ready',
        'Delivered & installed across Australia',
      ],
    },
    {
      name: 'The Sovereign',
      tagline: 'Our flagship commission — the highest expression of Shou Sugi Ban luxury architecture.',
      price: '$295,000',
      featured: true,
      features: [
        '65–90 sqm floor plan',
        '2 bedrooms + study/retreat',
        'Chef kitchen with stone benchtops',
        'Solar+ with battery storage',
        'Premium interior finish package',
        'Landscaping consultation included',
      ],
    },
    {
      name: 'The Refuge',
      tagline: 'Crafted for eco-luxury retreat owners and Airbnb investors seeking architectural distinction.',
      price: '$235,000',
      features: [
        '50–70 sqm floor plan',
        '1–2 bedrooms configurable',
        'Biophilic living & dining space',
        'Net-zero energy package',
        'Shou Sugi Ban feature walls (interior)',
        '10-year structural warranty',
      ],
    },
  ];

  return (
    <section id="investment" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">Investment · Transparent Pricing</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              Your <span className="fire-text italic">sanctuary,</span> <br />
              fully costed
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
              All-inclusive pricing: design, Shou Sugi Ban cladding, fabrication, delivery and installation across Australia. No hidden costs. No surprises.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {models.map((model, idx) => (
            <div key={model.name} className={`reveal reveal-delay-${idx + 1} group flex flex-col p-8 md:p-12 rounded-2xl bg-charcoal border border-white/5 hover:border-primary/20 transition-all duration-700 hover:shadow-fire h-full relative overflow-hidden`}>
              {model.featured && (
                <div className="absolute top-0 right-0 py-2 px-10 bg-primary text-background font-bold uppercase text-[10px] tracking-widest translate-x-[30%] translate-y-[100%] rotate-45 z-20 shadow-xl">
                  Most Commissioned
                </div>
              )}
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground group-hover:text-primary transition-colors mb-4">{model.name}</h3>
                <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed mb-8 italic tracking-wide group-hover:text-foreground/80 transition-colors">
                  {model.tagline}
                </p>
                
                <div className="flex flex-col mb-10 border-y border-white/5 py-8 group-hover:border-primary/20 transition-all duration-500">
                  <span className="text-foreground/30 text-xs font-bold uppercase tracking-widest mb-2 font-sans group-hover:text-foreground/50 transition-colors">Investment From</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl md:text-5xl font-serif font-bold text-primary group-hover:scale-105 transition-transform origin-left duration-500">{model.price}</span>
                  </div>
                  <span className="text-[10px] text-foreground/20 font-sans mt-2 group-hover:text-foreground/40 transition-colors">incl. delivery & install</span>
                </div>
                
                <ul className="space-y-4 mb-12">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm md:text-base text-foreground/40 group-hover:text-foreground/70 transition-colors font-sans italic tracking-wide">
                      <div className="h-[1px] w-4 bg-primary/30 group-hover:bg-primary/70 transition-colors"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button size="lg" className="w-full py-8 text-lg font-serif tracking-tight border border-primary/20 hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all duration-500 group-hover:scale-105 hover:fire-glow">
                Begin My Commission
              </Button>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-foreground/20 mt-12 text-center font-sans uppercase tracking-[0.2em] font-bold reveal reveal-delay-4 leading-relaxed italic">
          All pricing is indicative and subject to site assessment. Finance options available. Built in Australia.
        </p>
      </div>
    </section>
  );
};
