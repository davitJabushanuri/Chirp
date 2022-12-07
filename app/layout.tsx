import { cookies } from "next/headers";

import "server-only";
import MainLayout from "@/components/layout/main-layout/main-layout";
import "./styles/layout.scss";
import SupabaseListener from "@/utils/supabase-listener";
import createClient from "@/utils/supabase-server";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const theme = nextCookies.get("theme");
  const color = nextCookies.get("color");
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      className={`${theme?.value || "theme-light"} ${
        color?.value || "color-blue"
      }`}
      lang="en"
    >
      <SupabaseListener accessToken={session?.access_token} />
      <MainLayout session={session}>{children}</MainLayout>
    </html>
  );
}
