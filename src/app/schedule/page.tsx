import type { Metadata } from 'next'
import SubpageHero from '@/components/ui/SubpageHero'

export const metadata: Metadata = {
  title: 'Book Your Free Discovery Call | Evolution Functional Medicine',
  description: 'Schedule a free 15-minute discovery call with Erin to discuss your health goals and how functional medicine can help you.',
}

export default function SchedulePage() {
  return (
    <div className="pt-20">
      <SubpageHero
        title="Book Your Free Discovery Call"
        subtitle="Schedule a free 15-minute call with Erin to discuss your health goals and find out if we are the right fit for you."
        badge="Free Consultation"
      />

      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {[
              { step: '1', title: 'Choose a Time', desc: 'Select a date and time that works for you using the calendar below.' },
              { step: '2', title: 'Share Your Goals', desc: 'Tell us briefly about your health goals and what you\'d like to achieve.' },
              { step: '3', title: 'Talk with Erin', desc: 'Join the 15-minute call. Erin will answer your questions and outline next steps.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-700 text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8 text-center border-b border-slate-100">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Schedule Your Call</h2>
              <p className="text-slate-500 text-sm">15-minute complimentary discovery call • Free • No obligation</p>
            </div>
            <div className="p-4">
              {/* Cal.com embed — replace YOUR_CAL_LINK with your actual Cal.com username/event */}
              <iframe
                src="https://cal.com/evolution4health/discovery?embed=true"
                width="100%"
                height="700"
                frameBorder="0"
                className="rounded-xl"
                title="Schedule a Discovery Call"
              />
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            Prefer to reach out directly?{' '}
            <a href="/contact" className="text-primary-700 hover:text-primary-900 font-medium">Send us a message</a>
          </p>
        </div>
      </section>
    </div>
  )
}
