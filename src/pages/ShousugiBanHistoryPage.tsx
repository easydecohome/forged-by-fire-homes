import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const timeline = [
  {
    era: '300 BCE',
    title: 'Ancient Origins',
    kanji: '起源',
    description: 'Japanese cedar craftsmen in the Edo period discovered that controlled charring of sugi (Japanese cedar) planks created a surface impervious to moisture, insects, and decay. The technique spread across coastal fishing villages where timber longevity was survival.',
    detail: 'The original process involved binding three planks into a triangular chimney shape, lighting a fire inside, and rotating the assembly to achieve even charring. This ancient ingenuity remains the gold standard today.',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    era: '1600s',
    title: 'Refinement & Mastery',
    kanji: '精練',
    description: 'During the Edo period, Shou Sugi Ban became a mark of architectural distinction. Master craftsmen developed three distinct char depths — each producing a different texture, finish, and level of protection.',
    detail: 'Lightly charred "Shou" produces a silver-grey brushed finish. Medium "Sugi" creates deep black with visible grain. Heavy "Ban" yields a dramatic alligator-scale texture — the most striking and most protective of all.',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    era: '1800s',
    title: 'Coastal Architecture',
    kanji: '海岸建築',
    description: 'Shou Sugi Ban became the defining material of Japanese coastal architecture. Fishing villages along the Seto Inland Sea used the technique to protect their homes against the salt air, typhoon rains, and the constant threat of fire spreading through densely packed timber settlements.',
    detail: 'The material\'s fire resistance was a critical factor in its adoption in urban areas. A charred exterior would not ignite from flying embers — a crucial property in an era when fire was the greatest threat to wooden cities.',
    image: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    era: '1980s',
    title: 'Western Discovery',
    kanji: '発見',
    description: 'European and American architects began importing Shou Sugi Ban panels, recognising the material\'s extraordinary combination of beauty and performance. The technique was reinterpreted for contemporary architecture.',
    detail: 'The shift from traditional sugi cedar to other species — including Australian hardwoods — opened new aesthetic possibilities while maintaining the core preservation chemistry of the charring process.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    era: '2010s',
    title: 'Global Renaissance',
    kanji: '再生',
    description: 'The global sustainable architecture movement rediscovered Shou Sugi Ban as a material that combined extraordinary beauty with genuine environmental credentials — no synthetic preservatives, no toxic treatments, and a lifespan that dwarfs conventional cladding.',
    detail: 'Architects including Kengo Kuma, Shigeru Ban, and a generation of Australian designers began specifying Shou Sugi Ban for landmark projects — from private residences to public buildings, from coastal retreats to urban apartments.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    era: 'Today',
    title: 'Australian Mastery',
    kanji: '現代',
    description: 'At Forged by Fire, we have spent years perfecting the application of Shou Sugi Ban to Australian hardwoods and climates. Our process is authentic, unhurried, and executed by craftsmen who understand the material at a molecular level.',
    detail: 'We char each panel by hand, brush the surface to remove loose carbon, and finish with a penetrating natural oil. The result is a surface that will outlast the structure it protects — and grow more beautiful with every decade.',
    image: 'https://images.unsplash.com/photo-1761470484741-badac5364858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const TimelineItem: React.FC<{ item: typeof timeline[0]; index: number; isLast: boolean }> = ({ item, index, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Image */}
      <div className="md:w-1/2">
        <div className="overflow-hidden rounded-2xl aspect-[4/3] border border-white/8">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, filter: 'grayscale(80%) brightness(0.6)' }}
            animate={inView ? { scale: 1, filter: 'grayscale(40%) brightness(0.75)' } : {}}
            transition={{ duration: 1.2 }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center bg-background shrink-0">
            <span className="text-primary font-serif font-bold text-xs">{item.era}</span>
          </div>
          <span className="text-3xl font-serif text-foreground/10">{item.kanji}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">{item.title}</h3>
        <p className="text-foreground/60 text-base font-sans leading-relaxed mb-4">{item.description}</p>

        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="text-xs uppercase tracking-[0.2em] text-primary/60 hover:text-primary font-bold font-sans flex items-center gap-2 transition-colors mb-0 self-start"
          whileHover={{ x: 3 }}
        >
          {expanded ? 'Less detail' : "Craftsman's note"}
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

      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 md:left-1/2 bottom-0 w-[1px] h-12 bg-gradient-to-b from-primary/20 to-transparent translate-y-full hidden md:block" />
      )}
    </motion.div>
  );
};

export const ShousugiBanHistoryPage: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
        <motion.div className="h-full bg-primary" style={{ width: progressWidth }} />
      </div>

      {/* Back button */}
      <div className="fixed top-6 left-6 z-40">
        <motion.a
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/80 border border-white/10 text-foreground/60 hover:text-foreground hover:border-primary/30 transition-all backdrop-blur-sm text-sm font-sans"
          whileHover={{ x: -3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </motion.a>
      </div>

      <section ref={sectionRef} className="py-32 md:py-48">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            ref={headerRef}
            className="max-w-4xl mx-auto mb-24 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 }}
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-serif italic tracking-wide text-sm">焼き杉 · 300 Years of Mastery</span>
              <div className="h-[1px] w-12 bg-primary" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[0.95] mb-8">
              The Complete History<br />
              of <span className="fire-text italic">Shou Sugi Ban</span>
            </h1>

            <p className="text-foreground/60 text-xl font-sans leading-relaxed max-w-2xl mx-auto">
              From Edo period fishing villages to contemporary Australian architecture — the 300-year story of the world's most beautiful and durable cladding material.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
            {timeline.map((item, i) => (
              <TimelineItem key={item.era} item={item} index={i} isLast={i === timeline.length - 1} />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            className="max-w-3xl mx-auto mt-32 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-10 md:p-16 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card/20">
              <div className="text-xs uppercase tracking-widest text-primary/60 font-bold font-sans mb-4">Experience It Yourself</div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Commission a home<br />
                <span className="fire-text italic">forged by fire.</span>
              </h2>
              <p className="text-foreground/60 font-sans mb-10 max-w-xl mx-auto">
                Every Forged by Fire home carries this 300-year legacy in its cladding. Hand-charred by our craftsmen, finished to your specification, and delivered to your land within 16 weeks.
              </p>
              <motion.a
                href="/"
                className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Our Homes →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
