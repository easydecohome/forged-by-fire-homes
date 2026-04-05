import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import TrustIndicators from './TrustIndicators';



// Scroll Progress Bar
const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400 z-40"
      style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
    />
  );
};

// Particle Background
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#B45F06';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />;
};

interface HeroProps {
  openSiteEligibilityModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ openSiteEligibilityModal }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  

  return (
    <>
      <ScrollProgressBar />
      

      <section
        ref={sectionRef}
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/forged-by-fire-homes/images/tiny-home-exterior.jpg)',
              backgroundPosition: 'center 40%',
            }}
          />
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </motion.div>

        {/* Particle Background */}
        <ParticleBackground />

        {/* Content Container */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center justify-center h-full text-center"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
          >
            A Better Way to Build.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              Simplified.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-100 max-w-3xl mb-10 leading-relaxed"
          >
            Shou Sugi Ban cabins designed for luxury, sustainability, and precise construction. Built in Rockhampton, delivered across Queensland.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mb-12"
          >
            <TrustIndicators />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-12"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(180, 95, 6, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg text-base md:text-lg"
            >
              Request a Quote
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#B45F06', backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={openSiteEligibilityModal}
              className="px-8 md:px-12 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/5 transition-all duration-300 text-base md:text-lg"
            >
              Explore Our Cabins
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-8"
          >
            <ChevronDown className="w-8 h-8 text-white opacity-60" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};
