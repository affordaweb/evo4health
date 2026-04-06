import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Scale, Heart, Leaf, Beaker, Pill } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services | Evolution Functional Medicine',
  description: 'Explore our comprehensive functional medicine services including weight loss, hormone balancing, gut health, and personalized supplement protocols.',
}

const services = [
  {
    icon: Activity,
    title: 'Functional Medicine Consultation',
    description: 'A comprehensive approach to your health that goes beyond treating symptoms.',
    features: ['Comprehensive health assessment', 'Root cause analysis', 'Personalized treatment protocols', 'Ongoing monitoring and adjustments'],
    color: 'from-primary-50 to-primary-100',
    iconColor: 'bg-primary-100 text-primary-700',
  },
  {
    icon: Scale,
    title: 'Weight Loss Program',
    description: 'Medical weight management that addresses the root causes of weight gain.',
    features: ['Medical weight management', 'Metabolic testing', 'Nutrition guidance', 'Sustainable, long-term results'],
    color: 'from-gold-50 to-gold-100',
    iconColor: 'bg-gold-100 text-gold-700',
  },
  {
    icon: Heart,
    title: 'Hormone Balancing',
    description: 'Comprehensive hormone optimization to help you feel your best at every age.',
    features: ['Comprehensive hormone panel testing', 'Bio-identical hormone therapy', 'Thyroid optimization', 'Adrenal support'],
    color: 'from-primary-50 to-primary-100',
    iconColor: 'bg-primary-100 text-primary-700',
  },
  {
    icon: Leaf,
    title: 'Gut Health & Nutrition',
    description: 'Your gut health affects everything. We help you optimize it.',
    features: ['Digestive health assessment', 'Food sensitivity testing', 'Gut microbiome optimization', 'Nutritional protocols'],
    color: 'from-gold-50 to-gold-100',
    iconColor: 'bg-gold-100 text-gold-700',
  },
  {
    icon: Pill,
    title: 'Supplement Consultation',
    description: 'Expert guidance on practitioner-grade supplements tailored to your needs.',
    features: ['Private label supplement recommendations', 'Orthomolecular-grade products', 'Personalized supplement protocols', 'Ongoing optimization'],
    color: 'from-primary-50 to-primary-100',
    iconColor: 'bg-primary-100 text-primary-700',
  },
  {
    icon: Beaker,
    title: 'Lab Testing & Analysis',
    description: 'Comprehensive testing to understand your unique biochemistry.',
    features: ['Advanced blood panels', 'Hormone testing', 'Nutrient deficiency testing', 'Genetic insights'],
    color: 'from-gold-50 to-gold-100',
    iconColor: 'bg-gold-100 text-gold-700',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-primary-200 text-xl max-w-2xl mx-auto">
            Comprehensive, personalized care designed to address the root causes of your health challenges.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div key={i} className={'rounded-2xl p-8 bg-gradient-to-br ' + service.color + ' border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200'}>
                  <div className={'w-14 h-14 rounded-xl flex items-center justify-center mb-6 ' + service.iconColor}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">{service.title}</h2>
                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-start space-x-2 text-sm text-slate-700">
                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/schedule" className="inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group">
                    Book Consultation <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">Not sure which service is right for you?</h2>
          <p className="text-primary-200 mb-8">Book a free 15-minute discovery call and Erin will help you determine the best path forward.</p>
          <Link href="/schedule" className="btn-gold text-base px-10 py-4">Book Free Discovery Call</Link>
        </div>
      </section>
    </div>
  )
}
