import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Clock } from 'lucide-react'

const serviceOptions = [
  { value: 'website', label: 'Website' },
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'seo', label: 'SEO' },
  { value: 'all', label: 'All' },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    console.log('Contact form:', data)
    // TODO: Send via EmailJS/Formspree to hello@medworkflow.digital
    setSubmitted(true)
    reset()
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-heading">
              Get in Touch
            </h1>
            <p className="mt-4 text-xl text-body-text">
              Book a free 15-minute consultation or send us a message. We'll respond within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal/10 text-teal">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-heading">Email</p>
                  <a
                    href="mailto:hello@medworkflow.digital"
                    className="text-bright-blue hover:underline"
                  >
                    hello@medworkflow.digital
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-teal/10 text-teal">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-heading">Business hours</p>
                  <p className="text-body-text">Monday–Friday, 9am–6pm GMT</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-off-white rounded-2xl border border-border p-8"
          >
            {submitted ? (
              <div className="text-center py-8">
                <p className="text-lg font-semibold text-success">
                  Thanks! We'll respond within 24 hours.
                </p>
                <p className="mt-2 text-body-text">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-heading mb-1">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-heading mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-heading mb-1">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="clinic" className="block text-sm font-medium text-heading mb-1">
                    Clinic Name *
                  </label>
                  <input
                    id="clinic"
                    type="text"
                    {...register('clinic', { required: 'Clinic name is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none"
                  />
                  {errors.clinic && (
                    <p className="mt-1 text-sm text-red-600">{errors.clinic.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-heading mb-1">
                    Service Interested In *
                  </label>
                  <select
                    id="service"
                    {...register('service', { required: 'Please select a service' })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none"
                  >
                    <option value="">Select service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-heading mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register('message', { required: 'Message is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-bright-blue focus:border-transparent outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-bright-blue text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
