import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface Model {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  featured?: boolean;
}

const models: Model[] = [
  {
    id: 'ember',
    name: 'The Ember',
    tagline: 'For the solitary visionary',
    description: 'A singular architectural statement. Compact in footprint, limitless in character. Perfect for private land or high-yield short stays.',
    price: 'From $185K',
    features: ['38–55 sqm', '1 bed + ensuite', 'Full kitchen', 'Off-grid ready', 'Shou Sugi Ban cladding'],
    image: 'https://images.unsplash.com/photo-1761470484741-badac5364858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sovereign',
    name: 'The Sovereign',
    tagline: 'The flagship sanctuary',
    description: 'Our most expansive dwelling. Where Japanese craftsmanship meets luxury. The architectural cabin that commands attention.',
    price: 'From $295K',
    features: ['65–90 sqm', '2 beds + study', 'Chef kitchen', 'Solar + battery', 'Premium interiors'],
    image: 'https://images.unsplash.com/photo-1568659585069-facb248c4935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 'refuge',
    name: 'The Refuge',
    tagline: 'Retreat. Restore. Return.',
    description: 'Designed for eco-luxury retreats and premium Airbnb investment properties across Australia.',
    price: 'From $235K',
    features: ['50–70 sqm', '1–2 beds configurable', 'Biophilic design', 'Net-zero energy', '10-year warranty'],
    image: 'https://images.unsplash.com/photo-1627750673372-ceabdbeb768c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
];

const TiltCard: React.FC<{ model: Model; index: number }> = ({ model, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: isHovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        className="group cursor-pointer"
      >
        <div
          className="relative overflow-hidden mb-8 rounded-2xl bg-charcoal border transition-all duration-700 card-shine-wrapper"
          style={{
            boxShadow: isHovered
              ? '0 20px 60px rgba(217,119,6,0.25), 0 0 0 1px rgba(217,119,6,0.2)'
              : '0 4px 20px rgba(0,0,0,0.4)',
            borderColor: isHovered ? 'rgba(217,119,6,0.3)' : 'rgba(255,255,255,0.05)',
            transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
          }}
        >
          {model.featured && (
            <motion.div
              className="absolute top-4 right-4 z-20 bg-primary text-background text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border-glow-anim"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
            >
              Most Commissioned
            </motion.div>
          )}

          {/* Quick inquiry overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 z-30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className="px-6 py-3 bg-primary text-white font-serif font-bold text-sm rounded-xl fire-glow border border-primary/50 backdrop-blur-sm"
                  initial={{ scale: 0.8, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 10 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Commission This Model →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.img
            src={model.image}
            alt={model.name}
            className="w-full aspect-[4/5] object-cover"
            animate={{
              scale: isHovered ? 1.08 : 1,
              filter: isHovered ? 'grayscale(0%) brightness(1.05)' : 'grayscale(100%) brightness(0.8)',
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent"
            animate={{ opacity: isHovered ? 0.5 : 0.85 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <motion.div
              className="h-[1px] bg-primary"
              animate={{ width: isHovered ? 24 : 16 }}
              transition={{ duration: 0.3 }}
            />
            <span className="text-xs uppercase font-bold tracking-widest text-white/70">{model.tagline}</span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10">
            <motion.div
              className="text-3xl font-serif font-bold text-white mb-2"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {model.name}
            </motion.div>
            <motion.div
              className="text-primary font-bold text-lg"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {model.price}
            </motion.div>

            <motion.div
              className="mt-4 space-y-1.5 overflow-hidden"
              animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {model.features.map((f, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 text-xs text-white/70"
                  animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="w-3 h-[1px] bg-primary/70" />
                  {f}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <p className="text-foreground/50 text-sm md:text-base mb-5 leading-relaxed italic tracking-wide group-hover:text-foreground/80 transition-colors duration-300">
          {model.description}
        </p>

        <div className="flex items-center gap-4">
          <Button
            variant="link"
            className="p-0 h-auto text-primary hover:text-white transition-colors font-serif text-lg tracking-tight"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Commission{' '}
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: isHovered ? 6 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.span>
          </Button>
          <a
            href="/product"
            className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors font-sans underline underline-offset-2"
          >
            View full specs
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Models: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="ourwork" className="py-24 md:py-32 bg-background relative overflow-hidden gradient-mesh">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl">
            <motion.span
              className="text-primary font-serif italic mb-4 block tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              焼き杉 · Your Solution Awaits
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Choose your path<br />
              to <span className="fire-text italic">freedom.</span>
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
              Three models. Three solutions. Each one a bespoke commission built to your land, your vision, and your life — delivered in 16 weeks, backed by a 10-year warranty.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {models.map((model, idx) => (
            <TiltCard key={model.id} model={model} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
