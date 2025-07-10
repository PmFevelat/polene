'use client'

import { AnimatedList } from "@/components/magicui/animated-list";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Step2() {
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

    return (
        <section ref={sectionRef} className="py-8 bg-white text-black">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-300 md:grid-cols-2">
                    <div className="overflow-hidden relative">
                        {isVisible && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <AnimatedList 
                                    className="max-w-[240px] [&>*:nth-child(3)]:shadow-2xl [&>*:nth-child(3)]:opacity-70 [&>*:nth-child(4)]:shadow-2xl [&>*:nth-child(4)]:opacity-50 [&>*:nth-child(5)]:shadow-2xl [&>*:nth-child(5)]:opacity-30 [&>*:nth-child(6)]:shadow-2xl [&>*:nth-child(6)]:opacity-20"
                                    restart={true}
                                    restartDelay={2500}
                                    delay={1000}
                                >
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/deepseekai.png" 
                                            alt="DeepSeek AI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/mistralai.png" 
                                            alt="Mistral AI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/Openai.png" 
                                            alt="OpenAI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/perplexityai.png" 
                                            alt="Perplexity AI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/grokai.png" 
                                            alt="Grok AI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-lg flex items-center justify-center w-[200px] h-[70px]">
                                        <Image 
                                            src="/geminiai.png" 
                                            alt="Gemini AI"
                                            width={120}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                </AnimatedList>
                            </div>
                        )}
                        <img 
                            src="/image1.png" 
                            alt="Advanced tracking system"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="overflow-hidden border-t border-zinc-300 bg-white p-4 sm:p-8 md:border-0 md:border-l flex">
                        <div className="flex items-center justify-center w-full">
                            <p className="text-2xl font-semibold text-black text-center">
                                Advanced tracking system, Instantly locate all your assets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 