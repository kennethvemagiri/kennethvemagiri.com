/**
 * Medical Specialties Component
 * 
 * Interactive medical specialty buttons/pills
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, Brain, Baby, Stethoscope, Eye, Smile } from 'lucide-react'

const MedicalSpecialties = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const specialties = [
    { name: 'Cardiologist', icon: Heart, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    { name: 'Neurologist', icon: Brain, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { name: 'Dermatologist', icon: Eye, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { name: 'Pediatrics', icon: Baby, color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    { name: 'General Practice', icon: Stethoscope, color: 'bg-ai-primary/20 text-ai-primary border-ai-primary/30' },
    { name: 'Dental Care', icon: Smile, color: 'bg-ai-secondary/20 text-ai-secondary border-ai-secondary/30' },
  ]

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 relative bg-ai-light">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ai-dark">
            Medical <span className="text-gradient">Specialties</span>
          </h2>
          <p className="text-lg text-ai-gray max-w-2xl mx-auto">
            AI automation solutions tailored for every medical specialty
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border ${specialty.color} bg-white hover:shadow-lg transition-all`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{specialty.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default MedicalSpecialties
