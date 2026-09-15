import Image from "next/image";
import type {
  WatchProvider,
  WatchProviderRegion,
} from "@/types/watch-provider";

interface ProviderGroup {
  label: string;
  providers: WatchProvider[] | undefined;
}

export function WatchProviderSection({
  availability,
  region,
}: {
  availability: WatchProviderRegion | null;
  region: string;
}) {
  const groups: ProviderGroup[] = [
    { label: "Stream", providers: availability?.flatrate },
    { label: "Free", providers: availability?.free },
    { label: "Free with ads", providers: availability?.ads },
    { label: "Rent", providers: availability?.rent },
    { label: "Buy", providers: availability?.buy },
  ];
  const availableGroups = groups.filter(
    (group) => group.providers && group.providers.length > 0,
  );

  return (
    <section className="mx-2 md:mx-6 mb-8 rounded-2xl border p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold">Where to Watch</h2>
        <p className="text-sm text-muted-foreground">Region: {region}</p>
      </div>

      {availability && availableGroups.length > 0 ? (
        <div className="grid gap-5">
          {availableGroups.map((group) => (
            <div key={group.label}>
              <h3 className="font-semibold mb-2">{group.label}</h3>
              <div className="flex flex-wrap gap-3">
                {group.providers?.map((provider) => (
                  <div key={provider.provider_id} className="w-20 text-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                      alt={`${provider.provider_name} logo`}
                      width={56}
                      height={56}
                      className="mx-auto rounded-xl"
                    />
                    <p className="mt-1 text-xs line-clamp-2">{provider.provider_name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No watch-provider information is available for this region.
        </p>
      )}

      {availability?.link && (
        <a
          href={availability.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm underline"
        >
          View current availability
        </a>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        Availability data provided by JustWatch through TMDB.
      </p>
    </section>
  );
}
