'use client'

import { AnimatedList } from "@/components/magicui/animated-list";
import { useEffect, useRef, useState } from "react";
import { ClaudeChatInput } from "@/components/ui/claude-style-ai-input";

export default function Step3() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.3, // Se déclenche quand 30% du composant est visible
                rootMargin: '0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const handleSendMessage = (message: string, files: any[], pastedContent: any[]) => {
        console.log("Demo message:", message);
        // Demo function - ne fait rien de spécial
    };

    return (
        <section ref={sectionRef} className="py-8 bg-white text-black">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-300 md:grid-cols-2">
                    <div className="overflow-hidden border-b border-zinc-300 bg-white p-4 sm:p-8 md:border-0 md:border-r flex">
                        <div className="flex items-center justify-center w-full">
                            <p className="text-2xl font-semibold text-black text-center">
                                Advanced tracking system, Instantly locate all your assets.
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden relative">
                        {isVisible && (
                            <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
                                <AnimatedList 
                                    className="max-w-[500px] w-full"
                                    restart={false}
                                    delay={500}
                                >
                                    <div className="transform scale-75 origin-center">
                                        <ClaudeChatInput
                                            onSendMessage={handleSendMessage}
                                            placeholder="Search and track your assets..."
                                            maxFiles={5}
                                            maxFileSize={5 * 1024 * 1024}
                                            hideTooltips={true}
                                        />
                                    </div>
                                </AnimatedList>
                            </div>
                        )}
                        <img 
                            src="/image2.png" 
                            alt="Advanced tracking system"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 