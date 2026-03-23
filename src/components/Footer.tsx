import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 group mb-8">
              <div className="w-8 h-8 bg-primary rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg] duration-500">
                <div className="-rotate-45 font-serif font-bold text-background text-xl">F</div>
              </div>
              <span className="font-serif text-3xl tracking-tight font-semibold">Forged by Fire</span>
            </a>
            <p className="text-foreground/40 text-lg md:text-xl font-sans max-w-sm leading-relaxed italic tracking-wide group hover:text-foreground/60 transition-colors">
              Crafting architectural sanctuaries through the transformative power of Shou Sugi Ban. Built for Australia's most discerning landscapes.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 mb-8 font-sans transition-colors group-hover:text-foreground/50">Explore</h4>
            <ul className="space-y-4">
              {['Our Work', 'The Material', 'Process', 'Investment', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, '')}`} className="text-sm font-medium text-foreground/50 hover:text-primary transition-colors italic tracking-wide font-sans">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 mb-8 font-sans transition-colors group-hover:text-foreground/50">Details</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium text-foreground/50 hover:text-primary transition-colors italic tracking-wide font-sans">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8">
          <div className="text-xs text-foreground/20 font-sans uppercase tracking-[0.2em] font-bold italic transition-colors hover:text-foreground/40">
            © 2026 Forged by Fire · Australian Built
          </div>
          <div className="flex items-center gap-8 text-xs text-foreground/20 font-sans uppercase tracking-[0.2em] font-bold italic transition-colors hover:text-foreground/40">
            <span className="text-primary italic tracking-widest leading-none block border border-primary/20 py-1 px-3 rounded-full hover:border-primary/50 transition-all duration-500">
              焼き杉 · Shou Sugi Ban Specialists
            </span>
          </div>
        </div>
      </div>
      
      {/* Background glow accent */}
      <div className="absolute -bottom-64 -right-64 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full z-0"></div>
    </footer>
  );
};
