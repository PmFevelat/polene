import FeaturesSection from '@/components/features-9'

export default function Section3() {
    return (
        <div 
            className="w-full bg-black text-white"
            style={{ 
                backgroundColor: '#000000',
                margin: 0,
                padding: 0,
                width: '100%'
            }}
        >
            {/* Container centré avec hauteur réduite */}
            <div 
                className="flex items-center justify-center py-12"
                style={{ 
                    backgroundColor: '#000000',
                    minHeight: '50vh'
                }}
            >
                <div className="w-full">
                    {/* Container dark mode pour le FeaturesSection */}
                    <div className="dark">
                        <FeaturesSection />
                    </div>
                </div>
            </div>
        </div>
    )
} 