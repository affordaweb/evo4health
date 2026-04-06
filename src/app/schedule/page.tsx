import type { Metadata } from 'next'
import SubpageHero from '@/components/ui/SubpageHero'
import Link from 'next/link'
import { Phone, MessageSquare, Mail, Clock, MapPin } from 'lucide-react'

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

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              { step: '1', title: 'Reach Out', desc: 'Call, text, or email us to request your free discovery call.' },
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

          {/* Booking options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <a
              href="tel:+18133335593"
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Phone className="h-7 w-7 text-primary-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-primary-700 font-semibold mb-1">(813) 333-5593</p>
              <p className="text-slate-500 text-xs">Lutz &amp; Largo locations</p>
            </a>

            <a
              href="sms:+17274734543"
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold-200 transition-colors">
                <MessageSquare className="h-7 w-7 text-gold-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">Text Us</h3>
              <p className="text-primary-700 font-semibold mb-1">(727) 473-4543</p>
              <p className="text-slate-500 text-xs">All locations</p>
            </a>

            <Link
              href="/contact"
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Mail className="h-7 w-7 text-primary-700" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-primary-700 font-semibold mb-1">Contact Form</p>
              <p className="text-slate-500 text-xs">We reply within 24 hours</p>
            </Link>
          </div>

          {/* Hours & locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Evolution Lutz — Van Dyke',
                address: '4691 Van Dyke Rd, Lutz, FL 33558',
                phone: '(813) 333-5593',
                hours: 'Mon–Fri 10am–4pm\nWed until 5pm · Thu until 6pm · Fri until 3pm',
              },
              {
                name: 'Evolution Lutz — Dale Mabry',
                address: '18709 N Dale Mabry Hwy, Ste A, Lutz, FL 33548',
                phone: '(813) 333-5593',
                hours: 'Mon–Fri 10am–4pm\nWed until 5pm · Thu until 6pm · Fri until 3pm',
              },
              {
                name: 'Evolution Largo',
                address: '1033 W Bay Dr Ste B, Largo, FL 33770',
                phone: '(727) 241-4551',
                hours: 'Tue–Wed 8:30am–4:00pm\nMon, Thu, Fri: Closed',
              },
            ].map(loc => (
              <div key={loc.name} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{loc.name}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{loc.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Phone className="h-4 w-4 text-primary-600 flex-shrink-0" />
                  <a href={'tel:+1' + loc.phone.replace(/\D/g, '')} className="text-primary-700 text-sm font-medium hover:text-primary-900">{loc.phone}</a>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-500 text-xs whitespace-pre-line">{loc.hours}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Prefer to send a message?{' '}
            <a href="/contact" className="text-primary-700 hover:text-primary-900 font-medium">Contact us here</a>
          </p>
        </div>
      </section>
    </div>
  )
}
