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
import { ArrowRight, Phone, Calendar, MessageSquare, Star, Users, Award } from 'lucide-react'

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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 py-24">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-400/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-400/10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: CTA content */}
          <div>
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

          {/* Right: trust stats + contact options */}
          <div className="space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-2">
              {[
                { icon: Users, value: '500+', label: 'Happy Patients' },
                { icon: Star, value: '5.0', label: 'Google Rating' },
                { icon: Award, value: '17+', label: 'Years Experience' },
              ].map(stat => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors">
                    <Icon className="h-5 w-5 text-gold-400 mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-primary-400 text-xs mt-0.5">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Contact cards */}
            <a href="tel:+18133335593" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-primary-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Call Lutz Office</div>
                <div className="text-primary-300 text-xs mt-0.5">(813) 333-5593</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary-400 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <a href="sms:+17274734543" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-gold-600 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 transition-colors">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Text Us</div>
                <div className="text-primary-300 text-xs mt-0.5">(727) 473-4543 — All locations</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary-400 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>

            <a href="tel:+17272414551" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-primary-700 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Call Largo Office</div>
                <div className="text-primary-300 text-xs mt-0.5">(727) 241-4551</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary-400 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
