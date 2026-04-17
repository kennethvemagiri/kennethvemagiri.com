import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { X } from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

// Hardcoded icon assets in /public/icons for now.
const mySkills = [
  {
    id: 'design',
    name: 'Graphic Design',
    iconUrl: `${baseUrl}icons/design-logo.svg`,
    projects: ['Corporate Logo Designs', 'Custom Favicon Pack', 'Brand Identity Systems'],
  },
  {
    id: 'animation',
    name: 'Animation',
    iconUrl: `${baseUrl}icons/animation-icon.svg`,
    projects: ['Webpage Hero Animations', '2D Explainer Videos', 'Motion Graphics'],
  },
  {
    id: 'crypto',
    name: 'Crypto & Trading Apps',
    iconUrl: `${baseUrl}icons/crypto-icon.svg`,
    projects: ['All-in-One Trading Dashboard UI', 'Market Share Tracker Concept'],
  },
  {
    id: 'frontend',
    name: 'Frontend Dev',
    iconUrl: `${baseUrl}icons/react-icon.svg`,
    projects: ['Interactive 3D Portfolio', 'SaaS Landing Pages'],
  },
]

export default function Skills() {
  const mountRef = useRef(null)
  const [selectedSkill, setSelectedSkill] = useState(null)

  useEffect(() => {
    if (!mountRef.current) return undefined

    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.04)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 20

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    const spriteGroup = new THREE.Group()
    const textureLoader = new THREE.TextureLoader()
    const loadedTextures = []
    const totalSprites = 100

    for (let i = 0; i < totalSprites; i += 1) {
      const skill = mySkills[i % mySkills.length]
      const texture = textureLoader.load(skill.iconUrl)
      loadedTextures.push(texture)

      const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(3, 3, 1)
      sprite.position.x = (Math.random() - 0.5) * 40
      sprite.position.y = (Math.random() - 0.5) * 40
      sprite.position.z = (Math.random() - 0.5) * 30
      sprite.userData = { skillData: skill }
      spriteGroup.add(sprite)
    }
    scene.add(spriteGroup)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const canvas = renderer.domElement

    const onClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(spriteGroup.children)

      if (intersects.length > 0) {
        const clickedSprite = intersects[0].object
        setSelectedSkill(clickedSprite.userData.skillData)
      }
    }
    canvas.addEventListener('click', onClick)

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.002
      mouseY = (event.clientY - window.innerHeight / 2) * 0.002
    }
    window.addEventListener('mousemove', onMouseMove)

    let rafId
    const animate = () => {
      rafId = window.requestAnimationFrame(animate)
      spriteGroup.rotation.y += 0.001
      spriteGroup.rotation.x += 0.0005
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.cancelAnimationFrame(rafId)
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)

      spriteGroup.children.forEach((sprite) => {
        sprite.material.dispose()
      })
      loadedTextures.forEach((texture) => texture.dispose())
      scene.remove(spriteGroup)
      renderer.dispose()

      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-screen h-screen bg-[#0B0F19] overflow-hidden font-sans">
      <div ref={mountRef} className="absolute inset-0 cursor-pointer" />

      <Link
        to="/"
        className="absolute top-6 left-6 z-40 text-white/80 hover:text-white text-sm tracking-wide px-3 py-2 rounded-lg border border-white/15 bg-black/30 backdrop-blur"
      >
        Back to Home
      </Link>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/50 tracking-[0.25em] text-xs sm:text-sm pointer-events-none">
        CLICK ON A SKILL TO EXPLORE
      </div>

      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1A1025] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-lg w-full relative"
            >
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                aria-label="Close skill details"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-bold text-white mb-6">
                {selectedSkill.name}
              </h2>

              <div className="space-y-4">
                <h3 className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">
                  Featured Projects
                </h3>
                <ul className="space-y-3">
                  {selectedSkill.projects.map((project) => (
                    <li
                      key={project}
                      className="text-gray-300 bg-white/5 px-4 py-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
