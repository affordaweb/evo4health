'use client'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Quote, Award, Users, Heart } from 'lucide-react'

const highlights = [
  'Personalized functional medicine protocols',
  'Compassionate, patient-centered care',
  'Evidence-based integrative approach',
  'Comprehensive hormone and metabolic testing',
]

const stats = [
  { icon: Award, value: '10+', label: 'Years Exp.', color: 'text-gold-600', bg: 'bg-gold-50' },
  { icon: Users, value: '500+', label: 'Patients', color: 'text-primary-700', bg: 'bg-primary-50' },
  { icon: Heart, value: '5.0', label: 'Rating', color: 'text-rose-500', bg: 'bg-rose-50' },
]

export default function AboutErinSection() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide mb-4">
              About Erin
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">
              Meet Erin, Your Partner in Health
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Erin is not just a practitioner — she is a passionate advocate for your wellbeing. With deep expertise in functional medicine, she combines scientific precision with genuine compassion to help you find lasting solutions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Every patient who walks through our doors gets Erin&apos;s personal attention and a plan built specifically for them. Because you deserve care that actually works.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <span className="text-slate-700">{h}</span>
                </li>
              ))}
            </ul>

            <blockquote className="border-l-4 border-gold-500 pl-6 my-8 bg-white rounded-r-xl py-4 pr-4 shadow-sm">
              <Quote className="h-6 w-6 text-gold-500 mb-2" />
              <p className="text-slate-700 italic leading-relaxed">
                &ldquo;Erin is not only an expert in her field but also takes the time to explain things thoroughly... Every appointment feels like a conversation with a friend who genuinely cares.&rdquo;
              </p>
              <footer className="mt-2 text-sm font-semibold text-primary-700">— Stacy A. Adams</footer>
            </blockquote>

            <Link href="/about" className="btn-primary inline-flex items-center gap-2">
              <span className="flex gap-0.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-dot-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-dot-pulse-delay" />
              </span>
              Learn More About Erin
            </Link>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://evolution4health.com/wp-content/uploads/2026/03/dr-erin-bolton-coletti-md.jpg"
                  alt="Dr. Erin Bolton-Coletti, MD — Functional Medicine Practitioner"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Overlay badge at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-950/90 via-primary-900/50 to-transparent px-6 py-5">
                  <p className="font-heading text-xl font-bold text-white mb-0.5">Dr. Erin Bolton-Coletti, MD</p>
                  <p className="text-primary-200 text-xs">Functional Medicine Practitioner</p>
                </div>
              </div>
              {/* Floating stats bar */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
                <div className="bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center justify-between gap-2">
                  {stats.map((s, i) => {
                    const Icon = s.icon
                    return (
                      <div key={i} className="flex items-center gap-2 flex-1 justify-center">
                        <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-4 w-4 ${s.color}`} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm leading-none">{s.value}</div>
                          <div className="text-slate-500 text-xs">{s.label}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
