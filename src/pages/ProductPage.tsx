import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';

// ─── Data ─────────────────────────────────────────────────────────────────────

const gallery = [
  { src: './images/tiny-home-exterior.jpg', alt: 'Exterior — Shou Sugi Ban cladding with warm timber windows', label: 'Exterior' },
  { src: './images/kitchen-interior.webp', alt: 'Kitchen — Carrara marble benchtop, custom walnut joinery', label: 'Kitchen' },
  { src: './images/floor-plan.jpg', alt: 'Floor Plan — 12.09m × 3.44m, Scale 1:50', label: 'Floor Plan' },
];

const specs = [
  { category: 'Dimensions', items: [
    { label: 'Total Length', value: '12.09m' },
    { label: 'Width', value: '3.44m' },
    { label: 'Living Area', value: '10.08m' },
    { label: 'Bathroom', value: '1.80m' },
    { label: 'Floor Area', value: '~40 sqm' },
    { label: 'Ceiling Height', value: '2.7m' },
  ]},
  { category: 'Structure', items: [
    { label: 'Frame', value: 'Steel chassis + timber frame' },
    { label: 'Cladding', value: 'Authentic Shou Sugi Ban' },
    { label: 'Roof', value: 'Colorbond steel, solar-ready' },
    { label: 'Insulation', value: 'R3.5 wall + R6 ceiling' },
    { label: 'Foundation', value: 'Adjustable steel stumps' },
    { label: 'Windows', value: 'Double-glazed timber frames' },
  ]},
  { category: 'Kitchen', items: [
    { label: 'Cooktop', value: 'Integrated Miele induction' },
    { label: 'Benchtop', value: 'Carrara marble' },
    { label: 'Sink', value: 'High-flow chef\'s sink' },
    { label: 'Cabinetry', value: 'Full-height minimalist' },
    { label: 'Splashback', value: 'Marble tile' },
    { label: 'Fridge space', value: 'Integrated cavity' },
  ]},
  { category: 'Bedroom', items: [
    { label: 'Bed', value: 'Bespoke king frame' },
    { label: 'Linen', value: 'Luxe linen set included' },
    { label: 'Partition', value: 'Dark walnut accent wall' },
    { label: 'Glazing', value: 'Full-height minimalist' },
    { label: 'Lighting', value: 'Integrated bedside' },
    { label: 'Storage', value: 'Built-in wardrobe' },
  ]},
  { category: 'Bathroom', items: [
    { label: 'Toilet', value: 'Wall-hung concealed tank' },
    { label: 'Vanity', value: 'Carrara marble sink' },
    { label: 'Shower', value: 'Rainfall + handheld' },
    { label: 'Tiles', value: 'Floor-to-ceiling marble' },
    { label: 'Towel rail', value: 'Heated' },
    { label: 'Ventilation', value: 'Silent extraction fan' },
  ]},
  { category: 'Off-Grid Systems', items: [
    { label: 'Solar', value: '6.6kW rooftop array' },
    { label: 'Battery', value: '10kWh lithium storage' },
    { label: 'Water', value: '5,000L rainwater tank' },
    { label: 'Hot water', value: 'Solar heat pump' },
    { label: 'Waste', value: 'Composting system' },
    { label: 'Grid tie', value: 'Optional connection' },
  ]},
];

const inclusions = [
  { icon: '🏗️', title: 'Full Turnkey Delivery', desc: 'Delivered and installed on your land. We handle transport, crane, and connection.' },
  { icon: '📐', title: 'Council DA Support', desc: 'Our team assists with development approval documentation across all states.' },
  { icon: '🔋', title: 'Off-Grid Ready', desc: 'Solar, battery, rainwater, and composting systems fully integrated.' },
  { icon: '🛋️', title: 'Furnished Package', desc: 'Optional full furniture package — move in with nothing but your suitcase.' },
  { icon: '📱', title: 'Smart Home System', desc: 'App-controlled lighting, climate, and security as standard.' },
  { icon: '🛡️', title: '10-Year Warranty', desc: 'Full structural and cladding warranty. Peace of mind, guaranteed.' },
  { icon: '🌿', title: 'Net-Zero Certified', desc: 'Carbon neutral build process. Shou Sugi Ban cladding lasts 75+ years.' },
  { icon: '🤝', title: 'Aftercare Program', desc: '12-month aftercare with dedicated support team. We don\'t disappear after delivery.' },
];

const faqs = [
  { q: 'Can I place this on rural land?', a: 'Yes. Our homes are designed for rural, semi-rural, and lifestyle blocks. We assist with council approval in all Australian states and territories.' },
  { q: 'How long does delivery take?', a: 'From commission to delivery is typically 12–16 weeks. We keep you updated at every stage with a dedicated project manager.' },
  { q: 'Is this suitable for Airbnb?', a: 'Absolutely. Our clients average $1,200–$2,800/week on Airbnb. We can connect you with our property management partners for a full turnkey investment solution.' },
  { q: 'Can I customise the floor plan?', a: 'Yes. The Elite Living is our most popular base design, but every commission is bespoke. We work with you to adapt layouts, finishes, and systems to your vision.' },
  { q: 'What is Shou Sugi Ban?', a: 'Shou Sugi Ban (焼き杉) is an ancient Japanese technique of charring timber to create a surface of extraordinary durability, beauty, and fire resistance. Our cladding carries a 75+ year lifespan with zero paint or maintenance required.' },
  { q: 'What is included in the price?', a: 'All prices are turnkey — structure, cladding, fit-out, appliances, solar, battery, water systems, delivery, and installation. No hidden costs.' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

const GalleryViewer: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-card/30 border border-white/8">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={gallery[active].src}
            alt={gallery[active].alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="text-xs uppercase tracking-widest text-white/60 bg-background/70 px-3 py-1.5 rounded-full backdrop-blur-sm font-sans font-bold">
            {gallery[active].label}
          </span>
          <div className="flex gap-1.5">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-primary w-5' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {gallery.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all duration-300 ${i === active ? 'border-primary' : 'border-white/8 hover:border-white/20'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const SpecsTable: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Dimensions');
  const activeSpecs = specs.find(s => s.category === activeCategory);

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {specs.map(s => (
          <button
            key={s.category}
            onClick={() => setActiveCategory(s.category)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest font-sans transition-all duration-300 ${
              activeCategory === s.category
                ? 'bg-primary text-white'
                : 'bg-card/30 border border-white/8 text-foreground/50 hover:border-primary/30 hover:text-primary'
            }`}
          >
            {s.category}
          </button>
        ))}
      </div>
      {/* Specs grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeSpecs?.items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-white/6 bg-card/20 hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <span className="text-xs text-foreground/50 font-sans uppercase tracking-wider">{item.label}</span>
              <span className="text-sm font-bold text-foreground font-sans text-right">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FAQItem: React.FC<{ faq: typeof faqs[0]; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="border-b border-white/8 last:border-0"
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
    >
      <button
        className="w-full text-left py-5 flex items-center justify-between gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-serif font-bold text-base md:text-lg text-foreground/80 group-hover:text-foreground transition-colors">{faq.q}</span>
        <motion.span
          className="text-primary text-xl shrink-0"
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-foreground/60 font-sans text-sm md:text-base leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

interface ProductPageProps {
  onBack: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onBack }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: '-80px' });
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const inclusionsInView = useInView(inclusionsRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />

      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-white/8 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-sans text-sm"
          >
            <span>←</span>
            <span>Back to Collection</span>
          </button>
          <div className="font-serif text-lg font-bold tracking-tight">The Elite Living</div>
          <motion.button
            className="px-5 py-2.5 bg-primary text-white font-serif font-bold text-sm rounded-xl fire-glow"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById('product-contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Commission Now →
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="./images/tiny-home-exterior.jpg"
            alt="The Elite Living — Shou Sugi Ban Tiny Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </motion.div>

        <motion.div
          className="relative z-10 container mx-auto px-6 pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-[1px] w-10 bg-primary" />
            <span className="text-primary font-serif italic tracking-wide text-sm">The Elite Living · Tiny Home</span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your sanctuary.<br />
            <span className="fire-text italic">Forged in fire.</span>
          </motion.h1>
          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="text-3xl md:text-4xl font-serif font-bold text-primary">From $185,000</div>
            <div className="flex gap-3 flex-wrap">
              {['12.09m × 3.44m', '~40 sqm', '1 Bed + Ensuite', 'Off-Grid Ready', 'Turnkey Delivery'].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full border border-white/20 text-xs font-sans font-bold text-white/70 backdrop-blur-sm bg-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-sans font-bold">Explore</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Problem → Solution banner */}
      <section className="py-12 bg-primary/8 border-y border-primary/15">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { icon: '🏦', problem: 'Mortgage stress', solution: 'Own from $185K — no stamp duty' },
              { icon: '⏳', problem: '18-month builds', solution: 'Delivered in 16 weeks, turnkey' },
              { icon: '💸', problem: 'Rising energy costs', solution: 'Off-grid capable — $0 bills' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="text-xs text-foreground/40 font-sans line-through">{item.problem}</div>
                <div className="text-sm font-bold text-foreground font-sans">{item.solution}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery + Quick specs */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <GalleryViewer />
            </motion.div>

            {/* Quick info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-[1px] w-8 bg-primary" />
                  <span className="text-primary font-serif italic text-sm">The Solution You've Been Looking For</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                  Not a tiny home.<br />
                  <span className="fire-text italic">A complete life solution.</span>
                </h2>
                <p className="text-foreground/60 font-sans text-base leading-relaxed">
                  The Elite Living is designed for people who refuse to compromise. Whether you're escaping the rental trap, building a passive income stream, or creating a private sanctuary on your land — this is the answer conventional housing can never provide.
                </p>
              </div>

              {/* Key outcomes */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '$185K', label: 'Starting price' },
                  { value: '16wks', label: 'To your door' },
                  { value: '$2.8K', label: 'Weekly Airbnb avg.' },
                  { value: '75yr+', label: 'Cladding lifespan' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/8 bg-card/20 text-center">
                    <div className="text-2xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-xs text-foreground/50 font-sans uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  className="flex-1 py-4 bg-primary text-white font-serif font-bold text-base rounded-xl fire-glow"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('product-contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Commission This Home →
                </motion.button>
                <motion.button
                  className="flex-1 py-4 border border-white/20 text-foreground/70 font-serif font-bold text-base rounded-xl hover:border-primary/40 hover:text-primary transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.getElementById('product-specs')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Full Specs
                </motion.button>
              </div>

              {/* Trust micro-signals */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-foreground/40 font-sans">
                  <span className="text-primary">★★★★★</span>
                  <span>4.97 Google</span>
                </div>
                <div className="text-xs text-foreground/40 font-sans">· 24hr response ·</div>
                <div className="text-xs text-foreground/40 font-sans">No obligation</div>
                <div className="text-xs text-foreground/40 font-sans">· 10yr warranty</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive floor plan */}
      <section className="py-20 md:py-28 bg-card/10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-10 bg-primary" />
              <span className="text-primary font-serif italic text-sm">Floor Plan · Scale 1:50</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              Every square metre<br />
              <span className="fire-text italic">earns its place.</span>
            </h2>
            <p className="text-foreground/60 font-sans leading-relaxed">
              12.09m of precision-engineered living. Zero wasted space. Every room flows into the next with purpose and intention.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden border border-white/10 bg-white/3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="./images/floor-plan.jpg"
              alt="The Elite Living Floor Plan — 12.09m × 3.44m"
              className="w-full h-auto"
            />
            <div className="bg-background/80 backdrop-blur-sm px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/8">
              {[
                { label: 'Length', value: '12.09m' },
                { label: 'Width', value: '3.44m' },
                { label: 'Living', value: '10.08m' },
                { label: 'Bathroom', value: '1.80m' },
              ].map((d, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-serif font-bold text-primary">{d.value}</div>
                  <div className="text-xs text-foreground/40 font-sans uppercase tracking-widest">{d.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full specs */}
      <section id="product-specs" ref={specsRef} className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-10 bg-primary" />
              <span className="text-primary font-serif italic text-sm">Technical Specifications</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              Built to the<br />
              <span className="fire-text italic">highest standard.</span>
            </h2>
            <p className="text-foreground/60 font-sans leading-relaxed">
              No compromises. No shortcuts. Every specification chosen for longevity, beauty, and performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <SpecsTable />
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section ref={inclusionsRef} className="py-20 md:py-28 bg-card/10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            className="max-w-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inclusionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-10 bg-primary" />
              <span className="text-primary font-serif italic text-sm">Everything Included</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              One price.<br />
              <span className="fire-text italic">Everything included.</span>
            </h2>
            <p className="text-foreground/60 font-sans leading-relaxed">
              No hidden costs. No nasty surprises. Every commission includes the full turnkey package — from foundation to furniture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {inclusions.map((item, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl border border-white/8 bg-card/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 card-shine-wrapper"
                initial={{ opacity: 0, y: 20 }}
                animate={inclusionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-serif font-bold text-base mb-2">{item.title}</h3>
                <p className="text-foreground/50 font-sans text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interior showcase */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-10 bg-primary" />
                <span className="text-primary font-serif italic text-sm">Interior Finishes</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Finishes that<br />
                <span className="fire-text italic">tell a story.</span>
              </h2>
              <p className="text-foreground/60 font-sans text-base leading-relaxed mb-6">
                Every material is chosen with intention. Carrara marble benchtops. Dark walnut joinery. Engineered hardwood floors. These aren't just finishes — they're the difference between a house and a home.
              </p>
              <div className="space-y-3">
                {[
                  'Carrara marble benchtops & splashback',
                  'Dark walnut accent wall partition',
                  'Engineered hardwood flooring throughout',
                  'Full-height minimalist glazing',
                  'Integrated Miele appliances',
                  'Custom joinery — no flat-pack',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-sm text-foreground/70 font-sans"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className="w-4 h-[1px] bg-primary shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <img
                src="./images/kitchen-interior.webp"
                alt="Kitchen Interior — Carrara marble, custom walnut joinery"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-card/10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-10 bg-primary" />
                  <span className="text-primary font-serif italic text-sm">Common Questions</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                  Everything<br />
                  <span className="fire-text italic">you need to know.</span>
                </h2>
                <p className="text-foreground/60 font-sans leading-relaxed">
                  We believe in radical transparency. If you have a question not answered here, our team responds within 24 hours.
                </p>
              </motion.div>
            </div>
            <div className="lg:col-span-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Commission CTA */}
      <section id="product-contact" className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-5xl mb-6">🔥</div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Ready to commission<br />
              <span className="fire-text italic">your sanctuary?</span>
            </h2>
            <p className="text-foreground/60 font-sans text-lg leading-relaxed mb-10">
              Every Forged by Fire home is a bespoke commission. No two are identical. Your land, your vision, your life — we bring the craft. No obligation consultation, 24hr response guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                className="px-12 py-5 bg-primary text-white font-serif font-bold text-lg rounded-xl fire-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                Begin My Commission →
              </motion.button>
              <motion.button
                className="px-12 py-5 border border-white/20 text-foreground/70 font-serif font-bold text-lg rounded-xl hover:border-primary/40 hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBack}
              >
                View All Models
              </motion.button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-foreground/35 font-sans">
              <span>★★★★★ 4.97 Google Rating</span>
              <span>·</span>
              <span>84+ Homes Delivered</span>
              <span>·</span>
              <span>24hr Response</span>
              <span>·</span>
              <span>10-Year Warranty</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif font-bold text-foreground/60">Forged by Fire · Australian Built</div>
          <button onClick={onBack} className="text-sm text-foreground/40 hover:text-primary transition-colors font-sans">
            ← Return to main site
          </button>
        </div>
      </footer>
    </div>
  );
};
