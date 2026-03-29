import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Models', href: '#ourwork' },
  { label: 'Specifications', href: '/specifications' },
  { label: 'Council Approval', href: '/process' },
  { label: 'Shou Sugi Ban', href: '/shou-sugi-ban' },
  { label: 'Investment', href: '/investment' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowCTA(window.scrollY > window.innerHeight * 0.6);

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    if (href.startsWith('/')) {
      // Trigger link click to use interceptor
      const link = document.createElement('a');
      link.href = href;
      link.click();
    } else {
      // Scroll to section
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Sticky bottom CTA bar */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-background/95 backdrop-blur-xl border-t border-primary/20 p-4 flex gap-3">
              <button
                onClick={() => scrollTo('#contact')}
                className="flex-1 py-3.5 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow"
              >
                Commission My Sanctuary
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl border-orange-600/20 py-3 shadow-lg'
            : 'bg-transparent border-transparent py-5'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              className="w-8 h-8 bg-orange-600 rotate-45 flex items-center justify-center rounded-sm"
              whileHover={{ rotate: 135 }}
              transition={{ duration: 0.5 }}
            >
              <div className="-rotate-45 font-serif font-bold text-background text-xl">F</div>
            </motion.div>
            <span className="font-serif text-xl tracking-tight font-semibold">Forged by Fire</span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'text-sm font-medium transition-colors relative',
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-primary'
                )}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => scrollTo('#contact')}
              >
                Touch the Timber
              </Button>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={mobileOpen ? 'open' : 'closed'}
              className="w-6 h-5 flex flex-col justify-between"
            >
              <motion.span
                className="block h-[2px] bg-current rounded"
                variants={{
                  open: { rotate: 45, y: 9 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] bg-current rounded"
                variants={{
                  open: { opacity: 0, x: -10 },
                  closed: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[2px] bg-current rounded"
                variants={{
                  open: { rotate: -45, y: -9 },
                  closed: { rotate: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center gap-8"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-3xl font-serif font-bold text-foreground/80 hover:text-primary transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-primary text-white px-10 py-6 text-lg fire-glow"
                onClick={() => scrollTo('#contact')}
              >
                Touch the Timber
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
