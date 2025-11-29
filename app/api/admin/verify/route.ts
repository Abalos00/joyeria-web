import { NextResponse } from "next/server";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const MAX_AGE_MS = 1000 * 60 * 60 * 24; // 1 day

function verifyValue(value: string | undefined, secret: string) {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [ts, sig] = parts;
  const expected = crypto.createHmac("sha256", secret).update(ts).digest("hex");
  const sigBuf = Buffer.from(sig, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  const t = Number(ts);
  if (Number.isNaN(t)) return false;
  if (Date.now() - t > MAX_AGE_MS) return false;
  return true;
}

export async function GET(request: Request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE_NAME}=`));
    const value = match ? match.split("=").slice(1).join("=") : undefined;
    const secret = process.env.ADMIN_SECRET || process.env.SECRET || "dev-secret";
    const valid = verifyValue(value, secret);
    return NextResponse.json({ ok: true, valid });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
