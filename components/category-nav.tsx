import Link from "next/link";
import { cn } from "@/lib/utils";

type Category = { value: string; label: string };

export function CategoryNav({
  label,
  basePath,
  categories,
  selected,
  defaultCategory,
}: {
  label: string;
  basePath: string;
  categories: readonly Category[];
  selected: string;
  defaultCategory: string;
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "bg-muted flex snap-x snap-mandatory gap-1 overflow-x-auto rounded-2xl p-1 [scrollbar-width:none] sm:grid sm:overflow-visible [&::-webkit-scrollbar]:hidden",
        categories.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4",
      )}
    >
      {categories.map(({ value, label: categoryLabel }) => (
        <Link
          key={value}
          href={
            value === defaultCategory
              ? basePath
              : `${basePath}?category=${value}`
          }
          aria-current={selected === value ? "page" : undefined}
          className={`min-w-30 flex-none snap-start rounded-xl px-3 py-2 text-center text-sm font-medium transition-colors sm:min-w-0 ${
            selected === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {categoryLabel}
        </Link>
      ))}
    </nav>
  );
}
