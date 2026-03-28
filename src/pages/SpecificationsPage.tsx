import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const SpecificationsPage: React.FC = () => {
  const specs = [
    { category: 'Dimensions', items: ['Length: 12.09m', 'Width: 3.44m', 'Height: 3.28m', 'Floor Area: ~40 sqm'] },
    { category: 'Structure', items: ['Shou Sugi Ban timber cladding', 'Steel frame foundation', 'Engineered hardwood floors', 'Insulated walls (R2.5)'] },
    { category: 'Kitchen', items: ['Integrated Miele cooktop & oven', 'Carrara marble benchtop', 'High-flow chef\'s sink', 'Full-height glazing', 'Custom joinery'] },
    { category: 'Bedroom', items: ['Bespoke king bed frame', 'Luxe linen set included', 'Dark walnut accent wall', 'Full-height glazing', 'Integrated lighting'] },
    { category: 'Bathroom', items: ['Carrara marble vanity', 'Wall-hung concealed toilet', 'Rainfall shower head', 'Heated towel rail', 'Marble floor tiles'] },
    { category: 'Finishes', items: ['Premium paint finishes', 'Solid timber doors', 'Stainless steel hardware', 'LED downlighting', 'Bespoke joinery throughout'] },
  ];

  const inclusions = [
    'Shou Sugi Ban charred timber exterior',
    'Integrated Miele kitchen appliances',
    'Carrara marble vanity & benchtop',
    'Bespoke king bed frame with linen',
    'Full-height minimalist glazing',
    'Engineered hardwood flooring',
    'LED lighting throughout',
    'Underfloor heating ready',
    'Council approval documentation',
    'Delivery to site (within 200km)',
    'Site prep consultation',
    ' 10-year structural warranty',
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
              Complete <span className="fire-text italic">Specifications</span>
            </h1>
            <p className="text-xl text-foreground/60 font-sans">
              Every detail of The Elite Living tiny home, from dimensions to finishes.
            </p>
          </motion.div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl border border-white/10 bg-card/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <h3 className="text-2xl font-serif font-bold mb-6 text-primary">{spec.category}</h3>
                <ul className="space-y-3">
                  {spec.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-foreground/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Inclusions */}
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-8">What's Included</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inclusions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-card/10 border border-white/5">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-foreground/80">{item}</span>
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
