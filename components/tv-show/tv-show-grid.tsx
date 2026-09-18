import Image from "next/image";
import { TvShow } from "@/types/tv-show";
import Link from "next/link";

interface TvShowGridProps {
    title: string;
    shows: TvShow[];
}

export function TvShowGrid({ title, shows }: TvShowGridProps) {
    return (
        <section className="py-6" aria-labelledby="tv-grid-title">
            <h1 id="tv-grid-title" className="mb-6 text-2xl font-semibold">{title}</h1>

            {shows.length === 0 ? (
                <p className="text-muted-foreground">No TV shows found in this category.</p>
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
                    {shows.map((show) => (
                        <Link
                            href={`/tv/${show.id}`}
                            key={show.id}
                            className="min-w-0 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                            <div className="relative aspect-2/3 w-full bg-muted">
                                <Image
                                    src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/images/image-placeholder.png"}
                                    alt={show.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 17vw, (max-width: 1535px) 13vw, 10vw"
                                />
                            </div>
                            <div className="p-2">
                                <h2 className="truncate text-sm font-semibold">{show.name}</h2>
                                <p className="text-xs text-muted-foreground">⭐ {show.vote_average.toFixed(1)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
