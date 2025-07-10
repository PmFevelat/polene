import Link from 'next/link'

const links = [
    {
        group: 'COMPANY',
        items: [
            {
                title: 'About',
                href: '#',
            },
            {
                title: 'Careers',
                href: '#',
            },
            {
                title: 'Blog',
                href: '#',
            },
        ],
    },
    {
        group: 'PRICING',
        items: [
            {
                title: 'Plans',
                href: '#',
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
                        <div className="text-black text-xl font-semibold">
                            POLENE
                        </div>
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
                                        className="block duration-150 hover:opacity-80"
                                        style={{ color: '#374151' }}>
                                        <span>{item.title}</span>
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
