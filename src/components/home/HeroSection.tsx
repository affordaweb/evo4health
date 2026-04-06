'use client'
import Link from 'next/link'
import { ArrowDown, Calendar, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="botanical" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="white" opacity="0.5"/>
              <path d="M30 10 Q40 20 30 30 Q20 20 30 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanical)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-700/50 border border-primary-600 text-primary-200 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gold-400 rounded-full mr-2"></span>
              Functional Medicine &amp; Wellness
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your Health.<br />
              <span className="text-gold-400">Your Life.</span><br />
              Transformed.
            </h1>
            <p className="text-primary-200 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Erin and her team at Evolution take a functional medicine approach to help you achieve lasting weight loss, balanced hormones, and vibrant health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold-600 text-white font-semibold text-base hover:bg-gold-700 transition-all duration-200 hover:shadow-xl hover:scale-105 group">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Discovery Call
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-base hover:bg-white hover:text-primary-900 transition-all duration-200">
                Explore Our Services
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center animate-fade-in">
            <div className="relative">
              <div className="w-80 h-96 rounded-3xl bg-primary-700/30 border border-primary-600/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🌿</div>
                  <p className="font-heading text-xl font-semibold">Meet Erin</p>
                  <p className="text-primary-300 text-sm mt-1">Your Health Partner</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {['★','★','★','★','★'].map((s, i) => <span key={i} className="text-gold-500 text-sm">{s}</span>)}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">500+ Happy Patients</p>
                    <p className="text-slate-500 text-xs">5.0 Google Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary-300 animate-bounce">
          <span className="text-xs mb-1">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </div>
    </section>
  )
}
