import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const { passwordHash, salt, ...safeUser } = user;
    return NextResponse.json({ authenticated: true, user: safeUser });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
