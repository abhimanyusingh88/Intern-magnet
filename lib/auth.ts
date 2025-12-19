import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { GetUser, InsertUser } from "./service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      // Allow unauthenticated users to access pages, protect specific routes in middleware
      return true;
    },
    async signIn({ user }) {
      try {
        if (!user.email) return false;
        const existingUser = await GetUser(user.email)

        if (!existingUser) {
          await InsertUser({ name: user.name, email: user.email });
        }

        return true
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async session({ session }) {
      if (!session.user?.email) return session;

      const user = await GetUser(session.user.email);

      if (user) {
        session.userId = user.id;
      }

      return session;
    }

  },
  pages: {
    signIn: "/login", // custom login page
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
