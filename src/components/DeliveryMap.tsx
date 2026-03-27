import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const zones = [
  {
    id: 'green',
    label: 'QLD / NSW / VIC',
    color: 'rgba(34,197,94,0.35)',
    stroke: 'rgba(34,197,94,0.7)',
    textColor: 'rgba(34,197,94,0.9)',
    badge: 'bg-green-500/20 border-green-500/40 text-green-400',
    delivery: '16 weeks',
    note: 'Standard delivery zone',
  },
  {
    id: 'amber',
    label: 'SA / TAS',
    color: 'rgba(217,119,6,0.35)',
    stroke: 'rgba(217,119,6,0.7)',
    textColor: 'rgba(217,119,6,0.9)',
    badge: 'bg-amber-500/20 border-amber-500/40 text-amber-400',
    delivery: '18–20 weeks',
    note: 'Extended delivery zone',
  },
  {
    id: 'blue',
    label: 'WA / NT',
    color: 'rgba(59,130,246,0.35)',
    stroke: 'rgba(59,130,246,0.7)',
    textColor: 'rgba(59,130,246,0.9)',
    badge: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    delivery: '20–24 weeks',
    note: 'Remote delivery zone',
  },
];

// Stylised Australia SVG map with three colour zones
const AustraliaMap: React.FC = () => (
  <svg viewBox="0 0 520 460" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* WA — Blue */}
    <path
      d="M 60 80 L 200 75 L 215 130 L 220 260 L 210 340 L 170 380 L 100 390 L 55 350 L 45 260 L 50 160 Z"
      fill="rgba(59,130,246,0.3)"
      stroke="rgba(59,130,246,0.6)"
      strokeWidth="1.5"
    />
    <text x="125" y="230" fontSize="11" fontWeight="700" fill="rgba(59,130,246,0.85)" textAnchor="middle" fontFamily="serif">WA</text>

    {/* NT — Blue */}
    <path
      d="M 200 75 L 310 70 L 315 200 L 220 205 L 215 130 Z"
      fill="rgba(59,130,246,0.3)"
      stroke="rgba(59,130,246,0.6)"
      strokeWidth="1.5"
    />
    <text x="258" y="140" fontSize="11" fontWeight="700" fill="rgba(59,130,246,0.85)" textAnchor="middle" fontFamily="serif">NT</text>

    {/* SA — Amber */}
    <path
      d="M 220 205 L 315 200 L 320 310 L 295 340 L 260 350 L 225 330 L 210 290 Z"
      fill="rgba(217,119,6,0.3)"
      stroke="rgba(217,119,6,0.6)"
      strokeWidth="1.5"
    />
    <text x="265" y="278" fontSize="11" fontWeight="700" fill="rgba(217,119,6,0.85)" textAnchor="middle" fontFamily="serif">SA</text>

    {/* QLD — Green */}
    <path
      d="M 310 70 L 430 80 L 450 120 L 445 240 L 390 260 L 360 240 L 320 250 L 315 200 Z"
      fill="rgba(34,197,94,0.3)"
      stroke="rgba(34,197,94,0.6)"
      strokeWidth="1.5"
    />
    <text x="385" y="165" fontSize="11" fontWeight="700" fill="rgba(34,197,94,0.85)" textAnchor="middle" fontFamily="serif">QLD</text>

    {/* NSW — Green */}
    <path
      d="M 360 240 L 390 260 L 445 240 L 450 310 L 420 330 L 370 340 L 320 310 L 315 250 Z"
      fill="rgba(34,197,94,0.3)"
      stroke="rgba(34,197,94,0.6)"
      strokeWidth="1.5"
    />
    <text x="385" y="295" fontSize="11" fontWeight="700" fill="rgba(34,197,94,0.85)" textAnchor="middle" fontFamily="serif">NSW</text>

    {/* VIC — Green */}
    <path
      d="M 320 310 L 370 340 L 420 330 L 430 360 L 390 380 L 330 375 L 295 340 Z"
      fill="rgba(34,197,94,0.3)"
      stroke="rgba(34,197,94,0.6)"
      strokeWidth="1.5"
    />
    <text x="365" y="358" fontSize="11" fontWeight="700" fill="rgba(34,197,94,0.85)" textAnchor="middle" fontFamily="serif">VIC</text>

    {/* TAS — Amber */}
    <path
      d="M 360 400 L 390 395 L 405 415 L 395 435 L 365 440 L 348 425 Z"
      fill="rgba(217,119,6,0.3)"
      stroke="rgba(217,119,6,0.6)"
      strokeWidth="1.5"
    />
    <text x="378" y="422" fontSize="9" fontWeight="700" fill="rgba(217,119,6,0.85)" textAnchor="middle" fontFamily="serif">TAS</text>

    {/* ACT dot */}
    <circle cx="400" cy="345" r="5" fill="rgba(34,197,94,0.5)" stroke="rgba(34,197,94,0.8)" strokeWidth="1"/>
    <text x="415" y="348" fontSize="8" fill="rgba(34,197,94,0.7)" fontFamily="serif">ACT</text>

    {/* Legend */}
    <rect x="30" y="390" width="14" height="14" rx="2" fill="rgba(34,197,94,0.3)" stroke="rgba(34,197,94,0.6)" strokeWidth="1"/>
    <text x="50" y="402" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif">QLD/NSW/VIC — 16 wks</text>
    <rect x="30" y="412" width="14" height="14" rx="2" fill="rgba(217,119,6,0.3)" stroke="rgba(217,119,6,0.6)" strokeWidth="1"/>
    <text x="50" y="424" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif">SA/TAS — 18–20 wks</text>
    <rect x="30" y="434" width="14" height="14" rx="2" fill="rgba(59,130,246,0.3)" stroke="rgba(59,130,246,0.6)" strokeWidth="1"/>
    <text x="50" y="446" fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif">WA/NT — 20–24 wks</text>
  </svg>
);

// Site access clearance diagram
const SiteAccessDiagram: React.FC = () => (
  <svg viewBox="0 0 380 180" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    {/* Road surface */}
    <rect x="20" y="100" width="340" height="60" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
    {/* Road markings */}
    <line x1="20" y1="130" x2="360" y2="130" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="20,10"/>

    {/* Truck body */}
    <rect x="60" y="75" width="120" height="45" rx="4" fill="rgba(217,119,6,0.25)" stroke="rgba(217,119,6,0.6)" strokeWidth="1.5"/>
    {/* Truck cab */}
    <rect x="160" y="85" width="40" height="35" rx="3" fill="rgba(217,119,6,0.35)" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5"/>
    {/* Truck wheels */}
    <circle cx="90" cy="122" r="8" fill="rgba(217,119,6,0.4)" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5"/>
    <circle cx="130" cy="122" r="8" fill="rgba(217,119,6,0.4)" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5"/>
    <circle cx="175" cy="122" r="8" fill="rgba(217,119,6,0.4)" stroke="rgba(217,119,6,0.7)" strokeWidth="1.5"/>

    {/* Width dimension — 3.5m */}
    <line x1="60" y1="155" x2="200" y2="155" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5"/>
    <line x1="60" y1="150" x2="60" y2="160" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5"/>
    <line x1="200" y1="150" x2="200" y2="160" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5"/>
    <rect x="108" y="148" width="44" height="16" rx="3" fill="rgba(10,10,10,0.8)"/>
    <text x="130" y="160" fontSize="11" fontWeight="700" fill="rgba(34,197,94,0.9)" textAnchor="middle" fontFamily="sans-serif">3.5m wide</text>

    {/* Height dimension — 4.5m */}
    <line x1="240" y1="75" x2="240" y2="160" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
    <line x1="235" y1="75" x2="245" y2="75" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
    <line x1="235" y1="160" x2="245" y2="160" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
    <rect x="248" y="108" width="52" height="16" rx="3" fill="rgba(10,10,10,0.8)"/>
    <text x="274" y="120" fontSize="11" fontWeight="700" fill="rgba(59,130,246,0.9)" textAnchor="middle" fontFamily="sans-serif">4.5m high</text>

    {/* Overhead clearance bar */}
    <rect x="20" y="65" width="340" height="12" rx="2" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="6,4"/>
    <text x="300" y="58" fontSize="9" fill="rgba(59,130,246,0.6)" textAnchor="middle" fontFamily="sans-serif">Min. clearance</text>

    {/* Label */}
    <text x="190" y="18" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.5)" textAnchor="middle" fontFamily="sans-serif">SITE ACCESS REQUIREMENTS</text>
  </svg>
);

export const DeliveryMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <section ref={ref} id="delivery" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">Delivery Coverage</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Delivered <span className="fire-text italic">Australia-Wide</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            We transport and install your home across all Australian states. Delivery zones are colour-coded by typical timeframe and accessibility requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <motion.div
            className="rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-card/20 p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <AustraliaMap />

            {/* Zone badges */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {zones.map(zone => (
                <motion.button
                  key={zone.id}
                  className={`px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest font-sans transition-all ${zone.badge} ${activeZone === zone.id ? 'scale-105 shadow-lg' : 'opacity-80 hover:opacity-100'}`}
                  onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  whileTap={{ scale: 0.97 }}
                >
                  {zone.label}
                </motion.button>
              ))}
            </div>

            {/* Zone detail */}
            {activeZone && (() => {
              const z = zones.find(z => z.id === activeZone);
              if (!z) return null;
              return (
                <motion.div
                  className="mt-4 p-4 rounded-xl bg-background/60 border border-white/10"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-sans text-foreground">{z.label}</span>
                    <span className={`text-sm font-serif font-bold`} style={{ color: z.textColor }}>{z.delivery}</span>
                  </div>
                  <p className="text-xs text-foreground/50 font-sans mt-1">{z.note}</p>
                </motion.div>
              );
            })()}
          </motion.div>

          {/* Right panel */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-bold">Transport Specifications</h3>

            {/* Spec rows */}
            <div className="space-y-3">
              {[
                {
                  label: 'Maximum Transport Width',
                  value: '3.5m',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 11h18M5 7l-3 4 3 4M17 7l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Maximum Height Clearance',
                  value: '4.5m',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 2v18M7 5l4-3 4 3M7 17l4 3 4-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Standard Delivery Time',
                  value: '16 weeks',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M11 6v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                },
                {
                  label: 'Site Access Road Width',
                  value: '3.5m min.',
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="15" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3 12h16" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2"/>
                    </svg>
                  ),
                },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <div className="text-primary shrink-0">{spec.icon}</div>
                  <span className="text-foreground/70 font-sans flex-1 text-sm">{spec.label}</span>
                  <span className="text-lg font-serif font-bold text-primary shrink-0">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Site access diagram */}
            <motion.div
              className="p-5 rounded-2xl bg-background/50 border border-primary/15"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-4">Site Access Clearance Diagram</p>
              <SiteAccessDiagram />
              <p className="text-xs text-foreground/40 font-sans mt-3 leading-relaxed">
                Your access road must be at least <strong className="text-foreground/60">3.5m wide</strong> with <strong className="text-foreground/60">4.5m overhead clearance</strong> for the delivery truck and crane. Our team will assess your site during the free consultation.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          <p className="text-foreground/60 mb-6 font-sans">Not sure if your site is accessible? We'll assess it for free.</p>
          <motion.button
            className="px-12 py-4 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Free Site Assessment →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
