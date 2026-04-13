import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-key-change-this"
);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, SECRET_KEY, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: any) {
  const username = formData.username;
  const password = formData.password;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ username, expires });

    (await cookies()).set("admin_session", session, { 
      expires, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logout() {
  (await cookies()).set("admin_session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("admin_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("admin_session")?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "admin_session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
