import type { Metadata } from 'next'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'

export const metadata: Metadata = {
  title: 'Blog - Polene',
  description: 'Discover the latest news and insights from Polene',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      <HeroHeader />
      <main className="pt-20">
        {children}
      </main>
      <FooterSection />
    </div>
  )
} 