const links: Record<string, string[]> = {
  'Our Homes': ['The Ember', 'The Sovereign', 'The Refuge', 'Custom Commissions'],
  'The Craft': ['Shou Sugi Ban', 'Materials', 'Interior Finishes', 'Sustainability'],
  Company: ['About Us', 'Our Process', 'FAQs', 'Blog'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Warranty Policy'],
}

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(38 92% 50%))',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1 C8 1 14 5 14 10 C14 13.3 11.3 15 8 15 C4.7 15 2 13.3 2 10 C2 5 8 1 8 1Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M8 5 C8 5 11 8 11 10.5 C11 12 9.7 13 8 13 C6.3 13 5 12 5 10.5 C5 8 8 5 8 5Z"
                    fill="white"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <div>
                <div className="font-serif text-base font-semibold text-foreground tracking-wide">
                  FORGED BY FIRE
                </div>
                <div className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  Tiny Homes · Australia
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Australia's premier Shou Sugi Ban tiny home builders. Bespoke commissions crafted to
              endure. Delivered anywhere in Australia.
            </p>

            <div className="space-y-1.5 mb-5">
              <a
                href="tel:+61280000000"
                className="block text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                +61 2 8000 0000
              </a>
              <a
                href="mailto:hello@forgedbyfire.com.au"
                className="block text-xs text-muted-foreground hover:text-accent transition-colors"
              >
                hello@forgedbyfire.com.au
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {[
                { name: 'Instagram', letter: 'In' },
                { name: 'Facebook', letter: 'Fb' },
                { name: 'Pinterest', letter: 'Pi' },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-xs text-muted-foreground hover:border-accent/40 hover:text-accent transition-all duration-200"
                >
                  {s.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-foreground/50 mb-4">
                {group}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © 2025 Forged by Fire Homes Pty Ltd · All rights reserved
          </p>
          <p className="text-xs text-muted-foreground">
            焼き杉 · Shou Sugi Ban Specialists · Australia-wide
          </p>
        </div>
      </div>
    </footer>
  )
}
