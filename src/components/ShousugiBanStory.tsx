import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const timeline = [
  {
    era: '300 BCE',
    title: 'Ancient Origins',
    kanji: '起源',
    description: 'Japanese cedar craftsmen in the Edo period discovered that controlled charring of sugi (Japanese cedar) planks created a surface impervious to moisture, insects, and decay. The technique spread across coastal fishing villages where timber longevity was survival.',
    detail: 'The original process involved binding three planks into a triangular chimney shape, lighting a fire inside, and rotating the assembly to achieve even charring. This ancient ingenuity remains the gold standard today.',
  },
  {
    era: '1600s',
    title: 'Refinement & Mastery',
    kanji: '精練',
    description: 'During the Edo period, Shou Sugi Ban became a mark of architectural distinction. Master craftsmen developed three distinct char depths — each producing a different texture, finish, and level of protection.',
    detail: 'Lightly charred "Shou" produces a silver-grey brushed finish. Medium "Sugi" creates deep black with visible grain. Heavy "Ban" yields a dramatic alligator-scale texture — the most striking and most protective of all.',
  },
  {
    era: '1980s',
    title: 'Western Discovery',
    kanji: '発見',
    description: 'European and American architects began importing Shou Sugi Ban panels, recognising the material\'s extraordinary combination of beauty and performance. The technique was reinterpreted for contemporary architecture.',
    detail: 'The shift from traditional sugi cedar to other species — including Australian hardwoods — opened new aesthetic possibilities while maintaining the core preservation chemistry of the charring process.',
  },
  {
    era: 'Today',
    title: 'Australian Mastery',
    kanji: '現代',
    description: 'At Forged by Fire, we have spent years perfecting the application of Shou Sugi Ban to Australian hardwoods and climates. Our process is authentic, unhurried, and executed by craftsmen who understand the material at a molecular level.',
    detail: 'We char each panel by hand, brush the surface to remove loose carbon, and finish with a penetrating natural oil. The result is a surface that will outlast the structure it protects — and grow more beautiful with every decade.',
  },
];

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

const TimelineItem: React.FC<{ item: typeof timeline[0]; index: number }> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-8 md:gap-16 group"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      {/* Left: Era marker */}
      <div className="flex flex-col items-center flex-shrink-0 w-24 md:w-32">
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center bg-background relative z-10 group-hover:border-primary transition-colors duration-500"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.7 }}
          />
          <span className="text-primary font-serif font-bold text-xs">{item.era}</span>
        </motion.div>
        <motion.div
          className="text-2xl md:text-3xl font-serif text-foreground/10 mt-3 group-hover:text-primary/20 transition-colors duration-500"
        >
          {item.kanji}
        </motion.div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 pb-16">
        <motion.h3
          className="text-xl md:text-2xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300"
          animate={{ color: inView ? undefined : 'rgba(255,255,255,0.3)' }}
        >
          {item.title}
        </motion.h3>
        <p className="text-foreground/60 text-sm md:text-base font-sans leading-relaxed mb-4">
          {item.description}
        </p>

        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="text-xs uppercase tracking-[0.2em] text-primary/60 hover:text-primary font-bold font-sans flex items-center gap-2 transition-colors"
          whileHover={{ x: 3 }}
        >
          {expanded ? 'Less detail' : 'Craftsman\'s note'}
          <motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
        </motion.button>

        <motion.div
          className="overflow-hidden"
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mt-4 pl-4 border-l border-primary/30 text-foreground/50 text-sm font-sans italic leading-relaxed">
            {item.detail}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CharDepthCard: React.FC<{ depth: typeof charDepths[0]; index: number }> = ({ depth, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.7], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="shousugiban" className="py-24 md:py-40 bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.04)_0,transparent_70%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="max-w-4xl mb-24"
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
            <span className="text-primary font-serif italic tracking-wide text-sm">焼き杉 · The Complete Story</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[0.95] mb-8">
            Three hundred years of{' '}
            <span className="fire-text italic">fire</span>
            <br />
            <span className="text-foreground/40">perfecting timber.</span>
          </h2>

          <p className="text-foreground/60 text-xl md:text-2xl font-sans leading-relaxed max-w-2xl">
            Shou Sugi Ban is not a trend. It is an ancient technology that has been proven across three centuries of Japanese coastal architecture — and is now the defining material of Australia's most distinguished homes.
          </p>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          className="mb-24 relative"
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

        {/* Timeline */}
        <div className="mb-32">
          <motion.h3
            className="text-2xl md:text-3xl font-serif font-bold mb-16 text-foreground/70"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            A history of mastery
          </motion.h3>

          <div className="relative">
            {/* Animated vertical line */}
            <div className="absolute left-[47px] md:left-[63px] top-6 bottom-6 w-[1px] bg-white/5">
              <motion.div
                className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/10"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-0">
              {timeline.map((item, i) => (
                <TimelineItem key={item.era} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Char Depths */}
        <div>
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
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
              <CharDepthCard key={depth.name} depth={depth} index={i} />
            ))}
          </div>
        </div>

        {/* Science section */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="text-primary font-serif italic mb-4 block text-sm tracking-widest uppercase">The Science</span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
              Why fire is the world's oldest preservative
            </h3>
            <div className="space-y-5 text-foreground/60 font-sans text-base leading-relaxed">
              <p>
                When timber is charred to a depth of 2–5mm, the surface undergoes a fundamental chemical transformation. The carbon layer that forms is hydrophobic — it actively repels water rather than absorbing it.
              </p>
              <p>
                This carbonised layer also creates an oxygen-depleted environment that is inhospitable to insects, fungi, and the bacteria that cause rot. No pesticides. No synthetic preservatives. Just chemistry.
              </p>
              <p>
                The result is a material with a service life of 75–100+ years — three to five times longer than treated pine — that requires zero chemical maintenance and becomes more visually distinguished with age.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { stat: '75–100+', unit: 'years', label: 'Service life without maintenance' },
              { stat: '3–5×', unit: 'longer', label: 'Than treated pine cladding' },
              { stat: '0', unit: 'chemicals', label: 'Required for preservation' },
              { stat: '300', unit: 'years', label: 'Of proven performance' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="p-6 rounded-2xl border border-white/5 bg-card/30 hover:border-primary/20 transition-all duration-500 group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-3xl font-serif font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                  {item.stat}
                </div>
                <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-2">{item.unit}</div>
                <div className="text-xs text-foreground/50 font-sans italic leading-relaxed">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
