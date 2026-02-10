/**
 * Contact Component
 * 
 * Contact section featuring:
 * - Contact information (email, phone, location)
 * - Consultation booking section
 * - Scroll-triggered animations
 * - Responsive layout
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Phone, MapPin, Calendar } from 'lucide-react'

const Contact = () => {
  // Ref for scroll detection
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Contact information (from README)
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@medworkflow.com',
      link: 'mailto:hello@medworkflow.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+44 (0) 20 1234 5678',
      link: 'tel:+442012345678',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'London, United Kingdom',
      link: null,
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative bg-ai-light">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ai-dark">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-ai-gray max-w-2xl mx-auto">
            Ready to automate repetitive healthcare admin so your staff can focus on patients? Start with our NHS-approved pilot program.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Combined Contact Info & Consultation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white border border-ai-border rounded-3xl p-8 shadow-lg"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Contact Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold mb-6 text-ai-dark">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    return (
                      <div key={index} className="flex items-start gap-3">
                        {/* Contact icon */}
                        <div className="inline-flex p-2.5 rounded-lg bg-ai-primary">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          {/* Contact type label */}
                          <h4 className="font-semibold text-ai-dark mb-1 text-sm">{info.title}</h4>
                          {/* Contact value (linkable if link exists) */}
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-ai-gray hover:text-ai-primary transition-colors text-sm"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-ai-gray text-sm">{info.content}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pilot Program Section */}
              <div className="border-l border-ai-border pl-6">
                <h3 className="text-xl font-bold mb-4 text-ai-dark">Join Our NHS Pilot Program</h3>
                <p className="text-ai-gray mb-6 leading-relaxed text-sm">
                  Participate in our 8-12 week NHS-approved pilot program and experience AI automation that reduces administrative burden by 30-50%.
                </p>
                {/* Pilot CTA button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ai-primary text-white rounded-full font-semibold shadow-soft hover:bg-ai-primary-deep transition-all text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Start Pilot
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

