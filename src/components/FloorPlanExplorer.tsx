import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const rooms = [
  {
    number: 1,
    label: "Chef's Kitchen",
    title: 'Integrated Miele Kitchen',
    description: 'Full-height minimalist cabinetry, Carrara marble splashback, high-flow chef\'s sink, and integrated Miele appliances.',
    specs: ['Integrated Miele cooktop & oven', 'Carrara marble benchtop', 'High-flow chef\'s sink', 'Full-height glazing', 'Custom joinery'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 4V2M9 4V2M12 4V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M5 9h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    // Position on the floor plan SVG (as percentage of width/height)
    x: 11,
    y: 48,
  },
  {
    number: 2,
    label: 'Living & Dining',
    title: 'Open-Plan Living',
    description: 'Engineered hardwood floors, full-height minimalist glazing, and a concealed pivot door that dissolves the boundary between inside and outside.',
    specs: ['Engineered hardwood floors', 'Full-height glazing', 'Concealed pivot door', 'Bespoke joinery', 'Underfloor heating ready'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 13V8l7-5 7 5v5a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <rect x="6" y="10" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    x: 33,
    y: 42,
  },
  {
    number: 3,
    label: 'Master Bedroom',
    title: 'Bespoke King Bedroom',
    description: 'A sanctuary within a sanctuary. Bespoke king bed with luxe linen set, dark walnut accent wall partition, and full-height glazing for morning light.',
    specs: ['Bespoke king bed frame', 'Luxe linen set included', 'Dark walnut accent wall', 'Full-height glazing', 'Integrated bedside lighting'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 11h14" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 7V5a2 2 0 014 0v2M9 7V5a2 2 0 014 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    x: 65,
    y: 42,
  },
  {
    number: 4,
    label: 'Ensuite Bathroom',
    title: 'Carrara Marble Ensuite',
    description: 'Wall-hung concealed tank toilet, Carrara marble vanity sink, and floor-to-ceiling marble tiles. Spa-grade finishes as standard.',
    specs: ['Carrara marble vanity', 'Wall-hung concealed toilet', 'Rainfall shower head', 'Heated towel rail', 'Marble floor tiles'],
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10h12v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M3 10V6a2 2 0 014 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M9 4v2M12 5l1 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    x: 87,
    y: 48,
  },
];

// Static floor plan SVG with numbered callouts
const FloorPlanSVG: React.FC = () => (
  <svg viewBox="0 0 800 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Outer walls */}
    <rect x="20" y="30" width="760" height="200" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>

    {/* Interior walls */}
    {/* Kitchen / Living divider */}
    <line x1="220" y1="30" x2="220" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
    {/* Living / Bedroom divider */}
    <line x1="500" y1="30" x2="500" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
    {/* Bedroom / Bathroom divider */}
    <line x1="680" y1="30" x2="680" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>

    {/* Kitchen zone fill */}
    <rect x="21" y="31" width="198" height="198" fill="rgba(217,119,6,0.04)"/>
    {/* Living zone fill */}
    <rect x="221" y="31" width="278" height="198" fill="rgba(34,197,94,0.03)"/>
    {/* Bedroom zone fill */}
    <rect x="501" y="31" width="178" height="198" fill="rgba(59,130,246,0.04)"/>
    {/* Bathroom zone fill */}
    <rect x="681" y="31" width="98" height="198" fill="rgba(168,85,247,0.04)"/>

    {/* Kitchen: bench counter */}
    <rect x="30" y="40" width="180" height="30" rx="2" fill="rgba(217,119,6,0.15)" stroke="rgba(217,119,6,0.3)" strokeWidth="1"/>
    <text x="120" y="60" fontSize="9" fill="rgba(217,119,6,0.6)" textAnchor="middle" fontFamily="sans-serif">BENCH</text>
    {/* Kitchen: island */}
    <rect x="60" y="120" width="120" height="50" rx="2" fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.25)" strokeWidth="1"/>
    <text x="120" y="150" fontSize="9" fill="rgba(217,119,6,0.5)" textAnchor="middle" fontFamily="sans-serif">ISLAND</text>

    {/* Living: sofa */}
    <rect x="250" y="130" width="120" height="50" rx="4" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
    <text x="310" y="160" fontSize="9" fill="rgba(34,197,94,0.5)" textAnchor="middle" fontFamily="sans-serif">SOFA</text>
    {/* Living: dining table */}
    <rect x="390" y="100" width="80" height="60" rx="2" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="1"/>
    <text x="430" y="135" fontSize="9" fill="rgba(34,197,94,0.5)" textAnchor="middle" fontFamily="sans-serif">DINING</text>

    {/* Bedroom: bed */}
    <rect x="520" y="70" width="140" height="100" rx="4" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
    <text x="590" y="125" fontSize="9" fill="rgba(59,130,246,0.5)" textAnchor="middle" fontFamily="sans-serif">KING BED</text>
    {/* Bedroom: wardrobe */}
    <rect x="520" y="185" width="140" height="30" rx="2" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1"/>
    <text x="590" y="204" fontSize="8" fill="rgba(59,130,246,0.4)" textAnchor="middle" fontFamily="sans-serif">WARDROBE</text>

    {/* Bathroom: shower */}
    <rect x="690" y="40" width="80" height="80" rx="2" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" strokeWidth="1"/>
    <text x="730" y="85" fontSize="8" fill="rgba(168,85,247,0.5)" textAnchor="middle" fontFamily="sans-serif">SHOWER</text>
    {/* Bathroom: vanity */}
    <rect x="690" y="140" width="80" height="35" rx="2" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.15)" strokeWidth="1"/>
    <text x="730" y="162" fontSize="8" fill="rgba(168,85,247,0.4)" textAnchor="middle" fontFamily="sans-serif">VANITY</text>
    {/* Bathroom: toilet */}
    <rect x="700" y="185" width="55" height="35" rx="2" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.15)" strokeWidth="1"/>
    <text x="727" y="207" fontSize="8" fill="rgba(168,85,247,0.4)" textAnchor="middle" fontFamily="sans-serif">WC</text>

    {/* Door openings */}
    <path d="M 220 150 Q 240 150 240 170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
    <path d="M 500 150 Q 520 150 520 170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>
    <path d="M 680 150 Q 700 150 700 170" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="3,2"/>

    {/* Numbered callout circles */}
    {/* 1 — Kitchen */}
    <circle cx="90" cy="200" r="12" fill="rgba(217,119,6,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <text x="90" y="205" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" fontFamily="sans-serif">1</text>
    {/* 2 — Living */}
    <circle cx="330" cy="200" r="12" fill="rgba(34,197,94,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <text x="330" y="205" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" fontFamily="sans-serif">2</text>
    {/* 3 — Bedroom */}
    <circle cx="590" cy="200" r="12" fill="rgba(59,130,246,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <text x="590" y="205" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" fontFamily="sans-serif">3</text>
    {/* 4 — Bathroom */}
    <circle cx="730" cy="200" r="12" fill="rgba(168,85,247,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <text x="730" y="205" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" fontFamily="sans-serif">4</text>

    {/* Dimension lines */}
    <line x1="20" y1="245" x2="780" y2="245" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <line x1="20" y1="240" x2="20" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <line x1="780" y1="240" x2="780" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <text x="400" y="258" fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">12.09m total length</text>
  </svg>
);

export const FloorPlanExplorer: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.04)_0,transparent_65%)] pointer-events-none" />
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
          <motion.div className="flex items-center gap-4 mb-5" initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">Floor Plan · The Elite Living</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Every square metre<br />
            <span className="fire-text italic">intentionally designed.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            12.09m × 3.44m of pure architectural intention. Four distinct zones — kitchen, living, bedroom, and ensuite — each finished to a standard that rivals homes ten times the size.
          </p>
        </motion.div>

        {/* Floor plan SVG */}
        <motion.div
          className="rounded-2xl overflow-hidden border border-white/10 bg-white/3 p-4 md:p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <FloorPlanSVG />
          {/* Dimensions bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-4">
            <span className="text-xs font-sans text-foreground/30 uppercase tracking-widest">Scale 1:50 · Metres</span>
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-xs font-bold text-foreground/50 font-sans">12.09m length</span>
              <span className="text-xs font-bold text-foreground/50 font-sans">3.44m width</span>
              <span className="text-xs font-bold text-foreground/50 font-sans">2.7m ceiling</span>
              <span className="text-xs font-bold text-primary font-sans">~40 sqm</span>
            </div>
          </div>
        </motion.div>

        {/* Numbered callout cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {rooms.map((room, i) => (
            <motion.div
              key={room.number}
              className="p-6 rounded-2xl border border-white/8 bg-card/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              {/* Number badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                  <span className="text-primary text-sm font-serif font-bold">{room.number}</span>
                </div>
                <div className="text-primary">{room.icon}</div>
              </div>

              <h3 className="text-base font-serif font-bold text-foreground mb-1">{room.title}</h3>
              <p className="text-xs text-foreground/50 font-sans leading-relaxed mb-4">{room.description}</p>

              <div className="space-y-1.5">
                {room.specs.map((spec, si) => (
                  <div key={si} className="flex items-center gap-2 text-xs text-foreground/60 font-sans">
                    <div className="w-3 h-[1px] bg-primary/50 shrink-0" />
                    {spec}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specs strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { label: 'Total Length', value: '12.09m' },
            { label: 'Width', value: '3.44m' },
            { label: 'Floor Area', value: '~40 sqm' },
            { label: 'Ceiling Height', value: '2.7m' },
          ].map((spec, i) => (
            <div key={i} className="text-center p-4 rounded-xl border border-white/6 bg-card/20">
              <div className="text-xl md:text-2xl font-serif font-bold text-primary mb-1">{spec.value}</div>
              <div className="text-xs uppercase tracking-widest text-foreground/40 font-sans">{spec.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.button
            className="px-12 py-5 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Commission This Floor Plan →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
