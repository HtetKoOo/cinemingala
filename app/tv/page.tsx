import { CategoryNav } from "@/components/category-nav";
import { ListingPagination } from "@/components/listing-pagination";
import { TvShowGrid } from "@/components/tv-show/tv-show-grid";
import { getTvListing } from "@/services/get-tv-listing";
import { redirect } from "next/navigation";

const categories = {
  "top-rated": { label: "Top Rated", title: "Top Rated TV Shows" },
  popular: { label: "Popular", title: "Popular TV Shows" },
  "air-today": { label: "Air Today", title: "Airing Today TV Shows" },
  "on-air": { label: "On Air", title: "On Air TV Shows" },
} as const;

type TvCategory = keyof typeof categories;

export default async function TvShowPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; page?: string | string[] }>;
}) {
  const { category: requestedCategory, page: requestedPage } = await searchParams;
  const category: TvCategory =
    typeof requestedCategory === "string" && Object.prototype.hasOwnProperty.call(categories, requestedCategory)
      ? (requestedCategory as TvCategory)
      : "top-rated";
  const selected = categories[category];
  const pageNumber = typeof requestedPage === "string" ? Number(requestedPage) : NaN;
  const page = Number.isSafeInteger(pageNumber) && pageNumber >= 1 && pageNumber <= 500
    ? pageNumber
    : 1;
  const { results: shows, total_pages: totalPagesFromApi } = await getTvListing(category, page);
  const totalPages = Math.min(Math.max(totalPagesFromApi, 0), 500);
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (category !== "top-rated") params.set("category", category);
    params.set("page", String(nextPage));
    return `/tv?${params}`;
  };

  if (totalPages > 0 && page > totalPages) {
    redirect(pageHref(totalPages));
  }

  return (
    <>
      <CategoryNav
        label="TV categories"
        basePath="/tv"
        categories={(Object.keys(categories) as TvCategory[]).map((key) => ({ value: key, label: categories[key].label }))}
        selected={category}
        defaultCategory="top-rated"
      />
      <TvShowGrid title={selected.title} shows={shows} />
      <ListingPagination
        label="TV shows pagination"
        currentPage={page}
        totalPages={totalPages}
        pageHref={pageHref}
      />
    </>
  );
}
