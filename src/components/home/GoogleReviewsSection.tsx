'use client'
import { Star, ExternalLink } from 'lucide-react'

const reviews = [
  {
    name: 'Stacy A. Adams',
    initials: 'SA',
    date: 'March 2024',
    text: "Erin is not only an expert in her field but also takes the time to explain things thoroughly. It's rare to find a doctor who combines expertise with genuine care for their patients.",
    rating: 5,
    color: 'bg-primary-700',
  },
  {
    name: 'Jennifer M.',
    initials: 'JM',
    date: 'February 2024',
    text: 'Finally found a practitioner who listens! Erin helped me lose 30 pounds and my hormone levels are finally balanced. Highly recommend Evolution to anyone struggling with their health.',
    rating: 5,
    color: 'bg-gold-600',
  },
  {
    name: 'Thomas B.',
    initials: 'TB',
    date: 'January 2024',
    text: 'The team at Evolution is incredible. They take a comprehensive approach and truly care about your long-term health. Best decision I ever made for my health.',
    rating: 5,
    color: 'bg-primary-600',
  },
]

export default function GoogleReviewsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-primary-50/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm mb-6">
            <svg viewBox="0 0 48 48" className="w-7 h-7 flex-shrink-0">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span className="text-slate-700 font-semibold text-sm">Google Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-7 w-7 text-gold-500 fill-gold-500" />
            ))}
          </div>
          <div className="text-5xl font-bold text-slate-900 mb-1 font-heading">5.0</div>
          <p className="text-slate-500 text-sm">Based on verified patient reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-gold-500 fill-gold-500" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{review.name}</p>
                  <p className="text-slate-400 text-xs">{review.date} · Verified</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="https://google.com/maps" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200">
            <span className="flex gap-0.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-dot-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-dot-pulse-delay" />
            </span>
            <span>Read More Reviews on Google</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

