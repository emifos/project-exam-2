"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Media } from "@/app/types/venue";
import VenueImage from "./VenueImage";

type VenueGalleryProps = {
  media: Media[];
  name: string;
};

export default function VenueGallery({ media, name }: VenueGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnails = media
    .map((image, index) => ({ image, index }))
    .filter(({ index }) => index !== currentIndex)
    .slice(0, 3);
  const current = media[currentIndex];
  const hasMultiple = media.length > 1;

  function showPrevious() {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  }

  function showNext() {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  }

  return (
    <>
      {/*Mobile: carousel */}
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-accent/10 md:hidden">
        <VenueImage
          src={current?.url}
          alt={current?.alt || `${name} - image ${currentIndex + 1}`}
          sizes="100vw"
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-ink"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next image"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-2.5 text-ink"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <p className="sr-only" aria-live="polite">
              Image {currentIndex + 1} of {media.length}
            </p>
          </>
        )}
      </div>
      {/* Desktop: main image + thumbnails */}
      <div className="hidden flex-col gap-3 md:flex">
        <div className="relative aspect-16/9 overflow-hidden rounded-2xl bg-accent/10">
          <VenueImage
            src={current?.url}
            alt={current?.alt || `${name} - image ${currentIndex + 1}`}
            sizes="768px"
          />
        </div>
        {thumbnails.length > 0 && (
          <ul className="grid grid-cols-3 gap-3">
            {thumbnails.map(({ image, index }) => (
              <li key={`${image.url}-${index}`}>
                <button
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show image ${index + 1} of ${media.length}`}
                  className="relative block aspect-4/3 w-full overflow-hidden rounded-xl cursor-pointer bg-accent/10 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <VenueImage src={image.url} alt="" sizes="256px" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
