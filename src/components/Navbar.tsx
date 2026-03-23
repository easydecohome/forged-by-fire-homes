import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Our Homes', href: '#models' },
    { label: 'The Craft', href: '#craft' },
    { label: 'Process', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'hsl(17 14% 6% / 0.97)' } : {}}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(38 92% 50%))' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
              <div className="font-serif text-sm font-semibold leading-none text-foreground tracking-wide">
                FORGED
              </div>
              <div className="font-serif text-[10px] tracking-[0.25em] text-muted-foreground uppercase leading-none mt-0.5">
                BY FIRE HOMES
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+61280000000"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              +61 2 8000 0000
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-sm transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-95"
              style={{ background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))' }}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <div
              className="w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'rotate(45deg) translateY(8px)' : 'none' }}
            />
            <div
              className="w-5 h-0.5 bg-current mb-1.5 transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <div
              className="w-5 h-0.5 bg-current transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-t border-border overflow-hidden transition-all duration-300`}
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          backgroundColor: 'hsl(17 12% 10%)',
        }}
      >
        <div className="px-6 py-6 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base text-foreground py-3 border-b border-border/40 hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <a
              href="tel:+61280000000"
              className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1"
            >
              +61 2 8000 0000
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-3.5 text-sm font-semibold text-white rounded-sm"
              style={{ background: 'linear-gradient(135deg, hsl(21 91% 41%), hsl(33 71% 27%))' }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
