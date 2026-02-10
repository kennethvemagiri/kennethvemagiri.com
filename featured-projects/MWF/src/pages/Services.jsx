import { motion } from 'framer-motion'
import { Globe, MessageCircle, Search, Headphones, Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Website Development',
    from: 'From £1,499',
    description: 'Custom design process, modern tech stack, and a timeline that fits your practice.',
    points: [
      'Custom design process',
      'Technology we use',
      'Features included',
      '48–72 hour timeline',
    ],
    icon: Globe,
  },
  {
    title: 'AI Chatbot Development',
    from: '£500 setup + £99–£199/month',
    description: '24/7 patient assistance, appointment hints, and FAQ handling.',
    points: [
      'How it works',
      'Example conversations',
      'Integration process',
    ],
    icon: MessageCircle,
  },
  {
    title: 'SEO & Marketing',
    from: 'From £300/month',
    description: 'Local SEO for healthcare, Google My Business, content, and analytics.',
    points: [
      'Local SEO for healthcare',
      'Google My Business optimisation',
      'Content creation',
      'Analytics and reporting',
    ],
    icon: Search,
  },
  {
    title: 'Ongoing Support',
    from: 'From £99/month',
    description: 'Maintenance, updates, and peace of mind.',
    points: [
      'What\'s included',
      'Response times',
      'Monthly maintenance',
      'Pricing tiers',
    ],
    icon: Headphones,
  },
]

export default function Services() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            Our Services
          </h1>
          <p className="mt-4 text-xl text-body-text max-w-2xl mx-auto">
            Everything you need to grow your practice online. Websites, AI chatbots, SEO, and support.
          </p>
        </div>

        <div className="space-y-20">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.section
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="inline-flex p-4 rounded-xl bg-teal/10 text-teal mb-4">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-heading">{service.title}</h2>
                  <p className="text-bright-blue font-semibold mt-2">{service.from}</p>
                  <p className="mt-4 text-body-text">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-body-text">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-bright-blue font-semibold hover:underline"
                  >
                    Get a quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className={`aspect-video rounded-xl bg-off-white border border-border ${i % 2 === 1 ? 'md:order-1' : ''}`} />
              </motion.section>
            )
          })}
        </div>

        <div className="mt-24 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright-blue text-white font-semibold rounded-lg hover:opacity-90"
          >
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
