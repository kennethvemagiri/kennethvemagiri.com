/**
 * ContactButton Component
 * 
 * Floating contact button with modal form:
 * - Fixed position button (bottom-right)
 * - Modal overlay with contact form
 * - Form validation
 * - Smooth animations
 * - Form submission handling
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const ContactButton = () => {
  // Modal open/close state
  const [isOpen, setIsOpen] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Integrate with backend API or appointment booking system
    alert('Thank you for your interest! Our team will reach out to you shortly to discuss the pilot program.')
    // Reset form and close modal
    setFormData({ name: '', email: '', phone: '', message: '' })
    setIsOpen(false)
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Floating Contact Button - Fixed position, bottom-right */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-ai-primary text-white rounded-full shadow-soft hover:shadow-[0_0_28px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center group border border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        aria-label="Open contact form"
      >
        <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Modal Overlay with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop - Click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-ai-primary/20">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                  <h2 className="text-2xl font-bold text-ai-dark">Request Pilot Program</h2>
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="modal-name" className="block text-sm font-semibold text-ai-dark mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ai-primary focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="modal-email" className="block text-sm font-semibold text-ai-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ai-primary focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="modal-phone" className="block text-sm font-semibold text-ai-dark mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ai-primary focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                      placeholder="+44 (0) 20 1234 5678"
                    />
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="modal-message" className="block text-sm font-semibold text-ai-dark mb-2">
                      Reason for Visit / Message *
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ai-primary focus:border-transparent transition-all resize-none outline-none bg-gray-50 focus:bg-white"
                      placeholder="Tell us about your business and automation needs..."
                    />
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-ai-primary text-white rounded-xl font-semibold shadow-lg hover:bg-ai-primary-deep transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Request Pilot Program
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ContactButton


