import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/shared/lib/db";
import { hashPassword } from "@/shared/lib/password";

const registerSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().trim().min(1).max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const message =
        first.email?.[0] ?? first.password?.[0] ?? first.name?.[0] ?? "Invalid input";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { email, password, name } = parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);
    await db.user.create({
      data: {
        email,
        hashedPassword,
        name: name ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
