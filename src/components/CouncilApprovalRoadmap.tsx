import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { number: 1, title: 'Your Land', description: 'Bring your property details', icon: '📍' },
  { number: 2, title: 'Zoning Check', description: 'We verify council zoning', icon: '✓' },
  { number: 3, title: 'DA-Ready Docs', description: 'Complete documentation', icon: '📋' },
  { number: 4, title: 'Council Submission', description: 'We submit your application', icon: '📤' },
  { number: 5, title: 'Approved', description: 'Ready to build', icon: '✅' },
];

const councils = ['Noosa', 'Byron Bay', 'Yarra Valley', 'Gold Coast', 'Sunshine Coast', 'Canberra', 'Adelaide Hills', 'Geelong', 'Hobart', 'Perth', 'Fremantle', 'Coffs Harbour', 'Tamworth', 'Armidale', 'Bathurst', 'Orange', 'Dubbo', 'Wagga Wagga', 'Albury', 'Bendigo'];

export const CouncilApprovalRoadmap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mb-20"
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
            <span className="text-primary font-serif italic tracking-wide text-sm">Council Approval Made Simple</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            From Your Land to <span className="fire-text italic">Council-Approved</span> in 5 Steps
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            We've successfully navigated council approvals across 20+ Australian councils. Your home is designed to meet every requirement.
          </p>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 flex items-center justify-center mb-4 relative group hover:border-primary transition-colors"
                    whileHover={{ scale: 1.08 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-2xl mb-1">{step.icon}</span>
                      <span className="text-xs font-bold text-primary uppercase">Step {step.number}</span>
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-foreground/60 font-sans">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-primary/5 to-card/20 rounded-3xl border border-primary/10 p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center">
            Successfully Delivered to <span className="text-primary">{councils.length}+ Councils</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {councils.map((council, i) => (
              <motion.div
                key={i}
                className="bg-background/50 border border-primary/10 rounded-xl p-4 text-center hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.03, duration: 0.4 }}
              >
                <span className="text-sm font-sans text-foreground/80">{council}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <p className="text-foreground/60 mb-6 font-sans">Ready to get started?</p>
          <motion.button
            className="px-12 py-4 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Check Your Council →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
