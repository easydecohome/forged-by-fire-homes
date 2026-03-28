import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const rooms = [
  {
    id: 'kitchen',
    number: 1,
    label: "Chef's Kitchen",
    title: 'Integrated Miele Kitchen',
    description: 'Full-height minimalist cabinetry, Carrara marble splashback, high-flow chef\'s sink, and integrated Miele appliances.',
    specs: ['Integrated Miele cooktop & oven', 'Carrara marble benchtop', 'High-flow chef\'s sink', 'Full-height glazing', 'Custom joinery'],
    image: './images/kitchen-interior.webp',
    x: 11,
    y: 48,
  },
  {
    id: 'living',
    number: 2,
    label: 'Living & Dining',
    title: 'Open-Plan Living',
    description: 'Engineered hardwood floors, full-height minimalist glazing, and a concealed pivot door that dissolves the boundary between inside and outside.',
    specs: ['Engineered hardwood floors', 'Full-height glazing', 'Concealed pivot door', 'Bespoke joinery', 'Underfloor heating ready'],
    image: './images/tiny-home-exterior.jpg',
    x: 33,
    y: 42,
  },
  {
    id: 'bedroom',
    number: 3,
    label: 'Master Bedroom',
    title: 'Bespoke King Bedroom',
    description: 'A sanctuary within a sanctuary. Bespoke king bed with luxe linen set, dark walnut accent wall partition, and full-height glazing for morning light.',
    specs: ['Bespoke king bed frame', 'Luxe linen set included', 'Dark walnut accent wall', 'Full-height glazing', 'Integrated bedside lighting'],
    image: './images/tiny-home-exterior.jpg',
    x: 65,
    y: 42,
  },
  {
    id: 'bathroom',
    number: 4,
    label: 'Ensuite Bathroom',
    title: 'Carrara Marble Ensuite',
    description: 'Wall-hung concealed tank toilet, Carrara marble vanity sink, and floor-to-ceiling marble tiles. Spa-grade finishes as standard.',
    specs: ['Carrara marble vanity', 'Wall-hung concealed toilet', 'Rainfall shower head', 'Heated towel rail', 'Marble floor tiles'],
    image: './images/kitchen-interior.webp',
    x: 87,
    y: 48,
  },
];

const FloorPlanSVG: React.FC<{ activeRoom: string; onRoomClick: (id: string) => void }> = ({ activeRoom, onRoomClick }) => (
  <svg viewBox="0 0 800 260" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Outer walls */}
    <rect x="20" y="30" width="760" height="200" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>

    {/* Interior walls */}
    <line x1="220" y1="30" x2="220" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
    <line x1="500" y1="30" x2="500" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
    <line x1="680" y1="30" x2="680" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>

    {/* Zone clickable areas */}
    <rect x="21" y="31" width="198" height="198" fill={activeRoom === 'kitchen' ? 'rgba(217,119,6,0.15)' : 'rgba(217,119,6,0.04)'} className="cursor-pointer transition-colors" onClick={() => onRoomClick('kitchen')}/>
    <rect x="221" y="31" width="278" height="198" fill={activeRoom === 'living' ? 'rgba(34,197,94,0.12)' : 'rgba(34,197,94,0.03)'} className="cursor-pointer transition-colors" onClick={() => onRoomClick('living')}/>
    <rect x="501" y="31" width="178" height="198" fill={activeRoom === 'bedroom' ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.04)'} className="cursor-pointer transition-colors" onClick={() => onRoomClick('bedroom')}/>
    <rect x="681" y="31" width="98" height="198" fill={activeRoom === 'bathroom' ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.04)'} className="cursor-pointer transition-colors" onClick={() => onRoomClick('bathroom')}/>

    {/* Zone Labels */}
    <text x="120" y="135" fontSize="10" fill="rgba(255,255,255,0.4)" textAnchor="middle" className="pointer-events-none">KITCHEN</text>
    <text x="360" y="135" fontSize="10" fill="rgba(255,255,255,0.4)" textAnchor="middle" className="pointer-events-none">LIVING</text>
    <text x="590" y="135" fontSize="10" fill="rgba(255,255,255,0.4)" textAnchor="middle" className="pointer-events-none">BEDROOM</text>
    <text x="730" y="135" fontSize="8" fill="rgba(255,255,255,0.4)" textAnchor="middle" className="pointer-events-none">BATH</text>

    {/* Numbered callout circles */}
    {rooms.map((room) => (
      <g key={room.id} className="cursor-pointer" onClick={() => onRoomClick(room.id)}>
        <circle 
          cx={room.x * 8} 
          cy={room.y * 2.6} 
          r={activeRoom === room.id ? 15 : 12} 
          fill={activeRoom === room.id ? 'rgba(217,119,6,1)' : 'rgba(217,119,6,0.8)'} 
          className="transition-all duration-300"
        />
        <text x={room.x * 8} y={room.y * 2.6 + 4} fontSize="11" fontWeight="700" fill="white" textAnchor="middle" fontFamily="sans-serif">{room.number}</text>
      </g>
    ))}

    {/* Dimension lines */}
    <line x1="20" y1="245" x2="780" y2="245" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <line x1="20" y1="240" x2="20" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <line x1="780" y1="240" x2="780" y2="250" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <text x="400" y="258" fontSize="9" fill="rgba(255,255,255,0.3)" textAnchor="middle" fontFamily="sans-serif">12.09m total length</text>
  </svg>
);

export const FloorPlanExplorer: React.FC = () => {
  const [activeRoomId, setActiveRoomId] = useState('kitchen');
  const activeRoom = rooms.find(r => r.id === activeRoomId) || rooms[0];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.04)_0,transparent_65%)] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div className="flex items-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">Interactive Floor Plan</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Every square metre<br />
            <span className="fire-text italic">intentionally designed.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Interactive SVG */}
          <motion.div 
            className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/10 bg-white/3 p-4 md:p-8 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <FloorPlanSVG activeRoom={activeRoomId} onRoomClick={setActiveRoomId} />
            
            {/* Legend / Hint */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <p className="text-xs text-foreground/40 uppercase tracking-widest font-sans">Tap any zone to explore</p>
              <div className="flex gap-4">
                {rooms.map(r => (
                  <button 
                    key={r.id}
                    onClick={() => setActiveRoomId(r.id)}
                    className={`text-[10px] uppercase tracking-tighter px-2 py-1 rounded border transition-all ${activeRoomId === r.id ? 'border-primary text-primary bg-primary/10' : 'border-white/10 text-foreground/40'}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Room Details Card */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoomId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-card/30 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={activeRoom.image} alt={activeRoom.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1 block">Zone {activeRoom.number}</span>
                    <h3 className="text-2xl font-serif font-bold text-white">{activeRoom.label}</h3>
                  </div>
                </div>
                
                <div className="p-8">
                  <h4 className="text-lg font-serif font-bold text-primary mb-3">{activeRoom.title}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6 font-sans">
                    {activeRoom.description}
                  </p>
                  
                  <div className="space-y-3">
                    {activeRoom.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        <span className="text-xs text-foreground/80 font-sans">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full mt-8 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary text-sm font-bold transition-all"
                  >
                    Commission This Design →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
