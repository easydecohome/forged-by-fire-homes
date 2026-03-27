import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const team = [
  {
    name: 'Marcus Webb',
    role: 'Founder & Lead Designer',
    experience: 18,
    bio: 'Former structural engineer turned tiny home architect. Marcus spent a decade designing large-scale commercial builds before discovering that the most intentional architecture comes in the smallest packages. He personally oversees every floor plan that leaves the studio.',
    specialties: ['Structural Engineering', 'Passive Solar Design', 'Council Approvals'],
    initials: 'MW',
    color: 'from-amber-900/40 to-amber-800/20',
    borderColor: 'border-amber-700/30',
    accentColor: 'text-amber-400',
    linkedIn: '#',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Client Experience',
    experience: 11,
    bio: 'Priya manages every client relationship from first enquiry to final handover. With a background in luxury property development and a deep understanding of council processes across QLD, NSW, and VIC, she ensures no client is ever left wondering what happens next.',
    specialties: ['Council Liaison', 'Project Management', 'Investment Strategy'],
    initials: 'PS',
    color: 'from-rose-900/40 to-rose-800/20',
    borderColor: 'border-rose-700/30',
    accentColor: 'text-rose-400',
    linkedIn: '#',
  },
  {
    name: 'Tom Blackwood',
    role: 'Master Craftsman — Shou Sugi Ban',
    experience: 22,
    bio: 'Tom trained under Japanese master craftsmen in Kyoto and has spent over two decades perfecting the art of Shou Sugi Ban on Australian hardwoods. Every panel that clads a Forged by Fire home has passed through his hands. He is, quite simply, the best in the country.',
    specialties: ['Shou Sugi Ban', 'Timber Joinery', 'Material Science'],
    initials: 'TB',
    color: 'from-zinc-900/60 to-zinc-800/30',
    borderColor: 'border-zinc-600/30',
    accentColor: 'text-zinc-300',
    linkedIn: '#',
  },
  {
    name: 'Lena Hartmann',
    role: 'Off-Grid Systems Engineer',
    experience: 9,
    bio: 'Lena designs the solar, water, and waste systems that make Forged by Fire homes genuinely self-sufficient. A renewable energy engineer by training, she ensures every home can operate independently of the grid — whether it\'s in Noosa or the Northern Territory.',
    specialties: ['Solar & Battery Systems', 'Rainwater Engineering', 'Net-Zero Design'],
    initials: 'LH',
    color: 'from-green-900/40 to-green-800/20',
    borderColor: 'border-green-700/30',
    accentColor: 'text-green-400',
    linkedIn: '#',
  },
];

// SVG avatar placeholder
const Avatar: React.FC<{ initials: string; color: string; borderColor: string; accentColor: string }> = ({ initials, color, borderColor, accentColor }) => (
  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} border ${borderColor} flex items-center justify-center shrink-0`}>
    <span className={`text-2xl font-serif font-bold ${accentColor}`}>{initials}</span>
  </div>
);

export const MeetTheTeam: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.04)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

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
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">The People Behind the Build</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
            Meet the team that<br />
            <span className="fire-text italic">builds your vision.</span>
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
            Every Forged by Fire home is the product of a small, deeply experienced team. No outsourcing, no subcontractors for critical work — just four specialists who have dedicated their careers to this craft.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              className={`p-7 rounded-3xl border ${member.borderColor} bg-gradient-to-br ${member.color} hover:border-primary/30 transition-all duration-500 group`}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              {/* Top row */}
              <div className="flex items-start gap-5 mb-5">
                <Avatar
                  initials={member.initials}
                  color={member.color}
                  borderColor={member.borderColor}
                  accentColor={member.accentColor}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-0.5">{member.name}</h3>
                  <div className={`text-sm font-sans font-bold ${member.accentColor} mb-1`}>{member.role}</div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <path d="M6 3v3l2 2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-foreground/30 font-sans">{member.experience} years experience</span>
                  </div>
                </div>
                {/* LinkedIn icon */}
                <a
                  href={member.linkedIn}
                  className="shrink-0 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4.5h2v7H2v-7zM3 3.5a1 1 0 100-2 1 1 0 000 2zM6 4.5h1.9v.96C8.2 5 8.9 4.3 10 4.3c2 0 2.5 1.3 2.5 3v4.2H10.5V7.7c0-.8-.3-1.4-1-1.4-.8 0-1.5.6-1.5 1.5v3.7H6v-7z" fill="rgba(255,255,255,0.3)"/>
                  </svg>
                </a>
              </div>

              {/* Bio */}
              <p className="text-sm text-foreground/55 font-sans leading-relaxed mb-5">{member.bio}</p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-2">
                {member.specialties.map(s => (
                  <span
                    key={s}
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${member.borderColor} ${member.accentColor} bg-white/3 font-sans`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { value: '60+', label: 'Combined years experience' },
            { value: '84+', label: 'Homes delivered' },
            { value: '15+', label: 'Councils approved' },
            { value: '100%', label: 'Client satisfaction rate' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl border border-white/6 bg-card/20">
              <div className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-foreground/40 font-sans">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
