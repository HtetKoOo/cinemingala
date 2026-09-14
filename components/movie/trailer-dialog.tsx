"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { MovieVideo } from "@/types/video";

export function TrailerDialog({ trailer }: { trailer: MovieVideo | null }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  if (!trailer) {
    return <Button variant="outline" disabled>Trailer unavailable</Button>;
  }

  const openTrailer = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };

  return (
    <>
      <Button type="button" variant="outline" onClick={openTrailer}>
        Play Trailer
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-auto w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-background text-foreground p-4 shadow-xl backdrop:bg-black/70"
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 id={titleId} className="font-semibold">{trailer.name}</h2>
          <Button type="button" variant="outline" onClick={() => dialogRef.current?.close()}>
            Close
          </Button>
        </div>
        {open && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailer.key)}`}
            title={trailer.name}
            className="w-full aspect-video rounded-xl border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
        <a
          href={`https://www.youtube.com/watch?v=${encodeURIComponent(trailer.key)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm underline"
        >
          Watch on YouTube
        </a>
      </dialog>
    </>
  );
}
