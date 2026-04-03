"use client";

import { SessionProvider } from "next-auth/react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
