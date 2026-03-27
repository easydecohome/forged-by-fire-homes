import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const comparisons = [
  {
    topic: 'Entry Cost',
    traditional: 'Median house price $850K–$1.2M + stamp duty + agent fees',
    forged: 'From $185K fully built & delivered. No stamp duty. No agent.',
    stat: '$185K',
    statLabel: 'Starting price',
  },
  {
    topic: 'Build Timeline',
    traditional: '12–24 months. Delays, cost blowouts, endless decisions.',
    forged: 'Delivered and installed in 16 weeks. Move in before the season changes.',
    stat: '16wks',
    statLabel: 'Avg. delivery',
  },
  {
    topic: 'Income Potential',
    traditional: 'Rental yield 3–4% gross. Negative gearing. Vacancy risk.',
    forged: 'Airbnb yield 18–28% gross. Clients average $1,200–$2,800/week.',
    stat: '$2.8K',
    statLabel: 'Weekly Airbnb avg.',
  },
  {
    topic: 'Energy Bills',
    traditional: '$200–$600/month grid dependency. Rising costs, zero control.',
    forged: 'Off-grid ready — solar, battery, rainwater. Energy bills become optional.',
    stat: '$0',
    statLabel: 'Energy bill potential',
  },
  {
    topic: 'Land Requirement',
    traditional: 'Buy land AND build. Double the capital outlay.',
    forged: 'Already own land? We deliver a complete turnkey home. Your land, our craft.',
    stat: '100%',
    statLabel: 'Turnkey delivery',
  },
  {
    topic: 'Environmental Impact',
    traditional: 'Conventional construction: high embodied carbon, short lifespan.',
    forged: 'Shou Sugi Ban cladding lasts 75+ years. 85% lower carbon vs. conventional.',
    stat: '75yr+',
    statLabel: 'Material lifespan',
  },
];

export const SolutionSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const tableInView = useInView(tableRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
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
            We don't sell houses. We solve the problems that conventional housing creates — financial stress, environmental guilt, wasted land, and a life spent waiting to live.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 30 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-3 hidden md:grid">
            <div className="px-5 py-3">
              <span className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans">Category</span>
            </div>
            <div className="px-5 py-3 bg-red-950/20 rounded-tl-xl rounded-tr-none border border-red-500/10 border-b-0">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="rgba(239,68,68,0.5)" strokeWidth="1.2"/>
                  <path d="M4 4l6 6M10 4L4 10" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs uppercase tracking-widest font-bold text-red-400/70 font-sans">Traditional Path</span>
              </div>
            </div>
            <div className="px-5 py-3 bg-primary/10 rounded-tl-none rounded-tr-xl border border-primary/20 border-b-0">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7" cy="7" r="6" stroke="rgba(217,119,6,0.7)" strokeWidth="1.2"/>
                  <path d="M4 7l2 2 4-4" stroke="rgba(217,119,6,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs uppercase tracking-widest font-bold text-primary font-sans">Forged by Fire Path</span>
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-0 rounded-2xl overflow-hidden border border-white/8">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-0 border-b border-white/6 last:border-b-0"
                initial={{ opacity: 0, y: 15 }}
                animate={tableInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              >
                {/* Topic */}
                <div className="px-5 py-5 bg-background/60 flex items-center gap-3 border-b md:border-b-0 border-white/6">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-primary text-xs font-serif font-bold">{i + 1}</span>
                  </div>
                  <span className="text-sm font-bold font-sans text-foreground/80">{row.topic}</span>
                </div>

                {/* Traditional */}
                <div className="px-5 py-5 bg-red-950/10 border-l border-red-500/8 flex items-start gap-3 border-b md:border-b-0 border-white/6">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.4)" strokeWidth="1"/>
                    <path d="M5 5l6 6M11 5L5 11" stroke="rgba(239,68,68,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <p className="text-sm text-foreground/50 font-sans leading-relaxed">{row.traditional}</p>
                </div>

                {/* Forged by Fire */}
                <div className="px-5 py-5 bg-primary/5 border-l border-primary/10 flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" fill="rgba(217,119,6,0.15)" stroke="rgba(217,119,6,0.5)" strokeWidth="1"/>
                    <path d="M5 8l2 2 4-4" stroke="rgba(217,119,6,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-foreground/80 font-sans leading-relaxed">{row.forged}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5">
                      <span className="text-base font-serif font-bold text-primary">{row.stat}</span>
                      <span className="text-[9px] uppercase tracking-widest text-foreground/30 font-sans">{row.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
