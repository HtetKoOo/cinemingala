import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SearchResultGrid, type SearchResultItem } from "@/components/search/search-result-grid";
import { getSearchResults, type SearchCategory } from "@/services/get-search-results";
import SearchLoading from "./loading";

const categories = [
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Series" },
  { value: "person", label: "People" },
] as const;

function searchHref(query: string, category: SearchCategory, page = 1) {
  const params = new URLSearchParams({ query, category });
  if (page > 1) params.set("page", String(page));
  return `/search?${params}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string | string[];
    category?: string | string[];
    page?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const query = typeof params.query === "string" ? params.query.trim() : "";
  const category: SearchCategory = categories.some((item) => item.value === params.category)
    ? params.category as SearchCategory
    : "movie";
  const requestedPage = typeof params.page === "string" ? Number(params.page) : NaN;
  const page = Number.isSafeInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 500
    ? requestedPage
    : 1;

  return (
    <div className="px-3 pt-20 sm:px-4">
      <nav aria-label="Search categories" className="bg-muted flex gap-1 rounded-2xl p-1">
        {categories.map(({ value, label }) => (
          <Link
            key={value}
            href={searchHref(query, value)}
            aria-current={category === value ? "page" : undefined}
            className={`min-w-0 flex-1 rounded-xl px-2 py-2 text-center text-sm font-medium transition-colors ${
              category === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
      {query ? (
        <Suspense key={JSON.stringify([query, category, page])} fallback={<SearchLoading />}>
          <SearchResults query={query} category={category} page={page} />
        </Suspense>
      ) : (
        <p className="py-12 text-muted-foreground">Search for movies, TV series, or people.</p>
      )}
    </div>
  );
}

async function SearchResults({
  query,
  category,
  page,
}: {
  query: string;
  category: SearchCategory;
  page: number;
}) {
  const response = await getSearchResults(category, query, page);
  const totalPages = Math.min(Math.max(response.total_pages, 0), 500);

  if (totalPages > 0 && page > totalPages) {
    redirect(searchHref(query, category, totalPages));
  }

  const results: SearchResultItem[] = response.results.map((result) => {
    if ("title" in result) {
      return {
        id: result.id,
        title: result.title,
        imagePath: result.poster_path,
        href: `/movie/${result.id}`,
        detail: `⭐ ${result.vote_average.toFixed(1)}`,
      };
    }
    if ("known_for_department" in result) {
      return {
        id: result.id,
        title: result.name,
        imagePath: result.profile_path,
        href: `/people/${result.id}`,
        detail: result.known_for_department,
      };
    }
    return {
      id: result.id,
      title: result.name,
      imagePath: result.poster_path,
      href: `/tv/${result.id}`,
      detail: `⭐ ${result.vote_average.toFixed(1)}`,
    };
  });

  return (
    <SearchResultGrid
      title={`${categories.find((item) => item.value === category)?.label} results for “${query}”`}
      results={results}
      category={category}
      currentPage={page}
      totalPages={totalPages}
      pageHref={(nextPage) => searchHref(query, category, nextPage)}
    />
  );
}
