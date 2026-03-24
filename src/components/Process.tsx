import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Site & Vision Consultation',
    description: 'We begin with your land, your landscape, and your life. Our designers map every elevation, orientation, and outlook before a single plan is drawn.',
  },
  {
    number: '02',
    title: 'Bespoke Design',
    description: 'No templates. No compromises. Your Forged by Fire home is drafted from first principles — with Shou Sugi Ban cladding customised in texture, depth, and finish to match your vision.',
  },
  {
    number: '03',
    title: 'Precision Fabrication',
    description: 'Each module is built in our precision facility with aircraft-grade precision. Every joint, every surface, every detail reviewed before it leaves our workshop.',
  },
  {
    number: '04',
    title: 'Delivered Across Australia',
    description: 'From the Capricorn Coast to the Whitsundays, the Granite Belt to the Gulf — we deliver and install across all of Australia with a dedicated project manager by your side.',
  },
  {
    number: '05',
    title: 'Concierge Aftercare',
    description: 'Our relationship does not end at handover. We offer a 10-year structural warranty and ongoing maintenance concierge for every Forged by Fire home in our family.',
  },
  {
    number: '06',
    title: 'Investment Certainty',
    description: 'Forged by Fire homes are engineered for premium Airbnb returns and long-term capital appreciation. We connect you with property managers who specialise in architectural retreat assets.',
  },
];

const StepCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Number */}
      <motion.div
        className="flex-shrink-0 w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center relative"
        whileHover={{ borderColor: 'hsl(var(--primary))', backgroundColor: 'rgba(217,119,6,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        />
        <span className="text-primary font-serif font-bold text-lg">{step.number}</span>
      </motion.div>

      {/* Content */}
      <div className={`flex-1 pb-12 ${isEven ? '' : 'text-right md:text-right'}`}>
        <h3 className="text-xl md:text-2xl font-serif font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {step.title}
        </h3>
        <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed italic tracking-wide max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="process" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary font-serif italic mb-4 block tracking-wide">Our Process · Australia Wide</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight max-w-3xl">
            From vision to sanctuary —{' '}
            <br />every <span className="fire-text italic">step</span> considered
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
            We are Australia's specialists in luxury Shou Sugi Ban architecture. Our process is unhurried, personal, and built around your outcome.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-primary/20"
              style={{ height: lineHeight, originY: 0 }}
            />
          </div>

          <div className="space-y-2">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
