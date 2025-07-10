import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Building a custom math tutor powered by ChatGPT - Polene Blog',
  description: 'Learn how to create a personalized math tutor using ChatGPT and Polene capabilities',
}

export default function BuildingCustomMathTutorPage() {
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
            src="/image4.png"
            alt="Building a custom math tutor powered by ChatGPT"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Badge, title and meta below image */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded-full">
            ChatGPT
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Building a custom math tutor powered by ChatGPT
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <span>4 min read</span>
          <span className="mx-2">•</span>
          <time dateTime="2024-01-16">January 16, 2024</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Personalized education takes on a new dimension with AI. Discover how 
          we created an intelligent math tutor that adapts to each student&apos;s level and 
          learning pace.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Challenge of Personalized Teaching</h2>
        <p className="text-gray-700 mb-4">
          Every student learns differently. Some are visual, others auditory, 
          some need repetition, others need constant challenges. The challenge was 
          to create a system capable of adapting to these differences.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">System Architecture</h2>
        <p className="text-gray-700 mb-4">
          Our math tutor is based on several key components:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Initial assessment:</strong> Determines the student&apos;s level</li>
          <li><strong>Exercise generation:</strong> Creates adapted problems</li>
          <li><strong>Error analysis:</strong> Identifies weak points</li>
          <li><strong>Personalized feedback:</strong> Provides targeted explanations</li>
          <li><strong>Adaptive progression:</strong> Adjusts difficulty in real-time</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Implementation with ChatGPT</h2>
        <p className="text-gray-700 mb-4">
          Here&apos;s how we structured the prompts to optimize the learning experience:
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Initial Assessment Prompt</h3>
          <pre className="text-sm text-gray-700 bg-white p-4 rounded border overflow-x-auto">
{`You are an expert math tutor. Ask 5 progressive questions 
to assess the student&apos;s level in [subject].
Start with basic concepts and increase difficulty.
Adapt your language to a [age]-year-old student.`}
          </pre>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Exercise Generation Prompt</h3>
          <pre className="text-sm text-gray-700 bg-white p-4 rounded border overflow-x-auto">
{`Create a [level] exercise in [subject] for a student who:
- Masters: [acquired concepts]
- Struggles with: [weak points]
- Prefers: [learning style]

The exercise should be engaging and include a real-world context.`}
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Advanced Features</h2>
        <p className="text-gray-700 mb-4">
          Beyond simple exercise generation, our tutor offers:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Dynamic visualizations:</strong> Automatically generated graphs and diagrams</li>
          <li><strong>Step-by-step resolution:</strong> Breakdown of complex problems</li>
          <li><strong>Personalized analogies:</strong> Explanations based on student interests</li>
          <li><strong>Gamification:</strong> Point and challenge system</li>
          <li><strong>Progress reports:</strong> Detailed tracking for parents and teachers</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Results and Metrics</h2>
        <p className="text-gray-700 mb-4">
          After 6 months of testing with 500 students, the results are encouraging:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">+85%</div>
            <div className="text-sm text-gray-600">Grade improvement</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">+60%</div>
            <div className="text-sm text-gray-600">Engagement time</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">95%</div>
            <div className="text-sm text-gray-600">Student satisfaction</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Challenges and Solutions</h2>
        <p className="text-gray-700 mb-4">
          Development wasn&apos;t without obstacles. Here are the main challenges encountered:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Pedagogical consistency:</strong> Solved with rigorous prompt templates</li>
          <li><strong>Automatic evaluation:</strong> Multi-level verification system</li>
          <li><strong>Long-term motivation:</strong> Integration of narrative elements and progression</li>
          <li><strong>Cultural adaptation:</strong> Customization of contexts and examples</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Future Perspectives</h2>
        <p className="text-gray-700 mb-4">
          We&apos;re currently working on extending the system to other subjects:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Physical sciences with interactive simulations</li>
          <li>Languages with voice recognition</li>
          <li>History with adaptive timelines</li>
          <li>Programming with integrated code environments</li>
        </ul>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mt-8">
          <h3 className="text-lg font-semibold text-orange-900 mb-2">Try the Tutor</h3>
          <p className="text-orange-800">
            The math tutor is available in beta for all 
            Polene Education users. Contact our team for a personalized demonstration.
          </p>
        </div>
      </div>
    </article>
  )
} 