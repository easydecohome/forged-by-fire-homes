import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const envStats = [
  {
    value: '85%',
    label: 'Lower Embodied Carbon',
    sub: 'vs. conventional construction',
    color: 'text-green-400',
    borderColor: 'border-green-500/30',
    bg: 'bg-green-500/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="rgba(74,222,128,0.7)" strokeWidth="1.5"/>
        <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" stroke="rgba(74,222,128,0.7)" strokeWidth="1.5"/>
        <path d="M12 8V5M12 19v-3M5 12H2M22 12h-3" stroke="rgba(74,222,128,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: '75yr+',
    label: 'Material Lifespan',
    sub: 'Shou Sugi Ban cladding',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5"/>
        <path d="M12 6v6l4 4" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: '60%',
    label: 'Less Heating & Cooling',
    sub: 'Passive solar design (NatHERS 7★)',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    bg: 'bg-blue-500/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="rgba(96,165,250,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" stroke="rgba(96,165,250,0.7)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    value: '0',
    label: 'Toxic Chemicals',
    sub: 'No preservatives — fire is the treatment',
    color: 'text-primary',
    borderColor: 'border-primary/30',
    bg: 'bg-primary/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    value: '22,500L',
    label: 'Rainwater Capacity',
    sub: 'UV-sterilised, potable quality',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 5 10 5 14a7 7 0 0014 0c0-4-7-12-7-12z" stroke="rgba(34,211,238,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    value: '6.6kW',
    label: 'Solar Array',
    sub: '10kWh battery storage included',
    color: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
    bg: 'bg-yellow-500/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L5 13h7l-1 7 8-11h-7l1-7z" stroke="rgba(250,204,21,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const comparisonRows = [
  {
    metric: 'Embodied Carbon',
    conventional: '~80 tonnes CO₂e (new build)',
    forged: '~12 tonnes CO₂e (85% reduction)',
    winner: 'forged',
  },
  {
    metric: 'Cladding Lifespan',
    conventional: '15–25 years (fibre cement / weatherboard)',
    forged: '75–100+ years (Shou Sugi Ban)',
    winner: 'forged',
  },
  {
    metric: 'Chemical Preservatives',
    conventional: 'CCA-treated timber, synthetic coatings',
    forged: 'Zero — fire is the only preservative',
    winner: 'forged',
  },
  {
    metric: 'Energy Performance',
    conventional: 'NatHERS 5–6 star (minimum code)',
    forged: 'NatHERS 7-star equivalent, passive design',
    winner: 'forged',
  },
  {
    metric: 'Water Independence',
    conventional: 'Full mains connection required',
    forged: '22,500L rainwater + UV filtration (potable)',
    winner: 'forged',
  },
  {
    metric: 'Energy Independence',
    conventional: 'Full grid dependency',
    forged: '6.6kW solar + 10kWh battery (off-grid capable)',
    winner: 'forged',
  },
];

// Simple bar chart for carbon comparison
const CarbonBar: React.FC<{ label: string; value: number; max: number; color: string; delay: number; inView: boolean }> = ({ label, value, max, color, delay, inView }) => {
  const pct = (value / max) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-xs text-foreground/50 font-sans">{label}</span>
        <span className="text-sm font-serif font-bold" style={{ color }}>{value} t CO₂e</span>
      </div>
      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, opacity: 0.7 }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const EnvironmentalSection: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const tableInView = useInView(tableRef, { once: true, margin: '-80px' });
  const chartInView = useInView(chartRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(74,222,128,0.04)_0,transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/15 to-transparent" />

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
            <div className="h-[1px] w-12 bg-green-500/60" />
            <span className="text-green-400 font-serif italic tracking-wide text-sm">Environmental Performance</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Luxury without <span className="italic" style={{ color: 'rgba(74,222,128,0.9)' }}>compromise</span><br />
            to the land.
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            A Forged by Fire home is not just beautiful — it is one of the most environmentally responsible structures you can build in Australia. Every material choice, every system, every detail is designed to reduce impact and extend lifespan.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {envStats.map((stat, i) => (
            <motion.div
              key={i}
              className={`p-5 rounded-2xl border ${stat.borderColor} ${stat.bg} text-center hover:scale-105 transition-transform duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className={`text-xl md:text-2xl font-serif font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs font-bold text-foreground/70 font-sans mb-1">{stat.label}</div>
              <div className="text-[10px] text-foreground/30 font-sans leading-tight">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column: chart + comparison table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Carbon comparison chart */}
          <motion.div
            ref={chartRef}
            className="p-8 rounded-3xl border border-white/8 bg-card/20"
            initial={{ opacity: 0, x: -20 }}
            animate={chartInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans mb-2">Carbon Comparison</div>
              <h3 className="text-xl font-serif font-bold text-foreground">Embodied Carbon per Build</h3>
              <p className="text-sm text-foreground/40 font-sans mt-1">Estimated CO₂ equivalent, cradle to gate</p>
            </div>
            <div className="space-y-5">
              <CarbonBar label="Conventional new build (200 sqm)" value={80} max={100} color="rgba(239,68,68,0.8)" delay={0.2} inView={chartInView} />
              <CarbonBar label="Typical modular home (60 sqm)" value={35} max={100} color="rgba(251,191,36,0.8)" delay={0.4} inView={chartInView} />
              <CarbonBar label="Forged by Fire home (40 sqm)" value={12} max={100} color="rgba(74,222,128,0.8)" delay={0.6} inView={chartInView} />
            </div>
            <div className="mt-6 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
              <p className="text-xs text-foreground/50 font-sans leading-relaxed">
                Forged by Fire homes produce approximately <strong className="text-green-400">85% less embodied carbon</strong> than a conventional new build of comparable quality, due to smaller footprint, natural materials, and factory precision construction.
              </p>
            </div>
          </motion.div>

          {/* Environmental comparison table */}
          <motion.div
            ref={tableRef}
            initial={{ opacity: 0, x: 20 }}
            animate={tableInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans mb-2">Side by Side</div>
              <h3 className="text-xl font-serif font-bold text-foreground">Conventional vs. Forged by Fire</h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/8">
              {comparisonRows.map((row, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-[auto_1fr_1fr] gap-0 border-b border-white/6 last:border-b-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={tableInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                >
                  <div className="px-3 py-4 bg-background/60 flex items-center border-r border-white/6 w-28 md:w-36">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 font-sans leading-tight">{row.metric}</span>
                  </div>
                  <div className="px-3 py-4 bg-red-950/10 border-r border-red-500/8 flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                      <circle cx="6" cy="6" r="5" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.4)" strokeWidth="1"/>
                      <path d="M4 4l4 4M8 4L4 8" stroke="rgba(239,68,68,0.7)" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[11px] text-foreground/40 font-sans leading-relaxed">{row.conventional}</span>
                  </div>
                  <div className="px-3 py-4 bg-green-950/10 flex items-start gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                      <circle cx="6" cy="6" r="5" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.4)" strokeWidth="1"/>
                      <path d="M3.5 6l2 2 3.5-3.5" stroke="rgba(74,222,128,0.8)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-[11px] text-green-300/70 font-sans leading-relaxed font-medium">{row.forged}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-foreground/50 font-sans mb-6">Want the full sustainability specification?</p>
          <motion.a
            href="/features"
            className="inline-flex items-center gap-3 px-10 py-4 border border-green-500/30 text-green-400 font-serif font-bold text-base rounded-xl hover:bg-green-500/10 transition-all duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            View Full Environmental Specification →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
