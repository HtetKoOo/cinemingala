import { Button } from "@/components/ui/button";
import { PaginationLink } from "@/components/search/pagination-link";

export function ListingPagination({
  label,
  currentPage,
  totalPages,
  pageHref,
}: {
  label: string;
  currentPage: number;
  totalPages: number;
  pageHref: (page: number) => string;
}) {
  if (totalPages < 1) return null;

  return (
    <nav aria-label={label} className="flex flex-wrap items-center justify-center gap-3 py-8 text-sm sm:gap-4">
      {currentPage > 1 ? (
        <PaginationLink href={pageHref(currentPage - 1)} label="Previous" />
      ) : (
        <Button variant="outline" disabled>Previous</Button>
      )}
      <span aria-live="polite">Page {currentPage} of {totalPages}</span>
      {currentPage < totalPages ? (
        <PaginationLink href={pageHref(currentPage + 1)} label="Next" />
      ) : (
        <Button variant="outline" disabled>Next</Button>
      )}
    </nav>
  );
}
