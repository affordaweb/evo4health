'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Play } from 'lucide-react'

const testimonials = [
  {
    name: 'Stacy A. Adams',
    text: "Erin is not only an expert in her field but also takes the time to explain things thoroughly. It's rare to find a doctor who combines expertise with genuine care for their patients — and she does just that. Every appointment feels like a conversation with a friend who genuinely cares about your well-being and getting to the root of your issues.",
    rating: 5,
  },
  {
    name: 'Jennifer M.',
    text: "After years of struggling with fatigue and weight gain, Erin finally found the root cause. Within three months I had more energy than I'd had in years. Her functional medicine approach changed my life.",
    rating: 5,
  },
  {
    name: 'Robert K.',
    text: "The hormone balancing program at Evolution is unlike anything I've experienced. Erin is thorough, compassionate, and truly listens. I feel like a completely different person.",
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex space-x-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={'h-4 w-4 ' + (i < count ? 'text-gold-500 fill-gold-500' : 'text-slate-300')} />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-24 bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Patient Stories</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-4">
            Hear From Our Patients
          </h2>
          <p className="text-primary-300 text-lg">Real patients, real results</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {[0, 1].map(i => (
            <div key={i} className="relative aspect-video rounded-2xl bg-primary-800/50 border border-primary-700 flex items-center justify-center group cursor-pointer hover:border-gold-500 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/20 to-primary-900/20" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-gold-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="h-7 w-7 text-white ml-1" />
                </div>
                <p className="text-primary-200 text-sm">Patient Testimonial {i + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-primary-800/50 rounded-2xl p-8 md:p-10 border border-primary-700 relative">
            <div className="text-6xl text-primary-600 font-serif absolute top-6 left-8">&ldquo;</div>
            <div className="pt-6">
              <StarRating count={testimonials[current].rating} />
              <p className="text-primary-100 text-lg leading-relaxed mt-4 mb-6">
                {testimonials[current].text}
              </p>
              <p className="font-semibold text-gold-400">{testimonials[current].name}</p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-6">
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-primary-800 hover:bg-primary-700 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={'w-2 h-2 rounded-full transition-all ' + (i === current ? 'bg-gold-500 w-6' : 'bg-primary-600')} />
              ))}
            </div>
            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
              className="p-2 rounded-full bg-primary-800 hover:bg-primary-700 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
