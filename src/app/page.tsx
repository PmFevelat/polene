'use client'

import { useEffect } from 'react'
import HeroSection from "@/components/hero-section-one"
import Grid from "@/components/grid"
import FooterSection from "@/components/footer"
import Lenis from 'lenis'

export default function Home() {
  // S'assurer que la page se charge en haut
  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Initialiser Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main>
      <HeroSection />
      <div className="wrapper">
        <Grid />
      </div>
      <FooterSection />
    </main>
  )
}
