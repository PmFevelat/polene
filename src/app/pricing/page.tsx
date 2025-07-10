import type { Metadata } from 'next'
import { HeroHeader } from '@/components/header'
import Pricing from '@/components/pricing'
import FooterSection from '@/components/footer'

export const metadata: Metadata = {
  title: 'Pricing - Polene',
  description: 'Choose the perfect plan for your AI needs. From free to enterprise, we have pricing that scales with you.',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      {/* Main Header */}
      <HeroHeader />

      {/* Pricing Content */}
      <main className="pt-20">
        <Pricing />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  )
} 