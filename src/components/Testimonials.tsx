import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    initial: 'M',
    name: 'Michael R.',
    role: 'Retreat Investor, Yeppoon QLD',
    quote: "I've owned properties across Australia for 20 years. Nothing commands the kind of attention — or the Airbnb rates — that our Forged by Fire home does. Guests ask about the timber before they even see the inside.",
    rating: 5,
  },
  {
    initial: 'S',
    name: 'Sarah & Tom K.',
    role: 'Private Homeowners, Capricorn Coast',
    quote: "The team understood what we wanted before we could articulate it. The Shou Sugi Ban exterior is genuinely unlike anything else. It belongs here — and nowhere else.",
    rating: 5,
  },
  {
    initial: 'P',
    name: 'Priya N.',
    role: 'Eco-Luxury Retreat Owner',
    quote: "We were nervous about modular builds. Forged by Fire changed everything we thought we knew. The craftsmanship, the material quality, the process — it felt like commissioning architecture, not buying a product.",
    rating: 5,
  },
];

const StarRating: React.FC<{ count: number; inView: boolean; delay: number }> = ({ count, inView, delay }) => (
  <div className="flex gap-1 mb-6">
    {Array.from({ length: count }).map((_, i) => (
      <motion.svg
        key={i}
        className="w-4 h-4 text-primary fill-primary"
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: delay + i * 0.08, type: 'spring', stiffness: 300 }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </motion.svg>
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive(a => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setDirection(i > active ? 1 : -1);
    setActive(i);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
  };

  return (
    <section ref={ref} id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.04)_0,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary font-serif italic mb-4 block tracking-wide">Client Voices</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
            What our <span className="fire-text italic">clients</span> say
          </h2>
          <p className="text-foreground/50 mt-4 font-sans text-lg">
            From Australian homeowners to our most acclaimed eco-retreat operators.
          </p>
        </motion.div>

        {/* Main testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden min-h-[280px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <div className="bg-card/40 backdrop-blur-sm border border-white/8 rounded-3xl p-8 md:p-12 relative overflow-hidden h-full">
                  {/* Background quote mark */}
                  <div className="absolute top-6 right-8 text-[120px] font-serif text-primary/5 leading-none select-none">"</div>

                  <StarRating count={testimonials[active].rating} inView={inView} delay={0.1} />

                  <blockquote className="text-xl md:text-2xl font-serif italic text-foreground/90 leading-relaxed mb-8">
                    "{testimonials[active].quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center"
                      whileHover={{ scale: 1.1, borderColor: 'hsl(var(--primary))' }}
                    >
                      <span className="text-primary font-serif font-bold text-lg">{testimonials[active].initial}</span>
                    </motion.div>
                    <div>
                      <div className="font-serif font-bold text-foreground">{testimonials[active].name}</div>
                      <div className="text-sm text-foreground/50 font-sans italic">{testimonials[active].role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'bg-primary w-8 h-2' : 'bg-white/20 w-2 h-2 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* All testimonials grid (visible below) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-500 ${
                  i === active
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-white/5 bg-card/20 hover:border-white/15'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                onClick={() => goTo(i)}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-serif font-bold">{t.initial}</span>
                  </div>
                  <div>
                    <div className="font-serif font-bold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-foreground/40 font-sans italic">{t.role}</div>
                  </div>
                </div>
                <p className="text-foreground/50 text-xs font-sans italic leading-relaxed line-clamp-3">
                  "{t.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
