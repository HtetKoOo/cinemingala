import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="min-h-screen">
            {/* HERO SECTION SKELETON */}
            <section className="relative w-full pt-18 sm:pt-20 rounded-b-2xl overflow-hidden mb-8 h-[70vh] sm:h-[60vh] lg:h-[80vh] bg-neutral-900">
                <div className="relative z-10 flex flex-col justify-between p-2 h-full">
                    <div className="flex flex-col sm:flex-row justify-between p-2 h-full gap-6">
                        {/* LEFT - Poster */}
                        <div className="relative z-10 w-full sm:w-35 lg:w-55 aspect-2/3 mb-4 shrink-0">
                            <Skeleton className="w-full h-full rounded-2xl" />
                        </div>

                        {/* CENTER - Info */}
                        <div className="flex flex-col flex-1 sm:mx-6 pt-4 gap-4">
                            {/* Title */}
                            <Skeleton className="h-10 w-3/4 mb-2" />

                            {/* Genres */}
                            <div className="flex gap-2 mb-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>

                            {/* Meta Info */}
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-12" />
                            </div>

                            <Skeleton className="h-4 w-32 mb-4" />

                            {/* Buttons Skeleton (Mobile) */}
                            <div className="flex gap-3 lg:hidden mb-4">
                                <Skeleton className="h-10 w-32 rounded-md" />
                                <Skeleton className="h-10 w-32 rounded-md" />
                            </div>

                            {/* Overview */}
                            <div className="space-y-2 mb-4 sm:hidden lg:block">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>
                        </div>

                        {/* RIGHT - Production Companies */}
                        <div className="flex flex-col w-full sm:w-1/4 md:w-1/6 gap-2">
                            <Skeleton className="h-6 w-40 mb-2" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-8 w-20" />
                                <Skeleton className="h-8 w-14" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex flex-col md:flex-row px-2 sm:px-4">
                {/* REVIEWS SECTION SKELETON */}
                <section className="flex flex-col w-full md:w-2/3 pr-4 mb-16">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-2xl p-4 border border-border shadow-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SIMILAR SECTION SKELETON */}
                <section className="w-full md:w-1/3">
                    <Skeleton className="h-8 w-32 mb-6" />
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl overflow-hidden">
                                <Skeleton className="aspect-2/3 w-full" />
                                <div className="p-2 space-y-2">
                                    <Skeleton className="h-4 w-3/4 mx-auto" />
                                    <Skeleton className="h-3 w-1/2 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
