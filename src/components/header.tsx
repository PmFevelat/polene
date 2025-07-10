'use client'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Pricing', href: '#link' },
]

const companyDropdownItems = [
    { name: 'Blog', href: '#', soon: true },
    { name: 'Careers', href: '#', soon: true },
    { name: 'About', href: '#', soon: true },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [companyDropdownOpen, setCompanyDropdownOpen] = React.useState(false)
    const [hoverTimeout, setHoverTimeout] = React.useState<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
        const handleScroll = () => {
            // Considérer comme scrollé dès qu'on est au-delà du HeroSection (section2 et après)
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMouseEnter = () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
        }
        setCompanyDropdownOpen(true)
    }

    const handleMouseLeave = () => {
        const timeout = setTimeout(() => {
            setCompanyDropdownOpen(false)
        }, 150) // Délai de 150ms avant fermeture
        setHoverTimeout(timeout)
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'fixed z-20 w-full transition-opacity duration-1000 ease-linear opacity-90', 
                    isScrolled && 'border-b border-black/5'
                )}
                style={isScrolled ? { backgroundColor: '#FAF9F5' } : undefined}>
                <div className="w-full px-6">
                    <div className="relative flex items-center justify-between py-3">
                        {/* Logo à l'extrémité gauche */}
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <span className="text-xl font-semibold text-gray-800">SOBERY</span>
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
                                {/* Company Dropdown */}
                                <li 
                                    className="relative company-dropdown"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        className="inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out hover:text-gray-900 text-gray-700 h-8 rounded-md px-3 py-2">
                                        <span>Company</span>
                                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", companyDropdownOpen && "rotate-180")} />
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    {companyDropdownOpen && (
                                        <div className="absolute top-full left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-30">
                                            {companyDropdownItems.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                                    <span>{item.name}</span>
                                                    {item.soon && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                            Soon
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </ul>
                            
                            {/* Boutons Login/Sign Up */}
                            <div className="flex gap-2">
                                <Link
                                    href="#"
                                    className={cn(
                                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:border-accent h-8 rounded-md px-4 py-2",
                                        isScrolled && 'lg:hidden'
                                    )}
                                    style={{ backgroundColor: '#F8F4ED' }}>
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
                                    {/* Company section pour mobile */}
                                    <li>
                                        <span className="text-muted-foreground block mb-2">Company</span>
                                        <ul className="space-y-2 ml-4">
                                            {companyDropdownItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={item.href}
                                                        className="text-muted-foreground hover:text-accent-foreground flex items-center justify-between duration-150">
                                                        <span>{item.name}</span>
                                                        {item.soon && (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                                Soon
                                                            </span>
                                                        )}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Link
                                    href="#"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-100 ease-in-out border border-input shadow-sm hover:bg-accent hover:border-accent h-8 rounded-md px-4 py-2"
                                    style={{ backgroundColor: '#F8F4ED' }}>
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
