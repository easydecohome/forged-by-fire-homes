import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';

export const Models = () => {
  const models = [
    {
      id: 'ember',
      name: 'The Ember',
      tagline: 'For the solitary visionary',
      description: 'A singular architectural statement. Compact in footprint, limitless in character.',
      price: 'From $185K',
      image: 'https://images.unsplash.com/photo-1761470484741-badac5364858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'sovereign',
      name: 'The Sovereign',
      tagline: 'The flagship sanctuary',
      description: 'Our most expansive dwelling. Where Japanese craftsmanship meets luxury.',
      price: 'From $295K',
      image: 'https://images.unsplash.com/photo-1568659585069-facb248c4935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      featured: true,
    },
    {
      id: 'refuge',
      name: 'The Refuge',
      tagline: 'Retreat. Restore. Return.',
      description: 'Designed for eco-luxury retreats and premium Airbnb investment properties across Australia.',
      price: 'From $235K',
      image: 'https://images.unsplash.com/photo-1627750673372-ceabdbeb768c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section id="ourwork" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">焼き杉 · Our Collection</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Architectural cabins <br />
              forged in <span className="fire-text italic">fire</span>
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
              Each Forged by Fire home is a bespoke commission — built to your land, your vision, and your life. No two homes are identical. Every surface tells a story only fire can write.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {models.map((model, idx) => (
            <div key={model.id} className={`reveal reveal-delay-${idx + 1} group`}>
              <div className="relative overflow-hidden mb-8 rounded-2xl bg-charcoal border border-white/5 transition-all duration-700 hover:border-primary/20 hover:shadow-fire">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full aspect-[4/5] object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40"></div>
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className="h-[1px] w-6 bg-primary"></div>
                  <span className="text-xs uppercase font-bold tracking-widest text-white/70">{model.tagline}</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-3xl font-serif font-bold text-white mb-2">{model.name}</div>
                  <div className="text-primary font-bold">{model.price}</div>
                </div>
              </div>
              <p className="text-foreground/50 text-sm md:text-base mb-6 leading-relaxed line-clamp-2 italic tracking-wide group-hover:text-foreground/80 transition-colors">
                {model.description}
              </p>
              <Button variant="link" className="p-0 h-auto text-primary hover:text-white transition-colors group/btn font-serif text-lg tracking-tight">
                Commission <span className="ml-2 inline-block transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
