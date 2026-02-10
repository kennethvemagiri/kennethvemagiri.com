/**
 * CTA (Call-to-Action) Component
 * 
 * Modern redesign with gradient background and enhanced visuals
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'

const CTA = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const benefits = [
    '30-50% reduction in admin time',
    'Improved patient care focus',
    'NHS-compliant automation',
  ]

  return (
    <section ref={ref} className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-ai-primary to-ai-secondary">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ai-dark via-ai-dark to-ai-primary/20"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ai-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ai-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="inline-flex mb-6"
          >
            <div className="w-20 h-20 bg-ai-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-ai-primary/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-gradient">Healthcare Clinic?</span>
          </h2>

          {/* Value proposition */}
          <p className="text-xl text-ai-gray mb-10 max-w-3xl mx-auto leading-relaxed">
            Join our NHS-approved pilot program and experience measurable improvements in efficiency, patient care, and operational costs.
          </p>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.25, delay: 0.2 + index * 0.05 }}
                className="flex items-center gap-2 bg-white/25 backdrop-blur-sm rounded-full px-6 py-3 border border-white/40 hover:bg-white/35 transition-all"
              >
                <TrendingUp className="w-5 h-5 text-ai-secondary" />
                <span className="text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-ai-primary text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-ai-primary/50 transition-all duration-300"
            >
              Start NHS Pilot Program
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#solutions"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-sm text-white rounded-full font-semibold text-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
