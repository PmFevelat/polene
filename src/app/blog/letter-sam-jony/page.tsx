import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'A letter from Sam & Jony - Polene Blog',
  description: 'A letter from our founders about the vision and future of Polene',
}

export default function LetterSamJonyPage() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back arrow */}
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
      </div>

      <header className="mb-8">
        {/* Image first */}
        <div className="relative w-full h-[230px] md:h-[346px] rounded-lg overflow-hidden mb-6">
          <Image
            src="/image1.png"
            alt="A letter from Sam & Jony"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Badge, title and meta below image */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
            Company
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          A letter from Sam & Jony
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <span>3 min read</span>
          <span className="mx-2">•</span>
          <time dateTime="2024-01-20">January 20, 2024</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Dear Polene users and partners,
        </p>

        <p className="text-gray-700 mb-6">
          We&apos;re writing this letter to share with you our vision for the future of 
          artificial intelligence and the role that Polene will play in this transformation.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Since the beginning of Polene, we&apos;ve believed in a simple but powerful idea: 
          artificial intelligence should be accessible to everyone, without compromising 
          on quality or security. This conviction guides every decision we make.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Where We Stand Today</h2>
        <p className="text-gray-700 mb-4">
          Over the past year, we&apos;ve reached important milestones:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Over 1 million monthly active users</li>
          <li>Launch of Codex, our specialized development model</li>
          <li>Partnerships with leading universities</li>
          <li>50% reduction in our carbon footprint</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Looking Forward</h2>
        <p className="text-gray-700 mb-4">
          The coming year will be crucial. We&apos;re working on advances that 
          will revolutionize how we interact with AI:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>More powerful multimodal models</li>
          <li>Advanced personalization without compromising privacy</li>
          <li>Reimagined collaborative tools for teams</li>
          <li>Responsible international expansion</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
        <p className="text-gray-700 mb-4">
          We commit to maintaining Polene as an open, ethical, 
          and user-centered platform. Your feedback and trust are at the heart of 
          our development.
        </p>

        <p className="text-gray-700 mb-6">
          Thank you for being part of this journey. Together, we&apos;re building the future 
          of artificial intelligence.
        </p>

        <div className="border-t pt-6 mt-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p className="font-semibold text-gray-900">Sam Johnson</p>
              <p className="text-gray-600">CEO & Co-founder</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Jony Chen</p>
              <p className="text-gray-600">CTO & Co-founder</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
} 