import React from 'react';
import { Button } from './ui/button';
import { StatsBar } from './StatsBar';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1568659585069-facb248c4935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
          alt="Architectural Shou Sugi Ban Cabin Exterior"
          className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.05)_0,transparent_70%)] z-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 mb-8 reveal animate-fade-in">
          <div className="h-[1px] w-8 bg-primary"></div>
          <span className="text-primary tracking-widest uppercase text-xs font-bold leading-none">Crafted in Australia</span>
          <div className="h-[1px] w-8 bg-primary"></div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-[0.9] mb-8 max-w-5xl reveal reveal-delay-1">
          Where fire meets <span className="fire-text italic">timber.</span> <br />
          Where craft becomes home.
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl font-sans mb-12 reveal reveal-delay-2 leading-relaxed">
          Forged by Fire builds architectural cabins clad in authentic Shou Sugi Ban — the ancient Japanese art of charring timber into a surface of extraordinary beauty, resilience, and character. Crafted for Australia's most discerning landscapes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 reveal reveal-delay-3">
          <Button size="lg" className="px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-white border-none transition-all duration-500 hover:scale-105 fire-glow">
            View Our Sanctuaries
          </Button>
          <Button size="lg" variant="outline" className="px-10 py-7 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500">
            The Material Story
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 mb-12 reveal reveal-delay-4">
        <StatsBar />
      </div>

      {/* Fire glow accent bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </section>
  );
};
