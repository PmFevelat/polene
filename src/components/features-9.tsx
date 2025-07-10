'use client'
import { Activity } from 'lucide-react'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export default function FeaturesSection() {
    return (
        <section className="py-8 bg-black text-white">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-700">
                    <div className="relative bg-black w-full">
                        <div className="absolute z-10 max-w-lg px-4 pr-8 pt-4 md:px-8 md:pt-8">
                            <span className="text-zinc-400 flex items-center gap-2">
                                <Activity className="size-4" />
                                Activity feed
                            </span>

                            <p className="my-8 text-2xl font-semibold text-white">
                                Monitor your application's activity in real-time. <span className="text-zinc-400"> Instantly identify and resolve issues.</span>
                            </p>
                        </div>
                        <div className="w-full">
                            <MonitoringChart />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: '#3B6C89', // bleu custom
    },
    mobile: {
        label: 'Mobile',
        color: '#C1A87C', // orange clair
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
            className="h-64 aspect-auto md:h-80 w-full"
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
