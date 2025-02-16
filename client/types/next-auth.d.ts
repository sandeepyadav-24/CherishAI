import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    idToken?: string; // ✅ Add idToken to the Session type
    accessToken?: string; // ✅ Add accessToken to the Session type
  }

  interface JWT {
    idToken?: string; // ✅ Add idToken to the JWT type
    accessToken?: string;
  }
}
