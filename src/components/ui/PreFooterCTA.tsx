import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, Calendar } from 'lucide-react'

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
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, Calendar } from 'lucide-react'

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
    <section className="relative bg-primary-950 overflow-hidden py-24">
      {/* Dot texture */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="prefooter-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prefooter-dots)" />
        </svg>
      </div>

      {/* Gold glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Photo — right, bottom-aligned, contained on dark bg */}
      <div className="absolute bottom-0 right-0 w-[480px] h-full hidden lg:block pointer-events-none">
        <Image
          src="https://evolution4health.com/wp-content/uploads/2023/09/erin-coletti-and-dr-van.png"
          alt="Dr. Erin Bolton-Coletti and Dr. Van Benschoten"
          fill
          className="object-contain object-bottom"
          sizes="480px"
        />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary-950 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-primary-200 text-sm font-medium mb-7">
            <Calendar className="h-4 w-4 text-gold-400" />
            Free 15-Minute Discovery Call
          </div>

          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {title}<br />
            <span className="text-gold-400">{titleHighlight}</span>
          </h2>

          <p className="text-primary-300 text-lg leading-relaxed mb-10 max-w-md">{subtitle}</p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-600 text-white font-bold text-base hover:bg-gold-700 transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
            >
              {buttonText}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+18133335593"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:border-white/50 hover:bg-white/5 transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
              (813) 333-5593
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
