import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const inclusions = [
  { item: 'Luxury Tiny Home (Shou Sugi Ban)', included: true, note: 'Fully built & finished' },
  { item: 'Architectural Design & Permits', included: true, note: 'DA-ready documentation' },
  { item: 'Premium Appliances (Miele)', included: true, note: 'Integrated cooktop & oven' },
  { item: 'Carrara Marble Finishes', included: true, note: 'Ensuite & kitchen' },
  { item: 'Off-Grid Ready Systems', included: true, note: 'Solar, battery, rainwater' },
  { item: 'Delivery & Installation', included: true, note: 'Australia-wide' },
  { item: 'Site Preparation', included: false, note: 'Separate: $8K–$15K' },
  { item: 'Council Fees & Inspections', included: false, note: 'Varies by council' },
  { item: 'Landscaping & Finishes', included: false, note: 'Optional upgrades' },
];

export const TotalCostBreakdown: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6">
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
            No hidden fees. No surprises. Every Forged by Fire home includes everything you need to move in and live immediately.
          </p>
        </motion.div>

        <motion.div
          className="mb-16 p-8 md:p-12 rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-card/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-foreground/60 font-sans mb-2">Starting from</p>
              <h3 className="text-5xl md:text-6xl font-serif font-bold text-primary">$185,000</h3>
              <p className="text-foreground/60 font-sans mt-2">Fully built & delivered</p>
            </div>
            <div className="flex-1 text-center md:text-right">
              <p className="text-lg font-sans text-foreground/70 mb-4">Plus site preparation costs</p>
              <div className="inline-block bg-background/50 border border-primary/20 rounded-xl px-6 py-4">
                <p className="text-sm text-foreground/60 mb-1">Site Prep Typical Cost</p>
                <p className="text-2xl font-serif font-bold text-primary">$8K–$15K</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {inclusions.map((item, i) => (
            <motion.div
              key={i}
              className={`p-5 rounded-xl border transition-all ${
                item.included
                  ? 'bg-gradient-to-r from-primary/5 to-transparent border-primary/20 hover:border-primary/40'
                  : 'bg-background/50 border-foreground/10 hover:border-foreground/20'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
              whileHover={{ x: 8 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {item.included ? (
                    <motion.div
                      className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.05 + 0.1, type: 'spring' }}
                    >
                      <span className="text-primary text-sm font-bold">✓</span>
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center">
                      <span className="text-foreground/40 text-sm">−</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-serif font-bold ${item.included ? 'text-foreground' : 'text-foreground/60'}`}>
                    {item.item}
                  </p>
                  <p className="text-sm text-foreground/50 font-sans mt-1">{item.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 p-6 rounded-xl bg-background/50 border border-primary/10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-center text-foreground/70 font-sans">
            <span className="font-bold text-primary">Site preparation</span> includes land clearing, levelling, foundation work, and utility connections. Costs vary based on your location and existing site conditions. We'll provide a detailed quote during the consultation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
