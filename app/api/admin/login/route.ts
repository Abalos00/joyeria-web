import { NextResponse } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24; // 1 day in seconds

function signTimestamp(ts: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(ts).digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body?.password ?? "");

    const expected = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_SECRET || process.env.SECRET || "dev-secret";

    if (!expected) {
      return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD not configured on server" }, { status: 500 });
    }

    if (password !== expected) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    }

    const ts = String(Date.now());
    const sig = signTimestamp(ts, secret);
    const value = `${ts}.${sig}`;

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
