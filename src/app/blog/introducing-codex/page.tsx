import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Introducing Codex - Polene Blog',
  description: 'Discover our new Codex model, designed to revolutionize AI-assisted programming',
}

export default function IntroducingCodexPage() {
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
            src="/image2.png"
            alt="Introducing Codex"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Badge, title and meta below image */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            Release
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Introducing Codex
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <span>12 min read</span>
          <span className="mx-2">•</span>
          <time dateTime="2024-01-15">January 15, 2024</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          We&apos;re excited to introduce Codex, our new artificial intelligence model 
          specifically designed to understand and generate code. This major breakthrough marks 
          a new era in AI-assisted programming.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is Codex?</h2>
        <p className="text-gray-700 mb-4">
          Codex is a language model based on the GPT architecture, specially trained on 
          billions of lines of open source code. It excels at understanding programming context 
          and can generate code in over 20 programming languages.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Capabilities</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Code generation from natural language descriptions</li>
          <li>Automatic completion of functions and classes</li>
          <li>Refactoring and optimization of existing code</li>
          <li>Error detection and correction</li>
          <li>Automatic code documentation</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Performance and Results</h2>
        <p className="text-gray-700 mb-4">
          In our tests, Codex demonstrated 85% accuracy on standard programming tasks 
          and reduced development time by 40% on average. Developers using Codex report 
          significant improvements in their productivity.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Availability</h2>
        <p className="text-gray-700 mb-4">
          Codex is now available in beta for all Polene users. 
          We continue to improve the model and add new features based 
          on feedback from our community.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Get Started Now</h3>
          <p className="text-blue-800">
            Try Codex today and discover how AI can transform the way you code.
          </p>
        </div>
      </div>
    </article>
  )
} 