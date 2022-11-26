"use client";

import { Aside } from "@/components/layout/aside";
import { CreateTweetModal } from "@/features/create-tweet";
import { Header } from "@/features/header";
import { MobileNavbar } from "@/features/navbar";
import { TweetButton } from "@/features/sidebar";
import { Sidebar } from "@/features/sidebar";
import { useColor } from "@/stores/useColor";
import { useModal } from "@/stores/useModal";
import { useTheme } from "@/stores/useTheme";
import "./layout.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentTheme = useTheme((state) => state.theme);
  const currentColor = useColor((state) => state.color);
  const isModalOpen = useModal((state) => state.isModalOpen);

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
        {isModalOpen && <CreateTweetModal />}
      </body>
    </html>
  );
}
