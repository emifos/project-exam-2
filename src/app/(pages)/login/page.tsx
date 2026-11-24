import AuthLayout from "@/app/components/layout/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";

type LoginPageProps = {
  searchParams: Promise<{ role?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { role } = await searchParams;
  const initialAccountType = role === "manager" ? "manager" : "customer";
  return (
    <AuthLayout heading="Log in to your account" imageSrc="/login.webp">
      <LoginForm initialAccountType={initialAccountType} />
    </AuthLayout>
  );
}
