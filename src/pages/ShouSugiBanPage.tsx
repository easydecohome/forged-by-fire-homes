import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const ShouSugiBanPage: React.FC = () => {
  const timeline = [
    { year: '1600s', title: 'Ancient Japanese Technique', description: 'Shou Sugi Ban originated in rural Japan as a method to preserve timber for roofing and cladding.' },
    { year: '1800s', title: 'Widespread Adoption', description: 'The technique became standard in Japanese architecture, used for temples, homes, and storage structures.' },
    { year: '1950s', title: 'Post-War Revival', description: 'After WWII, Shou Sugi Ban experienced a resurgence as Japan rebuilt and sought sustainable building methods.' },
    { year: '2000s', title: 'Global Recognition', description: 'Western architects rediscovered the technique. It became a hallmark of contemporary sustainable design.' },
    { year: 'Today', title: 'Modern Luxury', description: 'Shou Sugi Ban is now synonymous with premium, eco-conscious architecture worldwide.' },
  ];

  const benefits = [
    { title: 'Fire Resistant', description: 'The charred layer creates a natural fire barrier, protecting the wood beneath.' },
    { title: '75+ Year Lifespan', description: 'Charring locks in the wood\'s cellular structure, preventing rot and decay.' },
    { title: 'Carbon Locked', description: 'The charring process seals carbon within the wood, making it a carbon sink.' },
    { title: 'Zero Maintenance', description: 'No staining, sealing, or painting required. Weather the wood naturally.' },
    { title: 'Stunning Aesthetics', description: 'Deep charcoal finish with warm amber undertones creates architectural drama.' },
    { title: 'Sustainable', description: 'Uses locally-sourced timber and traditional techniques with zero chemical treatments.' },
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
              The Ancient Art of <span className="fire-text italic">Shou Sugi Ban</span>
            </h1>
            <p className="text-xl text-foreground/60 font-sans">
              From 17th-century Japan to modern luxury. The science and soul of charred timber.
            </p>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="rounded-3xl overflow-hidden mb-20 h-96"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="./images/tiny-home-exterior.jpg" alt="Shou Sugi Ban" className="w-full h-full object-cover" />
          </motion.div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-serif font-bold mb-12">A 400-Year Journey</h2>
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="mb-8 p-8 rounded-2xl border border-white/10 bg-card/20"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="flex items-start gap-6">
                  <div className="text-3xl font-serif font-bold text-primary min-w-20">{item.year}</div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                    <p className="text-foreground/60 font-sans">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-12">Why Shou Sugi Ban?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/10 bg-card/20">
                  <h3 className="text-xl font-serif font-bold mb-3 text-primary">{benefit.title}</h3>
                  <p className="text-foreground/60 font-sans">{benefit.description}</p>
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
