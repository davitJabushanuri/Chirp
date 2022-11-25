"use client";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";
import { useThemeStore } from "@/stores/useThemeStore";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <html className={`${theme} color-blue`} lang="en">
      <body>
        <div className="layout">
          <MobileNavbar />
          <div className="mobile-tweet-button">
            <TweetButton />
          </div>
          <Sidebar />
          <main>
            <Header />
            {children}
          </main>
          <Aside />
        </div>
      </body>
    </html>
  );
}
