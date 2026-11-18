import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import VenueForm from "@/app/components/venues/VenueForm";

export default function CreateVenuePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Create venue" }]}
      />
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-lg md:p-10">
        <header className="flex flex-col gap-1">
          <h1 className="mb-2 text-2xl text-primary">Create a venue</h1>
          <p className="text-sm text-slate">
            Add your property details to publish a new listing
          </p>
        </header>
        <hr className="border-line" />
        <VenueForm />
      </div>
    </main>
  );
}
