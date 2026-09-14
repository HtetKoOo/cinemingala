"use client";

import Link, { useLinkStatus } from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationLinkProps {
  href: string;
  label: string;
}

function PaginationLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();

  return (
    <span aria-live="polite" aria-atomic="true">
      {pending ? "Loading..." : label}
    </span>
  );
}

export function PaginationLink({ href, label }: PaginationLinkProps) {
  return (
    <Button asChild variant="outline" className="min-w-24">
      <Link href={href}>
        <PaginationLabel label={label} />
      </Link>
    </Button>
  );
}
