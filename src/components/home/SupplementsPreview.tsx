import Link from 'next/link'
import { ArrowRight, ShoppingBag, BadgeCheck } from 'lucide-react'

const products = [
  { name: 'Omega-3 Complete', price: '$45.99', desc: 'Heart and brain health', emoji: '🐟', badge: 'Best Seller', accentBar: 'from-primary-500 to-primary-700' },
  { name: 'Vitamin D3 + K2', price: '$34.99', desc: 'Bone and immune support', emoji: '☀️', badge: null, accentBar: 'from-gold-400 to-gold-600' },
  { name: 'Probiotic Elite 30B', price: '$52.99', desc: '30B CFU gut health formula', emoji: '🦠', badge: 'Top Rated', accentBar: 'from-primary-400 to-primary-600' },
  { name: 'Magnesium Glycinate', price: '$39.99', desc: 'Sleep and stress support', emoji: '🌙', badge: null, accentBar: 'from-gold-500 to-gold-700' },
]

export default function SupplementsPreview() {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-50 rounded-full translate-x-1/3 -translate-y-1/2 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4 gap-2">
            <ShoppingBag className="h-4 w-4" />
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
            <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
              {/* Top accent bar */}
              <div className={`h-1 bg-gradient-to-r ${p.accentBar}`} />
              <div className="p-6 flex flex-col flex-1">
                <div className="relative mb-4">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-slate-50 to-primary-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                    {p.emoji}
                  </div>
                  {p.badge && (
                    <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-gold-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                      <BadgeCheck className="h-3 w-3" />
                      {p.badge}
                    </div>
                  )}
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-slate-500 text-sm mb-4 flex-1">{p.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                  <span className="font-bold text-primary-700 text-lg">{p.price}</span>
                  <Link href="/shop" className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1">
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center btn-primary gap-2">
            Shop All Supplements
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

