import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Project {
  name: string;
  location: string;
  year: string;
  type: string;
  description: string;
  image?: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'Riverside Modular Living',
    location: 'Capricorn Coast, QLD',
    year: '2025',
    type: 'Investment Retreat',
    description: 'Premium Airbnb cabin with panoramic views. The Hearth model showcasing dual-income potential.',
    color: 'from-blue-600/20 to-transparent',
  },
  {
    name: 'Northline Family Home',
    location: 'Rockhampton, QLD',
    year: '2025',
    type: 'Private Residence',
    description: 'Custom Ridgeline with chef kitchen and study. A sanctuary for multigenerational living.',
    color: 'from-emerald-600/20 to-transparent',
  },
  {
    name: 'Driftwood Micro Home',
    location: 'Mackay Region, QLD',
    year: '2024',
    type: 'Solo Retreat',
    description: 'Compact Caldera model. Intimate space designed for creative professionals and minimalists.',
    color: 'from-amber-600/20 to-transparent',
  },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br to-slate-900 border border-white/5 hover:border-orange-500/20 transition-all duration-300 h-80">
        {/* Background gradient placeholder */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color}`}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                {project.type}
              </span>
              <span className="text-xs text-foreground/40">{project.year}</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
              {project.name}
            </h3>
            <p className="text-sm text-foreground/60 mb-4">{project.location}</p>
          </div>

          <div>
            <p className="text-sm text-foreground/70 mb-6 leading-relaxed italic">
              {project.description}
            </p>
            <motion.div
              className="flex items-center gap-2 text-orange-500 font-semibold text-sm"
              whileHover={{ gap: 8 }}
            >
              Learn more
              <motion.div whileHover={{ x: 4 }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </motion.div>
  );
};

export const FeaturedProjects: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-orange-500 font-serif italic mb-4 block tracking-wide">
            What We Create
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
            Designed to Adapt — Inside and Out.
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl">
            Recent commissions showcase the versatility of Shou Sugi Ban architecture across Queensland's most coveted locations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.name} project={project} index={idx} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-3 border border-orange-500/30 text-orange-500 font-semibold rounded-lg hover:bg-orange-500/10 transition-all duration-300">
            Explore All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};
