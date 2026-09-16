import Image from "next/image";
import { cn } from "@/lib/utils";
import { TvShow } from "@/types/tv-show";
import Link from "next/link";

interface TvShowGridProps {
    title: string;
    shows: TvShow[];
    className?: string;
}

export function TvShowGrid({ title, shows, className }: TvShowGridProps) {
    return (
        <section className={cn("py-2 grid gap-6", className)}>
            <h2 className="text-2xl font-semibold">{title}</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 sm:gap-4">
                {shows.map((show) => (
                    <Link
                        href={`/tv/${show.id}`}
                        key={show.id}
                        className="rounded-2xl overflow-hidden shadow-lg hover:scale-[1.03] transition-transform"
                    >
                        <div className="relative w-full aspect-2/3">
                            <Image
                                src={
                                    show.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                                        : "/images/image-placeholder.png"
                                }
                                alt={show.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 17vw, (max-width: 1535px) 13vw, 10vw"
                            />
                        </div>

                        <div className="p-2">
                            <h3 className="font-semibold text-sm truncate">{show.name}</h3>
                            <p className="text-xs text-muted-foreground">
                                ⭐ {show.vote_average.toFixed(1)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
