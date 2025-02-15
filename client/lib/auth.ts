import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token; // Store access token
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Pass accessToken to session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
