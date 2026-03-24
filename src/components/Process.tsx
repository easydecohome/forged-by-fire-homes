import React from 'react';

export const Process = () => {
  const steps = [
    {
      id: '01',
      title: 'Site & Vision Consultation',
      description: 'We begin with your land, your landscape, and your life. Our designers map every elevation, orientation, and outlook before a single plan is drawn.',
    },
    {
      id: '02',
      title: 'Bespoke Design',
      description: 'No templates. No compromises. Your Cubic home is drafted from first principles — with Shou Sugi Ban cladding customised in texture, depth, and finish to match your vision and Queensland climate.',
    },
    {
      id: '03',
      title: 'Precision Fabrication',
      description: 'Each module is built in our Rockhampton facility with aircraft-grade precision. Every joint, every surface, every detail reviewed before it leaves our workshop.',
    },
    {
      id: '04',
      title: 'Delivered Across Queensland',
      description: 'From the Capricorn Coast to the Whitsundays, Mackay to Gladstone, Emerald to the Gulf — we deliver and install across Central Queensland with a dedicated project manager by your side.',
    },
    {
      id: '05',
      title: 'Concierge Aftercare',
      description: 'Our relationship does not end at handover. We offer a 10-year structural warranty and ongoing maintenance concierge for every Cubic home in our family across Queensland.',
    },
    {
      id: '06',
      title: 'Investment Certainty',
      description: 'Cubic homes are engineered for premium Airbnb returns and long-term capital appreciation. We can connect you with Queensland property managers who specialise in architectural retreat assets.',
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">Our Process · Queensland Focused</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight">
              From vision to sanctuary — <br />
              every <span className="fire-text italic">step</span> considered
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl font-sans max-w-xl">
              We are Central Queensland's specialists in luxury Shou Sugi Ban architecture. Our process is unhurried, personal, and built around your outcome.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 lg:gap-x-20">
          {steps.map((step, idx) => (
            <div key={step.id} className={`reveal reveal-delay-${idx + 1} group cursor-default transition-all duration-500 hover:translate-y-[-8px]`}>
              <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8 transition-all duration-500 group-hover:border-primary/50">
                <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors pr-8">
                  {step.title}
                </h3>
                <span className="text-5xl md:text-6xl font-serif italic text-white/5 font-black group-hover:text-primary/10 transition-all duration-500 leading-none">
                  {step.id}
                </span>
              </div>
              <p className="text-foreground/50 text-sm md:text-base font-sans leading-relaxed group-hover:text-foreground/80 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
