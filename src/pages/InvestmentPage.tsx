import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ROICalculator } from '../components/ROICalculator';

export const InvestmentPage: React.FC = () => {
  const scenarios = [
    {
      title: 'Conservative',
      description: 'Modest Airbnb bookings, 40% occupancy',
      monthlyIncome: 1040,
      annualIncome: 12480,
      roi: '6.7%',
    },
    {
      title: 'Realistic',
      description: 'Strong bookings, 60% occupancy',
      monthlyIncome: 1560,
      annualIncome: 18720,
      roi: '10.1%',
    },
    {
      title: 'Optimistic',
      description: 'Premium location, 80% occupancy',
      monthlyIncome: 2080,
      annualIncome: 24960,
      roi: '13.5%',
    },
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
              Investment <span className="fire-text italic">Potential</span>
            </h1>
            <p className="text-xl text-foreground/60 font-sans">
              Turn your tiny home into an income-generating asset. Real numbers. Real potential.
            </p>
          </motion.div>

          {/* ROI Calculator */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <ROICalculator />
          </motion.div>

          {/* Scenarios */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-12">Income Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scenarios.map((scenario, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/10 bg-card/20">
                  <h3 className="text-2xl font-serif font-bold mb-2">{scenario.title}</h3>
                  <p className="text-sm text-foreground/60 mb-6 font-sans">{scenario.description}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-widest mb-1">Monthly Income</p>
                      <p className="text-3xl font-serif font-bold text-primary">${scenario.monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 uppercase tracking-widest mb-1">Annual Income</p>
                      <p className="text-2xl font-serif font-bold">${scenario.annualIncome.toLocaleString()}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-foreground/50 uppercase tracking-widest mb-1">Annual ROI</p>
                      <p className="text-3xl font-serif font-bold text-primary">{scenario.roi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            className="mt-20 p-12 rounded-3xl border border-white/10 bg-card/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <h3 className="text-2xl font-serif font-bold mb-8">Key Investment Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Base Price', value: '$185K' },
                { label: 'Avg. Nightly Rate', value: '$280–$350' },
                { label: 'Payback Period', value: '8–12 years' },
                { label: 'Appreciation', value: '3–5% p.a.' },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm text-foreground/50 uppercase tracking-widest mb-2">{metric.label}</p>
                  <p className="text-3xl font-serif font-bold text-primary">{metric.value}</p>
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
