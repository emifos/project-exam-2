import AuthLayout from "@/app/components/layout/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout heading="Log in to your account" imageSrc="/login.webp">
      <LoginForm />
    </AuthLayout>
  );
}
