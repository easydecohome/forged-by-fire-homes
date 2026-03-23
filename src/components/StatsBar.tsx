export default function StatsBar() {
  const stats = [
    { value: '100+', label: 'Homes Delivered', sub: 'Across Australia' },
    { value: '75yr+', label: 'Timber Longevity', sub: 'Without chemicals' },
    { value: '4.9★', label: 'Client Rating', sub: 'From 80+ reviews' },
    { value: '100%', label: 'Bespoke Builds', sub: 'No two alike' },
  ]

  return (
    <section className="border-y border-border/50 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 px-4 text-center ${
                i < stats.length - 1 ? 'lg:border-r border-border/40' : ''
              } ${i % 2 === 0 ? 'border-r lg:border-r-0' : ''} border-border/40`}
            >
              <div className="text-3xl lg:text-4xl font-serif font-bold fire-text mb-1">
                {s.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-0.5">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
