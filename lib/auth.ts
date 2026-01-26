import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { PrismaClient } from "@prisma/client";
import { GetUser, InsertUser } from "./service";
import { createAuthMiddleware } from "better-auth/api";
import { prisma } from "./prisma";

// const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      try {
        const newSession = ctx.context.newSession;
        if (newSession && newSession.user) {
          // const userId = newSession.user.id;

          // const authUser = await prisma.user.findUnique({
          //   where: { id: userId }
          // });

          // if (authUser && authUser.email) {
          //   const existingLegacyUser = await GetUser(authUser.email);
          //   if (!existingLegacyUser) {
          //     await InsertUser({
          //       name: authUser.name,
          //       email: authUser.email
          //     });
          //     console.log(`[Auth Sync] Created legacy user for ${authUser.email}`);
          //   }
          // }
        }
      } catch (error) {
        console.error("[Auth Sync] Error syncing user to legacy table:", error);
      }
    }),
  }
});
