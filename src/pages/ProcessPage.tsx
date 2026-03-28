import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ProcessPage: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Your Land',
      description: 'Bring your land, or we can help you find one. Minimum 50sqm, level or gently sloping.',
      icon: '🏞️',
    },
    {
      number: 2,
      title: 'Zoning Check',
      description: 'We verify council zoning and advise on feasibility. Most councils approve within 4 weeks.',
      icon: '✓',
    },
    {
      number: 3,
      title: 'DA-Ready Docs',
      description: 'We prepare all council documentation. Our architects handle the technical drawings.',
      icon: '📋',
    },
    {
      number: 4,
      title: 'Council Submission',
      description: 'We submit to council on your behalf. Average approval time: 6–8 weeks.',
      icon: '🏛️',
    },
    {
      number: 5,
      title: 'Approved & Built',
      description: 'Once approved, construction begins. Delivered in 16 weeks. Move in and enjoy.',
      icon: '🔨',
    },
  ];

  const councils = [
    'Noosa Shire', 'Byron Bay', 'Yarra Valley', 'Adelaide Hills', 'Mornington Peninsula',
    'Gold Coast', 'Sunshine Coast', 'Coffs Harbour', 'Tweed Heads', 'Tamworth',
    'Armidale', 'Canberra', 'Hobart', 'Launceston', 'Perth', 'Margaret River',
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <motion.div
            className="max-w-4xl mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Council Approval <span className="fire-text italic">Roadmap</span>
            </h1>
            <p className="text-xl text-foreground/60 font-sans">
              From your land to council approval in 5 clear steps. We handle the paperwork.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="mb-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex gap-8 mb-12 items-start"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-2xl mb-4">
                    {step.icon}
                  </div>
                  {i < steps.length - 1 && <div className="w-1 h-24 bg-gradient-to-b from-primary/50 to-transparent" />}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-serif font-bold mb-2">Step {step.number}: {step.title}</h3>
                  <p className="text-foreground/60 font-sans">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Councils */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-8">Successfully Approved In</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {councils.map((council, i) => (
                <div key={i} className="p-4 rounded-lg bg-card/20 border border-white/10 text-center">
                  <p className="text-sm font-sans text-foreground/70">{council}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};
