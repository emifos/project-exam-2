import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  heading: string;
  imageSrc: string;
  children?: ReactNode;
};

export default function AuthLayout({
  heading,
  imageSrc,
  children,
}: AuthLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 pb-8 md:px-4 md:py-12">
      <div className="md:grid md:grid-cols-[2fr_3fr] md:gap-8 md:rounded-3xl md:bg-white md:p-8 md:shadow-lg">
        <div className="relative h-48 overflow-hidden md:h-180 md:rounded-2xl">
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            unoptimized
            sizes="(min-width: 768px) 40vh, 100vh"
            className="object-cover"
          />
        </div>
        <section className="mx-4 mt-4 flex flex-col gap-6 rounded-3xl bg-white px-5 py-6 shadow-lg md:mx-auto md:mt-0 md:w-full md:max-w-md md:rounded-none md:bg-transparent md:px-0 md:pt-8 md:shadow-none">
          <h1 className="text-center text-2xl text-ink md:text-3xl">
            {heading}
          </h1>
          {children}
        </section>
      </div>
    </main>
  );
}
