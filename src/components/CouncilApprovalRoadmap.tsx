import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Your Land',
    description: 'Share your property address and title details. We assess suitability at no cost.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3C10.134 3 7 6.134 7 10c0 5.25 7 15 7 15s7-9.75 7-15c0-3.866-3.134-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="14" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Zoning Check',
    description: 'We verify council zoning, overlay codes, and applicable planning scheme requirements.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: 3,
    title: 'DA-Ready Docs',
    description: 'We prepare a complete documentation package: site plans, elevations, engineering, and BASIX.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 4h8l6 6v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 4v6h6M11 14h6M11 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Council Submission',
    description: 'We lodge your Development Application and manage all council correspondence on your behalf.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20l7-7 4 4 5-6 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8l4-4m0 0l-4 0m4 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: 5,
    title: 'Approved',
    description: 'Council approval in hand. We commence your build and deliver within 16 weeks.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 14l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const councils = [
  'Noosa', 'Byron Bay', 'Yarra Valley', 'Gold Coast', 'Sunshine Coast',
  'Canberra', 'Adelaide Hills', 'Geelong', 'Hobart', 'Perth',
  'Fremantle', 'Coffs Harbour', 'Tamworth', 'Armidale', 'Bathurst',
  'Orange', 'Dubbo', 'Wagga Wagga', 'Albury', 'Bendigo',
];

export const CouncilApprovalRoadmap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="council-approval" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Header */}
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
            We've successfully navigated council approvals across 20+ Australian councils. Your home is designed to meet every requirement — we handle the paperwork, you enjoy the result.
          </p>
        </motion.div>

        {/* 5-step flowchart */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 relative">
            {/* Connector line — desktop only */}
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
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 flex items-center justify-center mb-4 relative group hover:border-primary transition-colors text-primary"
                    whileHover={{ scale: 1.08 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      {step.icon}
                      <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Step {step.number}</span>
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-foreground/60 font-sans leading-relaxed">{step.description}</p>
                </div>

                {/* Mobile connector arrow */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-3">
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0v16M2 10l6 8 6-8" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Council proof card */}
        <motion.div
          className="bg-gradient-to-br from-primary/5 to-card/20 rounded-3xl border border-primary/10 p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                Successfully Delivered to <span className="text-primary">{councils.length}+ Councils</span>
              </h3>
              <p className="text-foreground/50 font-sans text-sm mt-2">
                Including Noosa, Byron Bay, Yarra Valley, and 17+ more across QLD, NSW, VIC, SA &amp; WA.
              </p>
            </div>
            {/* Badge */}
            <div className="shrink-0 ml-auto hidden md:flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 border-primary/30 bg-primary/10">
              <span className="text-2xl font-serif font-bold text-primary">20+</span>
              <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-sans">Councils</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {councils.map((council, i) => (
              <motion.div
                key={i}
                className="bg-background/50 border border-primary/10 rounded-xl p-3 text-center hover:border-primary/30 hover:bg-primary/5 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.03, duration: 0.4 }}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="3" fill="rgba(217,119,6,0.5)"/>
                  </svg>
                  <span className="text-sm font-sans text-foreground/80">{council}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <p className="text-foreground/60 mb-6 font-sans">Not sure if your council qualifies? We'll check for free.</p>
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
