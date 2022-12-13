import { cookies } from "next/headers";

import MainLayout from "@/components/layout/main-layout/main-layout";
import "./styles/layout.scss";

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
      <MainLayout theme={theme?.value} color={color?.value}>
        {children}
      </MainLayout>
    </html>
  );
}
