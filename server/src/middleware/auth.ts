import { jwtVerify } from "jose";

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode("password_nextauth");
    const { payload } = await jwtVerify(token, secret);
    return payload; // Successfully verified
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
