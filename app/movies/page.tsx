import { CategoryNav } from "@/components/category-nav";
import { ListingPagination } from "@/components/listing-pagination";
import { MovieGrid } from "@/components/movie/movie-list-grid";
import { getMovieListing } from "@/services/get-movie-listing";
import { redirect } from "next/navigation";

const categories = {
  popular: {
    label: "Popular",
    title: "Popular Movies",
  },
  "top-rated": {
    label: "Top Rated",
    title: "Top Rated Movies",
  },
  "now-playing": {
    label: "Now Playing",
    title: "Now Playing Movies",
  },
  upcoming: {
    label: "Upcoming",
    title: "Upcoming Movies",
  },
} as const;

type MovieCategory = keyof typeof categories;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; page?: string | string[] }>;
}) {
  const { category: requestedCategory, page: requestedPage } = await searchParams;
  const category: MovieCategory =
    typeof requestedCategory === "string" &&
    Object.prototype.hasOwnProperty.call(categories, requestedCategory)
      ? (requestedCategory as MovieCategory)
      : "popular";
  const selected = categories[category];
  const pageNumber = typeof requestedPage === "string" ? Number(requestedPage) : NaN;
  const page = Number.isSafeInteger(pageNumber) && pageNumber >= 1 && pageNumber <= 500
    ? pageNumber
    : 1;
  const { results: movies, total_pages: totalPagesFromApi } = await getMovieListing(category, page);
  const totalPages = Math.min(Math.max(totalPagesFromApi, 0), 500);
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (category !== "popular") params.set("category", category);
    params.set("page", String(nextPage));
    return `/movies?${params}`;
  };

  if (totalPages > 0 && page > totalPages) {
    redirect(pageHref(totalPages));
  }

  return (
    <main className="min-h-screen px-3 pt-20 sm:px-4">
      <CategoryNav
        label="Movie categories"
        basePath="/movies"
        categories={(Object.keys(categories) as MovieCategory[]).map((key) => ({
          value: key,
          label: categories[key].label,
        }))}
        selected={category}
        defaultCategory="popular"
      />

      <MovieGrid title={selected.title} movies={movies} />
      <ListingPagination
        label="Movies pagination"
        currentPage={page}
        totalPages={totalPages}
        pageHref={pageHref}
      />
    </main>
  );
}
