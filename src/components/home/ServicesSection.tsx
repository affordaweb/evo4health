'use client'
import Link from 'next/link'
import { Activity, Scale, Heart, Pill } from 'lucide-react'

const services = [
  {
    icon: Activity,
    title: 'Functional Medicine',
    description: 'Root cause analysis and personalized protocols that address the underlying causes of your health challenges.',
    color: 'bg-primary-50 text-primary-700',
  },
  {
    icon: Scale,
    title: 'Weight Loss',
    description: 'Sustainable, science-backed weight management programs tailored to your unique metabolism and lifestyle.',
    color: 'bg-gold-50 text-gold-700',
  },
  {
    icon: Heart,
    title: 'Hormone Balancing',
    description: 'Feel like yourself again with comprehensive hormone testing and bio-identical hormone optimization.',
    color: 'bg-primary-50 text-primary-700',
  },
  {
    icon: Pill,
    title: 'Supplement Guidance',
    description: 'Private label, practitioner-grade supplements tailored to your specific health needs and goals.',
    color: 'bg-gold-50 text-gold-700',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            How We Help You Thrive
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Our comprehensive approach addresses every aspect of your health with personalized, evidence-based care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className={'w-14 h-14 rounded-xl flex items-center justify-center mb-6 ' + service.color}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
