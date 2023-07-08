import { cookies } from "next/headers";

import "./styles/layout.scss";
import NextAuthProvider from "@/utils/next-auth-provider";

import { ClientLayout } from "./client-layout";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");

  return (
    <html
      className={`${theme?.value ?? "theme-light"} ${
        color?.value ?? "color-blue"
      }`}
      lang="en"
    >
      <NextAuthProvider>
        <ClientLayout>{children}</ClientLayout>
      </NextAuthProvider>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Chirp",
    template: "%s / Chirp",
    absolute: "Chirp",
  },

  icons: {
    icon: "/twitter-logo.svg",
  },
};
