import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    id: string;
  }
}
