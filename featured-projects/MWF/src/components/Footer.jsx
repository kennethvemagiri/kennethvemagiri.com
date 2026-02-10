/**
 * Footer Component
 * 
 * Site footer with:
 * - Social media links
 * - Copyright information
 * - Minimal, clean design
 */

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear()

  // Social media links with icons and colors
  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/medworkflow', label: 'LinkedIn', external: true, color: '#0077b5' },
    { icon: Twitter, href: 'https://twitter.com/medworkflow', label: 'Twitter', external: true, color: '#1DA1F2' },
    { icon: Mail, href: 'mailto:hello@medworkflow.com', label: 'Email', external: false, color: '#8B5CF6' },
    { icon: Github, href: 'https://github.com/medworkflow', label: 'GitHub', external: true, color: '#ffffff' },
  ]

  return (
    <footer className="relative bg-white border-t border-ai-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-ai-light rounded-lg hover:bg-ai-primary hover:text-white transition-colors border border-ai-border"
                  aria-label={social.label}
                  style={{ color: social.color }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center border-t border-white/5">
          <p className="text-ai-gray text-sm">
            © Copyright MedWorkflow {currentYear} | All Rights Reserved
          </p>
          <p className="text-ai-gray/60 text-xs mt-2">
            AI Automation for UK Healthcare | NHS & Private Clinic Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

