'use client'

import { useEffect } from 'react'
import HeroSection from "@/components/hero-section-one"
import Section3 from "@/components/section3"
import FooterSection from "@/components/footer"
import Step2 from "@/components/step2"
import Step3 from "@/components/step3"
import Section2 from "@/components/section2"

export default function Home() {
  // S'assurer que la page se charge en haut
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <HeroSection />
      <Section2 />
      <Step2 />
      <Step3 />
      <Section3 />
      <FooterSection />
    </main>
  )
}
