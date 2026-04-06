import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Heart, Users, Award } from 'lucide-react'
import SubpageHero from '@/components/ui/SubpageHero'
import PreFooterCTA from '@/components/ui/PreFooterCTA'

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
      <SubpageHero
        title="About Erin"
        subtitle="Functional Medicine Practitioner, Hormone Specialist, and passionate advocate for your health."
        badge="Meet Our Founder"
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://evolution4health.com/wp-content/uploads/2026/03/dr-erin-bolton-coletti-md.jpg"
                  alt="Dr. Erin Bolton-Coletti, MD — Functional Medicine Practitioner"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-950/80 to-transparent px-5 py-4">
                  <p className="font-heading text-lg font-bold text-white">Dr. Erin Bolton-Coletti, MD</p>
                  <p className="text-primary-200 text-xs">Functional Medicine Practitioner</p>
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

      <PreFooterCTA
        title="Ready to Meet"
        titleHighlight="Erin & the Team?"
        subtitle="Book your free 15-minute discovery call and take the first step toward lasting, root-cause health with someone who genuinely cares."
        buttonText="Book Free Discovery Call"
      />
    </div>
  )
}
