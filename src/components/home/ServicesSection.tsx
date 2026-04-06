'use client'
import Link from 'next/link'
import { Activity, Scale, Heart, Pill } from 'lucide-react'

const services = [
  {
    icon: Activity,
    title: 'Functional Medicine',
    description: 'Root cause analysis and personalized protocols that address the underlying causes of your health challenges.',
    accentBar: 'from-primary-500 to-primary-700',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-700',
    glow: 'group-hover:shadow-primary-100',
  },
  {
    icon: Scale,
    title: 'Weight Loss',
    description: 'Sustainable, science-backed weight management programs tailored to your unique metabolism and lifestyle.',
    accentBar: 'from-gold-400 to-gold-600',
    iconBg: 'bg-gold-50',
    iconColor: 'text-gold-700',
    glow: 'group-hover:shadow-gold-100',
  },
  {
    icon: Heart,
    title: 'Hormone Balancing',
    description: 'Feel like yourself again with comprehensive hormone testing and bio-identical hormone optimization.',
    accentBar: 'from-primary-400 to-primary-600',
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-700',
    glow: 'group-hover:shadow-primary-100',
  },
  {
    icon: Pill,
    title: 'Supplement Guidance',
    description: 'Private label, practitioner-grade supplements tailored to your specific health needs and goals.',
    accentBar: 'from-gold-500 to-gold-700',
    iconBg: 'bg-gold-50',
    iconColor: 'text-gold-700',
    glow: 'group-hover:shadow-gold-100',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold tracking-wide mb-4">
            What We Offer
          </span>
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
              <div
                key={i}
                className={`group relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl ${service.glow} hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
              >
                {/* Coloured top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.accentBar}`} />
                <div className="relative mt-2">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-7 w-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-14">
          <Link href="/services" className="btn-primary inline-flex items-center gap-2">
            <span className="flex gap-0.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-dot-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-dot-pulse-delay" />
            </span>
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

