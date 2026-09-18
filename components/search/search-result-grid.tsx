import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { ListingPagination } from "@/components/listing-pagination";
import type { SearchCategory } from "@/services/get-search-results";

export interface SearchResultItem {
  id: number;
  title: string;
  imagePath: string | null;
  href: string;
  detail: string;
}

interface SearchResultGridProps {
  title: string;
  results: SearchResultItem[];
  category: SearchCategory;
  currentPage: number;
  totalPages: number;
  pageHref: (page: number) => string;
}

export function SearchResultGrid({
  title,
  results,
  category,
  currentPage,
  totalPages,
  pageHref,
}: SearchResultGridProps) {
  return (
    <section className="py-6" aria-labelledby="search-results-title">
      <h1 id="search-results-title" className="mb-6 text-2xl font-semibold">{title}</h1>
      {results.length === 0 ? (
        <p className="text-muted-foreground">No results found. Try another search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
          {results.map((result) => (
            <Link
              href={result.href}
              key={result.id}
              className="min-w-0 overflow-hidden rounded-2xl border transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className={`bg-muted relative w-full ${category === "person" ? "aspect-4/5" : "aspect-2/3"}`}>
                {result.imagePath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${result.imagePath}`}
                    alt={result.title}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 17vw, (max-width: 1535px) 13vw, 10vw"
                    className="object-cover"
                  />
                ) : category === "person" ? (
                  <div className="text-muted-foreground flex h-full items-center justify-center" aria-hidden="true">
                    <UserRound className="size-12 stroke-1" />
                  </div>
                ) : (
                  <Image src="/images/image-placeholder.png" alt="" fill sizes="(max-width: 639px) 50vw, 20vw" className="object-cover" />
                )}
              </div>
              <div className="p-2">
                <h2 className="truncate text-sm font-semibold" title={result.title}>{result.title}</h2>
                {result.detail && <p className="text-muted-foreground truncate text-xs">{result.detail}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
      <ListingPagination
        label="Search results pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        pageHref={pageHref}
      />
    </section>
  );
}
