'use client'
import Link from 'next/link'
import { CheckCircle, Quote } from 'lucide-react'

const highlights = [
  'Personalized functional medicine protocols',
  'Compassionate, patient-centered care',
  'Evidence-based integrative approach',
  'Comprehensive hormone and metabolic testing',
]

export default function AboutErinSection() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">About Erin</span>
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

            <blockquote className="border-l-4 border-gold-500 pl-6 my-8 bg-gold-50 rounded-r-xl py-4 pr-4">
              <Quote className="h-6 w-6 text-gold-500 mb-2" />
              <p className="text-slate-700 italic leading-relaxed">
                &ldquo;Erin is not only an expert in her field but also takes the time to explain things thoroughly... Every appointment feels like a conversation with a friend who genuinely cares.&rdquo;
              </p>
              <footer className="mt-2 text-sm font-semibold text-primary-700">— Stacy A. Adams</footer>
            </blockquote>

            <Link href="/about" className="btn-primary">
              Learn More About Erin
            </Link>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-2xl overflow-hidden">
                <div className="text-center text-primary-700">
                  <div className="text-8xl mb-4">👩‍⚕️</div>
                  <p className="font-heading text-2xl font-bold">Erin</p>
                  <p className="text-primary-600 mt-1">Functional Medicine Practitioner</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-700">10+</div>
                  <div className="text-xs text-gold-600">Years Exp.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
