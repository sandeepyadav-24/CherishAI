import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Shared JWT secret
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
};

{
  /**callbacks: {
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
  }, */
}
