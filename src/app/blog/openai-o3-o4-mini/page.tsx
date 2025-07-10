import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'OpenAI o3 and o4-mini - Polene Blog',
  description: 'Analysis of the new OpenAI o3 and o4-mini models and their integration into Polene',
}

export default function OpenAIO3O4MiniPage() {
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
            src="/image3.png"
            alt="OpenAI o3 and o4-mini"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Badge, title and meta below image */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
            Release
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          OpenAI o3 and o4-mini
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <span>11 min read</span>
          <span className="mx-2">•</span>
          <time dateTime="2024-01-18">January 18, 2024</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          OpenAI has just announced its new o3 and o4-mini models, marking a significant 
          evolution in the AI landscape. Discover how these advances integrate 
          into the Polene ecosystem.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">OpenAI o3: A New Generation</h2>
        <p className="text-gray-700 mb-4">
          OpenAI&apos;s o3 model represents a leap forward in AI reasoning capabilities. 
          With notable improvements in:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Complex logical reasoning and mathematical problem solving</li>
          <li>Contextual understanding over very long documents</li>
          <li>Code generation with increased accuracy</li>
          <li>Enhanced multimodal capabilities</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">o4-mini: Efficiency and Accessibility</h2>
        <p className="text-gray-700 mb-4">
          The more compact o4-mini model aims to democratize access to advanced 
          AI capabilities. Its key features include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>3x faster execution speed than previous models</li>
          <li>60% reduced usage cost</li>
          <li>Optimization for routine and assistance tasks</li>
          <li>Reduced memory footprint for local deployments</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Integration into Polene</h2>
        <p className="text-gray-700 mb-4">
          We were among the first partners to integrate these new models 
          into our platform. Here&apos;s what this means for our users:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">New features available now</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Analysis of 100+ page documents in seconds</li>
            <li>Detailed report generation with o3</li>
            <li>Ultra-fast conversational assistance with o4-mini</li>
            <li>New vision capabilities for image analysis</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Performance and Benchmarks</h2>
        <p className="text-gray-700 mb-4">
          Our internal tests show impressive improvements:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>o3: +25% accuracy on complex reasoning tasks</li>
          <li>o4-mini: -40% latency for short responses</li>
          <li>Overall 30% improvement in user satisfaction</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Choosing the Right Model</h2>
        <p className="text-gray-700 mb-4">
          To help you optimize your experience, here are our recommendations:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Use o3 for:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Complex data analysis</li>
              <li>• Long-form and structured writing</li>
              <li>• Multi-step problem solving</li>
              <li>• In-depth research</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Use o4-mini for:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Quick questions</li>
              <li>• Daily assistance</li>
              <li>• Brainstorming</li>
              <li>• Repetitive tasks</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Availability</h3>
          <p className="text-blue-800">
            The o3 and o4-mini models are now available for all 
            Polene Pro and Enterprise users. Free users have access to o4-mini with 
            generous usage limits.
          </p>
        </div>
      </div>
    </article>
  )
} 