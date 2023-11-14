import { Metadata } from "next";

import AuthDisplay from "@/components/auth/auth-display";
import SkipAuth from "@/components/auth/skip-auth";
import { UserAuthForm } from "@/components/auth/user-auth-form";

export const metadata: Metadata = {
  title: "Formly | Login",
  description: "Login and continue where you left off",
};

export default function LoginPage() {
  return (
    <>
      <div className="container h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <SkipAuth authPage="login" />
        </div>
        <AuthDisplay />
        <div className="lg:p-8 h-full">
          <div className="mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
            </div>
            <UserAuthForm formType="login" />
          </div>
        </div>
      </div>
    </>
  );
}
