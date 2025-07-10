'use client'

import { AnimatedList } from "@/components/magicui/animated-list";
import { useEffect, useRef, useState } from "react";

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
        <section ref={sectionRef} className="py-8 bg-black text-white">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-700 md:grid-cols-2">
                    <div className="overflow-hidden relative">
                        {isVisible && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <AnimatedList className="bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-[200px]">
                                    <p className="text-white text-sm">Système de tracking</p>
                                    <p className="text-white text-sm">Localisation instantanée</p>
                                    <p className="text-white text-sm">Gestion des assets</p>
                                </AnimatedList>
                            </div>
                        )}
                        <img 
                            src="/image1.png" 
                            alt="Advanced tracking system"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="overflow-hidden border-t border-zinc-700 bg-zinc-900 p-4 sm:p-8 md:border-0 md:border-l flex">
                        <div className="flex items-center justify-center w-full">
                            <p className="text-2xl font-semibold text-white text-center">
                                Advanced tracking system, Instantly locate all your assets.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 