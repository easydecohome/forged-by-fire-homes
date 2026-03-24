import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const trustItems = [
  { icon: '🏆', label: 'Master Builders QLD', sub: 'Registered Member' },
  { icon: '⚡', label: 'Clean Energy Council', sub: 'Accredited Installer' },
  { icon: '🌿', label: 'Net-Zero Certified', sub: 'Carbon Neutral Build' },
  { icon: '🔒', label: '10-Year Warranty', sub: 'Structure & Cladding' },
  { icon: '🚚', label: 'Australia-Wide Delivery', sub: 'QLD · NSW · VIC · SA · WA' },
  { icon: '📐', label: 'Council Approval', sub: 'DA Support Included' },
];

const reviews = [
  { name: 'Sarah K.', location: 'Noosa Hinterland', rating: 5, text: 'Our Sovereign earns $2,600/wk on Airbnb. Best investment we\'ve ever made.' },
  { name: 'Marcus T.', location: 'Byron Bay Hinterland', rating: 5, text: 'Delivered in 14 weeks. The craftsmanship is extraordinary — guests are blown away.' },
  { name: 'Priya & Dev', location: 'Yarra Valley, VIC', rating: 5, text: 'We\'ve never felt more at home. The Shou Sugi Ban exterior is a work of art.' },
];

export const TrustStrip: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-16 bg-background relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Trust badges */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-4 rounded-xl border border-white/6 bg-card/15 hover:border-primary/25 hover:bg-primary/4 transition-all duration-300 group"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <div className="text-xs font-bold text-foreground/70 font-sans mb-0.5">{item.label}</div>
              <div className="text-[10px] text-foreground/35 font-sans">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Review strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className="p-5 rounded-xl border border-white/8 bg-card/20 hover:border-primary/25 transition-all duration-300 card-shine-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className="text-primary text-sm">★</span>
                ))}
              </div>
              <p className="text-foreground/70 font-sans text-sm leading-relaxed italic mb-4">"{review.text}"</p>
              <div>
                <div className="text-xs font-bold text-foreground/80 font-sans">{review.name}</div>
                <div className="text-[10px] text-foreground/35 font-sans">{review.location}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google rating bar */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 p-6 rounded-2xl border border-white/6 bg-card/15"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">G</div>
            <div>
              <div className="text-sm font-bold text-foreground font-sans">Google Reviews</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-primary text-sm">★</span>
                ))}
                <span className="text-sm font-bold text-primary ml-1">4.97</span>
                <span className="text-xs text-foreground/40 font-sans ml-1">(60+ reviews)</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="text-center md:text-left">
            <div className="text-sm font-bold text-foreground font-sans">84+ Homes Delivered</div>
            <div className="text-xs text-foreground/40 font-sans">Across QLD, NSW, VIC, SA & WA</div>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="text-center md:text-left">
            <div className="text-sm font-bold text-foreground font-sans">24hr Response Guarantee</div>
            <div className="text-xs text-foreground/40 font-sans">No obligation. Based in Australia.</div>
          </div>
          <motion.button
            className="shrink-0 px-6 py-3 bg-primary text-white font-serif font-bold text-sm rounded-xl fire-glow"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Free Quote →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
