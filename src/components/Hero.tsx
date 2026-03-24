import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { StatsBar } from './StatsBar';

// Fire particle canvas
const FireCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number;
    }

    const particles: Particle[] = [];
    const MAX = 80;

    const spawn = () => {
      const x = Math.random() * canvas.width;
      particles.push({
        x,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 2.5 + 1.5),
        life: 0,
        maxLife: Math.random() * 120 + 80,
        size: Math.random() * 4 + 2,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      while (particles.length < MAX) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.15;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.45;
        const size = p.size * (1 - progress * 0.5);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3);
        if (progress < 0.3) {
          gradient.addColorStop(0, `rgba(255, 220, 100, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(230, 100, 20, ${alpha * 0.6})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
        } else if (progress < 0.7) {
          gradient.addColorStop(0, `rgba(220, 80, 20, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(150, 30, 10, ${alpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
        } else {
          gradient.addColorStop(0, `rgba(80, 20, 5, ${alpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// Animated headline word-by-word
const AnimatedHeadline: React.FC = () => {
  const words = [
    { text: 'Where', fire: false },
    { text: 'fire', fire: true },
    { text: 'meets', fire: false },
    { text: '\n', fire: false },
    { text: 'timber.', fire: true },
    { text: '\n', fire: false },
    { text: 'Where', fire: false },
    { text: 'craft', fire: false },
    { text: 'becomes', fire: false },
    { text: 'home.', fire: false },
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
  };
  const wordAnim = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const lines: Array<Array<{ text: string; fire: boolean }>> = [[], [], []];
  let lineIdx = 0;
  words.forEach(w => {
    if (w.text === '\n') { lineIdx++; }
    else { lines[lineIdx].push(w); }
  });

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground tracking-tight leading-[0.9] mb-8 max-w-5xl"
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((w, wi) => (
            <motion.span
              key={wi}
              variants={wordAnim}
              className={`inline-block mr-[0.25em] ${w.fire ? 'hero-shimmer-text italic' : ''}`}
            >
              {w.text}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

// Floating ember dot
const EmberDot: React.FC<{ delay: number; x: number }> = ({ delay, x }) => (
  <motion.div
    className="absolute bottom-0 rounded-full bg-primary/70"
    style={{ left: `${x}%`, width: 3, height: 3 }}
    animate={{
      y: [0, -400],
      x: [0, (x - 50) * 0.4],
      opacity: [0, 0.9, 0],
      scale: [0.5, 1.5, 0.2],
    }}
    transition={{
      duration: 4 + Math.random() * 3,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  />
);

// Scroll progress bar
const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
};

// Cursor glow
const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave); };
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0 }} />;
};

// Floating badge tags
const FloatingBadges: React.FC = () => {
  const badges = [
    { text: 'Shou Sugi Ban', delay: 0, x: '8%', y: '30%' },
    { text: 'Australian Built', delay: 1.5, x: '85%', y: '25%' },
    { text: '75yr+ Longevity', delay: 3, x: '12%', y: '65%' },
    { text: 'Net-Zero Ready', delay: 2, x: '80%', y: '60%' },
  ];
  return (
    <>
      {badges.map((b, i) => (
        <motion.div key={i}
          className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-background/40 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold text-primary/70 z-20 pointer-events-none"
          style={{ left: b.x, top: b.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.8, 0.8, 0], scale: [0.8, 1, 1, 0.8], y: [0, -8, -8, -16] }}
          transition={{ duration: 5, delay: b.delay, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {b.text}
        </motion.div>
      ))}
    </>
  );
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const embers = Array.from({ length: 14 }, (_, i) => ({
    delay: i * 0.35,
    x: 3 + i * 7,
  }));

  return (
    <>
      <ScrollProgressBar />
      <CursorGlow />
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.img
          src="./images/tiny-home-exterior.jpg"
          alt="Forged by Fire — Shou Sugi Ban Tiny Home Exterior"
          className="w-full h-full object-cover grayscale opacity-50"
          style={{ scale: 1.1 }}
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: 'spring', stiffness: 30, damping: 20 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0,transparent_60%)] z-10" />
      </motion.div>

      {/* Fire Canvas */}
      <FireCanvas />

      {/* Floating embers */}
      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
        {embers.map((e, i) => (
          <EmberDot key={i} delay={e.delay} x={e.x} />
        ))}
      </div>

      {/* Floating Badges */}
      <FloatingBadges />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 relative z-20 pt-20 flex flex-col items-center text-center"
        style={{ y: textY, opacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="h-[1px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <span className="text-primary tracking-widest uppercase text-xs font-bold leading-none">
            Crafted in Australia
          </span>
          <motion.div
            className="h-[1px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Animated Headline */}
        <AnimatedHeadline />

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-foreground/70 max-w-2xl font-sans mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Escape the mortgage trap. Stop paying rent. Start earning Airbnb income. Our Shou Sugi Ban tiny homes are delivered turnkey in 16 weeks — off-grid ready, council-approved, and built to last 75 years.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-white border-none transition-all duration-500 fire-glow relative overflow-hidden"
              onClick={() => document.getElementById('ourwork')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Sanctuaries
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-7 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500"
              onClick={() => document.getElementById('thematerial')?.scrollIntoView({ behavior: 'smooth' })}
            >
              The Material Story
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        className="w-full max-w-6xl mx-auto px-6 mb-12 relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.8 }}
      >
        <StatsBar />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-sans font-bold">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Bottom fire line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
    </>
  );
};
