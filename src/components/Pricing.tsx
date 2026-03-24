import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from './ui/button';

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

const PricingCard: React.FC<{ model: typeof models[0]; index: number }> = ({ model, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className="group flex flex-col p-8 md:p-12 rounded-2xl bg-card border relative overflow-hidden h-full"
      style={{
        borderColor: hovered ? 'rgba(217,119,6,0.3)' : model.featured ? 'rgba(217,119,6,0.2)' : 'rgba(255,255,255,0.05)',
        boxShadow: hovered
          ? '0 20px 60px rgba(217,119,6,0.2), 0 0 0 1px rgba(217,119,6,0.15)'
          : model.featured
          ? '0 8px 32px rgba(217,119,6,0.1)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
      }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"
        animate={{ opacity: hovered ? 1 : model.featured ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Featured badge */}
      {model.featured && (
        <div className="absolute top-0 right-0 py-2 px-10 bg-primary text-background font-bold uppercase text-[10px] tracking-widest translate-x-[30%] translate-y-[100%] rotate-45 z-20 shadow-xl">
          Most Commissioned
        </div>
      )}

      <div className="flex-1 flex flex-col relative z-10">
        <motion.h3
          className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4"
          animate={{ color: hovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
          transition={{ duration: 0.3 }}
        >
          {model.name}
        </motion.h3>

        <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed mb-8 italic tracking-wide">
          {model.tagline}
        </p>

        <div className="flex flex-col mb-10 border-y border-white/5 py-8" style={{ borderColor: hovered ? 'rgba(217,119,6,0.2)' : 'rgba(255,255,255,0.05)', transition: 'border-color 0.5s' }}>
          <span className="text-foreground/30 text-xs font-bold uppercase tracking-widest mb-2 font-sans">Investment From</span>
          <motion.div
            className="flex items-end gap-2"
            animate={{ scale: hovered ? 1.03 : 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-4xl md:text-5xl font-serif font-bold text-primary">{model.price}</span>
          </motion.div>
          <span className="text-[10px] text-foreground/20 font-sans mt-2">incl. delivery & install</span>
        </div>

        <ul className="space-y-4 mb-12">
          {model.features.map((feature, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-3 text-sm md:text-base font-sans italic tracking-wide"
              animate={{ color: hovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <motion.div
                className="h-[1px] w-4 bg-primary/30"
                animate={{ width: hovered ? 20 : 16, backgroundColor: hovered ? 'hsl(var(--primary))' : 'rgba(217,119,6,0.3)' }}
                transition={{ duration: 0.3 }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-10"
      >
        <Button
          size="lg"
          className="w-full py-8 text-lg font-serif tracking-tight border border-primary/20 hover:border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all duration-500"
          style={{
            boxShadow: hovered ? '0 0 30px rgba(217,119,6,0.3)' : 'none',
            transition: 'box-shadow 0.4s ease',
          }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Begin My Commission
        </Button>
      </motion.div>
    </motion.div>
  );
};

export const Pricing: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="investment" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {models.map((model, idx) => (
            <PricingCard key={model.name} model={model} index={idx} />
          ))}
        </div>

        <motion.p
          className="text-xs text-foreground/20 mt-12 text-center font-sans uppercase tracking-[0.2em] font-bold italic"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          All pricing is indicative and subject to site assessment. Finance options available. Built in Australia.
        </motion.p>
      </div>
    </section>
  );
};
