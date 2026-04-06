import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Heart, Users, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Erin | Evolution Functional Medicine',
  description: 'Meet Erin, founder of Evolution Functional Medicine. Learn about her philosophy, credentials, and passion for helping patients achieve lasting health.',
}

const philosophy = [
  'Root cause analysis, not symptom management',
  'Personalized protocols for each patient',
  'Whole-body approach: hormones, nutrition, gut health, lifestyle',
  'Compassionate, patient-centered care',
  'Evidence-based integrative medicine',
]

const stats = [
  { label: 'Years Experience', value: '10+', icon: Award },
  { label: 'Happy Patients', value: '500+', icon: Users },
  { label: 'Google Rating', value: '5.0', icon: Heart },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">About Erin</h1>
          <p className="text-primary-200 text-xl max-w-2xl mx-auto">
            Functional Medicine Practitioner, Hormone Specialist, and passionate advocate for your health.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-[4/5] rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center shadow-2xl">
                <div className="text-center text-primary-700">
                  <div className="text-8xl mb-4">👩‍⚕️</div>
                  <p className="font-heading text-2xl font-bold">Erin</p>
                  <p className="text-primary-600 text-sm mt-1">Functional Medicine Practitioner</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-4xl font-bold text-slate-900 mb-6">Your Partner in Health</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Erin is not only an expert in her field but also takes the time to explain things thoroughly. It is rare to find a practitioner who combines expertise with genuine care for their patients — and she does just that.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every appointment feels like a conversation with a friend who genuinely cares about your well-being and getting to the root of your issues. Evolution is built on the belief that true health comes from understanding root causes of illness, not just treating symptoms.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Our functional medicine approach combines the best of conventional and integrative medicine to create personalized protocols that work.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {stats.map((s) => {
                  const Icon = s.icon
                  return (
                    <div key={s.label} className="text-center p-4 bg-primary-50 rounded-xl">
                      <Icon className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary-700">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  )
                })}
              </div>
              <Link href="/schedule" className="btn-gold">Book Free Discovery Call</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold text-slate-900 text-center mb-4">Our Philosophy</h2>
          <p className="text-slate-600 text-lg text-center mb-12">Why Functional Medicine Works</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {philosophy.map((item, i) => (
              <div key={i} className="flex items-start space-x-3 p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold mb-4">Ready to Meet Erin?</h2>
          <p className="text-primary-200 text-lg mb-8">Book your free 15-minute discovery call and take the first step toward lasting health.</p>
          <Link href="/schedule" className="inline-flex items-center px-10 py-4 rounded-full bg-gold-600 text-white font-bold text-lg hover:bg-gold-700 transition-all duration-200 hover:shadow-2xl hover:scale-105">
            Book Free Call
          </Link>
        </div>
      </section>
    </div>
  )
}
