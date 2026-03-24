import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const transformations = [
  {
    before: { label: 'Before', headline: 'Paying $2,400/mo rent', sub: 'No equity. No land. No end in sight.', icon: '😔' },
    after: { label: 'After', headline: 'Earning $2,800/wk Airbnb', sub: 'Your home pays for itself — and then some.', icon: '🔥' },
  },
  {
    before: { label: 'Before', headline: '18-month build timeline', sub: 'Delays, cost blowouts, endless decisions.', icon: '🏗️' },
    after: { label: 'After', headline: 'Move in within 16 weeks', sub: 'Delivered, installed, ready. No surprises.', icon: '🏡' },
  },
  {
    before: { label: 'Before', headline: '$600+ monthly energy bills', sub: 'Grid dependency, rising costs, zero control.', icon: '💸' },
    after: { label: 'After', headline: 'Off-grid. $0 energy bills.', sub: 'Solar, battery & rainwater built-in as standard.', icon: '☀️' },
  },
];

const outcomes = [
  { number: '84+', label: 'Families housed', sub: 'Across QLD, NSW & VIC' },
  { number: '$2.8K', label: 'Avg weekly Airbnb revenue', sub: 'Verified client portfolio data' },
  { number: '16wks', label: 'Average delivery time', sub: 'From commission to move-in' },
  { number: '75yr+', label: 'Material lifespan', sub: 'Shou Sugi Ban cladding' },
  { number: '4.97★', label: 'Google rating', sub: 'From 60+ verified reviews' },
  { number: '0', label: 'Energy bills possible', sub: 'Full off-grid capability' },
];

const TransformCard: React.FC<{ item: typeof transformations[0]; index: number }> = ({ item, index }) => {
  const [showAfter, setShowAfter] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border cursor-pointer select-none"
      style={{ borderColor: showAfter ? 'rgba(217,119,6,0.4)' : 'rgba(255,255,255,0.08)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setShowAfter(!showAfter)}
      whileHover={{ y: -4 }}
    >
      <div className={`p-8 transition-colors duration-500 ${showAfter ? 'bg-gradient-to-br from-primary/10 to-card/40' : 'bg-card/30'}`}>
        {/* Toggle pill */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`relative w-14 h-7 rounded-full transition-colors duration-400 ${showAfter ? 'bg-primary' : 'bg-white/10'}`}>
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow"
              animate={{ left: showAfter ? '1.75rem' : '0.25rem' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </div>
          <span className={`text-xs font-bold uppercase tracking-widest font-sans transition-colors duration-300 ${showAfter ? 'text-primary' : 'text-foreground/40'}`}>
            {showAfter ? 'After Forged by Fire' : 'Before Forged by Fire'}
          </span>
        </div>

        <motion.div
          key={showAfter ? 'after' : 'before'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="text-4xl mb-4">{showAfter ? item.after.icon : item.before.icon}</div>
          <h3 className={`text-xl md:text-2xl font-serif font-bold mb-2 transition-colors duration-300 ${showAfter ? 'text-primary' : 'text-foreground/60 line-through decoration-red-500/40'}`}>
            {showAfter ? item.after.headline : item.before.headline}
          </h3>
          <p className="text-foreground/60 font-sans text-sm leading-relaxed">
            {showAfter ? item.after.sub : item.before.sub}
          </p>
        </motion.div>

        <div className="mt-6 text-xs text-foreground/30 font-sans">
          {showAfter ? 'Tap to see the before' : 'Tap to see your transformation'}
        </div>
      </div>
    </motion.div>
  );
};

export const LifestyleTransform: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.06)_0,transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div className="flex items-center gap-4 mb-5" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">Life After Forged by Fire</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            This isn't a house.<br />
            It's a <span className="fire-text italic">life upgrade.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            Every client who commissions a Forged by Fire home tells us the same thing: they wish they'd done it sooner. Toggle each card to see the transformation.
          </p>
        </motion.div>

        {/* Transform cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {transformations.map((item, i) => (
            <TransformCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Outcome metrics */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {outcomes.map((o, i) => (
            <motion.div
              key={i}
              className="text-center p-5 rounded-xl border border-white/6 bg-card/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1 counter-glow-anim">{o.number}</div>
              <div className="text-xs font-bold text-foreground/70 font-sans mb-1">{o.label}</div>
              <div className="text-[10px] text-foreground/30 font-sans">{o.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial pull quote */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <blockquote className="text-xl md:text-2xl font-serif italic text-foreground/80 leading-relaxed mb-4">
            "We were paying $2,200 a month in rent. Now our Forged by Fire cabin earns us $2,600 a week on Airbnb. It changed everything."
          </blockquote>
          <cite className="text-sm text-primary font-sans not-italic">— Sarah & Tom K., The Sovereign · Noosa Hinterland</cite>
        </motion.div>
      </div>
    </section>
  );
};
