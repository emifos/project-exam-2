import Breadcrumbs from "@/app/components/ui/Breadcrumbs";
import ProfileView from "@/app/components/profile/ProfileView";

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Profile" }]}
      />
      <ProfileView />
    </main>
  );
}
