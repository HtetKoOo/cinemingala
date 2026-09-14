import Image from "next/image";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SearchResultGridProps {
    title: string;
    results: Movie[];
    className?: string;
    query: string;
    currentPage: number;
    totalPages: number;
}

export function SearchResultGrid({ title, results, className, query, currentPage, totalPages }: SearchResultGridProps) {
    const pageHref = (page: number) =>
        `/search?${new URLSearchParams({ query, page: String(page) })}`;

    return (
        <section className={cn("py-20 px-6 grid gap-6", className)}>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {results.length === 0 && <p>No movies found. Try another title.</p>}

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
                {results.map((result) => (
                    <Link
                        href={`/movie/${result.id}`}
                        key={result.id}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform"
                    >
                        <div className="relative w-full aspect-2/3">
                            <Image
                                src={
                                    result.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                        : "/images/image-placeholder.png"
                                }
                                alt={result.title || "Movie poster"}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 12.5vw, 10vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{result.title}</h3>
                            <p className="text-xs text-muted-foreground">
                                ⭐ {result.vote_average.toFixed(1)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {totalPages > 0 && (
                <nav aria-label="Search results pagination" className="flex flex-wrap items-center justify-center gap-4">
                    {currentPage > 1 ? (
                        <Button asChild variant="outline">
                            <Link href={pageHref(currentPage - 1)}>Previous</Link>
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>Previous</Button>
                    )}
                    <span>Page {currentPage} of {totalPages}</span>
                    {currentPage < totalPages ? (
                        <Button asChild variant="outline">
                            <Link href={pageHref(currentPage + 1)}>Next</Link>
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>Next</Button>
                    )}
                </nav>
            )}
        </section>
    );
}
