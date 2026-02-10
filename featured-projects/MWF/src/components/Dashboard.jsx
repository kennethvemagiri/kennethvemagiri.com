/**
 * Dashboard Component
 * 
 * Automation Analytics Dashboard featuring:
 * - Task execution timeline
 * - System health status
 * - Active agent monitoring
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Server, Activity, Clock, CheckCircle, Zap } from 'lucide-react'

const Dashboard = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const activityLog = [
    { time: '10:42 AM', event: 'Patient Appointment Scheduled', type: 'success' },
    { time: '11:15 AM', event: 'Clinical Notes Processed', type: 'success' },
    { time: '11:32 AM', event: 'Discharge Summary Generated', type: 'success' },
  ]

  const systemHealth = [
    { name: 'NHS Spine Integration', status: 'operational' },
    { name: 'Patient Data Pipeline', status: 'operational' },
    { name: 'Clinical AI Network', status: 'operational' },
  ]

  const activeAgents = [
    { title: 'Patient Support Assistant', uptime: '99.9%', tasks: '2,840 queries handled' },
  ]

  return (
    <section id="dashboard" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 relative bg-ai-light">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-ai-dark">
            Real-Time <span className="text-gradient">Healthcare Analytics</span>
          </h2>
          <p className="text-lg text-ai-gray max-w-2xl mx-auto">
            Monitor clinic operations, track patient flow, and measure efficiency improvements in real-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Log */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-ai-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-ai-primary" />
              <h3 className="text-xl font-bold text-ai-dark">Activity Log</h3>
            </div>
            <div className="space-y-4">
              {activityLog.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-ai-primary"></div>
                    {index < activityLog.length - 1 && (
                      <div className="w-0.5 h-12 bg-ai-gray/20"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-ai-gray">{item.time}</p>
                    <p className="font-semibold text-ai-dark">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-ai-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-ai-primary" />
              <h3 className="text-xl font-bold text-ai-dark">System Health</h3>
            </div>
            <div className="space-y-3">
              {systemHealth.map((sys, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-ai-light rounded-lg"
                >
                  <span className="text-sm font-medium text-ai-dark">{sys.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600 font-medium">Operational</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Agents */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-2xl p-6 shadow-md border border-ai-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-ai-primary" />
              <h3 className="text-xl font-bold text-ai-dark">Active Agents</h3>
            </div>
            {activeAgents.map((agent, index) => (
              <div key={index} className="space-y-3">
                <div className="p-3 bg-ai-light rounded-lg">
                  <p className="font-semibold text-ai-dark mb-1">{agent.title}</p>
                  <p className="text-sm text-ai-gray">Tasks: {agent.tasks}</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-lg text-white">
                  <p className="text-sm font-medium mb-1">Uptime</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">{agent.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
