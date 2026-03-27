import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const inclusions = [
  { item: 'Luxury Tiny Home (Shou Sugi Ban Cladding)', included: true, note: 'Fully built, finished & certified to Australian standards' },
  { item: 'Architectural Design & Engineering', included: true, note: 'DA-ready documentation, structural engineering, BASIX certificate' },
  { item: 'Premium Appliances (Miele)', included: true, note: 'Integrated cooktop, oven & dishwasher' },
  { item: 'Carrara Marble Finishes', included: true, note: 'Ensuite vanity, kitchen benchtop & splashback' },
  { item: 'Off-Grid Ready Systems', included: true, note: 'Solar-ready, battery-ready, rainwater collection plumbed' },
  { item: 'Engineered Hardwood Flooring', included: true, note: 'Throughout all living areas' },
  { item: 'Bespoke Joinery & Cabinetry', included: true, note: 'Full-height kitchen, bathroom & bedroom storage' },
  { item: 'Double-Glazed Windows & Doors', included: true, note: 'Thermally broken aluminium frames' },
  { item: 'Delivery & Crane Installation', included: true, note: 'Australia-wide, within 16 weeks of commission' },
  { item: 'Warranty & After-Care', included: true, note: '7-year structural warranty, 2-year workmanship' },
  { item: 'Site Preparation', included: false, note: 'Separate item — typical cost $8K–$15K (see below)' },
  { item: 'Council Fees & Inspections', included: false, note: 'Varies by council — we guide you through every step' },
  { item: 'Landscaping & External Finishes', included: false, note: 'Optional upgrade packages available' },
];

// SVG check icon
const CheckIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="rgba(217,119,6,0.15)" stroke="rgba(217,119,6,0.8)" strokeWidth="1.2"/>
    <path d="M6 10l2.5 2.5 5.5-5.5" stroke="rgba(217,119,6,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG minus icon
const MinusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
    <path d="M6.5 10h7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const TotalCostBreakdown: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const included = inclusions.filter(i => i.included);
  const excluded = inclusions.filter(i => !i.included);

  return (
    <section ref={ref} id="cost-breakdown" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
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
            <span className="text-primary font-serif italic tracking-wide text-sm">Complete Transparency</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            What's <span className="fire-text italic">Included</span> in Your Price
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            No hidden fees. No surprises. Every Forged by Fire home includes everything you need to move in and live immediately — from appliances to delivery.
          </p>
        </motion.div>

        {/* Pricing hero card */}
        <motion.div
          className="mb-12 p-8 md:p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-card/20 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-foreground/60 font-sans mb-2 text-sm uppercase tracking-widest">Starting from</p>
              <h3 className="text-5xl md:text-7xl font-serif font-bold text-primary">$185,000</h3>
              <p className="text-foreground/60 font-sans mt-2">Fully built, finished &amp; delivered</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Site prep callout */}
              <div className="bg-background/60 border border-amber-500/30 rounded-2xl px-6 py-5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="rgba(217,119,6,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold font-sans">Site Preparation</p>
                </div>
                <p className="text-2xl font-serif font-bold text-amber-400">$8K–$15K</p>
                <p className="text-xs text-foreground/40 font-sans mt-1">Separate item · varies by site</p>
              </div>
              {/* Total estimate */}
              <div className="bg-background/60 border border-primary/20 rounded-2xl px-6 py-5 backdrop-blur-sm">
                <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold font-sans mb-2">All-In Estimate</p>
                <p className="text-2xl font-serif font-bold text-foreground">$193K–$200K</p>
                <p className="text-xs text-foreground/40 font-sans mt-1">Typical total investment</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-column inclusions grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Included column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <CheckIcon />
              <h3 className="text-lg font-serif font-bold text-foreground">Included in Your Build Price</h3>
            </div>
            <div className="space-y-2">
              {included.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-primary/15 bg-gradient-to-r from-primary/5 to-transparent hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                >
                  <div className="shrink-0 mt-0.5">
                    <CheckIcon />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-foreground text-sm">{item.item}</p>
                    <p className="text-xs text-foreground/45 font-sans mt-0.5">{item.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not included column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <MinusIcon />
              <h3 className="text-lg font-serif font-bold text-foreground/70">Separate Items</h3>
            </div>
            <div className="space-y-2 mb-6">
              {excluded.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-background/40 hover:border-white/15 transition-colors"
                  initial={{ opacity: 0, x: 15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                >
                  <div className="shrink-0 mt-0.5">
                    <MinusIcon />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-foreground/60 text-sm">{item.item}</p>
                    <p className="text-xs text-foreground/35 font-sans mt-0.5">{item.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Site prep explainer */}
            <motion.div
              className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                  <circle cx="10" cy="10" r="9" stroke="rgba(245,158,11,0.6)" strokeWidth="1.2"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-sm font-bold text-amber-400 font-sans mb-1">About Site Preparation</p>
                  <p className="text-xs text-foreground/50 font-sans leading-relaxed">
                    Site prep covers land clearing, levelling, foundation work (concrete piers or slab), and utility connections. Typical cost is <strong className="text-amber-400">$8,000–$15,000</strong> depending on your site conditions. We provide a detailed site assessment and quote during your free consultation.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-8 p-6 rounded-xl bg-background/50 border border-primary/10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-foreground/60 font-sans text-sm">
            All prices are AUD and inclusive of GST. Finance options available — see our{' '}
            <button
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              onClick={() => document.getElementById('finance')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Finance Pathways
            </button>{' '}
            section below.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
