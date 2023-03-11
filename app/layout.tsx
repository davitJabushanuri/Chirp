import { cookies } from "next/headers";

import MainLayout from "@/components/layout/main-layout/main-layout";
import "./styles/layout.scss";
import NextAuthProvider from "@/utils/next-auth-provider";

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
      className={`${theme?.value || "theme-light"} ${
        color?.value || "color-blue"
      }`}
      lang="en"
    >
      <NextAuthProvider>
        <MainLayout theme={theme?.value} color={color?.value}>
          {children}
        </MainLayout>
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
