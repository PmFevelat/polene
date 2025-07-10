import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="py-8 md:py-16">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-4 text-center">
                    <h1 className="text-center text-3xl font-semibold lg:text-4xl">Pricing that Scales with You</h1>
                </div>

                <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-3">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Free</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
                            <CardDescription className="text-sm">Per user</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['10 AI Conversations/day', 'Basic Models Access', 'Community Support', '1GB File Storage'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="relative scale-105 border-purple-200 shadow-xl bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-900/10 dark:border-purple-800">
                        <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">Popular</span>

                        <div className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="font-medium">Pro</CardTitle>
                                <span className="my-3 block text-2xl font-semibold">$19 / mo</span>
                                <CardDescription className="text-sm">Per user</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <hr className="border-dashed" />
                                <ul className="list-outside space-y-3 text-sm">
                                    {['Everything in Free Plan', 'Unlimited AI Conversations', 'Advanced Models (GPT-4, Claude)', 'Priority Support', '50GB File Storage', 'API Access', 'Custom AI Prompts', 'Advanced Analytics', 'Team Collaboration'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check className="size-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    asChild
                                    className="w-full">
                                    <Link href="">Get Started</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-medium">Enterprise</CardTitle>
                            <span className="my-3 block text-2xl font-semibold">$49 / mo</span>
                            <CardDescription className="text-sm">Per user</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed" />

                            <ul className="list-outside space-y-3 text-sm">
                                {['Everything in Pro Plan', 'Custom AI Model Training', 'Dedicated Support Manager', 'Advanced Security (SOC2)', 'Unlimited Storage', 'White-label Solutions', 'Custom Integrations', 'SLA Guarantee'].map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-2">
                                        <Check className="size-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full">
                                <Link href="">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
