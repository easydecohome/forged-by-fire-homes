import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const philosophies = [
  {
    title: 'Born of Fire',
    description: 'Shou Sugi Ban — 焼き杉 — is a 300-year-old Japanese technique of slowly charring timber with controlled flame. The surface blackens, crystallises, and transforms into something entirely new: a skin of carbonised beauty.',
  },
  {
    title: 'Resilience as Aesthetic',
    description: 'The charring process creates a natural barrier against moisture, insects, UV degradation, and fire. In Australia\'s harsh landscapes, this is not just beautiful — it is engineered longevity without chemicals.',
  },
  {
    title: 'Ages Backwards',
    description: 'Where standard cladding fades and fails, Shou Sugi Ban matures. Silver highlights emerge over decades. The grain deepens. Time does not diminish it — it refines it. A home that becomes more distinguished with each passing year.',
  },
  {
    title: 'Sustainable by Nature',
    description: 'No toxic preservatives, no synthetic coatings. The preservation is the fire itself — a closed-loop process that extends the life of natural timber by 75 years or more. Luxury without compromise to the land.',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1761470484741-badac5364858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1745894118353-88e64617e064?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1770625467606-d2cc74e3b583?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1723810742875-4e0c063f8756?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
];

const GalleryImage: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer border border-white/5"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderColor: hovered ? 'rgba(217,119,6,0.25)' : 'rgba(255,255,255,0.05)',
        boxShadow: hovered ? '0 20px 50px rgba(217,119,6,0.2)' : 'none',
        transition: 'border-color 0.5s, box-shadow 0.5s',
      }}
    >
      <motion.img
        src={src}
        alt={`Interior finish ${index + 1}`}
        className="w-full h-full object-cover"
        animate={{
          scale: hovered ? 1.08 : 1,
          filter: hovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(80%) brightness(0.75)',
        }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </motion.div>
  );
};

export const Craft: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={sectionRef} id="thematerial" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(217,119,6,0.04)_0,transparent_60%)] pointer-events-none"
        style={{ y: bgY }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
          {/* Left */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -40 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.span
              className="text-primary font-serif italic mb-4 block tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              焼き杉 · The Material Story
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              The art of preserving <br />
              wood through <span className="fire-text italic">fire</span>
            </h2>
            <div className="space-y-6 text-foreground/60 text-lg md:text-xl font-sans max-w-xl leading-relaxed">
              <p>
                In feudal Japan, craftsmen discovered that flame — the very thing timber fears most — is also its greatest protector. By charring the outer layer of cedar planks, they created a surface so dense and mineralised it repelled weather, pests, and decay for generations.
              </p>
              <p>
                At Forged by Fire, we apply this ancient wisdom to every facade we build — not as a stylistic nod, but as a genuine commitment to materials that mean something. The result is a home whose exterior tells a story of transformation; where destruction and beauty are revealed as the same act.
              </p>
            </div>

            <motion.div
              ref={quoteRef}
              className="mt-12 p-8 border-l-2 border-primary bg-black/20 backdrop-blur-sm rounded-r-2xl max-w-xl group transition-all duration-500 hover:bg-black/30"
              initial={{ opacity: 0, x: -20 }}
              animate={quoteInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ borderLeftColor: 'rgba(217,119,6,0.8)' }}
            >
              <blockquote className="text-xl md:text-2xl font-serif italic text-foreground leading-snug group-hover:text-primary transition-colors duration-500">
                "Fire does not destroy this timber. It preserves it — and in doing so, makes it more beautiful than it was before."
              </blockquote>
              <cite className="block mt-4 text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 font-sans not-italic group-hover:text-foreground/50 transition-colors">
                The Forged by Fire Philosophy
              </cite>
            </motion.div>
          </motion.div>

          {/* Right — philosophy grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:pt-24">
            {philosophies.map((item, idx) => {
              const itemRef = useRef<HTMLDivElement>(null);
              const itemInView = useInView(itemRef, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={item.title}
                  ref={itemRef}
                  initial={{ opacity: 0, y: 30 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="h-[2px] bg-primary"
                      initial={{ width: 0 }}
                      animate={itemInView ? { width: 24 } : { width: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                    />
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed italic tracking-wide group-hover:text-foreground/70 transition-colors duration-300">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <span className="text-primary font-serif italic mb-2 block text-sm tracking-widest uppercase">Visual Proof</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Interior Finishes — Actual Builds</h2>
            </div>
            <div className="h-px flex-1 bg-white/10 mx-12 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <GalleryImage key={idx} src={img} index={idx} />
            ))}
          </div>
        </div>

        {/* CTA to Features page */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card/30 to-transparent p-10 md:p-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary/60 font-bold font-sans mb-3">Complete Specification</div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                Explore every feature,<br />
                <span className="fire-text italic">material, and system</span>
              </h3>
              <p className="text-foreground/55 font-sans text-base leading-relaxed">
                From the hand-charred Shou Sugi Ban cladding to the off-grid solar system, the engineered footing to the stargazing skylight — our complete feature specification covers every detail of a Forged by Fire home.
              </p>
            </div>
            <div className="flex flex-col gap-4 flex-shrink-0">
              <motion.a
                href="/features"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-5 rounded-xl font-serif text-lg font-bold hover:bg-primary/90 fire-glow transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.03, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                View Full Specification
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
              <p className="text-[10px] text-foreground/25 font-sans italic text-center">
                Exterior · Interior · Off-grid · Construction · Investment
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
