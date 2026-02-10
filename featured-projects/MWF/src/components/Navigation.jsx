/**
 * Navigation Component
 * 
 * Fixed header navigation bar with:
 * - Logo/branding
 * - Desktop menu with dropdown for Services
 * - Mobile hamburger menu
 * - Scroll-based styling changes
 * - Smooth animations
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  // State management
  const [isScrolled, setIsScrolled] = useState(false)           // Track scroll position for styling
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile menu toggle

  // Listen for scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation menu items - MedWorkflow style
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Tools', href: '#tools' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-ai-border'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo - MedWorkflow style, larger for visibility */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={`${import.meta.env.BASE_URL}MedWorkFlow.png`}
              alt="MedWorkflow"
              className="h-14 sm:h-20 md:h-24 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation - Hidden on mobile, visible on large screens */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-ai-gray hover:text-ai-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ai-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            {/* Contact Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-ai-primary text-white rounded-full font-semibold shadow-soft hover:bg-ai-primary-deep transition-all"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <button
            className="lg:hidden p-2 text-ai-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slides down when opened */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-ai-border"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile navigation links */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-ai-dark hover:text-ai-primary font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Mobile CTA button */}
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.95 }}
                className="block w-full mt-4 px-6 py-3 bg-ai-primary text-white rounded-full font-semibold text-center shadow-soft"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation

