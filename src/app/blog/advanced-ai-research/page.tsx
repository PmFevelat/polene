import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advanced AI Research - Polene Blog',
  description: 'Discover the latest advances from our artificial intelligence research team and their practical applications',
}

export default function AdvancedAIResearchPage() {
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
            src="/image5.png"
            alt="Advanced AI Research"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Badge, title and meta below image */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full">
            Research
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Advanced AI Research
        </h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <span>8 min read</span>
          <span className="mx-2">•</span>
          <time dateTime="2024-01-14">January 14, 2024</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          At Polene Research, we constantly push the boundaries of artificial 
          intelligence. Discover our latest breakthroughs and how they shape the future 
          of AI technology.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Research Areas</h2>
        <p className="text-gray-700 mb-4">
          Our research team focuses on several key domains that will define 
          the next generation of AI:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Enhanced reasoning:</strong> Improving logical reasoning capabilities</li>
          <li><strong>Multimodal AI:</strong> Seamless integration of text, image, audio and video</li>
          <li><strong>Few-shot learning:</strong> Rapid adaptation with few examples</li>
          <li><strong>Alignment and safety:</strong> Beneficial and controllable AI</li>
          <li><strong>Energy efficiency:</strong> High-performance models with low consumption</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Breakthrough 1: Adaptive Chain Reasoning</h2>
        <p className="text-gray-700 mb-4">
          We&apos;ve developed a new approach to chain reasoning that dynamically adapts 
          to problem complexity. This revolutionary technique improves 
          performance by 40% on complex reasoning tasks.
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">How it Works</h3>
          <ol className="list-decimal list-inside text-indigo-800 space-y-2">
            <li>Automatic analysis of problem complexity</li>
            <li>Selection of optimal reasoning strategy</li>
            <li>Adaptive decomposition into sub-problems</li>
            <li>Cross-validation of conclusions</li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Breakthrough 2: Intelligent Model Compression</h2>
        <p className="text-gray-700 mb-4">
          Our revolutionary compression algorithm reduces model size by 75% 
          while retaining 98% of their performance. This advance democratizes access 
          to high-performance AI.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Before compression</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Size: 175B parameters</li>
              <li>• Memory: 350 GB</li>
              <li>• Latency: 2.3 seconds</li>
              <li>• Cost: 100%</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-gray-900 mb-2">After compression</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Size: 44B parameters</li>
              <li>• Memory: 88 GB</li>
              <li>• Latency: 0.8 seconds</li>
              <li>• Cost: 25%</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Breakthrough 3: Autonomous Contextual AI</h2>
        <p className="text-gray-700 mb-4">
          Our new contextual AI system can maintain and use conversation contexts 
          across multiple sessions, creating a truly personalized 
          and continuous experience.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Impact and Applications</h2>
        <p className="text-gray-700 mb-4">
          These advances have concrete implications for our users:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li><strong>Medicine:</strong> Assisted diagnosis with 95% accuracy</li>
          <li><strong>Education:</strong> Adaptive tutors for personalized learning</li>
          <li><strong>Creation:</strong> Multimodal creative generation tools</li>
          <li><strong>Science:</strong> Accelerated research and discovery</li>
          <li><strong>Business:</strong> Intelligent process automation</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Collaboration and Open Source</h2>
        <p className="text-gray-700 mb-4">
          We firmly believe that AI research should be collaborative. That&apos;s why 
          we regularly publish our findings and contribute to the open source ecosystem:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>12 publications in leading conferences this year</li>
          <li>6 open source projects with over 50K GitHub stars</li>
          <li>Partnerships with 15 global universities</li>
          <li>Contributions to 8 industry standards</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ethical Challenges and Safety</h2>
        <p className="text-gray-700 mb-4">
          With great power comes great responsibility. Our AI safety team works on:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Detection and mitigation of algorithmic bias</li>
          <li>Control and emergency shutdown systems</li>
          <li>Transparency and explainability of decisions</li>
          <li>Privacy protection and personal data security</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2024 Outlook</h2>
        <p className="text-gray-700 mb-4">
          The year 2024 promises to be revolutionary for AI. Our upcoming projects include:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
          <li>Physical AI models for advanced robotics</li>
          <li>Hybrid quantum AI for exponentially faster computations</li>
          <li>Collaborative AI systems to solve global challenges</li>
          <li>AI-assisted brain-computer interfaces</li>
        </ul>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">Join Our Team</h3>
          <p className="text-indigo-800 mb-4">
            We&apos;re recruiting the best talents in AI research. If you share our 
            vision of beneficial AI for humanity, join us.
          </p>
          <p className="text-sm text-indigo-700">
            Open positions: Senior Researchers, ML Engineers, AI Safety Specialists
          </p>
        </div>
      </div>
    </article>
  )
} 