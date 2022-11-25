"use client";

import { Aside } from "@/components/layout/aside";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";
import { useColor } from "@/stores/useColor";
import { useTheme } from "@/stores/useTheme";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);

  return (
    <html
      className={`${currentTheme || "theme-dim"} ${
        currentColor || "color-blue"
      }`}
      lang="en"
    >
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
