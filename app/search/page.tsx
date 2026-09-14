import { getSearchMovies } from "@/services/get-search-movies";
import { SearchResultGrid } from "@/components/search/search-result-grid";
import { redirect } from "next/navigation";

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

    const results = await getSearchMovies(trimmedQuery, page);
    const totalPages = Math.min(results.total_pages, 500);

    if (totalPages > 0 && page > totalPages) {
        redirect(`/search?${new URLSearchParams({ query: trimmedQuery, page: String(totalPages) })}`);
    }

    return (
        <SearchResultGrid
            title={`Search Results for "${trimmedQuery}"`}
            results={results.results}
            query={trimmedQuery}
            currentPage={page}
            totalPages={totalPages}
        />

    );
}
