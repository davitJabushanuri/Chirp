import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
} from "@/config";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },

    async session({ session, user }) {
      if (user) {
        session.user.id = user?.id;
        session.user.name = user?.name;
        session.user.email = user?.email;
        session.user.image = user?.image;
        session.user.role = user?.role;
        session.user.username = user?.username;
        session.user.profile_image_url = user?.profile_image_url;
      }
      return session;
    },

    redirect() {
      return "/home";
    },
  },

  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user",
    error: "/auth/error",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),

    TwitterProvider({
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
};

export default NextAuth(authOptions);
