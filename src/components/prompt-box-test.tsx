"use client"

import React from 'react'
import { PromptBox } from '@/components/ui/chatgpt-prompt-input'

export default function PromptBoxTest() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const message = formData.get('prompt') as string
        
        if (message?.trim()) {
            console.log("Message envoyé:", message)
            alert(`Message envoyé: ${message}`)
            // Reset le formulaire
            ;(e.target as HTMLFormElement).reset()
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="mb-4 text-center">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    Test du nouveau PromptBox
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Composant style ChatGPT installé depuis shadcn
                </p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <PromptBox 
                    name="prompt"
                    placeholder="Tapez votre message ici..." 
                    className="w-full"
                />
            </form>
        </div>
    )
} 