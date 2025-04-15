import { signIn } from "@/auth";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/auth/login-form";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  
  // Redirect to home if already signed in
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="mt-8 space-y-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 