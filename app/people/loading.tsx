import { Skeleton } from "@/components/ui/skeleton";

export default function PeopleLoading() {
    return (
        <main className="min-h-screen px-3 pt-20 sm:px-4">
            <h1 className="mb-6 text-2xl font-semibold">People</h1>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex h-full flex-col overflow-hidden rounded-2xl border shadow"
                    >
                        {/* Image Skeleton */}
                        <div className="relative aspect-4/5 w-full bg-muted">
                            <Skeleton className="h-full w-full" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="flex-1 space-y-2 p-2">
                            {/* Name */}
                            <Skeleton className="h-4 w-3/4" />

                            {/* Popularity */}
                            <Skeleton className="h-3 w-1/2" />

                            {/* Known for list */}
                            <div className="mt-2 space-y-1">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
