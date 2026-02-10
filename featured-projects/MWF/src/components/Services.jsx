/**
 * Services Component - AI Automation Solutions
 * 
 * Modern redesign with alternating layout and enhanced visuals
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Calendar, Shield, Bot, ClipboardList, Workflow, ArrowRight } from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // AI Automation solutions for NHS & Private Healthcare
  const services = [
    {
      icon: Calendar,
      title: 'Appointment Management',
      description: 'Automate patient scheduling, reminders, and cancellations. Reduce no-shows by 40% with intelligent booking systems.',
      color: 'bg-gradient-to-br from-ai-primary to-ai-accent',
      bgGradient: 'from-ai-card to-ai-dark',
    },
    {
      icon: ClipboardList,
      title: 'Patient Record Management',
      description: 'Streamline patient registration, medical history updates, and document processing with AI-powered data extraction.',
      color: 'bg-gradient-to-br from-ai-secondary to-ai-primary',
      bgGradient: 'from-ai-card to-ai-dark',
    },
    {
      icon: Shield,
      title: 'Clinical Documentation',
      description: 'Automate clinical notes, discharge summaries, and referral letters. NHS-compliant documentation with zero errors.',
      color: 'bg-gradient-to-br from-ai-accent to-ai-secondary',
      bgGradient: 'from-ai-card to-ai-dark',
    },
    {
      icon: Bot,
      title: 'Patient Communication',
      description: 'AI-powered patient support for appointment queries, medication reminders, and health information 24/7.',
      color: 'bg-gradient-to-br from-ai-primary to-ai-secondary',
      bgGradient: 'from-ai-card to-ai-dark',
    },
    {
      icon: Workflow,
      title: 'Administrative Automation',
      description: 'Reduce admin burden by 30-50% with automated invoicing, insurance claims, and regulatory reporting.',
      color: 'bg-gradient-to-br from-ai-secondary to-ai-accent',
      bgGradient: 'from-ai-card to-ai-dark',
    },
    {
      icon: Users,
      title: 'Staff & Resource Management',
      description: 'Optimize staff scheduling, rota management, and resource allocation to improve clinic efficiency.',
      color: 'bg-gradient-to-br from-ai-accent to-ai-primary',
      bgGradient: 'from-ai-card to-ai-dark',
    },
  ]

  return (
    <section id="solutions" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-ai-dark">
            <span className="text-gradient">Healthcare Automation</span> Solutions
          </h2>
          <p className="text-xl text-ai-gray max-w-3xl mx-auto leading-relaxed">
            Designed for NHS and private healthcare clinics. Reduce administrative burden, improve patient care, and streamline clinical workflows
          </p>
        </motion.div>

        {/* Services - Modern alternating layout */}
        <div className="space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}
              >
                {/* Icon and Visual Section */}
                <div className={`flex-shrink-0 w-full lg:w-1/3 flex justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="relative"
                  >
                    <div className={`w-32 h-32 ${service.color} rounded-3xl flex items-center justify-center shadow-2xl shadow-ai-primary/20`}>
                      <Icon className="w-16 h-16 text-white" />
                    </div>
                    <div className={`absolute -z-10 w-32 h-32 ${service.color} rounded-3xl blur-2xl opacity-30`}></div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className={`flex-1 w-full lg:w-2/3 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center lg:text-left`}>
                  <div className={`bg-white rounded-3xl p-8 lg:p-10 border border-ai-border shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group`}>
                    {/* Hover gradient effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-ai-dark group-hover:text-ai-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-ai-gray text-base md:text-lg leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <motion.a
                        href="#contact"
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${service.color} text-white font-semibold shadow-md hover:shadow-lg transition-all group ${isEven ? '' : 'lg:ml-auto lg:flex-row-reverse'
                          }`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isEven ? '' : 'lg:rotate-180'}`} />
                      </motion.a>
                    </div>
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

export default Services
