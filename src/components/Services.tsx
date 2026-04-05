import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, Leaf, Hammer, Hop as Home, Zap, TrendingUp } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Flame className="w-8 h-8" />,
    title: 'Shou Sugi Ban Fabrication',
    description: 'Authentic Japanese charred timber cladding. Fire-treated for 75+ year durability without chemicals.',
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Cabin Design & Build',
    description: 'From compact Caldera to luxury Ridgeline. Bespoke design tailored to your vision and Queensland landscape.',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Off-Grid Solutions',
    description: 'Solar-ready systems and water storage. Complete energy independence for your sanctuary.',
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Sustainable Materials',
    description: 'Eco-friendly finishes, natural timber, and climate-responsive design. Built for generations.',
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: 'Custom Modular Solutions',
    description: 'Adaptable layouts for private residences or investment retreats. Your space, your rules.',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Investment Support',
    description: 'Premium Airbnb returns guidance and property manager connections. Engineered for capital appreciation.',
  },
];

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group p-8 rounded-xl border border-white/5 bg-gradient-to-br from-slate-800/30 to-transparent hover:border-orange-500/30 transition-all duration-300"
    >
      <motion.div
        className="text-orange-500 mb-6 group-hover:text-orange-400 transition-colors"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {service.icon}
      </motion.div>

      <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
        {service.title}
      </h3>

      <p className="text-foreground/60 text-sm leading-relaxed">
        {service.description}
      </p>

      <motion.div
        className="mt-6 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-transparent group-hover:w-full transition-all duration-500"
      />
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-slate-900/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-orange-500 font-serif italic mb-4 block tracking-wide">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
            Everything You Need to Build Your Sanctuary.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
