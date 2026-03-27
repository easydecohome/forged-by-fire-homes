import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const DeliveryMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6">
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
            We transport and install your home across all Australian states. Delivery zones are colour-coded by typical timeframe and accessibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-card/20 p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <svg viewBox="0 0 960 720" className="w-full h-auto">
              <g opacity="0.8">
                <path d="M 620 150 L 700 160 L 720 200 L 700 280 L 650 300 L 600 280 L 580 200 Z" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="2" />
                <text x="650" y="230" fontSize="14" fontWeight="bold" fill="rgba(34, 197, 94, 0.8)" textAnchor="middle">QLD/NSW/VIC</text>
              </g>
              <g opacity="0.8">
                <path d="M 500 320 L 580 300 L 600 380 L 550 420 L 480 380 Z" fill="rgba(217, 119, 6, 0.3)" stroke="rgba(217, 119, 6, 0.6)" strokeWidth="2" />
                <text x="540" y="360" fontSize="12" fontWeight="bold" fill="rgba(217, 119, 6, 0.8)" textAnchor="middle">SA/TAS</text>
              </g>
              <g opacity="0.8">
                <path d="M 250 200 L 420 180 L 450 350 L 350 380 L 200 300 Z" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="2" />
                <text x="330" y="280" fontSize="12" fontWeight="bold" fill="rgba(59, 130, 246, 0.8)" textAnchor="middle">WA/NT</text>
              </g>
              <g>
                <rect x="50" y="450" width="20" height="20" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(34, 197, 94, 0.6)" strokeWidth="1" />
                <text x="80" y="465" fontSize="12" fill="rgba(255, 255, 255, 0.7)">Standard (2–3 weeks)</text>
                <rect x="50" y="490" width="20" height="20" fill="rgba(217, 119, 6, 0.3)" stroke="rgba(217, 119, 6, 0.6)" strokeWidth="1" />
                <text x="80" y="505" fontSize="12" fill="rgba(255, 255, 255, 0.7)">Extended (3–4 weeks)</text>
                <rect x="50" y="530" width="20" height="20" fill="rgba(59, 130, 246, 0.3)" stroke="rgba(59, 130, 246, 0.6)" strokeWidth="1" />
                <text x="80" y="545" fontSize="12" fill="rgba(255, 255, 255, 0.7)">Remote (4–6 weeks)</text>
              </g>
            </svg>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <h3 className="text-3xl font-serif font-bold">Transport Specifications</h3>

            <div className="space-y-4">
              {[
                { label: 'Maximum Width', value: '3.5m', icon: '↔️' },
                { label: 'Maximum Height', value: '4.5m', icon: '↕️' },
                { label: 'Delivery Time', value: '16 weeks', icon: '⏱️' },
                { label: 'Site Access Required', value: '4.5m clearance', icon: '🚛' },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70 font-sans">{spec.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{spec.icon}</span>
                      <span className="text-xl font-serif font-bold text-primary">{spec.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 rounded-xl bg-background/50 border border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <p className="text-sm text-foreground/70 font-sans mb-4">
                <span className="font-bold text-primary">Site Access Diagram:</span> Your property must have a minimum 3.5m-wide access road with 4.5m overhead clearance for delivery trucks. Our team will assess your site during the consultation.
              </p>
              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <svg viewBox="0 0 400 200" className="w-full h-auto">
                  <rect x="50" y="80" width="300" height="40" fill="rgba(255, 255, 255, 0.1)" stroke="rgba(217, 119, 6, 0.5)" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="200" y="110" fontSize="12" fill="rgba(217, 119, 6, 0.8)" textAnchor="middle" fontWeight="bold">3.5m</text>
                  <rect x="100" y="85" width="60" height="30" fill="rgba(217, 119, 6, 0.3)" stroke="rgba(217, 119, 6, 0.6)" strokeWidth="1" rx="4" />
                  <circle cx="115" cy="120" r="4" fill="rgba(217, 119, 6, 0.6)" />
                  <circle cx="145" cy="120" r="4" fill="rgba(217, 119, 6, 0.6)" />
                  <line x1="200" y1="20" x2="200" y2="80" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
                  <line x1="195" y1="20" x2="205" y2="20" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
                  <line x1="195" y1="80" x2="205" y2="80" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
                  <text x="220" y="55" fontSize="11" fill="rgba(59, 130, 246, 0.8)" fontWeight="bold">4.5m</text>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          <p className="text-foreground/60 mb-6 font-sans">Not sure if your site is accessible?</p>
          <motion.button
            className="px-12 py-4 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get a Site Assessment →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
