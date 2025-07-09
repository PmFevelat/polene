'use client'
import { Logo } from '@/components/logo'
import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function FeaturesSection() {
    return (
        <section className="px-0 py-8 bg-black text-white">
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
                            <div className="rounded-lg bg-zinc-800 border border-zinc-700 mt-1.5 w-3/5 p-3 text-xs text-white">Hey, I'm having trouble with my account.</div>
                        </div>

                        <div>
                            <div className="rounded-lg mb-1 ml-auto w-3/5 bg-blue-600 p-3 text-xs text-white">Molestiae numquam debitis et ullam distinctio provident nobis repudiandae deleniti necessitatibus.</div>
                            <span className="text-zinc-400 block text-right text-xs">Now</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y border-zinc-700 p-8 bg-zinc-950">
                    <p className="text-center text-3xl font-semibold lg:text-5xl text-white">99.99% Uptime</p>
                </div>
                <div className="relative col-span-full bg-black">
                    <div className="absolute z-10 max-w-lg px-4 pr-8 pt-4 md:px-8 md:pt-8">
                        <span className="text-zinc-400 flex items-center gap-2">
                            <Activity className="size-4" />
                            Activity feed
                        </span>

                        <p className="my-8 text-2xl font-semibold text-white">
                            Monitor your application's activity in real-time. <span className="text-zinc-400"> Instantly identify and resolve issues.</span>
                        </p>
                    </div>
                    <MonitoringChart />
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

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#3b82f6', // blue-500
    },
    mobile: {
        label: 'Mobile',
        color: '#60a5fa', // blue-400
    },
} satisfies ChartConfig

const chartData = [
    { month: 'May', desktop: 56, mobile: 224 },
    { month: 'June', desktop: 56, mobile: 224 },
    { month: 'January', desktop: 126, mobile: 252 },
    { month: 'February', desktop: 205, mobile: 410 },
    { month: 'March', desktop: 200, mobile: 126 },
    { month: 'April', desktop: 400, mobile: 800 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer
            className="h-64 aspect-auto md:h-80"
            config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                }}>
                <defs>
                    <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                            offset="0%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="55%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                            offset="0%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="55%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#374151" />
                <ChartTooltip
                    active
                    cursor={false}
                    content={<ChartTooltipContent className="bg-zinc-800 border-zinc-700 text-white" />}
                />
                <Area
                    strokeWidth={2}
                    dataKey="mobile"
                    type="stepBefore"
                    fill="url(#fillMobile)"
                    fillOpacity={0.1}
                    stroke="var(--color-mobile)"
                    stackId="a"
                />
                <Area
                    strokeWidth={2}
                    dataKey="desktop"
                    type="stepBefore"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.1}
                    stroke="var(--color-desktop)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    )
}
