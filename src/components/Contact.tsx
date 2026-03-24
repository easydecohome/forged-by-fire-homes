import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  model: string;
  timeline: string;
  budget: string;
  land: string;
}

const models = [
  { label: 'The Ember', sub: '$185K · 38–55 sqm' },
  { label: 'The Sovereign', sub: '$295K · 65–90 sqm' },
  { label: 'The Refuge', sub: '$235K · 50–70 sqm' },
  { label: 'Not sure yet', sub: 'Help me choose' },
];
const timelines = [
  { label: 'ASAP', sub: '0–3 months' },
  { label: 'Mid-term', sub: '3–6 months' },
  { label: 'Planning ahead', sub: '6–12 months' },
  { label: 'Just exploring', sub: 'No rush' },
];
const budgets = [
  { label: '$150K–$200K', sub: 'Entry range' },
  { label: '$200K–$250K', sub: 'Mid range' },
  { label: '$250K–$300K', sub: 'Premium' },
  { label: '$300K+', sub: 'Bespoke' },
];

export const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    model: '',
    timeline: '',
    budget: '',
    land: '',
  });

  const update = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return formData.name.trim() && formData.email.trim();
    if (step === 2) return formData.model;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.06)_0,transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-serif italic mb-4 block tracking-wide">Touch the Timber</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              Commission your <br />
              <span className="fire-text italic">sanctuary</span>
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl leading-relaxed mb-12">
              Every Forged by Fire home begins with a conversation. Tell us about your land, your vision, and what you want to feel when you arrive home. We handle everything from there.
            </p>

            <p className="text-foreground/40 text-base font-sans italic mb-12 max-w-md leading-relaxed">
              Or better yet — visit our workshop and run your hand across the Shou Sugi Ban surface. There is no substitute for that first touch.
            </p>

            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 font-sans mb-1">Australia Wide</div>
                  <div className="text-foreground/70 font-sans">+61 (02) 9000 0000</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 font-sans mb-1">Email</div>
                  <div className="text-foreground/70 font-sans">hello@forgedbyfire.com</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-foreground/30 font-sans mb-1">Serving</div>
                  <div className="text-foreground/70 font-sans text-sm">Queensland · New South Wales · Victoria · South Australia · Tasmania · Western Australia</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right column — multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden card-shine-wrapper">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none rounded-3xl" />
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(217,119,6,0.1), transparent, rgba(217,119,6,0.05))' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-10">
                      {([1, 2, 3] as Step[]).map((s) => (
                        <React.Fragment key={s}>
                          <motion.div
                            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold font-sans transition-all duration-500 ${
                              step >= s
                                ? 'bg-primary text-background'
                                : 'border border-white/20 text-foreground/30'
                            }`}
                            animate={{ scale: step === s ? 1.1 : 1 }}
                          >
                            {step > s ? (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : s}
                          </motion.div>
                          {s < 3 && (
                            <motion.div
                              className="flex-1 h-[1px]"
                              style={{ background: step > s ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.1)' }}
                              animate={{ scaleX: step > s ? 1 : 0.3, originX: 0 }}
                              transition={{ duration: 0.4 }}
                            />
                          )}
                        </React.Fragment>
                      ))}
                      <span className="ml-2 text-xs text-foreground/30 font-sans uppercase tracking-widest">
                        Step {step} of 3
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-2xl font-serif font-bold mb-2">Let's start with you</h3>
                            <p className="text-foreground/50 text-sm font-sans">Tell us who you are so we can personalise your experience.</p>
                          </div>

                          <div className="space-y-4">
                            <div className="group form-field-enhanced">
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-2">Full Name *</label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={e => update('name', e.target.value)}
                                placeholder="Johnathan Smith"
                                required
                                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 font-sans"
                              />
                            </div>
                            <div className="group">
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-2">Email Address *</label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={e => update('email', e.target.value)}
                                placeholder="jsmith@architect.com"
                                required
                                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 font-sans"
                              />
                            </div>
                            <div className="group form-field-enhanced">
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-2">Phone (optional)</label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => update('phone', e.target.value)}
                                placeholder="+61 400 000 000"
                                className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 font-sans"
                              />
                            </div>
                            {/* Social proof nudge */}
                            <motion.div
                              className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              <div className="flex -space-x-2">
                                {['M','S','P','D'].map((l, i) => (
                                  <div key={i} className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">{l}</div>
                                ))}
                              </div>
                              <p className="text-xs text-foreground/50 font-sans"><span className="text-primary font-bold">84 clients</span> commissioned their sanctuary this year</p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-2xl font-serif font-bold mb-2">Your sanctuary vision</h3>
                            <p className="text-foreground/50 text-sm font-sans">Help us understand what you're looking for.</p>
                          </div>

                          <div className="space-y-5">
                            <div>
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-3">Which model interests you? *</label>
                              <div className="grid grid-cols-2 gap-3">
                                {models.map(m => (
                                  <motion.button
                                    key={m.label}
                                    type="button"
                                    onClick={() => update('model', m.label)}
                                    className={`option-card p-3 rounded-xl border text-sm font-sans text-left transition-all duration-300 ${
                                      formData.model === m.label
                                        ? 'selected'
                                        : ''
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="font-bold text-foreground/80">{m.label}</div>
                                    <div className="text-[11px] text-foreground/40 mt-0.5">{m.sub}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-3">Timeline</label>
                              <div className="grid grid-cols-2 gap-3">
                                {timelines.map(t => (
                                  <motion.button
                                    key={t.label}
                                    type="button"
                                    onClick={() => update('timeline', t.label)}
                                    className={`option-card p-3 rounded-xl border text-xs font-sans text-left transition-all duration-300 ${
                                      formData.timeline === t.label ? 'selected' : ''
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="font-bold text-foreground/80">{t.label}</div>
                                    <div className="text-[11px] text-foreground/40 mt-0.5">{t.sub}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-3">Budget range</label>
                              <div className="grid grid-cols-2 gap-3">
                                {budgets.map(b => (
                                  <motion.button
                                    key={b.label}
                                    type="button"
                                    onClick={() => update('budget', b.label)}
                                    className={`option-card p-3 rounded-xl border text-sm font-sans text-left transition-all duration-300 ${
                                      formData.budget === b.label ? 'selected' : ''
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="font-bold text-foreground/80">{b.label}</div>
                                    <div className="text-[11px] text-foreground/40 mt-0.5">{b.sub}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="space-y-6"
                        >
                          <div>
                            <h3 className="text-2xl font-serif font-bold mb-2">Tell us about your land</h3>
                            <p className="text-foreground/50 text-sm font-sans">The more you share, the better we can tailor your commission.</p>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-2">Describe your land & vision</label>
                            <textarea
                              value={formData.land}
                              onChange={e => update('land', e.target.value)}
                              placeholder="Rugged coastal lot, forest retreat, hilltop with views..."
                              rows={5}
                              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 font-sans resize-none"
                            />
                          </div>

                          {/* Summary */}
                          <div className="bg-background/30 rounded-xl p-4 border border-white/5 space-y-2">
                            <div className="text-xs uppercase tracking-widest text-foreground/30 font-sans font-bold mb-3">Your commission summary</div>
                            {[
                              { label: 'Name', value: formData.name },
                              { label: 'Email', value: formData.email },
                              { label: 'Model', value: formData.model || 'Not selected' },
                              { label: 'Timeline', value: formData.timeline || 'Not selected' },
                            ].map(item => (
                              <div key={item.label} className="flex justify-between text-sm">
                                <span className="text-foreground/40 font-sans">{item.label}</span>
                                <span className="text-foreground/70 font-sans">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex gap-4 mt-8">
                      {step > 1 && (
                        <motion.button
                          type="button"
                          onClick={() => setStep((s) => (s - 1) as Step)}
                          className="flex-1 py-4 border border-white/10 rounded-xl text-foreground/60 hover:text-foreground hover:border-white/30 transition-all duration-300 font-sans text-sm"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          ← Back
                        </motion.button>
                      )}

                      {step < 3 ? (
                        <motion.button
                          type="button"
                          onClick={() => { if (canProceed()) setStep((s) => (s + 1) as Step); }}
                          disabled={!canProceed()}
                          className={`flex-1 py-4 rounded-xl font-serif text-lg font-bold transition-all duration-300 ${
                            canProceed()
                              ? 'bg-primary text-white hover:bg-primary/90 fire-glow'
                              : 'bg-white/5 text-foreground/30 cursor-not-allowed'
                          }`}
                          whileHover={canProceed() ? { scale: 1.02 } : {}}
                          whileTap={canProceed() ? { scale: 0.98 } : {}}
                        >
                          Continue →
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          className="flex-1 py-4 rounded-xl bg-primary text-white font-serif text-lg font-bold hover:bg-primary/90 fire-glow transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Commission My Sanctuary
                        </motion.button>
                      )}
                    </div>

                    {/* Trust signals */}
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1l2.928 6.472L20 8.472l-5 4.944 1.18 6.956L10 17.472l-6.18 2.9L5 13.416 0 8.472l7.072-.999L10 1z" clipRule="evenodd"/></svg>
                        <span className="text-[10px] text-foreground/30 font-sans">4.97 Google Rating</span>
                      </div>
                      <div className="w-px h-3 bg-white/10" />
                      <span className="text-[10px] text-foreground/30 font-sans">24hr response</span>
                      <div className="w-px h-3 bg-white/10" />
                      <span className="text-[10px] text-foreground/30 font-sans">No obligation</span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl font-serif font-bold mb-4">Your commission is received</h3>
                    <p className="text-foreground/60 font-sans mb-8 max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. We'll be in touch within 24 hours to begin your sanctuary journey.
                    </p>
                    <div className="text-xs uppercase tracking-[0.2em] text-primary font-bold font-sans">
                      焼き杉 · Forged by Fire
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
