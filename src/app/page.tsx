'use client'

import { useState, useEffect } from 'react'
import HeroSection from "@/components/hero-section-one"
import ZoomTransition from "@/components/zoom-transition"
import { ZoomContext } from "@/components/header"

export default function Home() {
  const [isZooming, setIsZooming] = useState(false)

  // S'assurer que la page se charge en haut
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ZoomContext.Provider value={{ isZooming, setIsZooming }}>
      {/* Page d'accueil - HeroSection */}
      <HeroSection />
      
      {/* Système de zoom transition - Section2 et Section3 */}
      <ZoomTransition />
    </ZoomContext.Provider>
  )
}
