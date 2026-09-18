import Link from "next/link";
import { redirect } from "next/navigation";
import { CategoryNav } from "@/components/category-nav";
import { ListingPagination } from "@/components/listing-pagination";
import PersonCard from "@/components/person-card";
import { getPeople } from "@/services/get-people";
import { getTrendingPeople } from "@/services/get-trending-people";

const categories = {
  popular: { label: "Popular", title: "Popular People" },
  "trending-today": { label: "Trending Today", title: "Trending People Today" },
  "trending-week": { label: "Trending This Week", title: "Trending People This Week" },
} as const;

type PeopleCategory = keyof typeof categories;

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; page?: string | string[] }>;
}) {
  const { category: requestedCategory, page: requestedPage } = await searchParams;
  const category: PeopleCategory =
    typeof requestedCategory === "string" &&
    Object.prototype.hasOwnProperty.call(categories, requestedCategory)
      ? (requestedCategory as PeopleCategory)
      : "popular";
  const pageNumber = typeof requestedPage === "string" ? Number(requestedPage) : NaN;
  const page = Number.isSafeInteger(pageNumber) && pageNumber >= 1 && pageNumber <= 500
    ? pageNumber
    : 1;

  // TMDB documents paging for Popular People, but not for Trending People.
  if (category !== "popular" && requestedPage !== undefined) {
    redirect(`/people?category=${category}`);
  }

  const listing = category === "popular"
    ? await getPeople(page)
    : { results: await getTrendingPeople(category === "trending-today" ? "day" : "week"), total_pages: 0 };
  const totalPages = Math.min(Math.max(listing.total_pages, 0), 500);
  const pageHref = (nextPage: number) => `/people?page=${nextPage}`;

  if (category === "popular" && totalPages > 0 && page > totalPages) {
    redirect(pageHref(totalPages));
  }

  return (
    <main className="min-h-screen px-3 pt-20 sm:px-4">
      <CategoryNav
        label="People categories"
        basePath="/people"
        categories={(Object.keys(categories) as PeopleCategory[]).map((key) => ({
          value: key,
          label: categories[key].label,
        }))}
        selected={category}
        defaultCategory="popular"
      />

      <section className="py-6" aria-labelledby="people-grid-title">
        <h1 id="people-grid-title" className="mb-6 text-2xl font-semibold">{categories[category].title}</h1>
        {listing.results.length === 0 ? (
          <p className="text-muted-foreground">No people found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
            {listing.results.map((person) => (
              <Link key={person.id} href={`/people/${person.id}`} className="min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <PersonCard person={person} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {category === "popular" && (
        <ListingPagination
          label="People pagination"
          currentPage={page}
          totalPages={totalPages}
          pageHref={pageHref}
        />
      )}
    </main>
  );
}
