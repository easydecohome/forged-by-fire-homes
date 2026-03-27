import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const comparisons = [
  {
    category: 'Rent vs. Own',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10l9-7 9 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="8" y="13" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    before: { label: 'Paying $2,400/mo rent', sub: 'No equity. No land. No end in sight.', tag: 'Before' },
    after: { label: 'Earning $2,800/wk Airbnb', sub: 'Your home pays for itself — and then some.', tag: 'After' },
    metric: '$2.8K/wk',
    metricLabel: 'Avg. Airbnb income',
  },
  {
    category: 'Build Timeline',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 6v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    before: { label: '18-month build timeline', sub: 'Delays, cost blowouts, endless decisions.', tag: 'Before' },
    after: { label: 'Move in within 16 weeks', sub: 'Delivered, installed, ready. No surprises.', tag: 'After' },
    metric: '16 weeks',
    metricLabel: 'Commission to move-in',
  },
  {
    category: 'Energy Bills',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L5 13h7l-1 7 8-11h-7l1-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    before: { label: '$600+ monthly energy bills', sub: 'Grid dependency, rising costs, zero control.', tag: 'Before' },
    after: { label: 'Off-grid. $0 energy bills.', sub: 'Solar, battery & rainwater built-in as standard.', tag: 'After' },
    metric: '$0',
    metricLabel: 'Energy bill potential',
  },
];

const outcomes = [
  { number: '84+', label: 'Families housed', sub: 'Across QLD, NSW & VIC' },
  { number: '$2.8K', label: 'Avg weekly Airbnb revenue', sub: 'Verified client portfolio data' },
  { number: '16wks', label: 'Average delivery time', sub: 'From commission to move-in' },
  { number: '75yr+', label: 'Material lifespan', sub: 'Shou Sugi Ban cladding' },
  { number: '4.97★', label: 'Google rating', sub: 'From 60+ verified reviews' },
  { number: '$0', label: 'Energy bills possible', sub: 'Full off-grid capability' },
];

export const LifestyleTransform: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const tableInView = useInView(tableRef, { once: true, margin: '-80px' });
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
            Every client who commissions a Forged by Fire home tells us the same thing: they wish they'd done it sooner. See the transformation side by side.
          </p>
        </motion.div>

        {/* Static comparison table */}
        <motion.div
          ref={tableRef}
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-0 hidden md:grid">
            <div className="px-5 py-3">
              <span className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans">Category</span>
            </div>
            <div className="px-5 py-3 bg-red-950/20 rounded-tl-xl border border-red-500/10 border-b-0">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2"/>
                  <path d="M4 4l6 6M10 4L4 10" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs uppercase tracking-widest font-bold text-red-400/70 font-sans">Before Forged by Fire</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-primary/10 rounded-tr-xl border border-primary/20 border-b-0">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="rgba(217,119,6,0.7)" strokeWidth="1.2"/>
                  <path d="M4 7l2 2 4-4" stroke="rgba(217,119,6,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs uppercase tracking-widest font-bold text-primary font-sans">After Forged by Fire</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/8">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-0 border-b border-white/6 last:border-b-0"
                initial={{ opacity: 0, y: 15 }}
                animate={tableInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                {/* Category */}
                <div className="px-5 py-6 bg-background/60 flex items-center gap-3 border-b md:border-b-0 border-white/6">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    {row.icon}
                  </div>
                  <div>
                    <span className="text-sm font-bold font-sans text-foreground/80 block">{row.category}</span>
                    <span className="text-xs font-serif font-bold text-primary">{row.metric}</span>
                    <span className="text-[9px] text-foreground/30 font-sans ml-1">{row.metricLabel}</span>
                  </div>
                </div>

                {/* Before */}
                <div className="px-5 py-6 bg-red-950/10 border-l border-red-500/8 flex items-start gap-3 border-b md:border-b-0 border-white/6">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.4)" strokeWidth="1"/>
                    <path d="M5 5l6 6M11 5L5 11" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-foreground/50 font-sans line-through decoration-red-500/30 mb-1">{row.before.label}</p>
                    <p className="text-xs text-foreground/35 font-sans leading-relaxed">{row.before.sub}</p>
                  </div>
                </div>

                {/* After */}
                <div className="px-5 py-6 bg-primary/5 border-l border-primary/10 flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" fill="rgba(217,119,6,0.15)" stroke="rgba(217,119,6,0.5)" strokeWidth="1"/>
                    <path d="M5 8l2 2 4-4" stroke="rgba(217,119,6,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="text-sm font-bold text-foreground font-sans mb-1">{row.after.label}</p>
                    <p className="text-xs text-foreground/50 font-sans leading-relaxed">{row.after.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
          <cite className="text-sm text-primary font-sans not-italic">— Sarah &amp; Tom K., The Sovereign · Noosa Hinterland</cite>
        </motion.div>
      </div>
    </section>
  );
};
