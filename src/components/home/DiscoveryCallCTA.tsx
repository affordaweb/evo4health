import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export default function DiscoveryCallCTA() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 p-12 md:p-20 text-white text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-400 rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-400 rounded-full translate-x-32 translate-y-32" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6">
              <Calendar className="h-4 w-4 mr-2 text-gold-400" />
              Free 15-Minute Discovery Call
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your<br />
              <span className="text-gold-400">Health Journey?</span>
            </h2>
            <p className="text-primary-200 text-lg max-w-2xl mx-auto mb-10">
              Book your free 15-minute discovery call with Erin and take the first step toward the health and life you deserve. No pressure, just a friendly conversation.
            </p>
            <Link href="/schedule"
              className="inline-flex items-center px-10 py-5 rounded-full bg-gold-600 text-white font-bold text-lg hover:bg-gold-700 transition-all duration-200 hover:shadow-2xl hover:scale-105 group">
              Book Your Free Call
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
