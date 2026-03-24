import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const hotspots = [
  {
    id: 'kitchen',
    label: 'Chef\'s Kitchen',
    x: 12,
    y: 45,
    title: 'Integrated Miele Cooktop',
    description: 'Full-height minimalist cabinetry, Carrara marble splashback, high-flow chef\'s sink, and integrated Miele appliances. Every surface is a statement.',
    specs: ['Integrated Miele cooktop', 'Carrara marble benchtop', 'High-flow chef\'s sink', 'Full-height glazing', 'Custom joinery'],
    icon: '🍳',
  },
  {
    id: 'living',
    label: 'Living & Dining',
    x: 35,
    y: 40,
    title: 'Open-Plan Living',
    description: 'Engineered hardwood floors, full-height minimalist glazing, and a concealed pivot door that dissolves the boundary between inside and outside.',
    specs: ['Engineered hardwood floors', 'Full-height glazing', 'Concealed pivot door', 'Bespoke joinery', 'Underfloor heating ready'],
    icon: '🛋️',
  },
  {
    id: 'bedroom',
    label: 'Master Bedroom',
    x: 65,
    y: 40,
    title: 'Bespoke King Bedroom',
    description: 'A sanctuary within a sanctuary. Bespoke king bed with luxe linen set, dark walnut accent wall partition, and full-height glazing for morning light.',
    specs: ['Bespoke king bed frame', 'Luxe linen set included', 'Dark walnut accent wall', 'Full-height glazing', 'Integrated bedside lighting'],
    icon: '🛏️',
  },
  {
    id: 'bathroom',
    label: 'Ensuite Bathroom',
    x: 87,
    y: 45,
    title: 'Carrara Marble Ensuite',
    description: 'Wall-hung concealed tank toilet, Carrara marble vanity sink, and floor-to-ceiling marble tiles. Spa-grade finishes as standard.',
    specs: ['Carrara marble vanity', 'Wall-hung concealed toilet', 'Rainfall shower head', 'Heated towel rail', 'Marble floor tiles'],
    icon: '🚿',
  },
];

const Hotspot: React.FC<{
  spot: typeof hotspots[0];
  active: string | null;
  onToggle: (id: string | null) => void;
}> = ({ spot, active, onToggle }) => {
  const isActive = active === spot.id;

  return (
    <div
      className="absolute"
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/60"
        animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        style={{ width: 36, height: 36, left: -4, top: -4 }}
      />
      {/* Button */}
      <motion.button
        className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold z-10 transition-all duration-300 ${
          isActive
            ? 'bg-primary border-primary text-white scale-125'
            : 'bg-background/80 border-primary/70 text-primary hover:bg-primary hover:text-white hover:scale-110'
        }`}
        onClick={() => onToggle(isActive ? null : spot.id)}
        whileTap={{ scale: 0.9 }}
      >
        +
      </motion.button>

      {/* Label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-[9px] uppercase tracking-widest font-bold text-white/60 bg-background/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {spot.label}
        </span>
      </div>
    </div>
  );
};

export const FloorPlanExplorer: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const activeData = hotspots.find(h => h.id === activeSpot);

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
            <span className="text-primary font-serif italic tracking-wide text-sm">Interactive Floor Plan · The Elite Living</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Every square metre<br />
            <span className="fire-text italic">intentionally designed.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            12.09m × 3.44m of pure architectural intention. Tap the hotspots to explore every room, every finish, every detail that makes this more than a tiny home — it's a precision instrument for living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Floor plan image with hotspots */}
          <motion.div
            className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src="./images/floor-plan.jpg"
                alt="The Elite Living Tiny Home Floor Plan — 12.09m × 3.44m"
                className="w-full h-auto"
              />
              {/* Hotspot overlay */}
              <div className="absolute inset-0">
                {hotspots.map(spot => (
                  <Hotspot
                    key={spot.id}
                    spot={spot}
                    active={activeSpot}
                    onToggle={setActiveSpot}
                  />
                ))}
              </div>
            </div>
            {/* Dimensions bar */}
            <div className="bg-background/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between border-t border-white/8">
              <span className="text-xs font-sans text-foreground/40 uppercase tracking-widest">Scale 1:50 · Metres</span>
              <div className="flex items-center gap-6">
                <span className="text-xs font-bold text-foreground/60 font-sans">12.09m length</span>
                <span className="text-xs font-bold text-foreground/60 font-sans">3.44m width</span>
                <span className="text-xs font-bold text-primary font-sans">~40 sqm</span>
              </div>
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div
                  key={activeData.id}
                  className="p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/8 to-card/30"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="text-3xl mb-3">{activeData.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">{activeData.title}</h3>
                  <p className="text-foreground/70 font-sans text-sm leading-relaxed mb-4">{activeData.description}</p>
                  <div className="space-y-2">
                    {activeData.specs.map((spec, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 text-sm text-foreground/80 font-sans"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="w-4 h-[1px] bg-primary/60 shrink-0" />
                        {spec}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="prompt"
                  className="p-6 rounded-2xl border border-white/8 bg-card/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-4xl mb-4">👆</div>
                  <h3 className="text-lg font-serif font-bold text-foreground/60 mb-2">Tap a hotspot</h3>
                  <p className="text-foreground/40 font-sans text-sm">Click the + markers on the floor plan to explore each room's features and finishes.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Room list */}
            <div className="grid grid-cols-2 gap-3">
              {hotspots.map(spot => (
                <motion.button
                  key={spot.id}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    activeSpot === spot.id
                      ? 'border-primary/50 bg-primary/10'
                      : 'border-white/8 bg-card/20 hover:border-primary/30'
                  }`}
                  onClick={() => setActiveSpot(activeSpot === spot.id ? null : spot.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="text-xl mb-1">{spot.icon}</div>
                  <div className={`text-xs font-bold font-sans transition-colors ${activeSpot === spot.id ? 'text-primary' : 'text-foreground/60'}`}>
                    {spot.label}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              className="w-full py-4 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Commission This Floor Plan →
            </motion.button>
          </motion.div>
        </div>

        {/* Specs strip */}
        <motion.div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
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
      </div>
    </section>
  );
};
