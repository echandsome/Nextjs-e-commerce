import { Suspense } from "react";

import { AuthFormCard } from "@/app/(auth)/_components/AuthFormCard";

import { LoginForm } from "./LoginForm";

function LoginFallback() {
  return (
    <AuthFormCard title="Sign in" subtitle="Welcome back to BITEX.">
      <div className="h-48 animate-pulse rounded-lg bg-gray-100" />
    </AuthFormCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
