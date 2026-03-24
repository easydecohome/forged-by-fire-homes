import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '100%', numericValue: 100, suffix: '%', prefix: '', label: 'Authentic Shou Sugi Ban' },
  { value: 'AUS', numericValue: 0, suffix: '', prefix: '', label: 'Australian Built' },
  { value: '75yr+', numericValue: 75, suffix: 'yr+', prefix: '', label: 'Timber Longevity' },
];

const CountUp: React.FC<{ stat: StatItem; inView: boolean }> = ({ stat, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.numericValue === 0) return;
    let start = 0;
    const end = stat.numericValue;
    const duration = 1800;
    const step = (end / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, stat.numericValue]);

  if (stat.numericValue === 0) {
    return (
      <motion.span
        className="text-4xl md:text-5xl font-serif font-bold text-primary counter-glow-anim"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        {stat.value}
      </motion.span>
    );
  }

  return (
    <span className="text-4xl md:text-5xl font-serif font-bold text-primary counter-glow-anim">
      {stat.prefix}{inView ? count : 0}{stat.suffix}
    </span>
  );
};

export const StatsBar: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-3 gap-8 py-8 border-t border-b border-white/10"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex flex-col items-center text-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.15 }}
        >
          <CountUp stat={stat} inView={inView} />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/50 font-sans">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
