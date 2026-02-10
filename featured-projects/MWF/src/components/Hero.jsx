/**
 * Hero Component - MedWorkflow
 * Left: headline + CTAs. Right: hero image (use public/hero-image.jpg or placeholder).
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'

const Hero = () => {
  // Try hero.png (in public), then hero-image.jpg, then hero-image.png
  const base = import.meta.env.BASE_URL || '/'
  const [heroImageSrc, setHeroImageSrc] = useState(base + 'hero.png')

  const handleHeroImageError = () => {
    if (heroImageSrc === base + 'hero.png') {
      setHeroImageSrc(base + 'hero-image.jpg')
    } else if (heroImageSrc === base + 'hero-image.jpg') {
      setHeroImageSrc(base + 'hero-image.png')
    } else {
      setHeroImageSrc(null)
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20 bg-ai-bg overflow-hidden">
      {/* Soft gradient from bottom-left (blue to teal) */}
      <div className="absolute inset-0 pointer-events-none bg-hero-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[70%] h-[60%] bg-gradient-to-tr from-ai-primary/10 to-ai-secondary/12 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-ai-dark">
              Automate Your Clinic,
              <br />
              <span className="text-gradient hover:scale-105 inline-block transition-transform cursor-default">Elevate Your Care.</span>
            </h1>

          </motion.div>

          {/* Right Column - Hero image space */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="relative w-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden glass shadow-soft">
              {heroImageSrc ? (
                <img
                  src={heroImageSrc}
                  alt="MedWorkflow – Healthcare automation for NHS and private clinics"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={handleHeroImageError}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-ai-primary/10 via-ai-surface to-ai-secondary/10 p-8">
                  <div className="w-20 h-20 rounded-2xl bg-ai-primary/20 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-ai-primary" />
                  </div>
                  <p className="text-ai-dark font-semibold text-center">Hero image</p>
                  <p className="text-ai-gray text-sm text-center max-w-xs">
                    Add <code className="bg-white/80 px-1.5 py-0.5 rounded">hero.png</code> (or hero-image.jpg / hero-image.png) inside the <code className="bg-white/80 px-1.5 py-0.5 rounded">public</code> folder.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

