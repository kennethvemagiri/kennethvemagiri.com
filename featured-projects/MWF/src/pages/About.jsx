import { motion } from 'framer-motion'
import { Heart, Zap, Shield, Award } from 'lucide-react'

const values = [
  { icon: Zap, title: 'Speed', description: '48–72 hour builds so you can go live fast.' },
  { icon: Award, title: 'Quality', description: 'Modern tech, clean code, and best practices.' },
  { icon: Heart, title: 'Healthcare Focus', description: 'We understand the unique needs of practices.' },
  { icon: Shield, title: 'Transparency', description: 'Clear pricing, no hidden fees.' },
]

export default function About() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            About MedWorkflow Digital
          </h1>
          <p className="mt-6 text-xl text-body-text">
            We help UK healthcare practices leverage AI to improve patient experience and reduce admin workload.
          </p>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-2xl font-bold text-heading mb-4">Our Mission</h2>
          <p className="text-body-text">
            MedWorkflow Digital is a web development agency focused on UK healthcare. We build AI-powered websites and chatbots so clinics can look professional, answer patients 24/7, and free staff from repetitive enquiries. We specialise in healthcare because we understand compliance, tone, and the need for trust.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-heading text-center mb-10">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="text-center p-6 rounded-xl border border-border bg-off-white">
                  <div className="inline-flex p-3 rounded-full bg-teal/10 text-teal mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-heading">{v.title}</h3>
                  <p className="mt-2 text-sm text-body-text">{v.description}</p>
                </div>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold text-heading mb-4">Why Healthcare?</h2>
          <p className="text-body-text">
            We specialise in healthcare because we understand the unique needs of practices: trust, clarity, and systems that save time without compromising care. Every site we build is designed to convert visitors into patients and support your team.
          </p>
        </motion.section>
      </div>
    </div>
  )
}
