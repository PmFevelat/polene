"use client"

import React from 'react'
import { HeroHeader } from './header'
import { ClaudeChatInput } from '@/components/ui/claude-style-ai-input'
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
                <section style={{ backgroundColor: '#FAF9F5' }}>
                    <div className="relative h-[85vh] flex items-center justify-center p-4">
                        <div className="w-full max-w-4xl">
                            <div className="mb-8 text-center">
                                <h1 className="text-3xl font-serif font-light text-gray-800 mb-2">
                                    Comment puis-je vous aider aujourd&apos;hui ?
                                </h1>
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
