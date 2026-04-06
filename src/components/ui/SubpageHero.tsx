interface SubpageHeroProps {
  title: string
  subtitle?: string
  badge?: string
}

export default function SubpageHero({ title, subtitle, badge }: SubpageHeroProps) {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      {/* Botanical dot pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="subpage-hero-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" opacity="0.5" />
              <path d="M30 10 Q40 20 30 30 Q20 20 30 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#subpage-hero-pattern)" />
        </svg>
      </div>

      {/* Gold arc top-right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold-400/8 blur-3xl pointer-events-none" />
      {/* Teal glow bottom-left */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-400/10 blur-3xl pointer-events-none" />

      {/* Decorative horizontal accent lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {badge && (
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full mr-2 flex-shrink-0" />
            {badge}
          </div>
        )}
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-200 text-xl max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  )
}
