import { Skeleton } from "@/components/ui/skeleton";

export default function PeopleLoading() {
    return (
        <main className="min-h-screen px-6 py-20">
            <h1 className="text-3xl font-bold mb-6">Popular People</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-2xl shadow overflow-hidden h-full flex flex-col"
                    >
                        {/* Image Skeleton */}
                        <div className="relative w-full aspect-3/4 bg-muted">
                            <Skeleton className="h-full w-full" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="p-2 space-y-2 flex-1">
                            {/* Name */}
                            <Skeleton className="h-6 w-3/4" />

                            {/* Popularity */}
                            <Skeleton className="h-4 w-1/2" />

                            {/* Known for list */}
                            <div className="mt-2 space-y-1">
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                                <Skeleton className="h-3 w-4/6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
