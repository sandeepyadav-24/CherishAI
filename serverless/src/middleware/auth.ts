// middleware/auth.ts
import { Context } from "hono";
import { verify } from "jsonwebtoken";

export async function authMiddleware(c: Context, next: Function) {
  try {
    // 1. Get token from header
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) throw new Error("Invalid header");
    const token = authHeader.split(" ")[1];

    // 2. Verify token (using accessToken or idToken)
    const decoded = verify(token, process.env.NEXTAUTH_SECRET!);
    console.log("Decoded Token:", decoded);

    {
      /** 3. Validate token structure
    if (!decoded.sub || !decoded.email) {
      throw new Error("Invalid token payload");
    }

    // 4. Attach user to context
    c.set("user", {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    }); */
    }

    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
}
