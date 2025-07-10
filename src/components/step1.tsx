'use client'
import { Logo } from '@/components/logo'
import { Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'

export default function Step1() {
    return (
        <section className="py-8 bg-black text-white">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-700 md:grid-cols-2">
                    <div>
                        <div className="p-4 sm:p-8">
                            <span className="text-zinc-400 flex items-center gap-2">
                                <MapIcon className="size-4" />
                                Real time location tracking
                            </span>

                            <p className="mt-8 text-2xl font-semibold text-white">Advanced tracking system, Instantly locate all your assets.</p>
                        </div>

                        <div
                            aria-hidden
                            className="relative">
                            <div className="absolute inset-0 z-10 m-auto size-fit">
                                <div className="rounded-lg bg-zinc-900 border border-zinc-700 z-1 relative flex size-fit w-fit items-center gap-2 px-3 py-1 text-xs font-medium shadow-md shadow-black/20">
                                    <span className="text-lg">🇨🇩</span> 
                                    <span className="text-white">Last connection from DR Congo</span>
                                </div>
                                <div className="rounded-lg bg-zinc-800 absolute inset-2 -bottom-2 mx-auto border border-zinc-700 px-3 py-4 text-xs font-medium shadow-md shadow-black/20"></div>
                            </div>

                            <div className="relative overflow-hidden">
                                <div className="bg-gradient-radial from-transparent to-black to-75% z-1 absolute inset-0"></div>
                                <Map />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden border-t border-zinc-700 bg-zinc-900 p-4 sm:p-8 md:border-0 md:border-l">
                        <div className="relative z-10">
                            <span className="text-zinc-400 flex items-center gap-2">
                                <MessageCircle className="size-4" />
                                Email and web support
                            </span>

                            <p className="my-8 text-2xl font-semibold text-white">Reach out via email or web for any assistance you need.</p>
                        </div>
                        <div
                            aria-hidden
                            className="flex flex-col gap-8">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="flex size-5 rounded-full border border-zinc-600">
                                        <Logo className="m-auto size-3" />
                                    </span>
                                    <span className="text-zinc-400 text-xs">Sat 22 Feb</span>
                                </div>
                                <div className="rounded-lg bg-zinc-800 border border-zinc-700 mt-1.5 w-3/5 p-3 text-xs text-white">Hey, I&apos;m having trouble with my account.</div>
                            </div>

                            <div>
                                <div className="rounded-lg mb-1 ml-auto w-3/5 bg-blue-600 p-3 text-xs text-white">Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.</div>
                                <span className="text-zinc-400 block text-right text-xs">Now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })

const points = map.getPoints()

const svgOptions = {
    backgroundColor: '#000000',
    color: '#71717a', // zinc-500
    radius: 0.15,
}

const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg
            viewBox={viewBox}
            style={{ background: svgOptions.backgroundColor }}>
            {points.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={svgOptions.radius}
                    fill={svgOptions.color}
                />
            ))}
        </svg>
    )
} 