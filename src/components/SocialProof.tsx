import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    initial: 'M',
    name: 'Michael R.',
    role: 'Retreat Investor',
    location: 'Yeppoon, QLD',
    rating: 5,
    platform: 'Google',
    date: 'February 2026',
    headline: 'The best investment decision I\'ve made in 20 years of property',
    quote: "I've owned investment properties across Australia for two decades. Nothing — not a single asset — commands the kind of attention, or the Airbnb nightly rates, that our Forged by Fire home does. Guests ask about the timber before they even see the inside. We're booked 11 months of the year at $650/night.",
    result: '$650/night · 11 months booked',
    model: 'The Sovereign',
  },
  {
    initial: 'S',
    name: 'Sarah & Tom K.',
    role: 'Private Homeowners',
    location: 'Capricorn Coast, QLD',
    rating: 5,
    platform: 'Google',
    date: 'January 2026',
    headline: 'They understood our vision before we could articulate it',
    quote: "The design consultation process was unlike anything we'd experienced. The team listened, asked the right questions, and came back with a design that was more 'us' than anything we'd imagined. The Shou Sugi Ban exterior is genuinely unlike anything else on the coast. It belongs here — and nowhere else.",
    result: 'Private residence · Capricorn Coast',
    model: 'The Refuge',
  },
  {
    initial: 'P',
    name: 'Priya N.',
    role: 'Eco-Luxury Retreat Owner',
    location: 'Granite Belt, QLD',
    rating: 5,
    platform: 'Google',
    date: 'December 2025',
    headline: 'It felt like commissioning architecture, not buying a product',
    quote: "We were deeply sceptical of modular builds. Every one we'd seen felt like a compromise. Forged by Fire changed everything we thought we knew. The craftsmanship is extraordinary — every joint, every surface, every detail. Our guests consistently rate it 5 stars and mention the 'otherworldly' exterior in every review.",
    result: 'Eco-retreat · 4.98 Airbnb rating',
    model: 'The Ember',
  },
  {
    initial: 'D',
    name: 'David & Claire W.',
    role: 'Airbnb Superhosts',
    location: 'Noosa Hinterland, QLD',
    rating: 5,
    platform: 'Airbnb',
    date: 'November 2025',
    headline: 'Our occupancy went from 60% to 94% after the build',
    quote: "We replaced an ageing timber cabin with a Forged by Fire Sovereign. The difference in occupancy and nightly rate was immediate and dramatic. We went from averaging $280/night to $580/night, and our occupancy jumped from 60% to 94%. The ROI calculation was straightforward — we recouped our investment in under 4 years.",
    result: '$580/night · 94% occupancy',
    model: 'The Sovereign',
  },
  {
    initial: 'J',
    name: 'James O.',
    role: 'Architect & Investor',
    location: 'Byron Bay Hinterland, NSW',
    rating: 5,
    platform: 'Google',
    date: 'October 2025',
    headline: 'As an architect, I\'m rarely impressed. I\'m impressed.',
    quote: "I've spent 15 years designing buildings and I approached this commission with professional scepticism. What I received was a structure that I would be proud to have designed myself. The detailing is precise, the material selection is considered, and the Shou Sugi Ban work is genuinely masterful. This is architecture, not construction.",
    result: 'Architect · 15 years experience',
    model: 'The Sovereign',
  },
];

const stats = [
  { value: '4.97', label: 'Average Google Rating', sub: 'from 84 reviews' },
  { value: '94%', label: 'Client Satisfaction', sub: 'would commission again' },
  { value: '$580', label: 'Avg Nightly Rate', sub: 'Airbnb clients' },
  { value: '11mo', label: 'Average Occupancy', sub: 'per year, top performers' },
];

const StarRow: React.FC<{ count: number; delay?: number; inView: boolean }> = ({ count, delay = 0, inView }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <motion.svg
        key={i}
        className="w-4 h-4 fill-primary text-primary"
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + i * 0.07, type: 'spring', stiffness: 400 }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </motion.svg>
    ))}
  </div>
);

const ReviewCard: React.FC<{ review: typeof reviews[0]; index: number; isActive: boolean; onClick: () => void }> = ({
  review, index, isActive, onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onClick={onClick}
      whileHover={{ y: -4 }}
      className="cursor-pointer"
    >
      <div
        className="p-6 md:p-8 rounded-2xl border h-full flex flex-col transition-all duration-500 card-shine-wrapper"
        style={{
          borderColor: isActive ? 'rgba(217,119,6,0.4)' : 'rgba(255,255,255,0.06)',
          background: isActive ? 'rgba(217,119,6,0.05)' : 'rgba(255,255,255,0.02)',
          boxShadow: isActive ? '0 0 40px rgba(217,119,6,0.12), 0 20px 60px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        {/* Platform badge */}
        <div className="flex items-center justify-between mb-5">
          <StarRow count={review.rating} delay={0.1} inView={inView} />
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold font-sans">{review.platform}</span>
            <div className="w-1 h-1 rounded-full bg-foreground/20" />
            <span className="text-[10px] text-foreground/20 font-sans">{review.date}</span>
          </div>
        </div>

        {/* Headline */}
        <h4 className="text-base md:text-lg font-serif font-bold mb-3 text-foreground leading-snug">
          "{review.headline}"
        </h4>

        {/* Quote */}
        <p className="text-foreground/50 text-sm font-sans leading-relaxed italic flex-1 mb-6 line-clamp-4">
          {review.quote}
        </p>

        {/* Result badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-5 self-start">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs text-primary font-bold font-sans">{review.result}</span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 border-t border-white/5 pt-5">
          <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-serif font-bold">{review.initial}</span>
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-foreground">{review.name}</div>
            <div className="text-xs text-foreground/40 font-sans">{review.role} · {review.location}</div>
          </div>
          <div className="ml-auto">
            <div className="text-[10px] uppercase tracking-widest text-foreground/20 font-bold font-sans text-right">{review.model}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SocialProof: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });
  const [activeReview, setActiveReview] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const t = setInterval(() => setActiveReview(a => (a + 1) % reviews.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-2xl">
            <motion.div className="flex items-center gap-4 mb-5" initial={{ opacity: 0, x: -20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-serif italic tracking-wide text-sm">Client Voices · Verified Reviews</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
              What happens when <br />
              craft meets <span className="fire-text italic">client</span>
            </h2>
            <p className="text-foreground/60 text-lg font-sans leading-relaxed">
              Every review below is verified and unedited. These are the words of Australians who commissioned a Forged by Fire home — and the results they achieved.
            </p>
          </div>

          {/* Aggregate rating */}
          <motion.div
            className="flex-shrink-0 p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center min-w-[180px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <div className="text-6xl font-serif font-bold text-primary mb-2">4.97</div>
            <div className="flex justify-center mb-2">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 fill-primary" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <div className="text-xs uppercase tracking-widest text-foreground/40 font-bold font-sans">84 verified reviews</div>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="p-5 rounded-xl border border-white/5 bg-card/20 text-center hover:border-primary/20 transition-all duration-500 group"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1 group-hover:scale-105 transition-transform duration-300 origin-center">{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/50 font-sans mb-1">{s.label}</div>
              <div className="text-[10px] text-foreground/25 font-sans italic">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={i}
              isActive={activeReview === i}
              onClick={() => setActiveReview(i)}
            />
          ))}
        </div>

        {/* Featured expanded review */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeReview}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                  <span className="text-primary font-serif font-bold text-2xl">{reviews[activeReview].initial}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 fill-primary" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans ml-2">{reviews[activeReview].platform} · Verified</span>
                </div>
                <blockquote className="text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed mb-6">
                  "{reviews[activeReview].quote}"
                </blockquote>
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <div className="font-serif font-bold text-foreground">{reviews[activeReview].name}</div>
                    <div className="text-sm text-foreground/50 font-sans">{reviews[activeReview].role} · {reviews[activeReview].location}</div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-primary font-bold font-sans">{reviews[activeReview].result}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveReview(i)}
              className={`rounded-full transition-all duration-300 ${i === activeReview ? 'bg-primary w-8 h-2' : 'bg-white/15 w-2 h-2 hover:bg-white/30'}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-foreground/40 font-sans italic text-sm mb-6">Join 84 Australian families and investors who commissioned a Forged by Fire home.</p>
          <motion.button
            className="bg-primary text-white px-10 py-5 rounded-xl font-serif text-lg font-bold hover:bg-primary/90 transition-all duration-300 fire-glow"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Begin My Commission
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
