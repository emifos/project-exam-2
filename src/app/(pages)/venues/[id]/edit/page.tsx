import { notFound } from "next/navigation";
import { getVenuesById } from "@/app/lib/venues";
import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import VenueForm from "@/app/components/venues/VenueForm";

type EditVenueProps = {
  params: Promise<{ id: string }>;
};

export default async function EditVenuePage({ params }: EditVenueProps) {
  const { id } = await params;
  const venue = await getVenuesById(id);

  if (!venue) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Edit venue" }]}
      />
      <section className="mt-6 rounded-3xl bg-white p-6 shadow-lg md:p-10">
        <header className="mb-6">
          <h1 className="text-2xl text-ink">Edit venue</h1>
          <p className="mt-1 text-sm text-slate">
            Update your property details, pricing, and amenities.
          </p>
        </header>
        <hr className="mb-8 border-line" />
        <VenueForm venue={venue} />
      </section>
    </main>
  );
}
