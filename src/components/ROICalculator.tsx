import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface CalcState {
  model: 'ember' | 'sovereign' | 'refuge';
  nightlyRate: number;
  occupancyRate: number;
  managementFee: number;
  landCost: number;
}

const modelData = {
  ember:    { name: 'The Ember',    price: 185000, sqm: '38–55 sqm', beds: '1 bed' },
  sovereign:{ name: 'The Sovereign',price: 295000, sqm: '65–90 sqm', beds: '2 bed' },
  refuge:   { name: 'The Refuge',   price: 235000, sqm: '50–70 sqm', beds: '1–2 bed' },
};

const benchmarks = {
  ember:    { low: 280, mid: 420, high: 580 },
  sovereign:{ low: 420, mid: 620, high: 850 },
  refuge:   { low: 320, mid: 480, high: 680 },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(n);
}

function formatPct(n: number) {
  return `${n.toFixed(1)}%`;
}

const SliderInput: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
  hint?: string;
}> = ({ label, value, min, max, step, format, onChange, hint }) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <label className="text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans">{label}</label>
        <motion.span
          key={value}
          className="text-xl font-serif font-bold text-primary"
          initial={{ scale: 1.15, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {format(value)}
        </motion.span>
      </div>
      <div className="relative h-2 rounded-full bg-white/10">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background shadow-lg pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      {hint && <p className="text-[10px] text-foreground/25 font-sans italic">{hint}</p>}
    </div>
  );
};

const ResultRow: React.FC<{ label: string; value: string; highlight?: boolean; sub?: string }> = ({ label, value, highlight, sub }) => (
  <div className={`flex justify-between items-start py-4 border-b last:border-0 ${highlight ? 'border-primary/20' : 'border-white/5'}`}>
    <div>
      <div className={`text-sm font-sans ${highlight ? 'font-bold text-foreground' : 'text-foreground/50'}`}>{label}</div>
      {sub && <div className="text-[10px] text-foreground/25 font-sans italic mt-0.5">{sub}</div>}
    </div>
    <div className={`text-right font-serif font-bold ${highlight ? 'text-primary text-xl' : 'text-foreground/70 text-base'}`}>
      {value}
    </div>
  </div>
);

// ROI Report email capture modal
interface ROIReportModalProps {
  open: boolean;
  onClose: () => void;
  calcData: {
    model: string;
    netYield: number;
    paybackYears: number;
    netRevenue: number;
    grossRevenue: number;
    totalInvestment: number;
    fiveYearReturn: number;
    tenYearReturn: number;
  };
}

const ROIReportModal: React.FC<ROIReportModalProps> = ({ open, onClose, calcData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to email backend (Formspree / Netlify / custom API)
    console.log('ROI Report request:', { name, email, calcData });
    setSubmitted(true);
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
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-md bg-background border border-primary/30 rounded-3xl p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
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
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 14l5 5 11-11" stroke="rgba(217,119,6,1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Report on its Way!</h3>
                  <p className="text-foreground/60 font-sans text-sm leading-relaxed mb-2">
                    Your personalised ROI report for <strong className="text-primary">{calcData.model}</strong> has been sent to your inbox.
                  </p>
                  <p className="text-foreground/40 font-sans text-xs mb-6">Check your spam folder if it doesn't arrive within 5 minutes.</p>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-primary text-white font-serif font-bold rounded-xl fire-glow"
                  >
                    Back to Calculator
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-[1px] w-6 bg-primary" />
                      <span className="text-primary text-xs uppercase tracking-widest font-bold font-sans">Free ROI Report</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-1">Email My Full ROI Report</h3>
                    <p className="text-foreground/50 font-sans text-sm">Receive a personalised PDF with your full investment projection, 10-year forecast, and market benchmarks.</p>
                  </div>

                  {/* Summary preview */}
                  <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/15">
                    <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-3">Your Current Projections</div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-serif font-bold text-primary">{formatPct(calcData.netYield)}</div>
                        <div className="text-[9px] uppercase tracking-widest text-foreground/30 font-sans">Net Yield</div>
                      </div>
                      <div className="border-x border-white/8">
                        <div className="text-lg font-serif font-bold text-primary">{calcData.paybackYears < 100 ? `${calcData.paybackYears.toFixed(1)}yr` : '—'}</div>
                        <div className="text-[9px] uppercase tracking-widest text-foreground/30 font-sans">Payback</div>
                      </div>
                      <div>
                        <div className="text-lg font-serif font-bold text-primary">{formatCurrency(calcData.netRevenue)}</div>
                        <div className="text-[9px] uppercase tracking-widest text-foreground/30 font-sans">Net/Year</div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-foreground/40 font-sans mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-foreground placeholder-foreground/30 font-sans text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4h14v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M2 4l7 6 7-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                      Send My ROI Report
                    </motion.button>
                  </form>

                  <p className="text-[10px] text-foreground/20 font-sans text-center mt-4">
                    We respect your privacy. No spam, ever. Unsubscribe anytime.
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

export const ROICalculator: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const [calc, setCalc] = useState<CalcState>({
    model: 'sovereign',
    nightlyRate: 620,
    occupancyRate: 75,
    managementFee: 20,
    landCost: 0,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [roiModalOpen, setRoiModalOpen] = useState(false);

  const update = (field: keyof CalcState, value: any) => {
    setCalc(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'model') {
        next.nightlyRate = benchmarks[value as keyof typeof benchmarks].mid;
      }
      return next;
    });
  };

  // Calculations
  const model = modelData[calc.model];
  const bench = benchmarks[calc.model];
  const totalInvestment = model.price + calc.landCost;
  const annualNights = 365 * (calc.occupancyRate / 100);
  const grossRevenue = annualNights * calc.nightlyRate;
  const managementCost = grossRevenue * (calc.managementFee / 100);
  const platformFees = grossRevenue * 0.03;
  const maintenanceCost = totalInvestment * 0.005;
  const insuranceCost = totalInvestment * 0.004;
  const netRevenue = grossRevenue - managementCost - platformFees - maintenanceCost - insuranceCost;
  const grossYield = (grossRevenue / totalInvestment) * 100;
  const netYield = (netRevenue / totalInvestment) * 100;
  const paybackYears = totalInvestment / netRevenue;
  const fiveYearReturn = netRevenue * 5 - totalInvestment;
  const tenYearReturn = netRevenue * 10 - totalInvestment;

  return (
    <>
      <ROIReportModal
        open={roiModalOpen}
        onClose={() => setRoiModalOpen(false)}
        calcData={{
          model: model.name,
          netYield,
          paybackYears,
          netRevenue,
          grossRevenue,
          totalInvestment,
          fiveYearReturn,
          tenYearReturn,
        }}
      />

      <section ref={ref} id="calculator" className="py-24 md:py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,119,6,0.06)_0,transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">

          {/* Header */}
          <motion.div
            ref={headerRef}
            className="max-w-3xl mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <motion.div className="flex items-center gap-4 mb-5" initial={{ opacity: 0, x: -20 }} animate={headerInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-serif italic tracking-wide text-sm">Airbnb ROI · Investment Calculator</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
              Model your <span className="fire-text italic">returns</span>
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans leading-relaxed">
              Use our professional-grade calculator to model the investment return on your Forged by Fire commission. Figures are based on verified Airbnb data from our existing client portfolio across Queensland and New South Wales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Left: Inputs */}
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {/* Model selector */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-bold text-foreground/40 font-sans mb-4">Select Your Model</label>
                <div className="space-y-3">
                  {(Object.entries(modelData) as [keyof typeof modelData, typeof modelData['ember']][]).map(([key, m]) => (
                    <motion.button
                      key={key}
                      onClick={() => update('model', key)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-300 ${
                        calc.model === key
                          ? 'border-primary bg-primary/10'
                          : 'border-white/8 hover:border-white/20 bg-card/20'
                      }`}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className={`font-serif font-bold text-base ${calc.model === key ? 'text-primary' : 'text-foreground'}`}>{m.name}</div>
                          <div className="text-xs text-foreground/40 font-sans mt-0.5">{m.sqm} · {m.beds}</div>
                        </div>
                        <div className={`text-right ${calc.model === key ? 'text-primary' : 'text-foreground/50'}`}>
                          <div className="font-serif font-bold">{formatCurrency(m.price)}</div>
                          <div className="text-[10px] text-foreground/30 font-sans">build cost</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Benchmark rates */}
              <div className="p-4 rounded-xl bg-card/30 border border-white/5">
                <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-3">Market Benchmarks · {modelData[calc.model].name}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Conservative', value: bench.low },
                    { label: 'Typical', value: bench.mid },
                    { label: 'Premium', value: bench.high },
                  ].map(b => (
                    <motion.button
                      key={b.label}
                      onClick={() => update('nightlyRate', b.value)}
                      className={`p-2 rounded-lg border text-xs transition-all duration-300 ${
                        calc.nightlyRate === b.value
                          ? 'border-primary/50 bg-primary/10 text-primary'
                          : 'border-white/5 text-foreground/40 hover:border-white/15'
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="font-bold font-sans">${b.value}</div>
                      <div className="text-[9px] mt-0.5 font-sans">{b.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-8">
                <SliderInput
                  label="Nightly Rate"
                  value={calc.nightlyRate}
                  min={150}
                  max={1200}
                  step={10}
                  format={v => `$${v}`}
                  onChange={v => update('nightlyRate', v)}
                  hint="Set your target nightly rate. Benchmark data from verified Airbnb listings."
                />
                <SliderInput
                  label="Annual Occupancy"
                  value={calc.occupancyRate}
                  min={30}
                  max={95}
                  step={1}
                  format={v => `${v}%`}
                  onChange={v => update('occupancyRate', v)}
                  hint="Our top-performing clients average 85–94% annual occupancy."
                />
                <SliderInput
                  label="Management Fee"
                  value={calc.managementFee}
                  min={0}
                  max={30}
                  step={1}
                  format={v => `${v}%`}
                  onChange={v => update('managementFee', v)}
                  hint="Professional short-stay managers typically charge 15–25% of revenue."
                />
                <SliderInput
                  label="Land Cost"
                  value={calc.landCost}
                  min={0}
                  max={500000}
                  step={5000}
                  format={v => v === 0 ? 'Own land' : formatCurrency(v)}
                  onChange={v => update('landCost', v)}
                  hint="Already own land? Set to $0. Otherwise include your estimated land acquisition cost."
                />
              </div>
            </motion.div>

            {/* Right: Results */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="sticky top-28 space-y-6">

                {/* Main results card */}
                <div className="p-8 md:p-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card/30 to-transparent relative overflow-hidden card-shine-wrapper">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-1">Projected Returns</div>
                        <div className="text-lg font-serif font-bold text-foreground">{modelData[calc.model].name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-1">Total Investment</div>
                        <div className="text-xl font-serif font-bold text-foreground">{formatCurrency(totalInvestment)}</div>
                      </div>
                    </div>

                    {/* Hero metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl bg-background/40 border border-white/5">
                      <div className="text-center">
                        <motion.div
                          key={netYield.toFixed(1)}
                          className="text-3xl md:text-4xl font-serif font-bold text-primary"
                          initial={{ scale: 1.1, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {formatPct(netYield)}
                        </motion.div>
                        <div className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold font-sans mt-1">Net Yield</div>
                      </div>
                      <div className="text-center border-x border-white/5">
                        <motion.div
                          key={paybackYears.toFixed(1)}
                          className="text-3xl md:text-4xl font-serif font-bold text-primary"
                          initial={{ scale: 1.1, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {paybackYears < 100 ? `${paybackYears.toFixed(1)}yr` : '—'}
                        </motion.div>
                        <div className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold font-sans mt-1">Payback</div>
                      </div>
                      <div className="text-center">
                        <motion.div
                          key={Math.round(netRevenue)}
                          className="text-3xl md:text-4xl font-serif font-bold text-primary"
                          initial={{ scale: 1.1, opacity: 0.5 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {formatCurrency(netRevenue)}
                        </motion.div>
                        <div className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold font-sans mt-1">Net / Year</div>
                      </div>
                    </div>

                    {/* Revenue breakdown */}
                    <div className="mb-6">
                      <ResultRow label="Gross Annual Revenue" value={formatCurrency(grossRevenue)} sub={`${Math.round(annualNights)} nights × $${calc.nightlyRate}`} />
                      <ResultRow label="Platform Fees (Airbnb ~3%)" value={`−${formatCurrency(platformFees)}`} />
                      <ResultRow label={`Management Fee (${calc.managementFee}%)`} value={`−${formatCurrency(managementCost)}`} />
                      <ResultRow label="Maintenance & Insurance" value={`−${formatCurrency(maintenanceCost + insuranceCost)}`} sub="Est. 0.9% of asset value p.a." />
                      <ResultRow label="Net Annual Income" value={formatCurrency(netRevenue)} highlight />
                    </div>

                    {/* Toggle details */}
                    <motion.button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-xs uppercase tracking-widest text-primary/60 hover:text-primary font-bold font-sans flex items-center gap-2 mb-4 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      {showDetails ? 'Hide' : 'Show'} long-term projection
                      <motion.span animate={{ rotate: showDetails ? 90 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            {[
                              { label: '5-Year Net Return', value: fiveYearReturn, positive: fiveYearReturn > 0 },
                              { label: '10-Year Net Return', value: tenYearReturn, positive: tenYearReturn > 0 },
                              { label: 'Gross Yield', value: null, formatted: formatPct(grossYield) },
                              { label: 'Net Yield', value: null, formatted: formatPct(netYield) },
                            ].map(item => (
                              <div key={item.label} className="p-4 rounded-xl bg-background/40 border border-white/5 text-center">
                                <div className={`text-xl font-serif font-bold mb-1 ${item.value !== null ? (item.positive ? 'text-green-400' : 'text-red-400') : 'text-primary'}`}>
                                  {item.value !== null ? (item.positive ? '+' : '') + formatCurrency(item.value) : item.formatted}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold font-sans">{item.label}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-foreground/20 font-sans leading-relaxed italic px-2">
                  Projections are estimates based on verified Airbnb performance data from Forged by Fire client properties in Queensland and New South Wales. Actual results will vary based on location, seasonality, property management quality, and market conditions. This calculator does not constitute financial advice.
                </p>

                {/* Email ROI Report CTA */}
                <motion.button
                  className="w-full py-5 rounded-xl border border-primary/40 bg-primary/8 text-primary font-serif text-base font-bold hover:bg-primary/15 transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRoiModalOpen(true)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 4h14v10a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M2 4l7 6 7-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Email My Full ROI Report
                </motion.button>

                {/* Commission CTA */}
                <motion.button
                  className="w-full py-5 rounded-xl bg-primary text-white font-serif text-lg font-bold hover:bg-primary/90 fire-glow transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Commission {modelData[calc.model].name} →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
