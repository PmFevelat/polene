import Link from 'next/link'

const links = [
    {
        group: 'COMPANY',
        items: [
            {
                title: 'About',
                href: '#',
                soon: true,
            },
            {
                title: 'Careers',
                href: '#',
                soon: true,
            },
            {
                title: 'Blog',
                href: '#',
                soon: true,
            },
        ],
    },
    {
        group: 'PRICING',
        items: [
            {
                title: 'Plans',
                href: '/pricing',
            },
        ],
    },
    {
        group: 'SOCIALS',
        items: [
            {
                title: 'LinkedIn',
                href: '#',
            },
            {
                title: 'TikTok',
                href: '#',
            },
            {
                title: 'Instagram',
                href: '#',
            },
        ],
    },
]

export default function FooterSection() {
    return (
        <footer className="bg-white pt-20 border-t" style={{ borderTopColor: '#E5E5E5' }}>
            <div className="w-full px-6">
                <div className="grid gap-12 md:grid-cols-6">
                    <div className="md:col-span-2">
                        <Link 
                            href="/#hero-section"
                            className="text-black text-xl font-semibold hover:opacity-80 transition-opacity duration-150 cursor-pointer inline-block"
                        >
                            POLENE
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-8 md:col-span-4">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4 text-sm">
                                <span className="block font-medium text-base" style={{ color: '#6B7280' }}>{link.group}</span>
                                {link.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center gap-2 duration-150 hover:opacity-80"
                                        style={{ color: '#374151' }}>
                                        <span>{item.title}</span>
                                        {'soon' in item && item.soon && (
                                            <span className="text-xs font-medium text-gray-400">
                                                Soon
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 pb-6">
                    <div className="flex justify-end">
                        <span className="text-sm" style={{ color: '#6B7280' }}>© {new Date().getFullYear()} POLENE</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
