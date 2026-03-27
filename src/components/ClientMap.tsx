import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Pin cluster data: [x%, y%, count, label, region]
const clusters = [
  // QLD
  { x: 74, y: 20, count: 12, label: 'Noosa & Sunshine Coast', region: 'QLD' },
  { x: 76, y: 27, count: 18, label: 'Brisbane & Hinterland', region: 'QLD' },
  { x: 80, y: 16, count: 6, label: 'Cairns & Far North QLD', region: 'QLD' },
  { x: 72, y: 33, count: 5, label: 'Gold Coast Hinterland', region: 'QLD' },
  // NSW
  { x: 73, y: 36, count: 9, label: 'Byron Bay & Northern Rivers', region: 'NSW' },
  { x: 70, y: 44, count: 11, label: 'Sydney & Blue Mountains', region: 'NSW' },
  { x: 65, y: 50, count: 4, label: 'Southern Highlands', region: 'NSW' },
  // VIC
  { x: 66, y: 58, count: 8, label: 'Yarra Valley & Mornington', region: 'VIC' },
  { x: 62, y: 60, count: 5, label: 'Great Ocean Road', region: 'VIC' },
  // SA
  { x: 50, y: 56, count: 3, label: 'Adelaide Hills', region: 'SA' },
  // WA
  { x: 22, y: 52, count: 2, label: 'Margaret River', region: 'WA' },
  // TAS
  { x: 66, y: 72, count: 1, label: 'Hobart & Surrounds', region: 'TAS' },
];

const regionColors: Record<string, string> = {
  QLD: '#22c55e',
  NSW: '#22c55e',
  VIC: '#22c55e',
  SA: '#f59e0b',
  TAS: '#f59e0b',
  WA: '#3b82f6',
  NT: '#3b82f6',
};

const regionBg: Record<string, string> = {
  QLD: 'rgba(34,197,94,0.12)',
  NSW: 'rgba(34,197,94,0.10)',
  VIC: 'rgba(34,197,94,0.08)',
  SA: 'rgba(245,158,11,0.10)',
  TAS: 'rgba(245,158,11,0.08)',
  WA: 'rgba(59,130,246,0.10)',
  NT: 'rgba(59,130,246,0.08)',
};

// Simplified Australia SVG outline
const AustraliaOutline: React.FC = () => (
  <svg
    viewBox="0 0 100 100"
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* State fills */}
    {/* WA */}
    <path d="M5 15 L35 15 L35 70 L20 75 L5 65 Z" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.3"/>
    {/* NT */}
    <path d="M35 15 L55 15 L55 55 L35 55 Z" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.3"/>
    {/* SA */}
    <path d="M35 55 L55 55 L60 65 L55 75 L40 78 L35 70 Z" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="0.3"/>
    {/* QLD */}
    <path d="M55 15 L85 15 L85 45 L65 50 L55 55 L55 15 Z" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.3"/>
    {/* NSW */}
    <path d="M65 50 L85 45 L85 62 L65 65 Z" fill="rgba(34,197,94,0.10)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.3"/>
    {/* VIC */}
    <path d="M55 65 L65 65 L70 72 L55 75 Z" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.3"/>
    {/* TAS */}
    <path d="M62 78 L70 78 L70 85 L62 85 Z" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.15)" strokeWidth="0.3"/>

    {/* State labels */}
    <text x="18" y="45" fontSize="3.5" fill="rgba(59,130,246,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">WA</text>
    <text x="44" y="38" fontSize="3.5" fill="rgba(59,130,246,0.4)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">NT</text>
    <text x="46" y="66" fontSize="3.5" fill="rgba(245,158,11,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">SA</text>
    <text x="70" y="32" fontSize="3.5" fill="rgba(34,197,94,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">QLD</text>
    <text x="76" y="55" fontSize="3" fill="rgba(34,197,94,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">NSW</text>
    <text x="62" y="70" fontSize="3" fill="rgba(34,197,94,0.5)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">VIC</text>
    <text x="66" y="83" fontSize="3" fill="rgba(245,158,11,0.4)" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">TAS</text>
  </svg>
);

const PinCluster: React.FC<{
  cluster: typeof clusters[0];
  index: number;
  inView: boolean;
  onHover: (c: typeof clusters[0] | null) => void;
  hovered: boolean;
}> = ({ cluster, index, inView, onHover, hovered }) => {
  const color = regionColors[cluster.region] || '#d97706';
  const size = cluster.count >= 10 ? 28 : cluster.count >= 5 ? 22 : 16;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${cluster.x}%`,
        top: `${cluster.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: hovered ? 20 : 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.3 + index * 0.05, duration: 0.4, type: 'spring', stiffness: 200 }}
      onHoverStart={() => onHover(cluster)}
      onHoverEnd={() => onHover(null)}
      whileHover={{ scale: 1.3 }}
    >
      {/* Pulse ring */}
      {cluster.count >= 8 && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size + 12,
            height: size + 12,
            left: -(size + 12) / 2 + size / 2,
            top: -(size + 12) / 2 + size / 2,
            border: `1.5px solid ${color}`,
            opacity: 0.4,
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
        />
      )}
      {/* Pin circle */}
      <div
        className="rounded-full flex items-center justify-center font-serif font-bold text-white shadow-lg"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          fontSize: size > 22 ? 9 : 7,
          boxShadow: `0 0 12px ${color}60`,
        }}
      >
        {cluster.count}
      </div>
    </motion.div>
  );
};

export const ClientMap: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const mapInView = useInView(mapRef, { once: true, margin: '-80px' });
  const [hoveredCluster, setHoveredCluster] = useState<typeof clusters[0] | null>(null);

  const totalHomes = clusters.reduce((sum, c) => sum + c.count, 0);

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.03)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/15 to-transparent" />

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
            <div className="h-[1px] w-12 bg-green-500/60" />
            <span className="text-green-400 font-serif italic tracking-wide text-sm">Delivered Homes · Australia-Wide</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            <span className="fire-text italic">{totalHomes}+ homes</span> delivered<br />
            across Australia.
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            From Noosa to the Yarra Valley, Byron Bay to Margaret River — Forged by Fire homes are transforming landscapes and investment portfolios across the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Map */}
          <motion.div
            ref={mapRef}
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-card/20 aspect-[4/3]">
              {/* Map background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.04)_0,transparent_70%)]" />
              <AustraliaOutline />

              {/* Pin clusters */}
              {clusters.map((cluster, i) => (
                <PinCluster
                  key={cluster.label}
                  cluster={cluster}
                  index={i}
                  inView={mapInView}
                  onHover={setHoveredCluster}
                  hovered={hoveredCluster?.label === cluster.label}
                />
              ))}

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredCluster && (
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-64 p-4 rounded-2xl border border-white/15 bg-background/90 backdrop-blur-md z-30 pointer-events-none"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: regionColors[hoveredCluster.region] }}
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 font-sans">{hoveredCluster.region}</span>
                    </div>
                    <div className="text-base font-serif font-bold text-foreground mb-1">{hoveredCluster.label}</div>
                    <div className="text-sm font-sans" style={{ color: regionColors[hoveredCluster.region] }}>
                      {hoveredCluster.count} home{hoveredCluster.count !== 1 ? 's' : ''} delivered
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-5 mt-5 justify-center">
              {[
                { color: '#22c55e', label: 'QLD / NSW / VIC — Active delivery zone' },
                { color: '#f59e0b', label: 'SA / TAS — Available (extended lead time)' },
                { color: '#3b82f6', label: 'WA / NT — Available (project basis)' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-foreground/40 font-sans">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar stats + location list */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Total counter */}
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
              <div className="text-5xl font-serif font-bold text-green-400 mb-1">{totalHomes}+</div>
              <div className="text-xs uppercase tracking-widest text-foreground/40 font-sans">Homes Delivered</div>
            </div>

            {/* Top locations */}
            <div className="p-6 rounded-2xl border border-white/8 bg-card/20">
              <div className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans mb-4">Top Delivery Locations</div>
              <div className="space-y-3">
                {[...clusters]
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 6)
                  .map((c, i) => (
                    <div key={c.label} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-foreground/20 font-sans w-4 shrink-0">{i + 1}.</span>
                        <span className="text-xs text-foreground/60 font-sans truncate">{c.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="h-1 rounded-full" style={{ width: Math.max(20, (c.count / 18) * 60), backgroundColor: regionColors[c.region], opacity: 0.6 }} />
                        <span className="text-xs font-bold font-sans" style={{ color: regionColors[c.region] }}>{c.count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Council count */}
            <div className="p-6 rounded-2xl border border-primary/15 bg-primary/5">
              <div className="text-3xl font-serif font-bold text-primary mb-1">15+</div>
              <div className="text-xs uppercase tracking-widest text-foreground/40 font-sans mb-3">Councils Approved</div>
              <p className="text-xs text-foreground/50 font-sans leading-relaxed">
                Including Noosa, Byron Bay, Yarra Valley, Mornington Peninsula, Sunshine Coast, and more.
              </p>
            </div>

            {/* CTA */}
            <motion.button
              className="w-full py-4 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Check Delivery to My Area →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
