import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
      <div className="absolute -bottom-64 -right-64 w-[512px] h-[512px] bg-primary/5 blur-[128px] rounded-full z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          {/* Brand */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.a
              href="#"
              className="flex items-center gap-2 group mb-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-8 h-8 bg-primary rotate-45 flex items-center justify-center"
                whileHover={{ rotate: 135 }}
                transition={{ duration: 0.5 }}
              >
                <div className="-rotate-45 font-serif font-bold text-background text-xl">F</div>
              </motion.div>
              <span className="font-serif text-3xl tracking-tight font-semibold">Forged by Fire</span>
            </motion.a>
            <p className="text-foreground/40 text-lg md:text-xl font-sans max-w-sm leading-relaxed italic tracking-wide mb-8">
              Crafting architectural sanctuaries through the transformative power of Shou Sugi Ban. Built for Australia's most discerning landscapes.
            </p>
            <motion.button
              className="border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary px-6 py-3 rounded-lg text-sm font-sans transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
            >
              Begin Your Commission
            </motion.button>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 mb-8 font-sans">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: 'Our Work', href: '#ourwork', isPage: false },
                { label: 'Specifications', href: '/specifications', isPage: true },
                { label: 'Council Approval', href: '/process', isPage: true },
                { label: 'Shou Sugi Ban', href: '/shou-sugi-ban', isPage: true },
                { label: 'Investment', href: '/investment', isPage: true },
              ].map((item) => (
                <li key={item.label}>
                  <motion.button
                    onClick={() => item.isPage ? window.location.href = item.href : scrollTo(item.href.replace('#', ''))}
                    className="text-sm font-medium text-foreground/50 hover:text-primary transition-colors italic tracking-wide font-sans"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 mb-8 font-sans">Details</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-sm font-medium text-foreground/50 hover:text-primary transition-colors italic tracking-wide font-sans"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-xs text-foreground/20 font-sans uppercase tracking-[0.2em] font-bold italic hover:text-foreground/40 transition-colors">
            © 2026 Forged by Fire · Australian Built
          </div>
          <div className="text-primary italic tracking-widest leading-none text-xs border border-primary/20 py-1 px-3 rounded-full hover:border-primary/50 transition-all duration-500">
            焼き杉 · Shou Sugi Ban Specialists
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
