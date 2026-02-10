/**
 * Statistics Component
 * 
 * Displays key metrics and achievements in a horizontal banner
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, TrendingDown, DollarSign, Users2 } from 'lucide-react'

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const stats = [
    {
      icon: Users,
      value: '125+',
      label: 'NHS Trusts & Clinics',
      color: 'from-ai-primary to-ai-accent',
    },
    {
      icon: TrendingDown,
      value: '30-50%',
      label: 'Admin Time Reduction',
      color: 'from-ai-secondary to-ai-primary',
    },
    {
      icon: DollarSign,
      value: '£2.5M+',
      label: 'Cost Savings Delivered',
      color: 'from-ai-accent to-ai-secondary',
    },
    {
      icon: Users2,
      value: '50K+',
      label: 'Patients Served',
      color: 'from-ai-primary to-ai-secondary',
    },
  ]

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-r from-ai-primary/5 via-ai-secondary/5 to-ai-accent/5 border-y border-ai-border/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white border border-ai-border shadow-md hover:shadow-xl transition-all cursor-default"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.08 + index * 0.04 }}
                      className="text-4xl lg:text-5xl font-bold text-ai-dark mb-2 bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent"
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-sm text-ai-gray font-semibold">{stat.label}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Statistics
