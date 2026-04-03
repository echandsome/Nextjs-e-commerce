import type { Metadata } from "next";

import { AuthShell } from "./AuthShell";

export const metadata: Metadata = {
  title: "Account — BITEX",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
