import { VideoText } from "@/components/magicui/video-text";

export default function CallToAction() {
    return (
        <section style={{ backgroundColor: '#000000' }}>
            <div className="relative h-screen flex items-center justify-center px-6">
                <div className="relative h-[600px] w-full flex items-center justify-center">
                    <VideoText 
                        src="https://cdn.magicui.design/ocean-small.webm"
                        className="w-full h-full"
                        fontSize="120"
                        fontWeight="400"
                        fontFamily="Arial, sans-serif"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        Responsible Intelligence
                    </VideoText>
                </div>
            </div>
        </section>
    )
} 