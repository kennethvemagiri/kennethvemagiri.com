import { Link } from 'react-router-dom'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const quickLinks = [
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/medworkflow-digital', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/medworkflow', label: 'Twitter' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-heading text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-lg text-white">MedWorkflow Digital</p>
            <p className="mt-2 text-sm text-gray-300">
              AI-powered websites and chatbots for UK healthcare practices.
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">Quick Links</p>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-gray-300 hover:text-teal transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Legal</p>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-gray-300 hover:text-teal transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Contact</p>
            <a
              href="mailto:hello@medworkflow.digital"
              className="mt-3 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-teal transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@medworkflow.digital
            </a>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-teal transition-colors"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          © {year} MedWorkflow Digital. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
