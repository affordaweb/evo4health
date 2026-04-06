import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import SubpageHero from '@/components/ui/SubpageHero'

export const metadata: Metadata = {
  title: 'Contact Us | Evolution Functional Medicine',
  description: 'Get in touch with Evolution Functional Medicine. We would love to hear from you.',
}

const info = [
  { icon: MapPin, label: 'Location', value: 'Serving patients virtually and in-person' },
  { icon: Phone, label: 'Phone', value: '(555) 000-0000' },
  { icon: Mail, label: 'Email', value: 'info@evolution4health.com' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 9am – 5pm EST' },
]

export default function ContactPage() {
  return (
    <div className="pt-20">
      <SubpageHero
        title="Contact Us"
        subtitle="We would love to hear from you. Fill out the form below or reach out directly."
        badge="Get In Touch"
      />
      <section className="py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-8">Get In Touch</h2>
              <div className="space-y-6 mb-10">
                {info.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.label}</p>
                        <p className="text-slate-600">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
                <p className="font-heading font-bold text-primary-900 mb-2">Ready to take the first step?</p>
                <p className="text-primary-700 text-sm">Book a free 15-minute discovery call and find out if Functional Medicine is right for you.</p>
                <a href="/schedule" className="inline-block mt-4 btn-primary text-sm">Book Free Call</a>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
