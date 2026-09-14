import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/types/movie";
import { TvShow } from "@/types/tv-show";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie | TvShow }) {
    const title = (movie as Movie).title || (movie as TvShow).name;

    return (
        <Card className="w-32 md:w-38 p-0 mb-1 rounded-2xl shrink-0 gap-1">
            <CardContent className="p-0">
                <div className="relative w-full h-48">
                    <Image
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "/images/image-placeholder.png"
                        }
                        alt={title || "Movie Poster"}
                        fill
                        sizes="(max-width: 768px) 128px, (max-width: 1024px) 152px, 160px"
                        className="object-cover rounded-t-2xl"
                        priority={false}
                        placeholder="blur"
                        blurDataURL="/images/placeholder.png"
                    />
                </div>
            </CardContent>
            <CardFooter className="p-2">
                <h4 className="text-sm font-semibold truncate">{title}</h4>
            </CardFooter>
        </Card>
    );
}

export function MovieCardSkeleton() {
    return (
        <div className="w-32 md:w-38 mb-1 flex shrink-0 flex-col gap-1 rounded-2xl">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <div className="p-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
        </div>
    );
}
