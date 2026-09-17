import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types/movie";

export function MovieGrid({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <section className="py-6" aria-labelledby="movie-grid-title">
      <h1 id="movie-grid-title" className="mb-6 text-2xl font-semibold">{title}</h1>

      {movies.length === 0 ? (
        <p className="text-muted-foreground">No movies found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="min-w-0 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-2/3 w-full bg-muted">
                <Image
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/images/image-placeholder.png"}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 17vw, (max-width: 1535px) 13vw, 10vw"
                />
              </div>
              <div className="p-2">
                <h2 className="truncate text-sm font-semibold">{movie.title}</h2>
                <p className="text-xs text-muted-foreground">⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
