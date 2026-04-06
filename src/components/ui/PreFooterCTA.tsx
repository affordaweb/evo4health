import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

interface PreFooterCTAProps {
  title?: string
  titleHighlight?: string
  subtitle?: string
  buttonText?: string
}

export default function PreFooterCTA({
  title = 'Begin Your',
  titleHighlight = 'Evolution Today',
  subtitle = 'Book your free 15-minute discovery call and find out how Functional Medicine can help you achieve lasting health.',
  buttonText = 'Book Free Discovery Call',
}: PreFooterCTAProps) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background: Erin + Dr Van photo */}
      <div className="absolute inset-0">
        <Image
          src="https://evolution4health.com/wp-content/uploads/2023/09/erin-coletti-and-dr-van.png"
          alt="Evolution Functional Medicine team"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/92 via-primary-950/80 to-primary-950/50" />
      </div>

      {/* Accent blur orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full translate-x-40 -translate-y-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-400/10 rounded-full -translate-x-40 translate-y-20 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Credential badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            Evolution Functional Medicine
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}<br />
            <span className="text-gold-400">{titleHighlight}</span>
          </h2>

          <p className="text-primary-200 text-lg leading-relaxed mb-10">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gold-600 text-white font-bold text-lg hover:bg-gold-700 transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+18133335593"
              className="inline-flex items-center justify-center px-8 py-5 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              <Phone className="mr-2 h-5 w-5" />
              (813) 333-5593
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
