export default function Step3() {
    return (
        <section className="py-8 bg-black text-white">
            <div className="w-full px-6">
                <div className="mx-auto grid w-full border border-zinc-700 md:grid-cols-2">
                    <div className="overflow-hidden border-b border-zinc-700 bg-zinc-900 p-4 sm:p-8 md:border-0 md:border-r flex">
                        <div className="flex items-center justify-center w-full">
                            <p className="text-2xl font-semibold text-white text-center">
                                Advanced tracking system, Instantly locate all your assets.
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <img 
                            src="/image2.png" 
                            alt="Advanced tracking system"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
} 