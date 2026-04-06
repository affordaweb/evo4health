import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'

const products = [
  { name: 'Omega-3 Complete', price: '$45.99', desc: 'Heart and brain health', emoji: '🐟' },
  { name: 'Vitamin D3 + K2', price: '$34.99', desc: 'Bone and immune support', emoji: '☀️' },
  { name: 'Probiotic Elite 30B', price: '$52.99', desc: '30B CFU gut health formula', emoji: '🦠' },
  { name: 'Magnesium Glycinate', price: '$39.99', desc: 'Sleep and stress support', emoji: '🌙' },
]

export default function SupplementsPreview() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Exclusive to Evolution Patients
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Our Private Label Supplements
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Premium, practitioner-grade supplements exclusive to Evolution patients — rigorously tested for purity and potency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group">
              <div className="aspect-square rounded-xl bg-primary-50 flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                {p.emoji}
              </div>
              <h3 className="font-heading font-bold text-slate-900 mb-1">{p.name}</h3>
              <p className="text-slate-500 text-sm mb-3">{p.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary-700 text-lg">{p.price}</span>
                <Link href="/shop" className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">View →</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center btn-primary">
            Shop All Supplements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
