import AuthLayout from "@/app/components/layout/AuthLayout";
import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout heading="Register an account" imageSrc="/register.webp">
      <RegisterForm />
    </AuthLayout>
  );
}
