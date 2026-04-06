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
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

        {/* Left: photo */}
        <div className="relative h-72 lg:h-auto order-2 lg:order-1">
          <Image
            src="https://evolution4health.com/wp-content/uploads/2023/09/erin-coletti-and-dr-van.png"
            alt="Dr. Erin Bolton-Coletti and Dr. Van Benschoten"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle right-side fade into the dark panel */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-primary-950 hidden lg:block" />
        </div>

        {/* Right: solid dark content */}
        <div className="bg-primary-950 flex items-center order-1 lg:order-2">
          <div className="px-10 md:px-16 py-16 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary-200 text-sm font-medium mb-7">
              <Calendar className="h-4 w-4 text-gold-400" />
              Free 15-Minute Discovery Call
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {title}<br />
              <span className="text-gold-400">{titleHighlight}</span>
            </h2>

            <p className="text-primary-300 text-lg leading-relaxed mb-10">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold-600 text-white font-bold text-base hover:bg-gold-700 transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+18133335593"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border-2 border-white/25 text-white font-semibold text-base hover:border-white/60 hover:bg-white/5 transition-all duration-200"
              >
                <Phone className="mr-2 h-4 w-4" />
                (813) 333-5593
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
