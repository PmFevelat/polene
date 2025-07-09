'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useContext, useEffect } from 'react'
import Section2 from './section2'
import Section3 from './section3'
import { ZoomContext } from './header'

export default function ZoomTransition() {
  const { setIsZooming } = useContext(ZoomContext)
  
  // Scroll global de la page
  const { scrollYProgress } = useScroll()
  // Spring ajusté pour le juste milieu - plus accessible mais toujours intentionnel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 70 })

  // Zoom accessible mais intentionnel - se déclenche à partir de 97% (juste milieu)
  const zoomScale = useTransform(smoothProgress, [0.97, 1], [1, 2.2])
  const section2Opacity = useTransform(smoothProgress, [0.97, 0.99, 1], [1, 0.7, 0])
  const section3Opacity = useTransform(smoothProgress, [0.975, 0.995, 1], [0, 0.3, 1])
  
  // Overlay visible à partir de 97%
  const overlayOpacity = useTransform(smoothProgress, [0, 0.97, 0.975, 1], [0, 0, 1, 1])
  
  // Masquer la section2 normale à 97% pour laisser l'utilisateur bien voir section2
  const normalSection2Opacity = useTransform(smoothProgress, [0, 0.97, 0.975], [1, 1, 0])

  // Contrôler la navbar quand le zoom commence bien
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest > 0.98) {
        setIsZooming(true)
      } else {
        setIsZooming(false)
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, setIsZooming])

  // Reset initial
  useEffect(() => {
    setIsZooming(false)
    return () => setIsZooming(false)
  }, [setIsZooming])

  return (
    <>
      {/* Section2 normale - visible jusqu'à 97%, juste milieu */}
      <motion.div
        style={{ opacity: normalSection2Opacity }}
      >
        <Section2 />
      </motion.div>
      
      {/* Overlay de zoom avec fond noir - juste milieu entre facile et intentionnel */}
      <motion.div
        className="fixed inset-0 w-full h-screen pointer-events-none z-50 bg-black"
        style={{ opacity: overlayOpacity }}
      >
        {/* Section2 avec zoom - juste milieu de sensibilité */}
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

        {/* Section3 qui apparaît avec le juste milieu */}
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