/**
 * Testimonials Component
 * 
 * Customer testimonials and case studies section
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, Star, Building2, User } from 'lucide-react'

const Testimonials = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Clinical Director',
      organization: 'NHS Trust London',
      content: 'A2Ai has transformed our clinic operations. We\'ve reduced administrative time by 45% and our staff can now focus on what matters most - patient care.',
      rating: 5,
      image: '👩‍⚕️',
    },
    {
      name: 'James Thompson',
      role: 'Practice Manager',
      organization: 'Private Healthcare Group',
      content: 'The AI automation has been a game-changer. Appointment scheduling is seamless, and patient communication has never been better. Highly recommended!',
      rating: 5,
      image: '👨‍💼',
    },
    {
      name: 'Dr. Emily Chen',
      role: 'GP Partner',
      organization: 'Community Health Centre',
      content: 'NHS-compliant, secure, and incredibly efficient. The platform integrates perfectly with our existing systems and the ROI was evident within the first month.',
      rating: 5,
      image: '👩‍⚕️',
    },
  ]

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-primary/10 text-ai-primary text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-ai-primary" />
            Trusted by Healthcare Professionals
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ai-dark">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-ai-gray max-w-3xl mx-auto">
            Real feedback from NHS Trusts and private clinics using A2Ai automation
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 border border-ai-border shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ai-primary/10 to-ai-secondary/10 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-ai-primary/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-ai-primary text-ai-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-ai-gray mb-6 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ai-primary to-ai-secondary flex items-center justify-center text-2xl flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-ai-dark">{testimonial.name}</h4>
                    <p className="text-sm text-ai-gray">{testimonial.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Building2 className="w-3 h-3 text-ai-primary" />
                      <p className="text-xs text-ai-primary font-medium">{testimonial.organization}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-ai-gray mb-6">Trusted by leading healthcare providers across the UK</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-ai-primary">NHS</div>
            <div className="text-ai-gray">•</div>
            <div className="text-lg font-semibold text-ai-gray">Private Clinics</div>
            <div className="text-ai-gray">•</div>
            <div className="text-lg font-semibold text-ai-gray">GP Practices</div>
            <div className="text-ai-gray">•</div>
            <div className="text-lg font-semibold text-ai-gray">Specialist Centres</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
