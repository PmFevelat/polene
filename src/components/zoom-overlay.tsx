'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import Section2 from './section2'
import Section3 from './section3'
import { ZoomContext } from './header'

export default function ZoomTransition() {
  const { setIsZooming } = useContext(ZoomContext)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [isZoomMode, setIsZoomMode] = useState(false)
  
  // Motion value pour contrôler le zoom manuellement
  const zoomProgress = useMotionValue(0)
  const smoothZoomProgress = useSpring(zoomProgress, { stiffness: 150, damping: 40 })

  // Transformations basées sur zoomProgress (0 à 1)
  const zoomScale = useTransform(smoothZoomProgress, [0, 1], [1, 2.2])
  const section2Opacity = useTransform(smoothZoomProgress, [0, 0.8, 1], [1, 0.5, 0])
  const section3Opacity = useTransform(smoothZoomProgress, [0, 0.6, 1], [0, 0.4, 1])
  const overlayOpacity = useTransform(smoothZoomProgress, [0, 0.05, 1], [0, 1, 1])

  // Détecter la fin de page pour navigation normale (quand pas en mode zoom)
  useEffect(() => {
    if (isZoomMode) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      const isBottom = scrollTop + windowHeight >= documentHeight - 10
      setIsAtBottom(isBottom)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isZoomMode])

  // Gérer le zoom Section2 ↔ Section3 SEULEMENT
  useEffect(() => {
    // IMPORTANT : Ne gérer le zoom que si on est en fin de page OU déjà en mode zoom
    if (!isAtBottom && !isZoomMode) return

    const handleWheel = (e: WheelEvent) => {
      // Si on n'est pas en mode zoom et qu'on scroll vers le haut, laisser le scroll normal
      if (!isZoomMode && e.deltaY < 0) {
        return // LAISSER LE SCROLL NORMAL FONCTIONNER
      }

      e.preventDefault()
      
      const currentZoom = zoomProgress.get()
      
      if (e.deltaY > 0) {
        // Scroll vers le bas - zoomer vers Section3
        const delta = e.deltaY * 0.005
        const newZoom = Math.max(0, Math.min(1, currentZoom + delta))
        zoomProgress.set(newZoom)
        
        if (newZoom > 0.05) {
          setIsZoomMode(true)
          setIsZooming(true)
        }
      } else {
        // Scroll vers le haut - dézoomer vers Section2
        const delta = Math.abs(e.deltaY) * 0.005
        const newZoom = Math.max(0, Math.min(1, currentZoom - delta))
        zoomProgress.set(newZoom)
        
        // CRITIQUE : Sortie complète du mode zoom = retour navigation normale
        if (newZoom <= 0) {
          setIsZoomMode(false)
          setIsZooming(false)
          zoomProgress.set(0)
          // SCROLL NORMAL REPREND IMMÉDIATEMENT
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isAtBottom, isZoomMode, zoomProgress, setIsZooming])

  // Reset initial
  useEffect(() => {
    setIsZooming(false)
    setIsZoomMode(false)
    return () => {
      setIsZooming(false)
      setIsZoomMode(false)
    }
  }, [setIsZooming])

  return (
    <>
      {/* Section2 normale - navigation classique HeroSection ↔ Section2 */}
      <motion.div
        style={{
          opacity: useTransform(smoothZoomProgress, [0, 0.1], [1, 0])
        }}
      >
        <Section2 />
      </motion.div>
      
      {/* Overlay de zoom - actif seulement en mode zoom Section2 ↔ Section3 */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none z-50 bg-black"
        style={{ opacity: overlayOpacity }}
      >
        {/* Section2 avec zoom */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale: zoomScale,
            opacity: section2Opacity,
            transformOrigin: 'center center'
          }}
        >
          <Section2 />
        </motion.div>

        {/* Section3 qui apparaît avec le zoom */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: section3Opacity
          }}
        >
          <Section3 />
        </motion.div>
      </motion.div>
    </>
  )
} 