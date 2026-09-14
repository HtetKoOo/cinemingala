import { getSearchMovies } from "@/services/get-search-movies";
import { SearchResultGrid } from "@/components/search/search-result-grid";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SearchLoading from "./loading";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}) {
    const params = await searchParams;
    const query = typeof params.query === "string" ? params.query : "";
    const requestedPage = Number(params.page);
    const page = Number.isSafeInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 500
        ? requestedPage
        : 1;

    const trimmedQuery = query?.trim() || "";

    if (!trimmedQuery) {
        return (
            <p className="px-6 py-20">Type something to search for movies 🎬</p>
        );
    }

    return (
        <Suspense key={JSON.stringify([trimmedQuery, page])} fallback={<SearchLoading />}>
            <SearchResults query={trimmedQuery} page={page} />
        </Suspense>
    );
}

async function SearchResults({ query, page }: { query: string; page: number }) {
    const results = await getSearchMovies(query, page);
    const totalPages = Math.min(results.total_pages, 500);

    if (totalPages > 0 && page > totalPages) {
        redirect(`/search?${new URLSearchParams({ query, page: String(totalPages) })}`);
    }

    return (
        <SearchResultGrid
            title={`Search Results for "${query}"`}
            results={results.results}
            query={query}
            currentPage={page}
            totalPages={totalPages}
        />

    );
}
