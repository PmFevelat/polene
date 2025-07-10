"use client"

import React from 'react'
import { HeroHeader } from './header'
import { ClaudeChatInput } from '@/components/ui/claude-style-ai-input'
import { TypingAnimation } from '@/components/magicui/typing-animation'
import type { FileWithPreview, PastedContent } from '@/components/ui/claude-style-ai-input'

export default function HeroSection() {
    const handleSendMessage = (
        message: string,
        files: FileWithPreview[],
        pastedContent: PastedContent[]
    ) => {
        console.log("Message:", message)
        console.log("Files:", files)
        console.log("Pasted Content:", pastedContent)
        
        // Ici vous pourriez envoyer les données à votre backend/service IA
        alert(`Message envoyé!\nTexte: ${message}\nFichiers: ${files.length}\nContenu collé: ${pastedContent.length}`)
    }

    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section id="hero-section" style={{ backgroundColor: '#FAF9F5' }}>
                    <div className="relative h-[85vh] flex items-center justify-center p-4">
                        <div className="w-full max-w-4xl">
                            <div className="mb-8 text-center">
                                <TypingAnimation
                                    as="h1"
                                    className="text-3xl font-serif font-light text-gray-800 mb-2"
                                    duration={50}
                                    delay={500}
                                    showCursor={true}
                                    cursorClassName="text-gray-800"
                                >
                                    How can I help you today?
                                </TypingAnimation>
                            </div>
                            
                            <ClaudeChatInput
                                onSendMessage={handleSendMessage}
                                placeholder="Posez-moi une question ou glissez des fichiers ici..."
                                maxFiles={10}
                                maxFileSize={10 * 1024 * 1024} // 10MB
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
