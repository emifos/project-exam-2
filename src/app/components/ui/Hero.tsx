import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-56 overflow-hidden md:h-[520px]">
      <Image
        src="/hero-image.avif"
        alt=""
        fill
        loading="eager"
        fetchPriority="high"
        unoptimized
        sizes="(min-width: 768px) 1280px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-black/40 px-6 py-6 text-center text-white md:px-12 md:py-8 md:text-left">
        <p className="text-2xl font-semibold md:text-4xl">
          Your next stay starts here.
        </p>
        <p className="text-sm md:text-xl md:pl-2 md:pt-2">
          Discover your perfect getaway with Holidaze
        </p>
      </div>
    </div>
  );
}
