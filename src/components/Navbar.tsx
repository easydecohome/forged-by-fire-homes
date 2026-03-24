import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border/50 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rotate-45 flex items-center justify-center transition-transform group-hover:rotate-[135deg] duration-500">
            <div className="-rotate-45 font-serif font-bold text-background text-xl">C</div>
          </div>
          <span className="font-serif text-xl tracking-tight font-semibold">Cubic Homes</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Our Work', 'The Material', 'Process', 'Testimonials', 'Investment'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <a href="#contact">Begin Your Story</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
};
