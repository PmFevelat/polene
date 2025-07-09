import FeaturesSection from '@/components/features-9'

export default function Section3() {
    return (
        <div 
            className="w-full min-h-screen bg-black text-white overflow-y-auto"
            style={{ 
                backgroundColor: '#000000',
                margin: 0,
                padding: 0,
                minHeight: '100vh',
                width: '100%'
            }}
        >
            {/* Container centré avec proportions similaires au HeroSection */}
            <div 
                className="flex items-center justify-center min-h-screen p-4"
                style={{ 
                    backgroundColor: '#000000',
                    minHeight: '100vh'
                }}
            >
                <div className="w-full max-w-4xl">
                    {/* Container dark mode pour le FeaturesSection */}
                    <div className="dark">
                        <FeaturesSection />
                    </div>
                </div>
            </div>
            {/* Espace supplémentaire pour le scroll */}
            <div 
                className="h-screen" 
                style={{ backgroundColor: '#000000' }}
            ></div>
        </div>
    )
} 