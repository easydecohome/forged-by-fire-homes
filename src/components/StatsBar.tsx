import React from 'react';

export const StatsBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 md:py-16 border-y border-white/10 bg-black/30 backdrop-blur-md rounded-2xl px-12 transition-all duration-500 hover:border-primary/20 hover:bg-black/50">
      <div className="flex flex-col items-center md:items-start text-center md:text-left group transition-all">
        <span className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 transition-transform group-hover:scale-105">100%</span>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground/80 transition-colors italic">Authentic Shou Sugi Ban</span>
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left group border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 md:px-8">
        <span className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 transition-transform group-hover:scale-105 tracking-tight flex items-center gap-3">
          QLD
          <div className="h-6 w-[1px] bg-primary/30"></div>
        </span>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground/80 transition-colors italic">Built in Rockhampton</span>
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left group transition-all">
        <span className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2 transition-transform group-hover:scale-105 tracking-tight">75yr+</span>
        <span className="text-sm font-medium tracking-widest uppercase text-foreground/50 group-hover:text-foreground/80 transition-colors italic">Timber Longevity</span>
      </div>
    </div>
  );
};
