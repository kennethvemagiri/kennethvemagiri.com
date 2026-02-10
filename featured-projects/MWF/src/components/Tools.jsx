/**
 * Tools Component - Technology & Infrastructure
 * 
 * Modern redesign with card-based layout and enhanced visuals
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Database, Shield, Cloud, Zap, Lock, CheckCircle2 } from 'lucide-react'

const Tools = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Healthcare-focused AI and automation technologies
  const tools = [
    {
      icon: Brain,
      title: 'Clinical AI Models',
      description: 'NHS-approved AI models for medical documentation, patient communication, and clinical decision support.',
      features: ['NHS Compliance', 'Medical NLP', 'Clinical Context'],
    },
    {
      icon: Zap,
      title: 'Healthcare System Integration',
      description: 'Seamless integration with NHS Spine, EMIS, SystmOne, and private practice management systems.',
      features: ['NHS Spine API', 'EMIS/SystmOne', 'Real-time Sync'],
    },
    {
      icon: Cloud,
      title: 'Secure Cloud Infrastructure',
      description: 'UK-based, GDPR-compliant cloud infrastructure with NHS Data Security standards and high availability.',
      features: ['UK Data Centres', 'GDPR Compliant', '99.9% Uptime'],
    },
    {
      icon: Database,
      title: 'Medical Document Processing',
      description: 'Intelligent extraction from medical records, referral letters, and clinical notes with OCR and AI.',
      features: ['Medical OCR', 'Clinical Analysis', 'Data Validation'],
    },
    {
      icon: Shield,
      title: 'Healthcare Security',
      description: 'NHS Data Security standards, ISO 27001 compliance, and end-to-end encryption for patient data.',
      features: ['ISO 27001', 'AES-256 Encryption', 'Access Controls'],
    },
    {
      icon: Lock,
      title: 'Private Healthcare Deployment',
      description: 'On-premise or private cloud deployment options for maximum data privacy and NHS compliance.',
      features: ['On-Premise Option', 'Data Sovereignty', 'NHS Standards'],
    },
  ]

  return (
    <section id="tools" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header - Modern style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-ai-primary font-semibold text-sm uppercase tracking-wider">Technology Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ai-dark leading-tight">
            Healthcare Technology & Infrastructure
          </h2>
          <p className="text-xl text-ai-gray max-w-3xl leading-relaxed">
            Built on NHS-compliant, secure, and scalable technology infrastructure designed specifically for UK healthcare
          </p>
        </motion.div>

        {/* Tools - Modern card layout with features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 border border-ai-border hover:border-ai-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Icon with background */}
                  <div className="mb-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.35 }}
                      className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-ai-primary to-ai-secondary shadow-lg group-hover:shadow-xl transition-all"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-ai-dark group-hover:text-ai-primary transition-colors">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="text-ai-gray mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-ai-secondary flex-shrink-0" />
                        <span className="text-ai-gray">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Tools
