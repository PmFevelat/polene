'use client'

import React, { useEffect, useRef } from 'react'

const gridCards = [
    {
        id: 1,
        title: "Introducing Codex",
        category: "Release",
        duration: "12 min read",
        image: "/image2.png",
        slug: "introducing-codex"
    },
    {
        id: 2,
        title: "OpenAI o3 and o4-mini",
        category: "Release", 
        duration: "11 min read",
        image: "/image3.png",
        slug: "openai-o3-o4-mini"
    },
    {
        id: 3,
        title: "Building a custom math tutor powered by ChatGPT",
        category: "ChatGPT",
        duration: "4 min read",
        image: "/image4.png",
        slug: "building-custom-math-tutor"
    },
    {
        id: 4,
        title: "Advanced AI Research",
        category: "Research",
        duration: "8 min read",
        image: "/image5.png",
        slug: "advanced-ai-research"
    }
]

export default function Grid() {
    const cardsRef = useRef<HTMLDivElement>(null)
    const asideRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cardsEl = cardsRef.current
        const asideEl = asideRef.current
        const containerEl = containerRef.current
        const gridEl = gridRef.current
        if (!cardsEl || !asideEl || !containerEl || !gridEl) return

        // Calculer la hauteur totale du contenu des cards
        const calculateScrollHeight = () => {
            const cardsScrollHeight = cardsEl.scrollHeight
            const cardsClientHeight = cardsEl.clientHeight
            const scrollableHeight = cardsScrollHeight - cardsClientHeight
            
            // Ajuster la hauteur du container pour correspondre au scroll interne
            const totalHeight = window.innerHeight + scrollableHeight
            containerEl.style.height = `${totalHeight}px`
        }

        // Calculer à l'initialisation et au resize
        calculateScrollHeight()
        window.addEventListener('resize', calculateScrollHeight)

        // Détecter si le Grid est complètement centré (sticky scroll terminé)
        const isGridFullyCentered = () => {
            const stickyRect = containerEl.querySelector('.sticky')?.getBoundingClientRect()
            
            // Le Grid est centré quand le sticky container est exactement en haut de la viewport
            return stickyRect && Math.abs(stickyRect.top) < 5 // Tolérance de 5px
        }

        const onWheel = (e: WheelEvent) => {
            const delta = e.deltaY
            const atTop = cardsEl.scrollTop <= 1
            const atBottom = cardsEl.scrollTop + cardsEl.clientHeight >= cardsEl.scrollHeight - 1

            // PHASE 1: Attendre que le Grid soit complètement centré
            if (!isGridFullyCentered()) {
                // Laisser Lenis gérer le sticky scroll pour centrer le Grid
                return
            }

            // PHASE 2: Grid centré, maintenant on peut gérer le scroll interne des cartes
            if ((delta > 0 && !atBottom) || (delta < 0 && !atTop)) {
                cardsEl.scrollTop += delta
                e.preventDefault()
                e.stopPropagation()
            }
            // Dès qu'on atteint les limites des cartes, laisser Lenis reprendre pour aller au composant suivant
        }

        // Attacher l'event listener à TOUTE la zone Grid
        gridEl.addEventListener('wheel', onWheel, { passive: false })
        
        return () => {
            gridEl.removeEventListener('wheel', onWheel)
            window.removeEventListener('resize', calculateScrollHeight)
        }
    }, [])

    return (
        <section style={{ backgroundColor: '#FAF9F5' }}>
            {/* Container avec hauteur calculée dynamiquement */}
            <div ref={containerRef} className="relative">
                <div className="sticky top-0 h-screen w-full">
                    <div ref={gridRef} className="w-full px-6 h-full flex items-start justify-center">
                        {/* Grid container */}
                        <div className="w-full grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,27%)] items-start pt-20">
                            {/* Colonne principale */}
                            <a 
                                href="/blog/letter-sam-jony"
                                className="flex flex-col group"
                                aria-label="A letter from Sam & Jony - Company - 3 min read"
                            >
                                {/* Image 16:9 */}
                                <div className="relative w-full aspect-video overflow-hidden rounded-md">
                                    <img
                                        src="/image1.png"
                                        alt="A letter from Sam & Jony"
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.0125]"
                                    />
                                </div>
                                {/* Texte */}
                                <h2 className="mt-6 mb-2 text-2xl font-bold">A letter from Sam & Jony</h2>
                                <p className="text-sm text-gray-600 flex flex-wrap gap-x-3">
                                    <span>Company</span>
                                    <span className="text-gray-500">3 min read</span>
                                </p>
                            </a>

                            {/* Colonne des cartes scrollables */}
                            <aside ref={asideRef} className="h-full flex flex-col justify-start">
                                <div 
                                    ref={cardsRef}
                                    className="overflow-y-auto hide-scrollbar flex flex-col gap-6 h-[28rem] md:h-[32rem] lg:h-[36rem]"
                                >
                                    {gridCards.map((card) => (
                                        <a
                                            key={card.id}
                                            href={`/blog/${card.slug}`}
                                            aria-label={`${card.title} - ${card.category} - ${card.duration}`}
                                            className="group block w-full flex-shrink-0"
                                        >
                                            {/* Card image */}
                                            <div
                                                className="card-hover relative w-full overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-[1.0125]"
                                                style={{ aspectRatio: '2 / 1' }}
                                            >
                                                {/* Image background */}
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                            </div>
                                            {/* Card text */}
                                            <div className="mt-2">
                                                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                                                    {card.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-gray-600 flex flex-wrap gap-x-3">
                                                    <span>{card.category}</span>
                                                    <span className="text-gray-500">{card.duration}</span>
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styles CSS */}
            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                /* Préserver le border radius pendant les transformations */
                .card-hover {
                    transform-origin: center;
                    backface-visibility: hidden;
                }
                .group:hover .card-hover {
                    border-radius: 0.375rem !important;
                }
            `}</style>
        </section>
    );
} 