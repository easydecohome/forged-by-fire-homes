import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const pathways = [
  {
    id: 'land-equity',
    title: 'Land Equity',
    subtitle: 'Use your existing property',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 28h24M8 28V16l8-8 8 8v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="13" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    features: [
      'Access equity in land you already own',
      'Typically lowest interest rate option',
      'No cash deposit required',
      'Loan secured against land title',
      'Suitable for rural & lifestyle properties',
    ],
    bestFor: 'Landowners with equity',
    rate: 'From 6.5% p.a.',
    featured: false,
  },
  {
    id: 'chattel-mortgage',
    title: 'Chattel Mortgage',
    subtitle: 'Business & investment buyers',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 20h4M18 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 5l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    features: [
      'Claim full GST input tax credit upfront',
      'Depreciation deductions available',
      'Flexible balloon payment options',
      'Fixed interest rate — budget certainty',
      'Ideal for Airbnb investment properties',
    ],
    bestFor: 'Investment & business use',
    rate: 'From 7.2% p.a.',
    featured: true,
  },
  {
    id: 'unsecured',
    title: 'Unsecured Finance',
    subtitle: 'No property security needed',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 16l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8v2M16 22v2M8 16h2M22 16h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    features: [
      'No land or property required as security',
      'Fast approval — typically 48–72 hours',
      'Borrow up to $250,000 unsecured',
      'Terms from 1–7 years',
      'Suitable for owner-occupiers & investors',
    ],
    bestFor: 'No existing property',
    rate: 'From 8.9% p.a.',
    featured: false,
  },
];

interface PrequalFormData {
  name: string;
  email: string;
  phone: string;
  pathway: string;
  amount: string;
}

const PrequalModal: React.FC<{ open: boolean; onClose: () => void; defaultPathway?: string }> = ({ open, onClose, defaultPathway }) => {
  const [form, setForm] = useState<PrequalFormData>({
    name: '',
    email: '',
    phone: '',
    pathway: defaultPathway || 'chattel-mortgage',
    amount: '185000',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, submit to a form backend (e.g. Formspree, Netlify Forms)
    console.log('Finance pre-qual:', form);
    setSubmitted(true);
  };

  const update = (field: keyof PrequalFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-background border border-primary/30 rounded-3xl p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-white/30 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="text-center py-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 14l5 5 11-11" stroke="rgba(217,119,6,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">You're Pre-Qualified!</h3>
                  <p className="text-foreground/60 font-sans text-sm leading-relaxed mb-6">
                    Our finance team will contact you within 2 business hours to confirm your pre-qualification and discuss your options.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-primary text-white font-serif font-bold rounded-xl fire-glow"
                  >
                    Back to Site
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-[1px] w-6 bg-primary" />
                      <span className="text-primary text-xs uppercase tracking-widest font-bold font-sans">2-Minute Pre-Qualification</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">Check Your Finance Options</h3>
                    <p className="text-foreground/50 font-sans text-sm mt-1">No credit check. No obligation. Results in 2 minutes.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={e => update('phone', e.target.value)}
                          placeholder="04xx xxx xxx"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Finance Pathway</label>
                      <select
                        value={form.pathway}
                        onChange={e => update('pathway', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option value="land-equity">Land Equity</option>
                        <option value="chattel-mortgage">Chattel Mortgage</option>
                        <option value="unsecured">Unsecured Finance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Finance Amount</label>
                      <select
                        value={form.amount}
                        onChange={e => update('amount', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option value="185000">$185,000 — The Ember</option>
                        <option value="235000">$235,000 — The Refuge</option>
                        <option value="295000">$295,000 — The Sovereign</option>
                        <option value="custom">Custom amount</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow mt-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Pre-Qualify in 2 Minutes →
                    </motion.button>
                  </form>

                  <p className="text-[10px] text-foreground/25 font-sans text-center mt-4 leading-relaxed">
                    By submitting you agree to be contacted by our finance team. No credit check is performed at this stage. Subject to lender approval.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FinanceOptions: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<string | undefined>(undefined);

  const openModal = (pathway?: string) => {
    setSelectedPathway(pathway);
    setModalOpen(true);
  };

  return (
    <>
      <PrequalModal open={modalOpen} onClose={() => setModalOpen(false)} defaultPathway={selectedPathway} />

      <section ref={ref} id="finance" className="py-24 md:py-36 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.05)_0,transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            className="max-w-3xl mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-serif italic tracking-wide text-sm">Finance Options</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
              Three Pathways to <span className="fire-text italic">Ownership</span>
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
              Whether you own land, run a business, or are starting from scratch — there's a finance pathway designed for your situation. Pre-qualify in 2 minutes with no credit check.
            </p>
          </motion.div>

          {/* Three pathway cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {pathways.map((pathway, i) => (
              <motion.div
                key={pathway.id}
                className={`relative rounded-3xl border p-8 flex flex-col transition-all duration-300 ${
                  pathway.featured
                    ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-card/30 shadow-[0_8px_40px_rgba(217,119,6,0.15)]'
                    : 'border-white/10 bg-card/20 hover:border-primary/25 hover:bg-primary/5'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                {pathway.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-background text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`text-primary mb-5 ${pathway.featured ? 'text-primary' : 'text-foreground/60'}`}>
                  {pathway.icon}
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-1">{pathway.title}</h3>
                <p className="text-sm text-foreground/50 font-sans mb-5">{pathway.subtitle}</p>

                <div className="space-y-2.5 mb-6 flex-1">
                  {pathway.features.map((feature, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7" fill="rgba(217,119,6,0.15)" stroke="rgba(217,119,6,0.5)" strokeWidth="1"/>
                        <path d="M5 8l2 2 4-4" stroke="rgba(217,119,6,0.9)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-foreground/70 font-sans">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/8 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans">Best For</div>
                      <div className="text-sm font-sans text-foreground/70 mt-0.5">{pathway.bestFor}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans">Rate</div>
                      <div className="text-sm font-serif font-bold text-primary mt-0.5">{pathway.rate}</div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => openModal(pathway.id)}
                    className={`w-full py-3 rounded-xl font-serif font-bold text-sm transition-all duration-300 ${
                      pathway.featured
                        ? 'bg-primary text-white fire-glow'
                        : 'border border-primary/30 text-primary hover:bg-primary/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Pre-Qualify →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Big CTA banner */}
          <motion.div
            className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-card/20 flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">Not sure which pathway suits you?</h3>
              <p className="text-foreground/60 font-sans">Our finance specialists will match you to the right product in a free 15-minute call.</p>
            </div>
            <motion.button
              onClick={() => openModal()}
              className="shrink-0 px-10 py-5 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow whitespace-nowrap flex items-center gap-3"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Pre-qualify in 2 Minutes
            </motion.button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="mt-8 text-[10px] text-foreground/20 font-sans text-center leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Finance rates are indicative only and subject to lender approval. Forged by Fire Homes is not a licensed credit provider. All finance applications are referred to accredited third-party lenders. Please seek independent financial advice before committing to any finance product.
          </motion.p>
        </div>
      </section>
    </>
  );
};
