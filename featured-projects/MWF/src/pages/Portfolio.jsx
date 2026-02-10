import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { portfolioItems, portfolioFilters } from '../data/portfolio'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? portfolioItems
      : portfolioItems.filter((p) => p.specialty === filter)

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            Portfolio
          </h1>
          <p className="mt-4 text-xl text-body-text max-w-2xl mx-auto">
            Demo websites we've built for UK healthcare practices. Filter by specialty.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {portfolioFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-bright-blue text-white'
                  : 'bg-off-white text-body-text hover:bg-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-white overflow-hidden hover:shadow-card-hover transition-shadow"
            >
              <div className="aspect-video bg-border overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-teal uppercase tracking-wide">
                  {item.specialty}
                </span>
                <h2 className="text-lg font-bold text-heading mt-1">{item.title}</h2>
                <p className="text-sm text-body-text mt-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.features.map((f) => (
                    <span key={f} className="text-xs px-2 py-1 bg-off-white rounded text-body-text">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3 text-xs text-body-text">
                  {item.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <a
                  href={item.demoUrl}
                  className="mt-4 inline-flex items-center gap-1 text-bright-blue font-medium hover:underline"
                >
                  View Live Demo
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
