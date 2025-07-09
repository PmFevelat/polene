'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

// Contexte global pour l'état du zoom
export const ZoomContext = React.createContext<{
    isZooming: boolean
    setIsZooming: (value: boolean) => void
}>({
    isZooming: false,
    setIsZooming: () => {}
})

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { isZooming } = React.useContext(ZoomContext)

    React.useEffect(() => {
        const handleScroll = () => {
            // Considérer comme scrollé dès qu'on est au-delà du HeroSection (section2 et après)
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'fixed z-20 w-full transition-opacity duration-1000 ease-linear', 
                    isScrolled && 'border-b border-black/5',
                    // Ne disparaître que si vraiment en train de zoomer activement
                    isZooming ? 'opacity-0 pointer-events-none' : 'opacity-90'
                )}
                style={isScrolled ? { backgroundColor: '#FAF9F5' } : undefined}>
                <div className="w-full px-6">
                    <div className="relative flex items-center justify-between py-3">
                        {/* Logo à l'extrémité gauche */}
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <span className="text-xl font-semibold text-gray-800">Sobery</span>
                        </Link>

                        {/* Menu burger pour mobile */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                            <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                            <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                        </button>

                        {/* Navigation et boutons à l'extrémité droite - desktop */}
                        <div className="hidden lg:flex items-center gap-6">
                            {/* Navigation tabs */}
                            <ul className="flex gap-1">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out hover:text-gray-900 text-gray-700 h-8 rounded-md px-3 py-2">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Boutons Login/Sign Up */}
                            <div className="flex gap-2">
                                <Link
                                    href="#"
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-muted shadow-sm hover:bg-accent hover:border-accent h-8 rounded-md px-4 py-2",
                                        isScrolled && 'lg:hidden'
                                    )}>
                                    Log in
                                </Link>
                                <Link
                                    href="#"
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-4 py-2",
                                        isScrolled && 'lg:hidden'
                                    )}>
                                    Sign Up
                                </Link>
                                <Link
                                    href="#"
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-4 py-2",
                                        isScrolled ? 'lg:inline-flex' : 'hidden'
                                    )}>
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Menu mobile */}
                        <div className="bg-background in-data-[state=active]:block lg:hidden mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div>
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out border border-input bg-muted shadow-sm hover:bg-accent hover:border-accent h-8 rounded-md px-4 py-2">
                                    Log in
                                </Link>
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out bg-primary text-primary-foreground hover:bg-primary/90 h-8 rounded-md px-4 py-2">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
