"use client";

import { type ChangeEvent, useTransition } from "react";
import { useRouter } from "next/navigation";

const regions = [
  { code: "US", name: "United States" },
  { code: "MM", name: "Myanmar" },
  { code: "TH", name: "Thailand" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
] as const;

export function RegionSelector({ region }: { region: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const isListedRegion = regions.some((item) => item.code === region);

  const changeRegion = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextRegion = event.target.value;
    startTransition(() => {
      router.replace(`?region=${encodeURIComponent(nextRegion)}`, { scroll: false });
    });
  };

  return (
    <label className="flex items-center gap-2 text-sm">
      <span>{pending ? "Updating..." : "Region"}</span>
      <select
        value={region}
        onChange={changeRegion}
        disabled={pending}
        className="rounded-xl border bg-background px-3 py-2 text-foreground"
      >
        {!isListedRegion && <option value={region}>{region}</option>}
        {regions.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
}
