"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

import { AuthFormCard } from "@/app/(auth)/_components/AuthFormCard";
import Button from "@/shared/components/UI/button";
import { Input } from "@/shared/components/UI/input";

const SignupPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not create account.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push("/");
        router.refresh();
        return;
      }

      setError("Account created. Please sign in.");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormCard title="Sign up" subtitle="Create your BITEX account.">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="signup-name">
            Name <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <Input
            id="signup-name"
            type="text"
            name="name"
            autoComplete="name"
            inputSize="base"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="signup-email">
            Email
          </label>
          <Input
            id="signup-email"
            type="email"
            name="email"
            autoComplete="email"
            inputSize="base"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="signup-password">
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            name="password"
            autoComplete="new-password"
            inputSize="base"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
          <p className="text-xs text-gray-500">At least 8 characters.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700" htmlFor="signup-confirm">
            Confirm password
          </label>
          <Input
            id="signup-confirm"
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            inputSize="base"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
            minLength={8}
          />
        </div>
        {error ? <p className="text-sm text-bitex-red-500">{error}</p> : null}
        <Button type="submit" className="w-full border-bitex-blue-500 bg-bitex-blue-500 text-white hover:bg-bitex-blue-400" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-bitex-blue-500 hover:text-bitex-blue-400">
          Sign in
        </Link>
      </p>
    </AuthFormCard>
  );
};

export default SignupPage;
