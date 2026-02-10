import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Globe, MessageCircle, Headphones, Phone, Code, Rocket, ArrowRight } from 'lucide-react'
import { servicesOverview, howItWorks } from '../data/services'
import { packages, addOns } from '../data/pricing'
import { portfolioItems } from '../data/portfolio'
import { faqs } from '../data/faq'

const iconMap = {
  Globe,
  MessageCircle,
  Headphones,
  Phone,
  Code,
  Rocket,
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative bg-off-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading leading-tight"
            >
              AI-Powered Websites for UK Healthcare Practices
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-lg md:text-xl text-body-text"
            >
              Professional websites built in 48 hours. From £1,499. Includes AI chatbot, mobile design, and ongoing support.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright-blue text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                View Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors"
              >
                See Our Work
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-body-text"
            >
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                Built in 48 Hours
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                AI-Powered Features
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                Healthcare Specialists
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services-overview" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {servicesOverview.map((service, i) => {
              const Icon = iconMap[service.icon]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-border bg-off-white hover:shadow-card-hover transition-shadow"
                >
                  {Icon && <Icon className="w-10 h-10 text-teal mb-4" />}
                  <h3 className="text-xl font-bold text-heading mb-2">{service.title}</h3>
                  <p className="text-body-text">{service.description}</p>
                  <Link to="/services" className="mt-4 inline-flex items-center gap-1 text-bright-blue font-medium hover:underline">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal text-white mb-4">
                    {Icon && <Icon className="w-7 h-7" />}
                  </div>
                  <p className="text-sm font-semibold text-teal">Step {item.step}</p>
                  <h3 className="text-xl font-bold text-heading mt-2">{item.title}</h3>
                  <p className="mt-2 text-body-text">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-body-text text-center mb-12 max-w-2xl mx-auto">
            Choose the package that fits your practice. All include mobile design, AI chatbot, and support.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border-2 p-8 ${
                  pkg.popular
                    ? 'border-bright-blue bg-off-white shadow-lg'
                    : 'border-border bg-white hover:shadow-card-hover'
                } transition-shadow`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-bright-blue text-white text-sm font-semibold rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-heading">{pkg.name}</h3>
                <p className="mt-4 text-3xl font-bold text-navy">{pkg.price}</p>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-body-text">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={pkg.ctaLink}
                  className={`mt-8 block w-full py-3 rounded-lg font-semibold text-center transition-opacity ${
                    pkg.popular
                      ? 'bg-bright-blue text-white hover:opacity-90'
                      : 'bg-navy text-white hover:opacity-90'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-heading text-center mb-8">Add-On Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="p-4 rounded-xl border border-border bg-off-white"
                >
                  <p className="font-semibold text-heading">{addon.name}</p>
                  <p className="text-bright-blue font-medium mt-1">{addon.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-16 md:py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">
            Our Work
          </h2>
          <p className="text-body-text text-center mb-12">
            Demo websites we've built for UK healthcare practices.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.slice(0, 6).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-card-hover transition-shadow"
              >
                <div className="aspect-video bg-border overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                    {item.specialty}
                  </span>
                  <h3 className="text-lg font-bold text-heading mt-1">{item.title}</h3>
                  <p className="text-sm text-body-text mt-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-xs px-2 py-1 bg-off-white rounded text-body-text">
                        {f}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/portfolio"
                    className="mt-4 inline-flex items-center gap-1 text-bright-blue font-medium hover:underline"
                  >
                    View Demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:opacity-90"
            >
              View Full Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="text-lg font-semibold text-heading">{faq.q}</h3>
                <p className="mt-2 text-body-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Practice's Online Presence?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Book a free 15-minute consultation to discuss your needs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-bright-blue text-white font-semibold rounded-lg hover:opacity-90"
            >
              Schedule Free Consultation
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Or email us at{' '}
            <a href="mailto:hello@medworkflow.digital" className="text-teal hover:underline">
              hello@medworkflow.digital
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
