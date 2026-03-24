import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const problems = [
  {
    icon: '🏦',
    problem: 'Traditional housing is out of reach',
    solution: 'Own a fully-built architectural home from $185K — no stamp duty, no agent fees, no compromise.',
    stat: '$185K',
    statLabel: 'Starting price',
    color: 'from-amber-900/20 to-transparent',
  },
  {
    icon: '⏳',
    problem: 'Building takes years of stress',
    solution: 'Your sanctuary is delivered and installed in 12–16 weeks. Move in before the season changes.',
    stat: '16wks',
    statLabel: 'Avg. delivery',
    color: 'from-orange-900/20 to-transparent',
  },
  {
    icon: '🌿',
    problem: 'Rental income is unpredictable',
    solution: 'Our clients average $1,200–$2,800/week on Airbnb. Your home pays for itself.',
    stat: '$2.8K',
    statLabel: 'Weekly Airbnb avg.',
    color: 'from-amber-800/20 to-transparent',
  },
  {
    icon: '🔋',
    problem: 'Rising energy costs eat into savings',
    solution: 'Every home is off-grid ready — solar, battery, rainwater. Energy bills become optional.',
    stat: '$0',
    statLabel: 'Energy bill potential',
    color: 'from-yellow-900/20 to-transparent',
  },
  {
    icon: '🏡',
    problem: 'You want land but can\'t afford to build',
    solution: 'Already own land? We deliver a complete turnkey home. Your land, our craft, your freedom.',
    stat: '100%',
    statLabel: 'Turnkey delivery',
    color: 'from-amber-900/20 to-transparent',
  },
  {
    icon: '🌏',
    problem: 'Conventional homes damage the environment',
    solution: 'Shou Sugi Ban cladding lasts 75+ years with zero paint, zero maintenance, zero landfill.',
    stat: '75yr+',
    statLabel: 'Material lifespan',
    color: 'from-orange-800/20 to-transparent',
  },
];

const SolutionCard: React.FC<{ item: typeof problems[0]; index: number }> = ({ item, index }) => {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-52"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border border-white/8 bg-gradient-to-br ${item.color} bg-card/30 p-6 flex flex-col justify-between backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div>
            <div className="text-3xl mb-3">{item.icon}</div>
            <p className="text-foreground/50 text-sm font-sans leading-relaxed line-through decoration-primary/40">{item.problem}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary/60 font-sans uppercase tracking-widest">Tap to see the solution</span>
            <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center">
              <span className="text-primary text-xs">→</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-card/40 p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-foreground text-base font-sans leading-relaxed">{item.solution}</p>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-serif font-bold text-primary">{item.stat}</div>
              <div className="text-xs text-foreground/40 uppercase tracking-widest font-sans">{item.statLabel}</div>
            </div>
            <span className="text-xs text-primary/60 font-sans uppercase tracking-widest">Tap to flip back</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SolutionSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">The Problem We Solve</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            You don't need a bigger mortgage.<br />
            You need a <span className="fire-text italic">smarter home.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            We don't sell houses. We solve the problems that conventional housing creates — financial stress, environmental guilt, wasted land, and a life spent waiting to live. Tap each card to discover your solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((item, i) => (
            <SolutionCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card/20 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Ready to escape the ordinary?</h3>
            <p className="text-foreground/60 font-sans">Join 84+ Australians who chose a different path. No obligation consultation, 24hr response.</p>
          </div>
          <motion.button
            className="shrink-0 px-10 py-5 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow whitespace-nowrap"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start My Journey →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
