import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// 1. NextAuth Setup:
//     NextAuth is used to manage authentication in your Next.js app.
//     The PrismaAdapter integrates NextAuth with a Prisma database for storing user and session data.

// 2. Prisma Adapter:
//     PrismaAdapter(prisma) connects Prisma to NextAuth. prisma is an instance of your Prisma client, configured in your project.

// 3. Session Strategy:
//     { strategy: "jwt" } specifies that sessions will be managed using JSON Web Tokens (JWT) instead of database sessions.

// 4. authConfig:
//     ...authConfig spreads additional configuration (e.g., providers, callbacks) imported from another file.

// 5. Exporting Handlers:
//     { GET, POST } provides the handlers for API routes (/api/auth/[...nextauth]).
//     auth exports the complete NextAuth configuration for use elsewhere in the app.
