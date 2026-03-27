import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// The 4 benefit cards — kept as per spec
const charDepths = [
  {
    name: 'Lightly Charred',
    japanese: '軽い炭',
    description: 'A subtle silver-grey surface with visible timber grain. Elegant restraint for contemporary interiors and coastal settings.',
    longevity: '40–60 years',
    finish: 'Brushed silver-grey',
    best: 'Coastal & contemporary',
    color: 'from-zinc-800 to-zinc-700',
  },
  {
    name: 'Medium Char',
    japanese: '中程度の炭',
    description: 'Deep charcoal black with rich grain texture. The most versatile finish — dramatic yet refined, suited to any landscape.',
    longevity: '60–80 years',
    finish: 'Deep charcoal black',
    best: 'Forest & rural retreats',
    color: 'from-zinc-900 to-zinc-800',
    featured: true,
  },
  {
    name: 'Heavy Char',
    japanese: '重い炭',
    description: 'The iconic alligator-scale texture. Maximum protection, maximum drama. A surface that commands attention and weathers magnificently.',
    longevity: '75–100+ years',
    finish: 'Alligator scale texture',
    best: 'Architectural statements',
    color: 'from-black to-zinc-900',
  },
];

// 4 key benefit cards
const benefits = [
  {
    title: 'Fire-Resistant',
    description: 'The carbonised surface creates a natural fire barrier — the material that looks like it should burn is actually one of the most fire-resistant claddings available.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3C14 3 8 10 8 16a6 6 0 0012 0c0-6-6-13-6-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 19c0-2 1.5-4 3-4s3 2 3 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    stat: 'BAL-29',
    statLabel: 'Bushfire rated',
  },
  {
    title: 'Weather-Proof',
    description: 'The hydrophobic carbon layer actively repels water. No swelling, no warping, no rot — even in Queensland\'s most extreme wet seasons.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4C14 4 7 12 7 17a7 7 0 0014 0c0-5-7-13-7-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 20c1.5 1.5 6.5 1.5 8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    stat: '0%',
    statLabel: 'Water absorption',
  },
  {
    title: 'Pest-Resistant',
    description: 'The oxygen-depleted carbonised layer is inhospitable to termites, borers, and the fungi that cause timber decay. No chemicals required — ever.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 9l10 10M19 9L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    stat: '0',
    statLabel: 'Chemical preservatives',
  },
  {
    title: 'Ages Beautifully',
    description: 'Where standard cladding fades and fails, Shou Sugi Ban matures. Silver highlights emerge over decades. Time does not diminish it — it refines it.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    stat: '75yr+',
    statLabel: 'Proven lifespan',
  },
];

const CharDepthCard: React.FC<{ depth: typeof charDepths[0]; index: number; inView: boolean }> = ({ depth, index, inView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-2xl border flex flex-col"
      style={{
        borderColor: hovered ? 'rgba(217,119,6,0.3)' : depth.featured ? 'rgba(217,119,6,0.15)' : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? '0 20px 50px rgba(217,119,6,0.2)' : depth.featured ? '0 8px 30px rgba(217,119,6,0.08)' : 'none',
        transition: 'all 0.5s ease',
      }}
    >
      {/* Char texture preview */}
      <div className={`h-32 bg-gradient-to-br ${depth.color} relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(
              ${depth.name === 'Heavy Char' ? '45deg' : '90deg'},
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent ${depth.name === 'Heavy Char' ? '8px' : '4px'}
            )`,
          }}
          animate={{ opacity: hovered ? 0.4 : 0.2 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute bottom-4 left-4">
          <span className="text-white/30 font-serif text-2xl">{depth.japanese}</span>
        </div>
        {depth.featured && (
          <div className="absolute top-3 right-3 bg-primary text-background text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
            Most Selected
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="text-lg font-serif font-bold mb-2 text-foreground">{depth.name}</h4>
        <p className="text-foreground/50 text-sm font-sans leading-relaxed mb-6 flex-1">{depth.description}</p>

        <div className="space-y-3 border-t border-white/5 pt-4">
          {[
            { label: 'Longevity', value: depth.longevity },
            { label: 'Finish', value: depth.finish },
            { label: 'Best For', value: depth.best },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center text-xs font-sans">
              <span className="text-foreground/30 uppercase tracking-widest font-bold">{item.label}</span>
              <span className="text-foreground/70 italic">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ShousugiBanStory: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-80px' });
  const charInView = useInView(charRef, { once: true, margin: '-80px' });

  return (
    <section id="shousugiban" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.04)_0,transparent_70%)]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="max-w-4xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">焼き杉 · Shou Sugi Ban</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[0.95] mb-8">
            Three hundred years of{' '}
            <span className="fire-text italic">fire</span>
            <br />
            <span className="text-foreground/40">perfecting timber.</span>
          </h2>

          <p className="text-foreground/60 text-xl md:text-2xl font-sans leading-relaxed max-w-2xl mb-8">
            Shou Sugi Ban is not a trend. It is an ancient Japanese technology proven across three centuries of coastal architecture — and now the defining material of Australia's most distinguished tiny homes.
          </p>

          {/* Link to full history page */}
          <motion.a
            href="/shou-sugi-ban-history"
            className="inline-flex items-center gap-3 text-primary font-serif font-bold text-base border-b border-primary/30 pb-0.5 hover:border-primary transition-colors"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            Read the full 300-year history →
          </motion.a>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary to-primary/10" />
          <blockquote className="pl-8 md:pl-12 text-2xl md:text-4xl font-serif italic text-foreground/80 leading-snug max-w-3xl">
            "The Japanese understood something that took the rest of the world centuries to learn: fire does not destroy wood. Used with precision, it transforms it into something that will outlast stone."
          </blockquote>
          <cite className="block pl-8 md:pl-12 mt-6 text-xs uppercase tracking-[0.25em] text-primary/60 font-bold font-sans not-italic">
            Forged by Fire — Craftsman's Journal
          </cite>
        </motion.div>

        {/* 4 Benefit Cards */}
        <motion.div
          ref={benefitsRef}
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={benefitsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-primary" />
            <h3 className="text-2xl md:text-3xl font-serif font-bold">Why Shou Sugi Ban Outperforms Everything</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-card/20 hover:border-primary/30 hover:bg-primary/8 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-primary mb-4">{benefit.icon}</div>
                <h4 className="text-lg font-serif font-bold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-sm text-foreground/50 font-sans leading-relaxed mb-4">{benefit.description}</p>
                <div className="border-t border-white/8 pt-3 flex items-baseline gap-2">
                  <span className="text-xl font-serif font-bold text-primary">{benefit.stat}</span>
                  <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-sans">{benefit.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Char Depths */}
        <div ref={charRef}>
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={charInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-primary font-serif italic mb-2 block text-sm tracking-widest uppercase">The Three Depths</span>
              <h3 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
                Choose your <span className="fire-text italic">char</span>
              </h3>
            </div>
            <p className="text-foreground/50 text-sm font-sans max-w-sm leading-relaxed italic">
              Every Forged by Fire home is finished to your specification. Our craftsmen will guide you to the depth that best suits your landscape, climate, and vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {charDepths.map((depth, i) => (
              <CharDepthCard key={depth.name} depth={depth} index={i} inView={charInView} />
            ))}
          </div>
        </div>

        {/* Science stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={charInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {[
            { stat: '75–100+', unit: 'years', label: 'Service life without maintenance' },
            { stat: '3–5×', unit: 'longer', label: 'Than treated pine cladding' },
            { stat: '0', unit: 'chemicals', label: 'Required for preservation' },
            { stat: '300', unit: 'years', label: 'Of proven performance' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="p-6 rounded-2xl border border-white/5 bg-card/30 hover:border-primary/20 transition-all duration-500 group text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={charInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-3xl font-serif font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300 origin-center">
                {item.stat}
              </div>
              <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-2">{item.unit}</div>
              <div className="text-xs text-foreground/50 font-sans italic leading-relaxed">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to full history page */}
        <motion.div
          className="mt-16 p-8 md:p-12 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 to-card/20 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={charInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Curious about the full history?</h3>
            <p className="text-foreground/60 font-sans">Explore the complete 300-year story of Shou Sugi Ban — from Edo period fishing villages to contemporary Australian architecture.</p>
          </div>
          <motion.a
            href="/shou-sugi-ban-history"
            className="shrink-0 px-10 py-5 border border-primary/40 text-primary font-serif font-bold text-lg rounded-xl hover:bg-primary/10 transition-all duration-300 whitespace-nowrap flex items-center gap-3"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Read the Full History
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
