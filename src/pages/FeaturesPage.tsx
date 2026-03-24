import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Data ────────────────────────────────────────────────────────────────────

const featureCategories = [
  {
    id: 'exterior',
    label: 'Exterior & Cladding',
    kanji: '外装',
    icon: '🔥',
    headline: 'A facade that commands every landscape',
    description:
      'Every Forged by Fire home is clad in authentic hand-charred Shou Sugi Ban — not a factory-printed facsimile. The exterior is the first thing your guests will photograph, and the last thing they will forget.',
    features: [
      {
        title: 'Authentic Hand-Charred Shou Sugi Ban',
        detail:
          'Each panel is individually charred by our craftsmen using traditional open-flame technique. No two panels are identical. The result is a living surface with depth, variation, and character that no manufactured product can replicate.',
        spec: 'Min. 2mm char depth · 75–100yr service life',
      },
      {
        title: 'Three Char Depths Available',
        detail:
          'Choose from lightly charred (silver-grey brushed), medium char (deep charcoal), or heavy char (alligator-scale texture). Each depth delivers a distinct aesthetic and level of protection.',
        spec: 'Light · Medium · Heavy — all included in base price',
      },
      {
        title: 'BAL-rated Bushfire Construction',
        detail:
          'All Forged by Fire homes are engineered to meet Australian Bushfire Attack Level (BAL) requirements. The Shou Sugi Ban cladding contributes to fire resistance — a remarkable irony that is also a material truth.',
        spec: 'BAL-12.5 standard · BAL-29 available on request',
      },
      {
        title: 'Architectural Roofline',
        detail:
          'Our signature pitched roofline is designed to shed water efficiently, accommodate solar panels, and create dramatic interior ceiling heights. The roof is clad in Colorbond steel in a palette selected to complement the Shou Sugi Ban exterior.',
        spec: 'Colorbond steel · 25° pitch standard',
      },
      {
        title: 'Hardwood Deck & Outdoor Living',
        detail:
          'Every home includes a structural hardwood deck extending the living space outdoors. Optional additions include outdoor showers, hot tubs, fire pits, and sauna pods — all designed to complement the Shou Sugi Ban aesthetic.',
        spec: 'Spotted gum or blackbutt hardwood · 20yr+ durability',
      },
      {
        title: 'Floor-to-Ceiling Glazing',
        detail:
          'Oversized double-glazed windows and sliding doors frame the landscape as living art. The contrast between the dark charred exterior and the light-filled interior is the defining architectural moment of every Forged by Fire home.',
        spec: '6mm double-glazed · thermally broken frames',
      },
    ],
  },
  {
    id: 'interior',
    label: 'Interior Finishes',
    kanji: '内装',
    icon: '🪵',
    headline: 'Interiors that honour the craft outside',
    description:
      'The interior of a Forged by Fire home is designed to feel like the inside of a considered piece of architecture — not a modular box. Natural materials, generous proportions, and deliberate details throughout.',
    features: [
      {
        title: 'Engineered Timber Flooring',
        detail:
          'Wide-board engineered hardwood flooring in a natural oil finish. Warm underfoot, acoustically rich, and designed to age beautifully alongside the Shou Sugi Ban exterior.',
        spec: 'European oak · 190mm board width · 4mm wear layer',
      },
      {
        title: 'Exposed Timber Ceiling Beams',
        detail:
          'Structural timber beams are left exposed and oiled, creating a sense of honest construction and adding warmth to the interior volume. Ceiling heights range from 2.7m to 4.5m depending on the roofline position.',
        spec: 'LVL structural timber · natural oil finish',
      },
      {
        title: 'Stone Benchtops & Premium Kitchen',
        detail:
          'The kitchen is a fully functional architectural element — not an afterthought. Stone benchtops, integrated appliances, and considered storage make it a space guests will photograph and remember.',
        spec: 'Caesarstone or equivalent · Smeg or Bosch appliances',
      },
      {
        title: 'Ensuite with Freestanding Bath (Sovereign)',
        detail:
          'The Sovereign includes a full ensuite with freestanding bath, rainfall shower, and stone vanity. The bathroom is designed as a retreat within a retreat — a space of genuine luxury.',
        spec: 'Freestanding bath · 900×900 shower · heated towel rail',
      },
      {
        title: 'Shou Sugi Ban Feature Walls (Interior)',
        detail:
          'Select models include interior Shou Sugi Ban feature walls — a design element that creates a seamless connection between the exterior material story and the interior atmosphere.',
        spec: 'Available in Ember · Refuge · Sovereign',
      },
      {
        title: 'Stargazing Skylight (Optional)',
        detail:
          'Our signature skylight option transforms the bedroom ceiling into a window to the night sky. Over 3 metres in length, it is the feature that guests mention in every review.',
        spec: 'Velux or equivalent · double-glazed · motorised blind',
      },
    ],
  },
  {
    id: 'offgrid',
    label: 'Off-Grid & Sustainability',
    kanji: '持続可能',
    icon: '☀️',
    headline: 'Built for Australia\'s most remote landscapes',
    description:
      'Every Forged by Fire home is designed to operate independently of the grid — or to connect seamlessly to it. Off-grid capability is not an add-on. It is built into the architecture from the first line of the design.',
    features: [
      {
        title: 'Solar Power System',
        detail:
          'A 6.6kW solar array with 10kWh battery storage provides reliable power for all home systems. The roofline is specifically designed to maximise solar panel area and optimal north-facing orientation.',
        spec: '6.6kW panels · 10kWh battery · 5kW inverter',
      },
      {
        title: 'Rainwater Harvesting & Filtration',
        detail:
          'A 22,500L rainwater tank with multi-stage filtration and UV sterilisation provides potable water for all domestic uses. The system is designed for Queensland\'s rainfall patterns and includes a pump and pressure system.',
        spec: '22,500L tank · UV sterilisation · 3-stage filtration',
      },
      {
        title: 'Composting Waste System',
        detail:
          'A composting toilet and greywater treatment system eliminates the need for connection to town sewerage. The system is odourless, low-maintenance, and approved for use across all Australian states.',
        spec: 'Clivus Multrum or equivalent · greywater treatment',
      },
      {
        title: 'Passive Solar Design',
        detail:
          'Every home is oriented to maximise winter sun and minimise summer heat gain. Deep eaves, thermal mass flooring, and cross-ventilation design reduce the energy required for heating and cooling by up to 60%.',
        spec: 'NatHERS 7-star equivalent · passive design principles',
      },
      {
        title: 'Insulation & Thermal Performance',
        detail:
          'R4.0 wall insulation, R6.0 ceiling insulation, and double-glazed windows deliver thermal performance well above the minimum building code requirements — keeping the interior comfortable in all Australian climates.',
        spec: 'R4.0 walls · R6.0 ceiling · double-glazed windows',
      },
      {
        title: 'Net-Zero Energy Package',
        detail:
          'Our optional Net-Zero package includes an expanded solar array, additional battery storage, and an EV charging point — enabling the home to generate more energy than it consumes on an annual basis.',
        spec: '10kW solar · 20kWh battery · 7kW EV charger',
      },
    ],
  },
  {
    id: 'construction',
    label: 'Construction & Engineering',
    kanji: '建設',
    icon: '⚙️',
    headline: 'Precision-built to last a century',
    description:
      'Forged by Fire homes are not prefabricated boxes. They are precision-engineered structures built in our controlled facility and delivered as complete modules — combining the quality of factory construction with the design freedom of bespoke architecture.',
    features: [
      {
        title: 'Steel Frame Construction',
        detail:
          'A hot-dipped galvanised steel frame provides the structural skeleton of every Forged by Fire home. Steel does not rot, warp, or attract termites — and it provides the structural rigidity required for transport and installation.',
        spec: 'Hot-dipped galvanised steel · AS/NZS 4600 compliant',
      },
      {
        title: 'Modular Precision Build',
        detail:
          'Each home is built as a complete module in our precision facility, then transported and installed on your site. This process eliminates weather delays, reduces on-site construction time to 3–5 days, and ensures consistent quality.',
        spec: 'Factory-built · 3–5 day site installation',
      },
      {
        title: '10-Year Structural Warranty',
        detail:
          'Every Forged by Fire home is covered by a 10-year structural warranty — the most comprehensive in the modular home industry. We stand behind the quality of our construction unconditionally.',
        spec: '10yr structural · 2yr workmanship · 1yr appliances',
      },
      {
        title: 'Engineered Footing System',
        detail:
          'Our engineering team designs a bespoke footing system for each site — whether that\'s a concrete slab, steel pier system, or screw pile foundation. The footing is engineered to suit your specific soil conditions and slope.',
        spec: 'Site-specific engineering · all soil types',
      },
      {
        title: 'Transport & Crane Installation',
        detail:
          'We manage the complete logistics of transport and installation, including council permits, traffic management, and crane hire. Our project manager is on-site for the full installation process.',
        spec: 'Australia-wide delivery · project managed end-to-end',
      },
      {
        title: 'Council Approval Assistance',
        detail:
          'Our team has navigated council approval processes across every Australian state. We prepare all documentation, liaise with certifiers, and manage the approval process on your behalf.',
        spec: 'DA/CDC assistance · all states and territories',
      },
    ],
  },
  {
    id: 'investment',
    label: 'Investment Performance',
    kanji: '投資',
    icon: '📈',
    headline: 'Engineered for exceptional Airbnb returns',
    description:
      'Forged by Fire homes are not just beautiful — they are investment-grade assets. The Shou Sugi Ban exterior creates a visual distinctiveness that commands premium nightly rates and extraordinary occupancy levels on Airbnb and luxury short-stay platforms.',
    features: [
      {
        title: 'Premium Airbnb Positioning',
        detail:
          'The Shou Sugi Ban exterior is the single most photographed element of every Airbnb listing that features it. Our clients consistently report that the exterior is the primary reason guests book — before they even look at the interior.',
        spec: 'Avg. 4.97 Airbnb rating across client portfolio',
      },
      {
        title: 'Verified Nightly Rates',
        detail:
          'Our client portfolio demonstrates nightly rates of $280–$850 depending on location, model, and season. The Sovereign in premium locations regularly achieves $650–$850 per night during peak season.',
        spec: '$280–$850/night · verified client data',
      },
      {
        title: 'High Occupancy Performance',
        detail:
          'The architectural distinctiveness of Forged by Fire homes drives occupancy rates well above the market average. Our top-performing clients achieve 85–94% annual occupancy — compared to a market average of 55–65%.',
        spec: '85–94% occupancy · top performers',
      },
      {
        title: 'Capital Appreciation',
        detail:
          'Architectural homes with distinctive materials command a premium in the property market. Shou Sugi Ban homes in premium locations have demonstrated capital appreciation of 15–25% above comparable properties without the material.',
        spec: 'Premium capital growth · architectural premium',
      },
      {
        title: 'Property Manager Network',
        detail:
          'We connect every investment client with our network of specialist short-stay property managers who understand the architectural short-stay market. These managers consistently achieve occupancy rates 20–30% above the market average.',
        spec: 'Specialist network · Airbnb Superhosts',
      },
      {
        title: 'Finance Options Available',
        detail:
          'We work with specialist lenders who understand the modular home and investment property market. Finance options are available for qualified buyers, including construction loans and investment property loans.',
        spec: 'Construction loans · investment finance · pre-approval',
      },
    ],
  },
];

const modelSpecs = [
  {
    name: 'The Ember',
    price: 'From $185,000',
    sqm: '38–55 sqm',
    beds: '1 bedroom',
    bath: '1 ensuite',
    kitchen: 'Full kitchen',
    solar: '6.6kW solar ready',
    deck: 'Hardwood deck',
    warranty: '10-year structural',
    best: 'Solo living · creative studio · high-yield short stay',
    tag: 'The Solitary Visionary',
  },
  {
    name: 'The Sovereign',
    price: 'From $295,000',
    sqm: '65–90 sqm',
    beds: '2 bedrooms + study',
    bath: '1 ensuite + 1 bathroom',
    kitchen: 'Chef kitchen · stone benchtops',
    solar: '10kW solar + battery',
    deck: 'Expanded hardwood deck',
    warranty: '10-year structural',
    best: 'Family retreat · premium Airbnb · architectural statement',
    tag: 'The Flagship Sanctuary',
    featured: true,
  },
  {
    name: 'The Refuge',
    price: 'From $235,000',
    sqm: '50–70 sqm',
    beds: '1–2 bedrooms configurable',
    bath: '1 ensuite',
    kitchen: 'Full kitchen · biophilic design',
    solar: '6.6kW solar + net-zero ready',
    deck: 'Wraparound deck',
    warranty: '10-year structural',
    best: 'Eco-retreat · Airbnb investment · nature immersion',
    tag: 'Retreat. Restore. Return.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FeatureItem: React.FC<{ feature: typeof featureCategories[0]['features'][0]; index: number }> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-white/5 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-start justify-between gap-4 text-left group hover:text-primary transition-colors duration-300"
      >
        <div className="flex items-start gap-4">
          <div className="w-6 h-6 rounded-full border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
          </div>
          <span className="font-serif font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </span>
        </div>
        <motion.span
          className="text-primary/50 text-xl flex-shrink-0 mt-0.5"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 space-y-3">
              <p className="text-foreground/60 font-sans text-sm leading-relaxed">{feature.detail}</p>
              <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 rounded-full px-3 py-1.5">
                <div className="w-1 h-1 rounded-full bg-primary/60" />
                <span className="text-[10px] text-primary/70 font-bold font-sans uppercase tracking-widest">{feature.spec}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategorySection: React.FC<{ category: typeof featureCategories[0]; index: number }> = ({ category, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.section
      ref={ref}
      id={category.id}
      className="py-20 md:py-28 border-t border-white/5"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        {/* Left: Category header */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-primary/60 font-bold font-sans">{category.label}</span>
            </div>
            <div className="text-5xl font-serif text-foreground/5 mb-4 leading-none">{category.kanji}</div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-5 leading-tight text-foreground">
              {category.headline}
            </h3>
            <p className="text-foreground/50 font-sans text-sm leading-relaxed">
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Right: Features */}
        <div className="lg:col-span-3">
          {category.features.map((f, i) => (
            <FeatureItem key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const FeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('exterior');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors font-sans text-sm group"
            >
              <motion.span whileHover={{ x: -3 }} className="inline-block">←</motion.span>
              Back to Forged by Fire
            </button>
            <div className="hidden md:flex items-center gap-1 overflow-x-auto">
              {featureCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest font-sans transition-all duration-300 whitespace-nowrap ${
                    activeTab === cat.id
                      ? 'bg-primary/15 text-primary'
                      : 'text-foreground/30 hover:text-foreground/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => { window.history.back(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500); }}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-serif font-bold text-sm hover:bg-primary/90 fire-glow transition-all duration-300"
            >
              Commission →
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0,transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-serif italic tracking-wide text-sm">Complete Feature Specification</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[0.9] mb-8">
              Every detail,<br />
              <span className="fire-text italic">considered.</span>
            </h1>
            <p className="text-foreground/60 text-xl md:text-2xl font-sans leading-relaxed max-w-2xl">
              A complete specification of every feature, material, and system that goes into a Forged by Fire home. Built for those who want to understand exactly what they are commissioning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Model comparison */}
      <div className="py-16 border-y border-white/5 bg-card/20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-2xl md:text-3xl font-serif font-bold mb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choose your <span className="fire-text italic">sanctuary</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modelSpecs.map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-7 rounded-2xl border flex flex-col transition-all duration-500"
                style={{
                  borderColor: model.featured ? 'rgba(217,119,6,0.35)' : 'rgba(255,255,255,0.06)',
                  background: model.featured ? 'rgba(217,119,6,0.04)' : 'rgba(255,255,255,0.02)',
                  boxShadow: model.featured ? '0 0 40px rgba(217,119,6,0.1)' : 'none',
                }}
              >
                {model.featured && (
                  <div className="inline-flex items-center gap-1.5 bg-primary text-background text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full self-start mb-4">
                    Most Commissioned
                  </div>
                )}
                <div className="text-xs uppercase tracking-widest text-foreground/30 font-bold font-sans mb-2">{model.tag}</div>
                <h3 className="text-2xl font-serif font-bold mb-1 text-foreground">{model.name}</h3>
                <div className="text-primary font-serif font-bold text-lg mb-6">{model.price}</div>
                <div className="space-y-2.5 flex-1 mb-6">
                  {[
                    { label: 'Floor Plan', value: model.sqm },
                    { label: 'Bedrooms', value: model.beds },
                    { label: 'Bathroom', value: model.bath },
                    { label: 'Kitchen', value: model.kitchen },
                    { label: 'Energy', value: model.solar },
                    { label: 'Outdoor', value: model.deck },
                    { label: 'Warranty', value: model.warranty },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-xs font-sans gap-4">
                      <span className="text-foreground/30 uppercase tracking-widest font-bold flex-shrink-0">{row.label}</span>
                      <span className="text-foreground/60 text-right italic">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg bg-primary/8 border border-primary/15 mb-5">
                  <div className="text-[10px] uppercase tracking-widest text-primary/50 font-bold font-sans mb-1">Best For</div>
                  <div className="text-xs text-foreground/60 font-sans italic">{model.best}</div>
                </div>
                <button
                  onClick={() => { window.history.back(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500); }}
                  className={`w-full py-3.5 rounded-xl font-serif font-bold text-sm transition-all duration-300 ${
                    model.featured
                      ? 'bg-primary text-white hover:bg-primary/90 fire-glow'
                      : 'border border-primary/30 text-primary hover:bg-primary/10'
                  }`}
                >
                  Commission {model.name} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature categories */}
      <div className="container mx-auto px-6">
        {featureCategories.map((cat, i) => (
          <CategorySection key={cat.id} category={cat} index={i} />
        ))}
      </div>

      {/* CTA section */}
      <div className="py-24 md:py-40 border-t border-white/5 bg-gradient-to-b from-transparent to-card/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-6xl mb-8">🔥</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Ready to commission<br />
              your <span className="fire-text italic">sanctuary</span>?
            </h2>
            <p className="text-foreground/50 text-lg font-sans leading-relaxed max-w-xl mx-auto mb-10">
              Every Forged by Fire home begins with a conversation. Tell us about your land, your vision, and what you want to feel when you arrive home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => { window.history.back(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 500); }}
                className="bg-primary text-white px-10 py-5 rounded-xl font-serif text-lg font-bold hover:bg-primary/90 fire-glow transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin My Commission
              </motion.button>
              <motion.button
                onClick={() => { window.history.back(); setTimeout(() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }), 500); }}
                className="border border-primary/30 text-primary px-10 py-5 rounded-xl font-serif text-lg font-bold hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Calculate My ROI →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
