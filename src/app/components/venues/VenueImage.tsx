"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

type VenueImageProps = {
  src?: string;
  alt: string;
  sizes: string;
};

export default function VenueImage({ src, alt, sizes }: VenueImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 bg-linear-to-br from-line to-disabled text-slate">
        <ImageOff aria-hidden="true" className="size-8" />
        <p className="text-sm">No image available</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
